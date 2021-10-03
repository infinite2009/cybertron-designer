import React, { useReducer, ReactNode } from "react"
import { AppContext, IEditorProps } from './context'
import { getComponentData } from '@/util/store'
import { IComponentData } from "@/types/componentData"
import * as actionTypes from './contant'

const pageDefaultProps = { backgroundColor: '#ffffff', backgroundImage: '', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '560px' }

const initState: IEditorProps = {
    components: getComponentData(),
    currentElement: '',
    page: {
        props: pageDefaultProps,
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
        key: string,
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