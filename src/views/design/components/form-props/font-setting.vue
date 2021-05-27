<template>
  <a-collapse :activeKey(v-model)="activeKey">
    <a-collapse-panel key="1" header="字体">
      <a-form :label-col="labelCol" :model="style" :wrapper-col="wrapperCol">
        <a-form-item label="颜色">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.color.value"></a-input>
            <span class="mx-10"> {{ style.color.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="字号">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.fontSize.value"></a-input>
            <span class="mx-10"> {{ style.fontSize.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="行高">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.lineHeight.value"></a-input>
            <span class="mx-10"> {{ style.lineHeight.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="加粗">
          <div class="flex flex-shrink-0">
            <a-switch v-model:value="style.fontWeight.value"></a-switch>
          </div>
        </a-form-item>
        <a-form-item label="字体">
          <a-select v-model:value="style.fontFamily.value">
            <a-select-option value="Microsoft YaHei">微软雅黑</a-select-option>
            <a-select-option value="PingFangSC-Regular">苹方-简 常规</a-select-option>
            <a-select-option value="Helvetica">Helvetica</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import StyleValueUnit from '@/enum/style-value-unit';

export default {
  name: 'font-setting',
  props: {
    style: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeKey: '1',
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 12
      }
    };
  }
};
</script>

<style scoped></style>
