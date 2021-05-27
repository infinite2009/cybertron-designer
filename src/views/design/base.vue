<template>
  <div class="flex flex-col h-screen w-screen">
    <section class="flex-shrink-0 h-60 border-b border-border"></section>
    <section class="flex-shrink-0 body flex flex-grow">
      <div class="flex-shrink-0 component-panel border-border">
        <panel-area class="h-full"></panel-area>
      </div>
      <div class="flex-shrink-0 designer-canvas flex-grow">
        <editor-area :schema="schema" />
      </div>
      <div class="flex-shrink-0 form-panel border-l border-border">
        <setting-area></setting-area>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { v4 as uuid } from 'uuid';
import store from '@/store';
import PageSchema from '@/interface/schema/page.schema';
import StyleValueUnit from '@/enum/style-value-unit';
import { Ref, ref } from 'vue';
import WidgetType from '@/enum/schema/widget-type.enum';
import SettingArea from './components/setting-area/index.vue';
import EditorArea from './components/editor-area.vue';
import PanelArea from './components/panel-area.vue';
import ToolBar from './components/tool-bar.vue';

export default {
  name: 'base',
  components: {
    ToolBar,
    PanelArea,
    EditorArea,
    SettingArea
  },
  props: {},
  setup() {
    // 需要存入 store
    const schema: Ref<PageSchema> = ref({
      id: uuid(),
      name: '页面',
      desc: '页面',
      type: WidgetType.page,
      props: {
        style: {
          width: {
            name: 'width',
            value: 375,
            unit: StyleValueUnit.px
          },
          height: {
            name: 'height',
            value: 812,
            unit: StyleValueUnit.px
          }
        },
        route: '',
        // 运行期间读取和写入的
        localStorage: {
          read: {},
          write: {}
        },
        query: {
          read: {},
          write: {}
        },
        // 页面用到的接口
        httpApi: [],
        // 发送事件给 native
        nativeEvent: {},
        // 接收 native 事件
        nativeMessage: {},
        // 页面的运行时状态 ( 包括远端数据 )
        state: {},
        // 页面内的交互事件
        events: {}
      },
      children: []
    });
    console.log('page schema: ', schema);
    store.commit('initPage', schema);
    return {
      schema
    };
  }
};
</script>

<style lang="less" scoped></style>
