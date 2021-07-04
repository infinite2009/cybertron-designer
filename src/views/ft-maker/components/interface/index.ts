export enum FieldType {
  input,
  text,
  number,
  select,
  check,
  switch,
  datePicker,
}

export interface FormSchema {
  fields: {
    key: string;
    label: string;
    type: FieldType;
    defaultValue: string | number;
    required: boolean;
    errorTips: string;
    tips: string;
    // TODO 这里还没有完全想清楚
    toggleVisible: Function;
    dataSource: any;
    validator: Function;
    // TODO 副作用
    onChange: Function;
  }[];
  onSubmt: Function;
  onCancel: Function;
}