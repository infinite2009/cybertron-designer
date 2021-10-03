import React, { useReducer, ReactNode } from "react"
import { AppContext, IEditorProps } from './context'
import { getComponentState } from '@/util/store'
import { IComponentData } from "./context"
import * as actionTypes from './contant'

const pageDefaultProps = { backgroundColor: 'red', backgroundImage: '', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '560px' }

const cacheData: IEditorProps = getComponentState()

const initState: IEditorProps = {
    components: cacheData.components || [],
    currentElement: '',
    page: {
        props: cacheData.page?.props || pageDefaultProps,
        title: 'test title'
    },
    historyIndex: -1,
    cachedOldValues: null,
    maxHistoryNumber: 5,
    isDirty: false
}

export type ActionType = {
    type: string;
    data: {
        key?: string,
        value: any,
        isRoot?: boolean
    }
}

const reducer = (state: IEditorProps, action: ActionType) => {
    const { key, value, isRoot } = action.data
    console.log("key", key, "value", value);

    switch (action.type) {
        case actionTypes.SETACTIVE:
            return {
                ...state,
                currentElement: value
            }
        case actionTypes.ADDCOMPONENT:
            let components = [...state.components];
            (value as IComponentData).layerName = `图层${state.components.length + 1}`
            components = components.concat(value)
            return {
                ...state,
                components
            }
        case actionTypes.UPDATEPAGE:
            return {
                ...state,
                page: {
                    ...state.page,
                    props: {
                        ...state.page.props,
                        [key]: value
                    }
                }
            }
        case actionTypes.UPDATECOMPONENT:
            let newData = [...state.components];
            newData = newData.map((data: IComponentData) => {
                if (state.currentElement === data.id) {
                    if (isRoot) {
                        return {
                            ...data,
                            [key]: value
                        }
                    } else {
                        return {
                            ...data,
                            props: {
                                ...data.props,
                                [key]: value
                            }
                        }
                    }
                }
                return data
            })
            return {
                ...state,
                components: newData
            }
        default:
            return state;
    }
}

export default (props: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initState)
    return (
        <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>
    )
}