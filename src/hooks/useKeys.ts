import hotkeys, { HotkeysEvent, KeyHandler } from 'hotkeys-js'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { componentDataAtom, currentElementAtom } from '@/store/atorms/global';
import { message } from 'antd';
import { IComponentData } from '@/types/componentData';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash-es'
const wrap = (callbcak: KeyHandler) => {
    const wrapperFn = (e: KeyboardEvent,event: HotkeysEvent) => {
        e.preventDefault()
        callbcak(e,event)
    }
    return wrapperFn
}

const useKeys = () => {
    const [componentData, setComponentData] = useRecoilState<IComponentData[]>(componentDataAtom)
    const currentElement = useRecoilValue(currentElementAtom)
    let copyComponents:IComponentData
    useEffect(()=> {
        hotkeys('ctrl+c, command+c', ()=> {
            if(!currentElement) {
                message.warning('请选择需要复制的图层！')
            } else {
                const currentComponents = componentData.filter(v=>v.id === currentElement)
                copyComponents = currentComponents[0]
                message.success('图层拷贝成功！')
            }
        })
        hotkeys('ctrl+v, command+v', ()=> {
            if(currentElement && copyComponents) {
                const {props, ...otherData} =  cloneDeep(copyComponents)
                const newData = [
                    ...componentData,
                    {
                        ...otherData,
                        layerName: `图层${componentData.length + 1}`,
                        id: uuidv4(),
                        props: {
                            ...props,
                            text: otherData.layerName + '副本',
                        }
                    }
                ]
                setComponentData(newData)
                message.success('图层粘贴成功！')
            } else {
                message.warning('请使用ctrl+c, command+c选择需要复制的图层！')
            }
        })

        return ()=>{ 
            hotkeys.unbind('ctrl+c, command+c')
            hotkeys.unbind('ctrl+v, command+v')
        }
    })
}

export default useKeys