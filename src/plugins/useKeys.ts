import { v4 as uuidv4 } from 'uuid';
import { IComponentData } from '@/types/componentData';
import { useRecoilValue, useRecoilState } from 'recoil';
import { componentDataAtom,historyAtom, historyIndexAtom, currentElementAtom, HistoryProps } from '@/store/atorms/global';
import { useHotkeys } from 'react-hotkeys-hook'
import { message } from 'antd';
import { cloneDeep } from 'lodash-es'
import { insertAt } from '@/util'
export const initUseKeys = () => {
    let copyComponents:IComponentData
    const [componentData, setComponentData] = useRecoilState<IComponentData[]>(componentDataAtom)
    const [historyList, setHistory] = useRecoilState(historyAtom)
    const currentElement = useRecoilValue(currentElementAtom)
    let [historyIndex, setHistoryIndex] = useRecoilState<number>(historyIndexAtom)
    // 粘贴图层
    useHotkeys('ctrl+c, command+c', ()=> {
        if(!currentElement) {
            message.warning('请选择需要复制的图层！')
        } else {
            const currentComponents = componentData.filter(v=>v.id === currentElement)
            copyComponents = currentComponents[0]
            message.success('图层拷贝成功！')
        }
    }, {}, [currentElement, componentData])
    // 复制图层
    useHotkeys('ctrl+v, command+v', ()=> {
        if(currentElement && copyComponents) {
            const {props, ...otherData} =  cloneDeep(copyComponents)
            // 新增的组件
            const insetComponent = {
                ...otherData,
                    layerName: `图层${componentData.length + 1}`,
                    id: uuidv4(),
                    props: {
                        ...props,
                        text: otherData.layerName + '副本',
                    }
            }
            const newData = [
                ...componentData,
                insetComponent
            ]
            setComponentData(newData)
            message.success('图层粘贴成功！')
            // 粘贴图层后添加
            const newHistoryList:HistoryProps[] = [
                ...historyList,
                {
                    id: uuidv4(),
                    componentId: insetComponent.id,
                    type: 'add',
                    data: cloneDeep(insetComponent),
                }
            ]
            setHistory(newHistoryList)
        } else {
            message.warning('请使用ctrl+c, command+c选择需要复制的图层！')
        }
    }, {}, [currentElement, componentData])
    // 删除图层
    useHotkeys('ctrl+backspace, command+backspace', ()=> {
        if(currentElement) {
            const index = componentData.findIndex(v=>v.id === currentElement)
            const newData = [...componentData]
            const [deleteComponet]= newData.splice(index, 1)
            setComponentData(newData)  
            const newHistoryList:HistoryProps[] = [
                ...historyList,
                {
                    id: uuidv4(),
                    componentId: deleteComponet.id,
                    type: 'delete',
                    data: cloneDeep(deleteComponet),
                    index
                }
            ]
            setHistory(newHistoryList)
            message.success('图层删除成功！')
        }else {
            message.warning('请选择删除图层！')
        }

    },{
        filterPreventDefault: true
    }, [currentElement, componentData])
    // 撤销图层 
    useHotkeys('ctrl+z, command+z',  (event: KeyboardEvent)=> {
        event.preventDefault()
        if(!historyList.length) return
        if(historyIndex===-1) {
            historyIndex = historyList.length - 1
            setHistoryIndex(historyIndex)
        } else {
            setHistoryIndex(historyIndex--)
        }
        if(historyIndex < 0) return
        const history = historyList[historyIndex] as HistoryProps
        // console.log(historyList)
        let newData:IComponentData[] = []
        switch(history.type) {
            case 'add':
                newData = componentData.filter(componet=>componet.id !== history.componentId)
                setComponentData(newData)
                break
            case 'delete':
                newData = insertAt(componentData, history.index as number, history.data)
                setComponentData(newData)
                break
            case 'modify':
                const { componentId, data  } = history
                newData = [...componentData]
                let resultData = newData.map(component=> {
                    if(component.id===componentId) {
                        const dom = document.getElementById(`wrapper${componentId}`)
                        dom.style.width = data.oldValue.props.width
                        dom.style.height = data.oldValue.props.height
                        dom.style.left = data.oldValue.props.left 
                        dom.style.top = data.oldValue.props.top 
                        return data.oldValue
                    }
                return component
                })
                setComponentData(resultData)
                break
        }
    },{
        filterPreventDefault: true
    }, [historyList, historyIndex])
}