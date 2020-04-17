import React from '~/rc-form-dynamic-v1/example/react';
import DynamicForm from '~/rc-form-dynamic-v1/example/rc-form-dynamic';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from '~/rc-form-dynamic-v1/example/antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default class Example extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        fields: {
            prefix: {
                value: '86'
            },
            phone: {
                value: '',
            }
        }
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    compareToFirstPassword = (rule, value, callback) => {
        // debugger;
        const { form } = this.formRef;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        // debugger;
        const { form } = this.formRef;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    getWebsiteOptions = () => this.state.autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    componentDidMount() {
        console.log(this.formRef)
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    handleSubmit = (e, formRef) => {
        e.preventDefault();
        formRef.validateFields((err, values) => {
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
        const { fields } = this.state;
        // debugger;
        const phoneSettings = {
            key: 'phone',
            component: [Input, {
                style: { width: '100%' }
            }],
            props: {
                label: 'Phone Number',
            },
            decorator: {
                initialValue: fields.phone.value,
                rules: [{ required: true, message: 'Please input your phone number!' }],
            },
        };

        const settings = {
            props: {
                ...formItemLayout,
            },
            fields: [
                {
                    key: 'email',
                    component: [Input, {
                        prefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />,
                        placeholder: "Username"
                    }],
                    hidden: true,
                    props: {
                        label: 'E-mail',
                    },
                    decorator: {
                        rules: [
                            { type: 'email', message: 'The input is not valid E-mail!' },
                            { required: true, message: 'Please input your E-mail!' },
                        ],
                    },
                }, {
                    key: 'password',
                    component: Input.Password,
                    props: {
                        label: 'Password',
                        hasFeedback: true,
                    },
                    decorator: {
                        rules: [
                            { required: true, message: 'Please input your password!' },
                            { validator: this.validateToNextPassword },
                        ],
                    },
                }, {
                    key: 'confirm',
                    component: [Input.Password, {
                        onBlur: this.handleConfirmBlur
                    }],
                    props: {
                        label: 'Confirm Password',
                        hasFeedback: true,
                    },
                    decorator: {
                        rules: [
                            { required: true, message: 'Please confirm your password!' },
                            { validator: this.compareToFirstPassword },
                        ],
                    },
                }, {
                    key: 'nickname',
                    component: Input,
                    props: {
                        label: <span>Nickname&nbsp;
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>,
                    },
                    decorator: {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    },
                }, {
                    key: 'residence',
                    component: [Cascader, {
                        options: residences
                    }],
                    props: {
                        label: 'Habitual Residence',
                    },
                    decorator: {
                        initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                        rules: [
                            { type: 'array', required: true, message: 'Please select your habitual residence!' },
                        ],
                    },
                }, {
                    key: 'prefix',
                    component: [Select, {
                        style: { width: 70 },
                        children: [
                            <Option key="86" value="86">+86</Option>,
                            <Option key="87" value="87">+87</Option>
                        ],
                    }],
                    decorator: {
                        initialValue: "86"
                    },
                }, {
                    key: 'website',
                    component: [AutoComplete, {
                        dataSource: this.getWebsiteOptions(),
                        onChange: this.handleWebsiteChange,
                        placeholder: "website"
                    }],
                    props: {
                        label: 'Website'
                    },
                    decorator: {
                        initialValue: "86"
                    },
                }, {
                    key: 'captcha',
                    component: [Input, {
                    }],
                    decorator: {
                        rules: [{ required: true, message: 'Please input the captcha you got!' }],
                    },
                }, {
                    key: 'agreement',
                    component: [Checkbox, {
                        children: <>
                            I have read the <a href="">agreement</a>
                        </>
                    }],
                    props: {
                        ...tailFormItemLayout,
                    },
                    decorator: {
                        valuePropName: 'checked'
                    },
                }
            ]
        };
        return (
            <DynamicForm
                wrappedComponentRef={this.saveFormRef}
                settings={settings}
                fields={fields}
                onSubmit={this.handleSubmit}
                onFieldsChange={this.onFieldsChange}
                render={[
                    ({ captcha }, fields) => <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                        <Row gutter={8}>
                            <Col span={12}>
                                {fields[captcha]}
                            </Col>
                            <Col span={12}>
                                <Button>Get captcha</Button>
                            </Col>
                        </Row>
                    </Form.Item>,
                    ({ prefix }, fields, ref) => <Form.Item {...phoneSettings.props}>
                        {ref.form.getFieldDecorator(phoneSettings.key, phoneSettings.decorator)(<Input {...phoneSettings.component[1]} addonBefore={fields[prefix]} />)}
                    </Form.Item>
                ]}>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </DynamicForm>
        );
    }
}