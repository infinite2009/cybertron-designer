import React, { memo } from 'react'
import { Button } from "antd"
import { saveComponentData } from '@/util/store'

// TODO
// 保存、发布、前进、后退、真机预览、导出JSON、导出源代码、导出JSON 等
const Header: React.FC<{ components: any }> = (props) => {

    const saveStore = () => saveComponentData(props.components)

    return (
        <div>
            导航操作栏
            <Button type="primary" onClick={saveStore}>保存</Button>
        </div>
    )
}

export default memo(Header)