<template>
  <a-tabs type="card" :active-key(v-model)="activeKey">
    <a-tab-pane key="1" tab="样式">
      <style-setting :schema="schema"></style-setting>
    </a-tab-pane>
    <a-tab-pane key="2" tab="属性">
      <props-setting></props-setting>
    </a-tab-pane>
    <a-tab-pane key="3" tab="事件">
      <event-setting></event-setting>
    </a-tab-pane>
    <a-tab-pane key="4" tab="数据">
      <data-setting></data-setting>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import store from '@/store';
import StyleSetting from './style-setting.vue';
import EventSetting from './event-setting.vue';
import DataSetting from './data-setting.vue';
import PropsSetting from './props-setting.vue';

export default {
  name: 'setting-area',
  components: { DataSetting, EventSetting, StyleSetting, PropsSetting },
  computed: {
    schema() {
      return store.state.selectedSchema;
    }
  },
  data() {
    return {
      activeKey: '1'
    };
  }
};
</script>

<style scoped></style>
