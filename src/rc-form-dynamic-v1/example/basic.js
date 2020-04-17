import React from '~/rc-form-dynamic-v1/example/react';
import DynamicForm from '~/rc-form-dynamic-v1/example/rc-form-dynamic';
import { Icon, Input, Form, Button } from '~/rc-form-dynamic-v1/example/antd';

const settings = {
  props: {
    layout: "inline"
  },
  fields: [
    {
      key: 'username',
      component: [Input, {
        prefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />,
        placeholder: "Username"
      }],
      props: {
      },
      decorator: {
        rules: [{ required: true, message: 'Please input your Password!' }],
      },
    }, {
      key: 'password',
      component: [Input, {
        type: "password",
        prefix: <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />,
        placeholder: "Password"
      }],
      decorator: {
        rules: [{ required: true, message: 'Please input your username!' }],
      },
    }
  ]
};

export default class Example extends React.Component {

  state = {
    fields: {
      username: {
        // value: 'benjycui',
      },
      password: {
        // value: 'password',
      },
    },
  };

  componentDidMount() {
    // To disable submit button at the beginning.
    // this.formRef.form.validateFields();
    console.log(this.formRef)
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.formRef.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  onFieldsChange = (changedFields, allFields) => {
    console.log(changedFields, allFields);
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }

  onValuesChange = (changedValues, allValues) => {
    console.log(changedValues, allValues);
  }

  render() {
    // const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.formRef.form;
    const { fields } = this.state;

    // Only show error after a field is touched.
    // const usernameError = isFieldTouched('username') && getFieldError('username');
    // const passwordError = isFieldTouched('password') && getFieldError('password');

    // console.log(getFieldsError());
    return (
      <DynamicForm
        wrappedComponentRef={this.saveFormRef}
        settings={settings}
        fields={fields}
        onValuesChange={this.onValuesChange}
        onFieldsChange={this.onFieldsChange}>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit}
          // disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </Form.Item>
      </DynamicForm>
    );
  }
}