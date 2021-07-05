import React from 'react';
import Modal from 'antd/es/modal/Modal';
import WidgetSchema from '@/interface/schema/widget/widget.schema';
import Button from 'antd/lib/button';

export interface FormMakerModalProps {
  visible: boolean;
  schema: WidgetSchema;
  onClose: () => void;
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

  doOk = () => {
    const { onClose } = this.props;
    onClose();
  };

  /*
   * 添加一个新的表单项
   */
  addField = () => {
    console.log('field added!');
  };

  deleteField = () => {

  };

  render() {
    const { visible } = this.props;
    return (
      <Modal visible={visible} title='表格设置' onOk={this.doOk}>
        <Button type="primary" onClick={this.addField}>+</Button>
      </Modal>
    );
  }
}
