import { atom } from 'recoil';
import { IComponentData } from '@/types/componentData';
import componentDatas from '@/mock/componentDatas';
const defaultComponentData: IComponentData[] = componentDatas;
/** 当前选中的元素 */
export const currentElementAtom = atom({
    key: 'currentElement',
    default: null,
});

export interface HistoryProps {
    id: string;
    componentId: string;
    type: 'add' | 'delete' | 'modify';
    data: any;
    index?: number;
}
/**历史操作记录索引 */
export const historyIndexAtom = atom({
    key: 'historyIndex',
    default: -1
})

/**历史操作记录 */
export const historyAtom = atom<HistoryProps[]>({
    key: 'history',
    default: []
})

/** 画布上的数据、后序也可以移入到 selectors 去异步获取 */
export const componentDataAtom = atom({
    key: 'componentData',
    default: defaultComponentData,
});

/** 画布背景色 */
export const pageBackgroundAtom = atom({
    key: 'pageBackground',
    default: '#ffffff'
})
