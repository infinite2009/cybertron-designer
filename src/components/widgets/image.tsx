import React from 'react'

// props 属性待整合、待更细致化的拆分
const ImageWidget = (props) => {
    const { text, ...restProps } = props
    return (
        <img {...restProps} />
    )
}
export default ImageWidget