<template>
  <a-tabs
    class="component-tabs"
    v-model:activeKey="activeKey"
    :hideAdd="true"
    :tabBarStyle="{ color: '#a9a8b8' }"
    :tabBarGutter="0"
  >
    <a-tab-pane class="flex flex-wrap p-10" v-for="list in data" :key="list.type" :tab="list.typeName">
      <draggable
        :list="list.list"
        :group="{ name: 'component', pull: 'clone', put: false }"
        :clone="insertWidget"
        :sort="false"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="flex flex-col align-middle m-10">
            <component class="icon" :is="element.icon" style="color: #a3a8b8"></component>
            <span class="dark:text-text">{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import draggable from 'vuedraggable';
import { BuildOutlined } from '@ant-design/icons-vue';
import SchemaService from '@/service/schema-operation/index.service';
import mockComponentList from '../../../mock/component-list';

export default defineComponent({
  name: 'component-panel',
  components: {
    BuildOutlined,
    draggable
  },
  props: {},
  methods: {
    insertWidget(data: { type: any }) {
      return SchemaService.insertWidget(data);
    }
  },
  setup: () => {
    return {
      data: ref(mockComponentList),
      activeKey: ref(1)
    };
  }
});
</script>

<style scoped lang="less">
.icon :deep(svg) {
  color: '#a3a8b8';
  width: 40px;
  height: 40px;
}
.component-tabs :deep(.ant-tabs-top-bar) {
  margin: 0;
}
</style>
