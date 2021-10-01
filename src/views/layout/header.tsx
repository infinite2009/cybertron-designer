import React from 'react'
import { useRecoilState } from 'recoil'
import { componentDataAtom } from "@/store/atorms/global"
import { Button } from "antd"
import { saveComponentData } from '@/util/store'
// TODO
// 保存、发布、前进、后退、真机预览、导出JSON、导出源代码、导出JSON 等
const Header: React.FC = () => {
    const [componentData] = useRecoilState(componentDataAtom);
    const saveStore = () => {
        saveComponentData(componentData)
    }

    return (
        <div>
            导航操作栏
            <Button type="text" onClick={saveStore}>保存</Button>
        </div>
    )
}

export default Header