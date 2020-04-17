import React from '~/rc-form-dynamic-v1/example/react';
import DynamicForm from '~/rc-form-dynamic-v1/example/rc-form-dynamic';
import { Row, Col, Icon, Input, Form, Button, Checkbox } from '~/rc-form-dynamic-v1/example/antd';
import styles from './search.module.less';

export default class Example extends React.Component {

    state = {
        expand: false,
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    handleReset = () => {
        this.formRef.form.resetFields();
    };

    handleSearch = e => {
        e.preventDefault();
        this.formRef.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
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
        const count = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const settings = {
            props: {
                layout: 'horizontal',
                className: styles["ant-advanced-search-form"]
            },
            fields: count.map((idx) => ({
                key: `field-${idx}`,
                component: [Input, {
                    placeholder: "placeholder"
                }],
                hidden: this.state.expand && idx > 5,
                props: {
                    label: `Field ${idx}`
                },
                decorator: {
                    rules: [{ required: true, message: 'Input something!' }],
                },
            }))
        };

        return (<>
            <DynamicForm
                wrappedComponentRef={this.saveFormRef}
                settings={settings}
                fields={fields}
                onSubmit={this.handleSearch}
                onValuesChange={this.onValuesChange}
                onFieldsChange={this.onFieldsChange}
                render={(keys, fields, _, fieldMap) => <Row gutter={24}>{
                    Object.keys(keys).map((name) => <Col span={8} key={name}>
                        <Form.Item {...fieldMap[name].props}>
                            {fields[name]}
                        </Form.Item>
                    </Col>)
                }</Row>}>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            Clear
                        </Button>
                        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                            Collapse <Icon type={this.state.expand ? 'down' : 'up'} />
                        </a>
                    </Col>
                </Row>
            </DynamicForm>
            <div className={styles['search-result-list']}>Search Result List</div>
        </>
        );
    }
}