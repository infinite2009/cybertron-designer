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
import { defineComponent, ref } from 'vue';
import { convertSchemaToStyle } from '@/util';
import draggable from 'vuedraggable';
import ImageWidget from './image.vue';
import TextWidget from './text.vue';
import ListWidget from './list.vue';
import store from '@/store';

const ContainerWidget = defineComponent({
  name: 'container-widget',
  components: {
    draggable,
    ImageWidget,
    TextWidget,
    ListWidget
  },
  props: {
    schema: {
      type: Object,
      default: {},
      required: true
    },
    selectedSchemaId: {
      type: String,
      default: ''
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
});

export default ContainerWidget;
</script>

<style lang="less">
@import 'src/style/mixin';

.selected {
  .selected();
  &:before {
    content: '容器';
  }
}
</style>
