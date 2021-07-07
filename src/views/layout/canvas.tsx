import React, { createElement, Fragment, ReactDOM, ReactElement } from 'react';
import { IComponentData } from '@/types/componentData';
import { useRecoilValue, useRecoilState } from 'recoil';
import { componentDataAtom, pageBackgroundAtom } from '@/store/atorms/global';
import EditWrapper from '@/components/widgets/editWrapper';
import componentMap from '@/types/componentMap'
import styles from './index.less';

// TODO
// 待实现外层 div 拖动、点击选中、右键操作、nodeType 为文本选中出现 tool-bar
const Index: React.FC = () => {
    const componentData: IComponentData[] = useRecoilValue(componentDataAtom);
    const [getComponentData, setComponentData] = useRecoilState(componentDataAtom)
    const backgroundColor = useRecoilValue(pageBackgroundAtom)
    const updatePosition = (data:any)=> {
        // console.log(data)
        const { id, width, height, left, top } = data
        let newData = [...componentData]
        newData = newData.map(componet=> {
            if(componet.id === id) {
                const newComponet = {
                    ...componet,
                    props: {
                        ...componet.props,
                        width: width + 'px',
                        height: height + 'px',
                        left: left + 'px',
                        top: top + 'px'
                    }
                }
                return newComponet
            }
            return componet
        })
        setComponentData(newData)
        // console.log(newData)


    }
    return (
        <div className={styles.content}>
            <div className={styles['canvas-area']} style={{background: backgroundColor}} id="canvas-area" >
            {componentData.map((item: IComponentData) => {
                const Component = componentMap[item.type].component as unknown as any
                return (
                    !item.isHidden ?
                    <EditWrapper key={item.id} id={item.id} updatePosition={updatePosition} >
                        {/* 到时候需要根据数据循环递归去遍历 */}
                        {/* {createElement(
                                item.type,
                                {
                                    style: { ...item.props },
                                },
                                item.name,
                            )} */}
                         {  <Component {...item.props} />  }
                    </EditWrapper> : null
                )
            })}
            </div>
        </div>
    );
};

export default Index;
