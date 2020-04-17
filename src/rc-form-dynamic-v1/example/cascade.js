import React from '~/rc-form-dynamic-v1/example/react';
import DynamicForm from '~/rc-form-dynamic-v1/example/rc-form-dynamic';
import { Input, Form, Select, Button } from '~/rc-form-dynamic-v1/example/antd';

const { Option } = Select;

export default class Example extends React.Component {

    handleSubmit = (e, form) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    handleSelectChange = value => {
        console.log(value);
        this.formRef.form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    };

    render() {
        const settings = {
            props: {
                labelCol: { span: 5 },
                wrapperCol: { span: 12 }
            },
            fields: [
                {
                    key: 'note',
                    component: Input,
                    props: {
                        label: 'Note',
                    },
                    decorator: {
                        rules: [{ required: true, message: 'Please input your note!' }],
                    }
                }, {
                    key: 'gender',
                    component: [Select, {
                        placeholder: "Select a option and change input text above",
                        onChange: this.handleSelectChange,
                        children: [
                            <Option value="male" key="male">male</Option>,
                            <Option value="female" key="female">female</Option>
                        ]
                    }],
                    props: {
                        label: 'Gender',
                    },
                    decorator: {
                        rules: [{ required: true, message: 'Please select your gender!' }],
                    }
                }
            ]
        };

        return (
            <DynamicForm
                settings={settings}
                wrappedComponentRef={this.saveFormRef}
                onSubmit={this.handleSubmit}>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
            </DynamicForm>
        );
    }
}