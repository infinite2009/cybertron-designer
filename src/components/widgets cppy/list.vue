<template>
  <ul :style="curStyle" :class="{ selected }" @click="selectWidget">{{ 'list works!' }}</ul>
</template>

<script>
import { defineComponent } from 'vue';
import {convertSchemaToStyle} from '@/util';
import store from '@/store';

const ListWidget = defineComponent({
  name: 'list-widget',
  props: {
    schema: {
      type: Object,
      required: true,
      default: {}
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
    selectWidget(e) {
      e.stopPropagation();
      store.commit('selectWidget', this.schema);
    }
  }
});

export default ListWidget;
</script>

<style scoped lang="less">
@import 'src/style/mixin';

.selected {
  .selected();
  &:before {
    content: '列表';
  }
}
</style>
