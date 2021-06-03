import React, { createElement, Fragment } from 'react';
import { IComponentData } from '@/types/componentData';
import { useRecoilValue } from 'recoil';
import { getComponentData } from '@/store/atorms/global';
import EditWrapper from '@/components/widgets/editWrapper';
import TextWidget from "@/components/widgets/text"
import ContainerWidget from '@/components/widgets/container'
import styles from './index.less';
// TODO
// 待实现外层 div 拖动、点击选中、右键操作、nodeType 为文本选中出现 tool-bar
const Index: React.FC = () => {
    const componentData: IComponentData[] = useRecoilValue(getComponentData);
    return (
        <div className={styles.content}>
            {componentData.map((item: IComponentData) => {
                const Component = item.type
                console.log(Component);
                return (
                    <EditWrapper key={item.id} id={item.id}>
                        <div>
                            {/* <Component  /> */}
                            {/* 到时候需要根据数据循环递归去遍历 */}
                            {createElement(
                                item.type,
                                {
                                    style: { ...item.props },
                                },
                                item.name,
                            )}
                        </div>
                    </EditWrapper>
                )
            })}
        </div>
    );
};

export default Index;
