import { createContext, Context, } from 'react'
import { IComponentData } from "@/types/componentData"

export interface PageProps {
    backgroundColor: string;
    backgroundImage: string;
    backgroundRepeat: string;
    backgroundSize: string;
    height: string;
}
//   export type AllFormProps = PageProps & AllComponentProps
export interface PageData {
    id?: number;
    props?: PageProps;
    title?: string;
    desc?: string;
    coverImg?: string;
    uuid?: string;
    setting?: { [key: string]: any };
    isTemplate?: boolean;
    isHot?: boolean;
    isNew?: boolean;
    author?: string;
    copiedCount?: number;
    status?: number;
    user?: {
        gender: string;
        nickName: string;
        picture: string;
        userName: string;
    };
}

export interface IEditorProps {
    // 供中间编辑器渲染的数组
    components: IComponentData[];
    // 当前编辑的是哪个元素，uuid
    currentElement: string;
    // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
    page: PageData;
    // 当前被复制的组件
    copiedComponent?: IComponentData;
    // 当前操作的历史记录
    // histories: HistoryProps[];
    // 当前历史记录的操作位置
    historyIndex: number;
    // 开始更新时的缓存值
    cachedOldValues: any;
    // 保存最多历史条目记录数
    maxHistoryNumber: number;
    // 数据是否有修改
    isDirty: boolean;
    // 当前 work 的 channels
    // channels: ChannelProps[];
}

export interface IContextProps {
    state: IEditorProps;
    dispatch: Function
}

export const AppContext = createContext<IContextProps>(null)