import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/app/app';
import 'antd/dist/antd.css';
import '@/styles/styles.less';
import 'cropperjs/dist/cropper.css'
// 支持 hmr
if (module.hot) {
  module.hot.accept();
  module.hot.addStatusHandler((status: string) => {
      if (status === 'prepare') console.clear();
  });
}

ReactDOM.render(<App></App>, document.getElementById('root'));
