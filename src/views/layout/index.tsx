import React from 'react'
import { Layout } from 'antd';
import HeaderBase from './header'
import LeftTabs from './leftTabs'
import Main from './canvas'
import RightTabs from './setting-area'

import './index.less'
const { Header, Content, Footer, Sider } = Layout;

const BaseLayout: React.FC = () => {
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <HeaderBase />
            </Header>
            <Content style={{ padding: '0 50px',height: 'calc(100vh - 64px - 70px)' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0', height: '100%' }}>
                    <Sider theme="light" width={400}>
                        <LeftTabs />
                    </Sider>
                    <Content style={{ display: 'flex', justifyContent: 'center', minHeight: 280 }}>
                        <Main />
                    </Content>
                    <Sider theme="light" width={400} style={{ overflow: 'auto' }}>
                        <RightTabs />
                    </Sider>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default BaseLayout