<template>
  <a-collapse :activeKey(v-model)="activeKey">
    <a-collapse-panel key="1" header="页面样式">
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
      </a-form>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
export default {
  name: 'page-style-setting',
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
