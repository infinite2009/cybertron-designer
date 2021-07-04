import React from 'react'
import { Layout } from 'antd';
import HeaderBase from './header'
import LeftTabs from './leftTabs'
import Main from './content'
import RightTabs from './rightTabs'

import './index.less'
const { Header, Content, Footer, Sider } = Layout;

const BaseLayout: React.FC = () => {
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <HeaderBase />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider theme="light" width={400}>
                        <LeftTabs />
                    </Sider>
                    <Content style={{ display: 'flex', justifyContent: 'center', minHeight: 280 }}>
                        <Main />
                    </Content>
                    <Sider theme="light" width={400}>
                        <RightTabs />
                    </Sider>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default BaseLayout