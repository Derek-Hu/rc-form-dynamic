import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import Overview, { Labels } from './antd/overview/index';
import styles from './style.module.less';

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
            <Layout className={styles.root}>
                <Header className={styles.header}>
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
                    <div className={styles.imgWpr}>
                        {component ? Object.keys(component).map(key => <div key={key} className={styles.imgEle}>
                            <span className={styles.title}>{Labels[key]}</span>
                            <img src={component[key]} title={Labels[key]} alt={Labels[key]} />
                        </div>) : null}
                    </div>
                </Header>
                <Layout >

                </Layout>
            </Layout>
        );
    }
}