<template>
  <draggable
    :class="{ selected: selected }"
    :component-data="{ style: curStyle, onClick: (e) => selectWidget(schema, e) }"
    :list="data"
    :data-id="schema.id"
    group="component"
    item-key="id"
    @change="onchange"
  >
    <template #item="{ element }">
      <component :is="element.type" :props="element" :schema="element" />
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';
import store from '@/store';
import { convertSchemaToStyle } from '@/util';
import { ref } from 'vue';
import ContainerWidget from './widgets/container.vue';

export default {
  name: 'page',
  components: { ContainerWidget, draggable },
  props: {
    schema: {
      type: Object,
      required: true
    }
  },
  computed: {
    curStyle() {
      return convertSchemaToStyle(this.schema.props.style);
    },
    selected() {
      return store.state.selectedSchema.id === this.schema.id;
    }
  },
  methods: {
    onchange(data) {
      this.newAdded = data.added.element;
      store.commit('cacheWidget', this.newAdded);
      this.selectWidget(this.newAdded);
    },
    selectWidget(widgetSchema, e) {
      if (e) {
        e.stopPropagation();
      }
      store.commit('selectWidget', widgetSchema);
    }
  },
  data() {
    return {
      data: ref(this.schema.children),
      newAdded: {}
    };
  }
};
</script>

<style lang="less">
@import 'src/style/mixin';

.selected {
  .selected();
  &:before {
    content: '页面';
  }
}
</style>
