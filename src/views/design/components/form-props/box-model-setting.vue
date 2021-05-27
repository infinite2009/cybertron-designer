<template>
  <a-collapse :activeKey(v-model)="activeKey">
    <a-collapse-panel key="1" header="盒模型">
      <a-form :label-col="labelCol" :model="style" :wrapper-col="wrapperCol">
        <a-form-item label="宽度">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.width.value"></a-input>
            <span class="mx-10"> {{ style.width.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="高度">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.height.value"></a-input>
            <span class="mx-10"> {{ style.height.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="上外边距">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.marginTop.value"></a-input>
            <span class="mx-10"> {{ style.marginTop.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="下外边距">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.marginBottom.value"></a-input>
            <span class="mx-10"> {{ style.marginBottom.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="左外边距">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.marginLeft.value"></a-input>
            <span class="mx-10"> {{ style.marginLeft.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="右外边距">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.marginRight.value"></a-input>
            <span class="mx-10"> {{ style.marginRight.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="上内边距">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.paddingTop.value"></a-input>
            <span class="mx-10"> {{ style.paddingTop.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="下内边距">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.paddingBottom.value"></a-input>
            <span class="mx-10"> {{ style.paddingBottom.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="左内边距">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.paddingLeft.value"></a-input>
            <span class="mx-10"> {{ style.paddingLeft.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="右内边距">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.paddingRight.value"></a-input>
            <span class="mx-10"> {{ style.paddingRight.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="最小高度">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.minWidth.value"></a-input>
            <span class="mx-10"> {{ style.minWidth.unit }}</span>
          </div>
        </a-form-item>
        <a-form-item label="最大高度">
          <div class="flex flex-shrink-0">
            <a-input v-model:value="style.minHeight.value"></a-input>
            <span class="mx-10"> {{ style.minHeight.unit }}</span>
          </div>
        </a-form-item>
      </a-form>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import StyleValueUnit from '@/enum/style-value-unit';

export default {
  name: 'box-model-setting',
  props: {
    style: {
      type: Object,
      default: () => ({
        marginTop: {
          type: Number,
          value: 0,
          unit: StyleValueUnit.px
        },
        marginRight: {
          type: Number,
          value: 0,
          unit: StyleValueUnit.px
        },
        marginBottom: {
          type: Number,
          value: 0,
          unit: StyleValueUnit.px
        },
        marginLeft: {
          type: Number,
          value: 0,
          unit: StyleValueUnit.px
        },
        paddingTop: {
          type: Number,
          value: 0,
          unit: StyleValueUnit.px
        },
        paddingRight: {
          type: Number,
          value: 0,
          unit: StyleValueUnit.px
        },
        paddingBottom: {
          type: Number,
          value: 0,
          unit: StyleValueUnit.px
        },
        paddingLeft: {
          type: Number,
          value: 0,
          unit: StyleValueUnit.px
        },
        width: {
          type: Number || String,
          value: 'auto',
          unit: StyleValueUnit.px
        },
        height: {
          type: Number || String,
          value: 'auto',
          unit: StyleValueUnit.px
        },
        minWidth: {
          type: Number || String,
          value: 'auto',
          unit: StyleValueUnit.px
        },
        minHeight: {
          type: Number || String,
          value: 'auto',
          unit: StyleValueUnit.px
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
