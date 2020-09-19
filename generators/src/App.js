import React from 'react';
import './App.css';
import IdentificationNumberOverview from "./components/identificationNumber/identificationNumberOverview";
import {Button, Layout, Menu} from 'antd';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faGripLinesVertical, faKey} from '@fortawesome/free-solid-svg-icons';
import 'antd/dist/antd.css';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            sideMenuCollapsed: false
        };
    }

    toggleSideMenu = () => {
        this.setState({
            sideMenuCollapsed: !this.state.sideMenuCollapsed,
        });
    };

    render() {
        return (<Layout>
            <Layout.Sider trigger={null} collapsible collapsed={this.state.sideMenuCollapsed} collapsedWidth={0}>
                <div className="logo">Test</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<FontAwesomeIcon icon={faKey}/>}> Identification Number</Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout className="site-layout">
                <Layout.Header className="site-layout-background" style={{padding: 0}}>
                    {this.state.sideMenuCollapsed ? <Button type="text" size='small' onClick={this.toggleSideMenu}
                                                            icon={<FontAwesomeIcon icon={faGripLinesVertical}/>}/> :
                        <Button type="text" size='small' onClick={this.toggleSideMenu}
                                icon={<FontAwesomeIcon icon={faBars}/>}/>}
                </Layout.Header>
                <Layout.Content className="site-layout-background"
                                style={{
                                    margin: '24px 16px',
                                    padding: 24,
                                    minHeight: 700,
                                }}>
                    <IdentificationNumberOverview/>
                </Layout.Content>
            </Layout>
        </Layout>);
    }
}

export default App;
