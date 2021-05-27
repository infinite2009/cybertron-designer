<template>
  <a-collapse :activeKey(v-model)="activeKey">
    <a-collapse-panel key="1" header="定位">
      <a-form :label-col="labelCol" :model="style" :wrapper-col="wrapperCol">
        <a-form-item label="定位">
          <div class="flex flex-shrink-0">
            <a-select v-model:value="style.position.value">
              <a-select-option value="static">默认</a-select-option>
              <a-select-option value="relative">相对定位</a-select-option>
              <a-select-option value="absolute">绝对定位</a-select-option>
              <a-select-option value="fixed">固定定位</a-select-option>
              <a-select-option value="sticky">粘性（吸顶）定位</a-select-option>
            </a-select>
          </div>
        </a-form-item>
      </a-form>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import StyleValueUnit from '@/enum/style-value-unit';
import Positioning from '@/enum/schema/positioning.enum';

export default {
  name: 'position-setting',
  props: {
    style: {
      type: Object,
      required: true,
      default: () => ({
        position: {
          type: Positioning,
          value: Positioning.static,
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
