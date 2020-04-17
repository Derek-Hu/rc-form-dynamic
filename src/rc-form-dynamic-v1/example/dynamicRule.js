import React from '~/rc-form-dynamic-v1/example/react';
import DynamicForm from '~/rc-form-dynamic-v1/example/rc-form-dynamic';
import { Input, Form, Button, Checkbox, Select } from '~/rc-form-dynamic-v1/example/antd';


const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};

export default class Example extends React.Component {

    state = {
        fields: {
            checkNick: {
                value: true,
            }
        }
    };

    handleSubmit = (e, form) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.info('success', values);
            }else{
                console.error(err);
            }
        });
    };
    
    onValuesChange=(_, __, form) => {
        setTimeout(()=>{
            form.validateFields(['nickname'], {force: true});
        });
    }
    
    onFieldsChange = (changedFields) => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    }
    
    render() {
        const { fields } = this.state;
        const options = fields.checkNick.value ? ['male', 'female'] : ['male', 'female', 'others']
        const settings = {
            fields: [
                {
                    key: 'username',
                    component: [Input, {
                        placeholder: 'Please input your name',
                    }],
                    props: {
                        label: "Name",
                        ...formItemLayout,
                    },
                    decorator: {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your name',
                            },
                        ],
                    }
                }, {
                    key: 'nickname',
                    component: [Input, {
                        placeholder: 'Please input your nickname',
                    }],
                    props: {
                        label: "Nickname",
                        ...formItemLayout,
                    },
                    decorator: {
                        rules: [
                            {
                                required: fields.checkNick.value,
                                message: 'Please input your nickname',
                            },
                        ],
                    }
                }, {
                    key: 'checkNick',
                    component: [Checkbox, {
                        children: 'Nickname is required',
                    }],
                    props: {
                        ...formTailLayout
                    },
                    decorator: {
                        valuePropName: 'checked',
                    }
                }, {
                    key: 'gender',
                    component: [Select, {
                        allowClear: true,
                        placeholder: "Select a option and change input text above",
                        onChange: this.handleSelectChange,
                        children: options.map(option => <Option key={option} value={option} >{option}</Option>)
                    }],
                    props: {
                        ...formItemLayout,
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
                fields={fields}
                onFieldsChange={this.onFieldsChange}
                onValuesChange={this.onValuesChange}
                onSubmit={this.handleSubmit}>
                <Form.Item {...formTailLayout}>
                    <Button type="primary" htmlType="submit">
                        Check
                    </Button>
                </Form.Item>
            </DynamicForm>
        );
    }
}