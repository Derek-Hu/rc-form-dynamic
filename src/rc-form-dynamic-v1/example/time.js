import React from '~/rc-form-dynamic-v1/example/react';
import DynamicForm from '~/rc-form-dynamic-v1/example/rc-form-dynamic';
import { Form, DatePicker, TimePicker, Button } from '~/rc-form-dynamic-v1/example/antd';

const { MonthPicker, RangePicker } = DatePicker;

export default class Example extends React.Component {

    // state = {};

    handleSubmit = (e, formRef) => {
        e.preventDefault();
        formRef.validateFields((err, fieldsValue) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log('Received values of form: ', fieldsValue);
            // Should format date value before submit.
            const rangeValue = fieldsValue['range-picker'];
            const rangeTimeValue = fieldsValue['range-time-picker'];
            const values = {
                ...fieldsValue,
                'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
                'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
                'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
                'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
                'range-time-picker': [
                    rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                    rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
                ],
                'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
            };
            console.log('Received values of form: ', values);
        });
    };

    // onFieldsChange = (changedFields, allFields) => {
    //     console.log(changedFields, allFields);
    //     this.setState(({ fields }) => ({
    //         fields: { ...fields, ...changedFields },
    //     }));
    // }

    render() {
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
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };

        const settings = {
            props: {
                ...formItemLayout
            },
            fields: [{
                key: 'date-picker',
                component: DatePicker,
                props: {
                    label: 'DatePicker'
                },
                decorator: config,
            },{
                key: 'date-time-picker',
                component: [DatePicker, {
                    showTime: true,
                    format: "YYYY-MM-DD HH:mm:ss"
                }],
                props: {
                    label: 'DatePicker[showTime]'
                },
                decorator: config,
            },{
                key: 'month-picker',
                component: MonthPicker,
                props: {
                    label: 'MonthPicker'
                },
                decorator: config,
            },{
                key: 'range-picker',
                component: RangePicker,
                props: {
                    label: 'RangePicker'
                },
                decorator: rangeConfig,
            },{
                key: 'range-time-picker',
                component: [RangePicker, {
                    showTime: true,
                    format: "YYYY-MM-DD HH:mm:ss"
                }],
                props: {
                    label: 'RangePicker[showTime]'
                },
                decorator: rangeConfig,
            },{
                key: 'time-picker',
                component: TimePicker,
                props: {
                    label: 'TimePicker'
                },
                decorator: config,
            }]
        };

        // const { fields } = this.state;
        return (<>
            <DynamicForm
                settings={settings}
                onSubmit={this.handleSubmit}
                // fields={fields}
                // onFieldsChange={this.onFieldsChange}
                >
                <Form.Item wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </DynamicForm>
        </>
        );
    }
}