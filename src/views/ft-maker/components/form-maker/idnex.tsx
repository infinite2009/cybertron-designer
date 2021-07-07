import React from 'react';
import WidgetSchema from '@/interface/schema/widget/widget.schema';
import Button from 'antd/lib/button';

import style from './index.less';

export interface FormMakerModalProps {
  visible: boolean;
  schema: WidgetSchema;
}

export enum FieldType {
  string,
  number,

}

export interface FieldProps {
  label: string;
  componentType: string;
}

export interface FormMakerModalState {
  fields: any[];
}

export default class FormMakerModal extends React.Component<FormMakerModalProps, FormMakerModalState> {
  constructor(props: FormMakerModalProps) {
    super(props);
    this.state = {
      fields: []
    };
  }

  /*
   * 添加一个新的表单项
   */
  addField = () => {
    console.log('field added!');
  };

  deleteField = () => {

  };

  renderFieldsTpl() {
    return '';
  }

  render() {
    const { visible } = this.props;
    const fieldsTpl = this.renderFieldsTpl();
    return (
      <div>
        <div className={style.preview} >
          { fieldsTpl }
          <div className={style.buttonGroup}>
            <Button>取消</Button>
            <Button type="primary">确定</Button>
          </div>
          <Button type="primary" onClick={this.addField} className={style.addField}>+</Button>
        </div>
        <div className={style.setting}>

        </div>
      </div>
    );
  }
}
