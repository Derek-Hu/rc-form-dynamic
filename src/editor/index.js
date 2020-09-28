import React from 'react';
import { Menu, Icon, Layout } from 'antd';

const { Header, Content, Sider } = Layout;

const MenuCategory = {
    common: '通用',
    layout: '布局',
    nav: '导航',
    dataInput: '数据录入',
    dataDisplay: '数据展示',
    feedback: '反馈',
    other: '其他'
}
const MenuKeys = Object.keys(MenuCategory);

export default class Main extends React.Component {

    state = {
        selectedKey: '内联登录栏'
    }
    onSelect = (selectedKey) => {
        this.setState({
            selectedKey
        })
    }
    render() {

        return (
            <Layout style={{ minHeight: '100vh', background: '#fff' }}>
                <Header style={{ background: '#fff', padding: 0, height: 'auto' }}>
                    <Menu mode="horizontal">
                        <Menu.Item key="github">
                            <Icon type="menu" /><span>文件</span>
                        </Menu.Item>
                        {
                            MenuKeys.map(key => <Menu.Item key={key}>
                                <span>{MenuCategory[key]}</span>
                            </Menu.Item>)
                        }
                    </Menu>
                    <div style={{ height: '100px', width: '100%' }}>

                    </div>
                </Header>
                <Layout >

                </Layout>
            </Layout>
        );
    }
}