import { IComponentData } from '@/types/componentData'
import { v4 as uuidv4 } from 'uuid'
const mockComponentData: Array<IComponentData> = [
    {
        id: uuidv4(),
        name: "容器组件",
        type: "container-widget",
        layerName: '图层1',
        props: {
            width: "100px",
            height: "100px",
            fontSize: "20px",
            opacity:0.5,
            text: "文本组件",
            textAlign:'center',
            lineHeight:"12px",
            fontFamily:"",
            textDecoration:"none",
            color: 'red',
            backgroundColor: "green",
            // position: 'absolute',
            left: '0px', 
            top: '-1.5px'
        }
    },
    // {
    //     id: uuidv4(),
    //     name: "文本组件",
    //     type: "text-widget",
    //     layerName: '图层2',
    //     props: {
    //         backgroundColor: 'red',
    //         text: "文本组件",
    //     }
    // },
    // {
    //     id: uuidv4(),
    //     name: "Button组件",
    //     layerName: '图层3',
    //     type: "image-widget",
    //     props: {
    //     }
    // }
]

export default mockComponentData