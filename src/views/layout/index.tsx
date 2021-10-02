import React, { useCallback } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { Layout, Tabs, Empty } from 'antd';
import HeaderBase from './header'
import LeftTabs from './leftTabs'
import Main from './canvas'

import { getCurrentElement } from '@/store/selectors/componentsSelectors';
import { currentElementAtom, componentDataAtom } from "@/store/atorms/global"
import EditGroup from './setting-area/edit'
import LayerList from './setting-area/layer'
import PageSetting from './setting-area/page-setting'
import { IComponentData } from '@/types/componentData';

import './index.less'

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

const BaseLayout: React.FC = () => {
    const currentElement = useRecoilValue<IComponentData>(getCurrentElement);
    const [currentElementId, setCurrentElementId] = useRecoilState(currentElementAtom);

    const [componentData, setComponentData] = useRecoilState<IComponentData[]>(componentDataAtom);

    const isLocked = currentElement?.isLocked;
    const isHidden = currentElement?.isHidden;

    // 设置当前选中元素
    const setCurrentElement = useCallback((id: string) => {
        setCurrentElementId(id)
    }, [])

    const updateComponent = useCallback((key: string, value: any, isRoot = false) => {
        let newData = [...componentData];
        newData = newData.map((data: IComponentData) => {
            if (currentElementId === data.id) {
                if (isRoot) {
                    return {
                        ...data,
                        [key]: value
                    }
                } else {
                    return {
                        ...data,
                        props: {
                            ...data.props,
                            [key]: value
                        }
                    }
                }
            }
            return data
        })
        setComponentData(newData)
    }, [currentElementId, componentData]);

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <HeaderBase />
            </Header>
            <Content style={{ padding: '0 50px', height: 'calc(100vh - 64px - 70px)' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0', height: '100%' }}>
                    <Sider theme="light" width={400}>
                        <LeftTabs />
                    </Sider>
                    <Content style={{ display: 'flex', justifyContent: 'center', minHeight: 280 }}>
                        <Main />
                    </Content>
                    <Sider theme="light" width={400} style={{ overflow: 'auto' }}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="组件属性" key="formProps">
                                {!isLocked ? (<EditGroup props={currentElement?.props} />) : (
                                    <Empty description={isHidden ? '已隐藏，暂无法编辑' : '已锁定，暂无法编辑'} />
                                )}
                            </TabPane>
                            <TabPane tab="图层设置" key="layer">
                                <LayerList props={currentElement} currentElementId={currentElementId} setCurrentElementId={setCurrentElement}
                                    updateComponent={updateComponent} />
                            </TabPane>
                            <TabPane tab="页面设置" key="pageSetting">
                                <PageSetting />
                            </TabPane>
                            <TabPane tab="数据源" key="dataSource">
                                Content of Tab Pane 2
                            </TabPane>
                        </Tabs>
                    </Sider>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default BaseLayout