<template>
  <a-collapse :activeKey(v-model)="activeKey">
    <a-collapse-panel key="1" header="视觉效果">
      <a-form :label-col="labelCol" :model="style" :wrapper-col="wrapperCol">
        <a-form-item label="背景">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.background.value"></a-input>
          </div>
        </a-form-item>
        <a-form-item label="阴影">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.boxShadow.value"></a-input>
          </div>
        </a-form-item>
        <a-form-item label="过渡">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.transition.value"></a-input>
          </div>
        </a-form-item>
        <a-form-item label="动画">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.animation.value"></a-input>
          </div>
        </a-form-item>
      </a-form>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import StyleValueUnit from '@/enum/style-value-unit';

export default {
  name: 'visual-effect-setting',
  props: {
    style: {
      type: Object,
      required: true,
      default: () => ({
        boxShadow: {
          type: String,
          value: '',
          unit: StyleValueUnit.none
        },
        transition: {
          type: String,
          value: '',
          unit: StyleValueUnit.none
        },
        animation: {
          type: String,
          value: '',
          unit: StyleValueUnit.none
        }
      })
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
