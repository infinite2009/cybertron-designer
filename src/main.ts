import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import router from '@/router';
import App from './App.vue';

import 'ant-design-vue/dist/antd.css';
import './style/index.less';

createApp(App).use(router).use(Antd).mount('#app');
