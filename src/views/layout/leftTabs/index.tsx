import React from 'react';
import { Tabs } from 'antd';
import { IComponentList } from '@/types/componentList';
import ComponentList from './componentList';
import mockComponentList from "@/mock/component-list"
const TabPane = Tabs.TabPane;

const Index: React.FC = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="组件" key="components">
        <Tabs tabPosition="left">
          {mockComponentList.map((item: IComponentList) => {
            return (
              <TabPane tab={item.typeName} key={item.type}>
                <ComponentList list={item.list} />
              </TabPane>
            );
          })}
        </Tabs>
      </TabPane>
    </Tabs>
  );
};
Index.defaultProps = {
  DuLangPageId: 113,
};
export default Index;
