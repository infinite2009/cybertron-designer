import React, { createElement, Fragment, ReactDOM, ReactElement } from 'react';
import { IComponentData } from '@/types/componentData';
import { useRecoilValue } from 'recoil';
import { componentDataAtom } from '@/store/atorms/global';
import EditWrapper from '@/components/widgets/editWrapper';
import componentMap from '@/types/componentMap'
import styles from './index.less';

// TODO
// 待实现外层 div 拖动、点击选中、右键操作、nodeType 为文本选中出现 tool-bar
const Index: React.FC = () => {
    const componentData: IComponentData[] = useRecoilValue(componentDataAtom);
    return (
        <div className={styles.content}>
            {componentData.map((item: IComponentData) => {
                const Component = componentMap[item.type].component as React.FC
                return (
                    <EditWrapper key={item.id} id={item.id}>
                        {/* 到时候需要根据数据循环递归去遍历 */}
                        {/* {createElement(
                                item.type,
                                {
                                    style: { ...item.props },
                                },
                                item.name,
                            )} */}
                        <Component {...item.props} />
                    </EditWrapper>
                )
            })}
        </div>
    );
};

export default Index;
