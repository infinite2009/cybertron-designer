/*
 * @file 描述容器需要的表单属性
 */

import baseFormConfig from '@/config/forms/base';
import FormConfig from '@/interface/front-end/form-config';

const containerFormConfig: FormConfig[]  = [
  baseFormConfig['layout-setting'],
  baseFormConfig['box-model-setting'],
  baseFormConfig['border-setting'],
  baseFormConfig['position-setting'],
  baseFormConfig['visual-effect-setting'],
];

export default containerFormConfig;
