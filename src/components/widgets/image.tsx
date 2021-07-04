import React from 'react'

// props 属性待整合、待更细致化的拆分
const ImageWidget = (props) => {
    const { text, ...restProps } = props
    return (
        <img {...restProps} style={{ width: 100, height: 100 }} />
    )
}
export default ImageWidget