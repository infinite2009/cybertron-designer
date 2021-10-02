import { TextComponentProps, ImageComponentProps } from './defaultProps';
export interface IComponentData {
    /** uuid v4 生成 */
    id: string;
    /** 和mock里面的类型对应 也就是 React.createElement<tag> */
    type: string;
    /** 组件名 */
    name: string;
    /** 标签名 可能一个组件有N种不同类型的组件 */
    tag?: string;
    /** 图层名称 */
    layerName?: string;
    /** 是否隐藏 */
    isHidden?: boolean;
    /** 是否锁定 */
    isLocked?: boolean;
    /** 组件属性 详情见 defaultProps */
    props: Partial<ImageComponentProps & TextComponentProps>
}
