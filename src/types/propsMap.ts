import { ReactNode } from 'react'
import { Input, InputNumber, Slider, Select, Radio } from "antd"
import { SketchPicker } from 'react-color'

import { TextComponentProps } from './defaultProps'
import fontFamilyOptions from '../components/widgets/fontFamilyOptions'

const TextArea = Input.TextArea
const Group = Radio.Group
const Option = Select.Option

// TODO
// SketchPicker 待二次封装、点击弹出来颜色选择器、不然太占位置
export interface PropToForm {
    component: any;
    subComponent?: any;
    value?: string;
    valueProp?: string;
    text?: string;
    extraProps?: { [key: string]: any };
    options?: { text: string | ReactNode; value: any }[];
    initalTransform?: (v: any) => any;
    afterTransform?: (v: any) => any;
    eventName?: string;
}

export interface FormProps {
    component: string;
    subComponent?: string;
    value: string;
    extraProps?: { [key: string]: any };
    text?: string;
    options?: { text: string | ReactNode; value: any }[];
    valueProp?: string;
    eventName?: string;
    events?: { [key: string]: (e: any) => void };
}

export type PropsToForms = {
    [P in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropsToForms = {
    text: {
        text: '文本',
        component: TextArea,
        value: "test",
        extraProps: { rows: 3 },
        afterTransform: (e: any) => e.target.value,
    },
    color: {
        component: SketchPicker,
        text: '字体颜色',
        valueProp: "color",
        afterTransform: (e: any) => e.hex

    },
    backgroundColor: {
        component: SketchPicker,
        text: '背景颜色',
        valueProp: "color",
        afterTransform: (e: any) => e.hex
    },
    fontSize: {
        text: '字号',
        component: InputNumber,
        initalTransform: (v: string) => parseInt(v),
        afterTransform: (e: number) => e ? `${e}px` : '',
    },
    height: {
        text: '高度',
        component: InputNumber,
        initalTransform: (v: string) => parseInt(v),
        afterTransform: (e: number) => e ? `${e}px` : '',
    },
    width: {
        text: '宽度',
        component: InputNumber,
        initalTransform: (v: string) => parseInt(v),
        afterTransform: (e: number) => e ? `${e}px` : '',
    },
    lineHeight: {
        text: '行高',
        component: Slider,
        extraProps: { min: 0, max: 30, step: 1 },
        initalTransform: (v: string) => parseInt(v),
        afterTransform: (e: number) => e ? `${e}px` : '',
    },
    opacity: {
        text: '透明度',
        component: Slider,
        extraProps: {
            disabled: true,
        },
        initalTransform: (v: string) => parseFloat(v) * 100,
        afterTransform: (v: string) => parseFloat((Number(v) / 100).toString()),
    },
    textAlign: {
        component: Group,
        subComponent: Radio,
        text: '对齐',
        options: [
            { value: 'left', text: '左' },
            { value: 'center', text: '中' },
            { value: 'right', text: '右' }
        ],
        afterTransform: (e: any) => e.target.value,
    },
    fontFamily: {
        component: Select,
        subComponent: Option,
        text: '字体',
        options: [
            { value: '', text: '无' },
            ...fontFamilyOptions
        ]
    }
}