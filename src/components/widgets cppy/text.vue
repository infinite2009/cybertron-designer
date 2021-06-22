<template>
  <p :style="curStyle" :class="{ selected }" @click="selectWidget">{{ schema.props.data }}</p>
</template>

<script>
import { defineComponent } from 'vue';
import { convertSchemaToStyle } from '@/util';
import store from '@/store';

const TextWidget = defineComponent({
  name: 'text-widget',
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
export default TextWidget;
</script>

<style lang="less" scoped>
@import 'src/style/mixin';

.selected {
  .selected();
  &:before {
    content: '文本'
  }
}
</style>
