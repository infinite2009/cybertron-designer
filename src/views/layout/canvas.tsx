import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IComponentData } from '@/types/componentData';
import { useRecoilValue, useRecoilState } from 'recoil';
import { componentDataAtom, pageBackgroundAtom,historyAtom } from '@/store/atorms/global';
import EditWrapper from '@/components/widgets/editWrapper';
import componentMap from '@/types/componentMap'
import styles from './index.less';
import { initUseKeys } from '@/plugins/useKeys';
// import useKeys from '@/hooks/useKeys'
import { getParentElement } from '@/util'
import { cloneDeep } from 'lodash-es'
type actionType = 'add' | 'remove' | 'cancel'

export interface ContextmenuList {
    name: string;
    type: actionType
}
// TODO
// 待实现外层 div 拖动、点击选中、右键操作、nodeType 为文本选中出现 tool-bar
const Index: React.FC = (props) => {

    initUseKeys()
    // console.log(process.env.DB_HOST)
    // const componentData:  = useRecoilValue(componentDataAtom);
    const [componentData, setComponentData] = useRecoilState<IComponentData[]>(componentDataAtom)
    const backgroundColor = useRecoilValue(pageBackgroundAtom)
    const [historyList, setHistory] = useRecoilState(historyAtom)
    const menuContainer = useRef(null)
    let [activeCurrentElement, setActiveCurrentElement] = useState(null)
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
                // alert(2)
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

    const handleContext = (e:MouseEvent) => {
        e.preventDefault()
        const result = getParentElement(e.target as HTMLElement, 'edit-wrapper-box')
        setActiveCurrentElement(result)
        if(result) {
            menuContainer.current.style.display = 'block'
            menuContainer.current.style.top = e.pageY + 'px'
            menuContainer.current.style.left = e.pageX + 'px'
        }
    }

    const bodyClick = (e: MouseEvent) => {
        setActiveCurrentElement(null)
    }
    useEffect(()=> {
        document.addEventListener('contextmenu', handleContext)
        
        document.addEventListener('click', bodyClick)

        return ()=> {
            document.removeEventListener('contextmenu', handleContext)
            document.removeEventListener('click', bodyClick)
        }
    })
    const list:ContextmenuList[] = [
        {
            name: '新增图层',
            type: 'add'
        },
        {
            name: '删除图层',
            type: 'remove',
        },
        {
            name: '取消选中',
            type: 'cancel'
        }
    ]
    const contextmenuList = () => {
        return <ul className={styles['menu-container']} ref={menuContainer} id="menuContainer">
            {
                list.map((item,index)=> {
                    return <li onClick={()=>handleContextAction(item.type)} key={index}>
                        {item.name}
                    </li>
                })
            }
        </ul>
        
    }
    const handleContextAction = (type: actionType) =>{
        setActiveCurrentElement(null)
        switch(type) {
            case 'add':
                break
            case 'remove':
                break
            case 'cancel':
                break
        }
    }

    return (
        <div className={styles.content}>
            { activeCurrentElement ? contextmenuList() : null }
            <div className={styles['canvas-area']} style={{background: backgroundColor}} id="canvas-area" >
            {componentData.map((item: IComponentData) => {
                const Component = componentMap[item.type].component as unknown as any
                return (
                    !item.isHidden ?
                    <EditWrapper key={item.id} id={item.id} width={item.props.width} height={item.props.height} updatePosition={updatePosition} >
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

