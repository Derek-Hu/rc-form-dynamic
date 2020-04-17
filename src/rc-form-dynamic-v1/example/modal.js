import React from '~/rc-form-dynamic-v1/example/react';
import DynamicForm from '~/rc-form-dynamic-v1/example/rc-form-dynamic';
import { Input, Radio, Button, Modal } from '~/rc-form-dynamic-v1/example/antd';

class CollectionCreateForm extends React.Component {

    render() {
        const { visible, onCancel, onCreate, wrappedComponentRef } = this.props;
        const settings = {
            props: {
                layout: "vertical",
            },
            fields: [{
                key: 'title',
                component: Input,
                props: {
                    label: `Title`
                },
                decorator: {
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                },
            }, {
                key: 'description',
                component: [Input, {
                    type: "textarea"
                }],
                props: {
                    label: `Description`
                },
            }, {
                key: 'modifier',
                component: [Radio.Group, {
                    type: "textarea",
                    children: [<Radio key={'public'} value="public">Public</Radio>,
                    <Radio key={'private'} value="private">Private</Radio>]
                }],
            }]
        };

        return (
            <Modal
                visible={visible}
                title="Create a new collection"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <DynamicForm
                    wrappedComponentRef={wrappedComponentRef}
                    settings={settings} />
            </Modal>
        );
    }
}

export default class Example extends React.Component {

    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return <div>
            <Button type="primary" onClick={this.showModal}>
                New Collection
            </Button>
            <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
            />
        </div>
    }
}