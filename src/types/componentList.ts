import {ImageComponentProps, TextComponentProps, ButtonComponentProps} from '@/types/defaultProps';


/** 具体每个组件的信息 */
export interface ITemplateProps {
  id: string;
  name: string;
  type: string;
  icon?: string;
  // 图层名称
  layerName?: string;
  // 图层是否隐藏
  isHidden?: boolean;
  // 是否可以进行编辑
  isLocked?: boolean;
  props: Partial<TextComponentProps & ImageComponentProps & ButtonComponentProps>;
  /** 后续把全部属性接入、每个组件有那些属性一一映射 **/
}

/** 左边的组件 */
export interface IComponentList {
  type: number;
  typeName: string;
  list: ITemplateProps[];
}
