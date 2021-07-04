import { atom } from 'recoil';
import { IComponentData } from '@/types/componentData';
import componentDatas from '@/mock/componentDatas';

/** 当前选中的元素 */
export const currentElementAtom = atom({
    key: 'currentElement',
    default: null,
});

const defaultComponentData: IComponentData[] = componentDatas;
/** 画布上的数据、后序也可以移入到 selectors 去异步获取 */
export const componentDataAtom = atom({
    key: 'componentData',
    default: defaultComponentData,
});
