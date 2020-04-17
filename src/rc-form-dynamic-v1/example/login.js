import React from '~/rc-form-dynamic-v1/example/react';
import DynamicForm from '~/rc-form-dynamic-v1/example/rc-form-dynamic';
import { Icon, Input, Form, Button, Checkbox } from '~/rc-form-dynamic-v1/example/antd';
import styles from './login.module.less';

const settings = {
    props: {
        // layout: "inline",
        className: styles["login-form"]
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
                rules: [{ required: true, message: 'Please input your username!' }],
            },
        }, {
            key: 'password',
            component: [Input, {
                type: "password",
                prefix: <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />,
                placeholder: "Password"
            }],
            decorator: {
                rules: [{ required: true, message: 'Please input your Password!' }],
            },
        }, {
            key: 'remember',
            component: [Checkbox, {
                children: 'Remember me'
            }],
            decorator: {
                valuePropName: 'checked',
                initialValue: true,
            },
        }
    ]
};

export default class Example extends React.Component {

    state = {
        fields: {
            username: {
                value: '1111'
            }
        }
    };

    componentDidMount() {
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
        const { fields } = this.state;
        return (
            <DynamicForm
                wrappedComponentRef={this.saveFormRef}
                settings={settings}
                fields={fields}
                onSubmit={this.handleSubmit}
                onValuesChange={this.onValuesChange}
                onFieldsChange={this.onFieldsChange}
                render={[({ remember }, fields) => <Form.Item>
                    {fields[remember]}
                    <a className={styles['login-form-forgot']} href="">Forgot password</a>
                </Form.Item>]}>
                <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
                    Log in
                </Button>
                <Form.Item>
                    Or <a href="">register now!</a>
                </Form.Item>
            </DynamicForm>
        );
    }
}