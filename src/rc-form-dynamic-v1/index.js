import React, { forwardRef, useImperativeHandle } from '~/rc-form-dynamic-v1/react';
import { Form } from '~/rc-form-dynamic-v1/antd';

const ComponentName = 'DynamicForm';
const renderField = (field, parentProps) => {
  const { getFieldDecorator } = parentProps.form;
  const { key, component, decorator } = field;
  const [Component, componentProps] = Array.isArray(component) ? component : [component];
  const { children } = componentProps || {};
  return getFieldDecorator(key, decorator)(<Component {...componentProps}>{children}</Component>);
}

export default Form.create({
  onFieldsChange(props, changedFields, allFields) {
    props.onFieldsChange && props.onFieldsChange(changedFields, allFields, props.form);
  },
  mapPropsToFields(props) {
    const { settings: { fields } } = props;
    const formData = props.fields;
    if (!formData || !fields) {
      return;
    }
    const allKeys = fields.reduce((allKey, field)=> {
      allKey[field.key] = true;
      return allKey;
    }, {});
    return Object.keys(formData).reduce((formFields, key)=>{
      if(key in allKeys){
        const fieldData = formData[key];
        formFields[key] = Form.createFormField({
          ...fieldData,
          value: fieldData && fieldData.value,
        });
      }
      return formFields;
    }, {});
  },
  onValuesChange(props, changedValues, allValues) {
    props.onValuesChange && props.onValuesChange(changedValues, allValues, props.form);
  },
})(forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({
    form: props.form,
  }));

  const { settings: { props: fromProps, fields }, render, children, onSubmit, onFieldsChange, fields: formData } = props;

  if (!fields || !fields.length) {
    return null;
  }

  if(onFieldsChange && !formData){
    console.error(`Missing prop 'fields' when 'onFieldsChange' exists in <${ComponentName} onFieldsChange={() => {}} fields={}/>`)
  }
  const keyArgs = {};
  const FieldInstances = {};
  const batchKeys = {};
  let currentBatchNumber = -1;
  const FormFieldsGetter = {};
  const totalKey = {};

  Object.defineProperty(FormFieldsGetter, 'undefined', {
    get: function () {
      console.error(`Key not match in render params: <${ComponentName} render={[({key}, fields) => Component ]} />`)
      return null;
    }
  });

  const FieldMap = {};
  fields.forEach(field => {
    if (field.hidden) {
      return;
    }
    const key = field.key;
    if (key in totalKey) {
      console.error(`Duplicate Key '${key}' props settings, <${ComponentName} settings={settings} />`)
      return;
    }
    FieldMap[key] = field;
    totalKey[key] = true;
    FieldInstances[key] = renderField(field, props);
    keyArgs[key] = key;
    Object.defineProperty(FormFieldsGetter, key, {
      get: function () {
        if (!batchKeys[currentBatchNumber]) {
          batchKeys[currentBatchNumber] = [];
        }
        batchKeys[currentBatchNumber].push(key);
        return FieldInstances[key];
      }
    });
  });

  const interceptors = (Array.isArray(render) ? render : [render]).filter(child => typeof child === 'function');
  const CustomItems = interceptors && interceptors.length ? interceptors.map((interceptor, index) => {
    currentBatchNumber = index;
    const customs = interceptor(keyArgs, FormFieldsGetter, props, FieldMap);
    if (!customs) {
      console.error(`Should return Component: <${ComponentName} render={[({key}, fields) => Component]} />`);
      return null;
    }
    return React.cloneElement(customs, { key: `batch_${index}` });
  }) : null;

  const batchKeyGraph = Object.keys(batchKeys).reduce((graph, batchIndex) => {
    const batch = batchKeys[batchIndex];
    if (!graph[batch[0]]) {
      graph[batch[0]] = [];
    }
    graph[batch[0]].push({ index: batchIndex, args: batch });
    return graph;
  }, {});

  const allInterceptorKeys = Object.keys(batchKeys).reduce((allKeys, index) => {
    return allKeys.concat(batchKeys[index]);
  }, []);

  const formItems = fields.map((field) => {
    const { key, props } = field;
    if (!totalKey[key]) {
      return null;
    }
    if (allInterceptorKeys.indexOf(key) === -1) {
      return <Form.Item {...props} key={key}>{FieldInstances[key]}</Form.Item>;
    }
    if ((key in batchKeyGraph)) {
      return batchKeyGraph[key].map(batch => {
        batch.args.forEach(batchKey => {
          totalKey[batchKey] = false;
        });
        return CustomItems[batch.index];
      });
    }
  });
  const submitProps = {};
  if(onSubmit){
    submitProps.onSubmit = (e) => onSubmit(e, props.form);
  }
  return <Form {...fromProps} {...submitProps}>{formItems}{children}</Form>;
}));