import { selector } from 'recoil';
import { getComponentList } from '@/api/componentList';
import { IComponentData } from '@/types/componentData';
import { componentDataAtom, currentElementAtom } from '../atorms/global';

export const getAllComponentList = selector({
    key: 'getComponentList',
    get: async () => {
        return await getComponentList();
    },
});

export const getCurrentElement = selector<IComponentData>({
    key: 'getCurrentElement',
    get: ({ get }) => {
        const componentData = get(componentDataAtom);
        const currentElementId = get(currentElementAtom);
        return componentData.filter((item) => item.id === currentElementId)?.[0];
    },
});
