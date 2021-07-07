import React from 'react';
import WidgetSchema from '@/interface/schema/widget/widget.schema';

import style from './index.less';
import FormMaker from '@/views/ft-maker/components/form-maker/idnex';
import TableMaker from '@/views/ft-maker/components/table-maker/idnex';
import Button from 'antd/lib/button';

export interface FtMakerProps {
  schema: WidgetSchema;
}

export interface FtMakerState {
  visible: boolean;
  [key: string]: any;
}

export default class FtMaker extends React.Component<FtMakerProps, FtMakerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {
    const { visible } = this.state;
    const { schema } = this.props;
    return <div>

      <FormMaker schema={schema} visible={visible}/>
    </div>;
  }
}
