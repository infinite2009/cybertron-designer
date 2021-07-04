import React from 'react';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import SettingOutlined from '@ant-design/icons/lib/icons/SettingOutlined';

import style from './index.less';
import Checkbox from 'antd/lib/checkbox/Checkbox';

export interface FormOperationProps {
  onChange: (e) => void;
}

export interface FormOperationState {
  required: boolean;

  [key: string]: any;
}

export default class FormOperation extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      required: true
    };
  }

  toggleRequired = e => {
    console.log('required: ', e.target.checked);
    this.setState({
      required: e.target.checked
    });
  };

  deleteField = () => {
    // TODO 待实现
    console.log('delete works!');
  };

  handleSetting = () => {
    console.log('handle setting works');
  };

  render() {
    return (
      <div>
        <div className={style.operationButtons}>
          <SettingOutlined onClick={this.handleSetting}/>
          <DeleteOutlined onClick={this.deleteField}/>
        </div>
        <div>
          <Checkbox onChange={this.toggleRequired}>设为必填</Checkbox>
        </div>
      </div>
    );
  }
}