import React from '~/rc-form-dynamic-v1/example/react';
import DynamicForm from '~/rc-form-dynamic-v1/example/rc-form-dynamic';
import { Radio, Input, Form, Button } from '~/rc-form-dynamic-v1/example/antd';

export default class Example extends React.Component {

    state = {
        fields: {
            layout: {
                value: 'horizontal',
            },
        },
    };

    handleSubmit = (e, form) => {
        e.preventDefault();
        form.validateFields((err, values) => {
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

    render() {
        const { fields } = this.state;
        const formLayout = fields.layout.value;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
                : null;
        const buttonItemLayout =
            formLayout === 'horizontal'
                ? {
                    wrapperCol: { span: 14, offset: 4 },
                }
                : null;
        const settings = {
            props: {
                layout: formLayout
            },
            fields: [
                {
                    key: 'layout',
                    component: [Radio.Group, {
                        children: [
                            <Radio.Button value="horizontal">Horizontal</Radio.Button>,
                            <Radio.Button value="vertical">Vertical</Radio.Button>,
                            <Radio.Button value="inline">Inline</Radio.Button>
                        ]
                    }],
                    props: {
                        label: 'Form Layout',
                        ...formItemLayout
                    },
                }, {
                    key: 'field-a',
                    component: [Input, {
                        placeholder: "input placeholder a"
                    }],
                    props: {
                        label: 'Field A',
                        ...formItemLayout
                    },
                }, {
                    key: 'field-b',
                    component: [Input, {
                        placeholder: "input placeholder b"
                    }],
                    props: {
                        label: 'Field B',
                        ...formItemLayout
                    },
                }
            ]
        };

        return (
            <DynamicForm
                fields={fields}
                settings={settings}
                onFieldsChange={this.onFieldsChange}
                onSubmit={this.handleSubmit}>
                <Form.Item {...buttonItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
            </DynamicForm>
        );
    }
}