import React, { useCallback, useContext } from 'react'
import { Layout, Tabs, Empty } from 'antd';
import HeaderBase from './header'
import LeftTabs from './leftTabs'
// import Main from './canvas'
import EditGroup from './setting-area/edit'
import LayerList from './setting-area/layer'
import PageSetting from './setting-area/page-setting'
import { IComponentData } from '@/types/componentData';
import componentMap from '@/types/componentMap';
import EditWrapper from '@/components/editWrapper';

import { SETACTIVE, UPDATECOMPONENT } from '@/store/contant'
import { AppContext, IContextProps } from '@/store/context'
import styles from './index.less';

import './index.less'

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

const BaseLayout: React.FC = () => {
    const { state, dispatch } = useContext<IContextProps>(AppContext)

    const { currentElement, components, page } = state
    const currentComponentData: IComponentData = components.filter((data: IComponentData) => data.id === currentElement)[0]

    const isLocked = currentComponentData?.isLocked;
    const isHidden = currentComponentData?.isHidden;

    // 设置当前选中元素
    const setActive = useCallback((id: string) => {
        dispatch({
            type: SETACTIVE,
            data: {
                value: id
            }
        })
    }, [currentElement, components])

    // 修改统一操作
    const updateComponent = useCallback((key: string, value: any, isRoot = false) => {
        dispatch({
            type: UPDATECOMPONENT,
            data: {
                key,
                value,
                isRoot
            }
        })
    }, [currentComponentData, currentElement]);

    return (
        <Layout>
            <Header className={styles.header}>
                <div className="logo" />
                <HeaderBase components={components} />
            </Header>
            <Content style={{ padding: '0 50px', height: 'calc(100vh - 64px - 70px)' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0', height: '100%' }}>
                    <Sider theme="light" width={400}>
                        <LeftTabs />
                    </Sider>
                    <Content style={{ display: 'flex', justifyContent: 'center', minHeight: 280 }}>
                        <div className={styles.content}>
                            {/* {activeCurrentElement ? contextmenuList() : null} */}
                            <div
                                className={styles['canvas-area']}
                                style={{ ...page.props }}
                                id="canvas-area"
                            >
                                {components.map((item: IComponentData) => {
                                    const Component = componentMap[item.type].component as unknown as any;
                                    return !item.isHidden ? (
                                        <EditWrapper
                                            key={item.id}
                                            id={item.id}
                                            currentElement={currentElement}
                                            width={item.props.width || '100px'}
                                            height={item.props.height || '100px'}
                                            setActive={setActive}
                                        // updatePosition={updateComponent}
                                        >
                                            {<Component tag={item.tag} {...item.props} />}
                                        </EditWrapper>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </Content>
                    <Sider theme="light" width={400} style={{ overflow: 'auto' }}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="组件属性" key="formProps">
                                {!isLocked ? (<EditGroup currentElement={currentElement} updateComponent={updateComponent} props={currentComponentData?.props} />) : (
                                    <Empty description={isHidden ? '已隐藏，暂无法编辑' : '已锁定，暂无法编辑'} />
                                )}
                            </TabPane>
                            <TabPane tab="图层设置" key="layer">
                                <LayerList setActive={setActive}
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