import React from 'react'

// props 属性待整合
const TextWidget = (props) => {
    const { text, ...restProps } = props
    return (
        <p style={{...restProps}}>
            {text}
        </p>
    )
}
export default TextWidget