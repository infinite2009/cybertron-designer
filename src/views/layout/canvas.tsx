import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IComponentData } from '@/types/componentData';
import { useRecoilValue, useRecoilState } from 'recoil';
import { componentDataAtom, pageBackgroundAtom,historyAtom } from '@/store/atorms/global';
import EditWrapper from '@/components/widgets/editWrapper';
import componentMap from '@/types/componentMap'
import styles from './index.less';
import { initUseKeys } from '@/plugins/useKeys';
// import useKeys from '@/hooks/useKeys'
import { cloneDeep } from 'lodash-es'
// TODO
// 待实现外层 div 拖动、点击选中、右键操作、nodeType 为文本选中出现 tool-bar
const Index: React.FC = () => {
    initUseKeys()
    // const componentData:  = useRecoilValue(componentDataAtom);
    const [componentData, setComponentData] = useRecoilState<IComponentData[]>(componentDataAtom)
    const backgroundColor = useRecoilValue(pageBackgroundAtom)
    const [historyList, setHistory] = useRecoilState(historyAtom)
    const updatePosition = (data:any)=> {
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
                setHistory([...historyList, {
                    type: 'modify',
                    id: uuidv4(),
                    componentId: componet.id,
                    data: {
                        oldValue: cloneDeep(componet)
                    }
                }])
                return newComponet
            }
            return componet
        })
        setComponentData(newData)

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

