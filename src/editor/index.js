import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import Overview, { Labels } from './antd/overview/index';

const { Header } = Layout;

const MenuKeys = Object.keys(Overview);

export default class Main extends React.Component {

    state = {
        selectedKey: ''
    }
    onSelect = ({ key: selectedKey }) => {
        console.log('selectedKey', selectedKey);
        this.setState({
            selectedKey
        })
    }
    render() {
        const { component } = Overview[this.state.selectedKey] || {};
        return (
            <Layout style={{ minHeight: '100vh', background: '#fff' }}>
                <Header style={{ background: '#fff', padding: 0, height: 'auto' }}>
                    <Menu mode="horizontal" onSelect={this.onSelect}>
                        <Menu.Item key="github">
                            <Icon type="menu" /><span>文件</span>
                        </Menu.Item>
                        {
                            MenuKeys.map(key => <Menu.Item key={key}>
                                <span>{Overview[key].label}</span>
                            </Menu.Item>)
                        }
                    </Menu>
                    <div style={{ height: '100px', width: '100%' }}>
                        {component ? Object.keys(component).map(key => <img src={component[key]} alt={Labels[key]} />) : null}
                    </div>
                </Header>
                <Layout >

                </Layout>
            </Layout>
        );
    }
}