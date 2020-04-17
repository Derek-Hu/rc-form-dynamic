import React from '~/rc-form-dynamic-v1/example/react';
import DynamicForm from '~/rc-form-dynamic-v1/example/rc-form-dynamic';
import { Form, Input, Select, Button } from '~/rc-form-dynamic-v1/example/antd';

const { Option } = Select;

class PriceInput extends React.Component {
    handleNumberChange = e => {
        const number = parseInt(e.target.value || 0, 10);
        if (isNaN(number)) {
            return;
        }
        this.triggerChange({ number });
    };

    handleCurrencyChange = currency => {
        this.triggerChange({ currency });
    };

    triggerChange = changedValue => {
        const { onChange, value } = this.props;
        if (onChange) {
            onChange({
                ...value,
                ...changedValue,
            });
        }
    };

    render() {
        const { size, value } = this.props;
        return (
            <span>
                <Input
                    type="text"
                    size={size}
                    value={value.number}
                    onChange={this.handleNumberChange}
                    style={{ width: '65%', marginRight: '3%' }}
                />
                <Select
                    value={value.currency}
                    size={size}
                    style={{ width: '32%' }}
                    onChange={this.handleCurrencyChange}
                >
                    <Option value="rmb">RMB</Option>
                    <Option value="dollar">Dollar</Option>
                </Select>
            </span>
        );
    }
}

export default class Example extends React.Component {


    handleSubmit = (e, form) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    checkPrice = (rule, value, callback) => {
        if (value.number > 0) {
            return callback();
        }
        callback('Price must greater than zero!');
    };


    render() {
        const settings = {
            props: {
                layout: "inline"
            },
            fields: [
                {
                    key: 'price',
                    component: PriceInput,
                    decorator: {
                        initialValue: { number: 0, currency: 'rmb' },
                        rules: [{ validator: this.checkPrice }],
                    },
                }
            ]
        };

        return (
            <DynamicForm
                settings={settings}
                onSubmit={this.handleSubmit}
            >
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </DynamicForm>
        );
    }
}