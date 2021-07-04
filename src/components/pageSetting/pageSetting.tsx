import React from 'react';
import ColorPicker from '../widgets/colorPicker';
import Uploader from '../widgets/uploader';
import { useRecoilState } from 'recoil';
import { pageBackgroundAtom } from '@/store/atorms/global';
import { SuccessProps } from '@/components/widgets/uploader';
import { message, Row } from 'antd';
import styles from '../edit/index.less';

// 主要用于实现页面背景色
const PageSetting: React.FC = (props) => {
  const [pageBackground, setPageBackground] =
    useRecoilState(pageBackgroundAtom);
  const onChange = (value: string) => {
    setPageBackground(value);
  };
  const beforeUpload = (e: File) => {
    return true;
  };
  const handleSuccess = (value: SuccessProps) => {
    message.success('上传成功！');
  };
  const handleError = (error: any) => {
    message.error('上传失败！');
  };
  return (
    <div>
      <Row className={styles['prop-item']}>
        <label className={styles.label}>背景色</label>
        <ColorPicker
          color={pageBackground}
          onChange={(value: string) => onChange(value)}
        />
      </Row>
      <Uploader
        action={'http://localhost:3001/upload'}
        beforeUpload={(e: File) => beforeUpload(e)}
        autoUpload={true}
        success={(value) => handleSuccess(value)}
        fail={(value: any) => {
          handleError(value);
        }}
      ></Uploader>
    </div>
  );
};
export default PageSetting;
