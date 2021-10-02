import { selector } from 'recoil';
import { getComponentList } from '@/api/componentList';
import { IComponentData } from '@/types/componentData';
import { componentDataAtom, currentElementAtom, pageBackgroundAtom, historyAtom } from '../atorms/global';

export const getAllComponentList = selector({
    key: 'getComponentList',
    get: async () => {
        return await getComponentList();
    },
});

// export const getHistory = selector({
//     key: 'getHistory',
//     get: ({get}) => {
//         const historyValue =  get(historyAtom)
//         return {
//             historyIndex: historyValue.historyIndex,
//             histories: historyValue.histories
//         }
//     }
// })

export const getCurrentElement = selector<IComponentData>({
    key: 'getCurrentElement',
    get: ({ get }) => {
        const componentData = get(componentDataAtom);
        const currentElementId = get(currentElementAtom);
        return componentData.filter((item) => item.id === currentElementId)?.[0];
    },
});
