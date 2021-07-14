import React from 'react'

// props 属性待整合
const TextWidget = (props) => {
    const { text, ...restProps } = props
    return (
        <p>
            {text}
        </p>
    )
}
export default TextWidget