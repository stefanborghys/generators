import React from 'react';
import './App.css';
import IdentificationNumberOverview from "./components/identificationNumber/identificationNumberOverview";
import LanguageSelector from "./components/language/languageSelector";
import {Button, Layout, Menu} from 'antd';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faGripLinesVertical, faKey} from '@fortawesome/free-solid-svg-icons';
import 'antd/dist/antd.css';
import {withTranslation} from "react-i18next";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sideMenuCollapsed: false
        };
        this.toggleSideMenu = this.toggleSideMenu.bind(this);

    }

    toggleSideMenu() {
        this.setState({
            sideMenuCollapsed: !this.state.sideMenuCollapsed,
        });
    }

    render() {
        const t = this.props.t;
        return (<Layout>
            <Layout.Sider trigger={null} collapsible collapsed={this.state.sideMenuCollapsed} collapsedWidth={0}>
                <div className="logo">Test</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<FontAwesomeIcon icon={faKey}/>}>
                        {t('identification-number.name')}
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout className="site-layout">
                <Layout.Header className="site-layout-background" style={{padding: 0}}>
                    {this.state.sideMenuCollapsed ? <Button type="text" size='small' onClick={this.toggleSideMenu}
                                                            icon={<FontAwesomeIcon icon={faGripLinesVertical}/>}/> :
                        <Button type="text" size='small' onClick={this.toggleSideMenu}
                                icon={<FontAwesomeIcon icon={faBars}/>}/>}
                    <LanguageSelector/>
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

export default withTranslation()(App);
