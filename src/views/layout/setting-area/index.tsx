import React, { Fragment } from 'react'
import { Tabs, Empty } from 'antd';
import { useRecoilValue } from "recoil"
import EditGroup from "@/components/edit/editGroup"
import LayerList from '@/components/layer/layerList'
import PageSetting from '@/components/pageSetting/pageSetting'
import { IComponentData } from "@/types/componentData"
import { getCurrentElement, } from "@/store/selectors/componentsSelectors"
const TabPane = Tabs.TabPane

const Index: React.FC = () => {
    const currentElement = useRecoilValue<IComponentData>(getCurrentElement)
    const isLocked = currentElement?.isLocked
    const isHidden = currentElement?.isHidden
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="组件属性" key="formProps">
                {
                    !isLocked ?  <EditGroup props={currentElement?.props} /> : <Empty description={ isHidden ? "已隐藏，暂无法编辑":"已锁定，暂无法编辑"} />
                }
                
            </TabPane>
            <TabPane tab="图层设置" key="layer">
                <LayerList props={currentElement} />
            </TabPane>
            <TabPane tab="页面设置" key="pageSetting">
                <PageSetting />
            </TabPane>
            <TabPane tab="数据源" key="dataSource">
                Content of Tab Pane 2
                </TabPane>
        </Tabs>
    )
}
export default Index