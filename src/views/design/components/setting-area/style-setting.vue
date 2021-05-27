<template>
  <template v-if="widgetType">
    <component :is="item.type" v-for="item in settingList" :key="item.id" :style="schema.props.style"></component>
  </template>
  <div v-else>请选择组件</div>
</template>

<script>
import { getFormConfig } from '@/util';
import LayoutSetting from '@/views/design/components/form-props/layout-setting.vue';
import PositionSetting from '@/views/design/components/form-props/position-setting.vue';
import BoxModelSetting from '@/views/design/components/form-props/box-model-setting.vue';
import FontSetting from '@/views/design/components/form-props/font-setting.vue';
import BorderSetting from '@/views/design/components/form-props/border-setting.vue';
import VisualEffectSetting from '@/views/design/components/form-props/visual-effect-setting.vue';
import PageStyleSetting from '@/views/design/components/form-props/page-style-setting.vue';

export default {
  name: 'style-setting',
  components: {
    LayoutSetting,
    BoxModelSetting,
    PositionSetting,
    FontSetting,
    BorderSetting,
    VisualEffectSetting,
    PageStyleSetting
  },
  props: {
    schema: {
      type: Object,
      required: true
    }
  },
  computed: {
    widgetType() {
      return this.schema.type;
    },
    settingList() {
      return getFormConfig(this.widgetType);
    }
  }
};
</script>

<style scoped></style>
