import React,{FC} from 'react'
import {TextComponentProps} from "@/types/defaultProps"

// props 有的属性需要剔除、待整理
const ContainerWidget:FC<TextComponentProps>= (props) => {
    const { text, ...restProps } = props
    return (
        <div style={{...restProps} as any}>
            {text}
        </div>
    )
}
export default ContainerWidget
