`rc-form-dynamic` render form dynamic using form configurations, based on `rc-form` and `antd`.

```
npm install --save rc-form-dynamic
```

Demo: [https://derek-hu.github.io/rc-form-dynamic/](https://derek-hu.github.io/rc-form-dynamic/)

Form Configuration Example: 
```js
import DynamicForm from 'rc-form-dynamic';
import { Input, Form, Select, Button, Checkbox } from 'antd';

const { Option } = Select;

const settings = {
    props: {
        labelCol: { span: 5 },
        wrapperCol: { span: 12 }
    },
    fields: [{
        props: {
            label: 'Gender',
        },
        key: 'gender',
        decorator: {
            rules: [{ required: true, message: 'Please select your gender!' }],
        },
        component: [Select, {
            placeholder: "Select a option and change input text above",
            onChange: this.handleSelectChange,
            children: [
                <Option value="male" key="male">male</Option>,
                <Option value="female" key="female">female</Option>
            ]
        }],
    }, {
        key: 'remember',
        component: [Checkbox, {
            children: 'Remember me'
        }],
        decorator: {
            valuePropName: 'checked',
            initialValue: true,
        },
    }]
};

<DynamicForm 
    settings={settings} 
    onSubmit={this.handleSubmit} 
    render={[({ remember }, fields) => <Form.Item>
        {fields[remember]}
        <a className="login-form-forgot" href="">Forgot password</a>
    </Form.Item>]}>
    <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
        <Button type="primary" htmlType="submit">Log in</Button>
    </Form.Item>
</DynamicForm>


```
After Render: 
```js
import React from 'react';
import { Form, Select, Button } from 'antd';

<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
    <Form.Item label='Gender'>{
        getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }],
        })(<Select
            placeholder="Select a option and change input text above"
            onChange={this.handleSelectChange}>
            <Option value="male" key="male">male</Option>
            <Option value="female" key="female">female</Option>
        </Select>)
    }</Form.Item>
    <Form.Item>
        {
            getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)
        }
        <a className="login-form-forgot" href="">Forgot password</a>
    </Form.Item>
    <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
        <Button type="primary" htmlType="submit">Log in</Button>
    </Form.Item>
</Form>
```
## Form Configuration
```js
{
    // props for <Form> Component: <Form ...{props}></Form>
    // e.g. https://ant.design/components/form/#Form
    props: {
        labelCol: { span: 5 },
        wrapperCol: { span: 12 },
        ...
    },
    // dynamic <Form.Item>
    fields: [{
        // props for <Form.Item> Component: <Form.Item ...{props}></Form.Item>
        // e.g. https://ant.design/components/form/#Form.Item
        props: {
            label: 'Gender',
            ...
        },
        // render form item using 'getFieldDecorator' from 'rc-form' component
        // e.g.
        // getFieldDecorator(key, decorator)(<Select {...props}>{children}</Checkbox>)
        key: 'gender',
        decorator: {
            rules: [{ required: true, message: 'Please select your gender!' }],
        },
        // component: Select,
        // component with props: [Select, props]
        component: [Select, {
            placeholder: "Select a option and change input text above",
            onChange: this.handleSelectChange,
            children: [
                <Option value="male" key="male">male</Option>,
                <Option value="female" key="female">female</Option>
            ]
        }],
    }]
}
```
## API
| Property       | Description             | Type                    |
| ---------- | ---------------- | ----------------------- |
| settings  | Form configuration | object                 |
| onSubmit | Alias for props in &lt;Form onSubmit&gt;     | Function(e:Event)                 |
| render  | Custom render &lt;Form.Item&gt; method        | Function(keys: Object, defaultRenderFormItems: Object, props: Object, configurations: Object) =&gt; Component \| Array<Function(keys: Object, defaultRenderFormItems: Object, props: Object, configurations: Object) => Component>                |
| onValuesChange |   Trigger when value updated     | Function(changedFields, allFields, formInstance) |
| onFieldsChange |   Trigger when field updated     | Function(changedValues, allValues, formInstance) |
| fields |    Control of form fields through state management    | { [name: string]: FieldData }  |

FieldData: https://ant.design/components/form/#FieldData

If you want to get ref after Form.create, you can use `wrappedComponentRef` provided by `rc-form`, [details can be viewed here](https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140).