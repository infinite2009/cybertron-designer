
import { IComponentData } from "@/types/componentData"
export const prefix = "coderX"

export function saveComponentData(componentData: IComponentData[]) {
    window.localStorage.setItem(`${prefix}-componentData`, JSON.stringify(componentData))
}

export function getComponentData(): IComponentData[] {
    const data = window.localStorage.getItem(`${prefix}-componentData`);
    const componentData: IComponentData[] = JSON.parse(data) || []
    return componentData;
}