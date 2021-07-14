<template>
  <input :style="curStyle" :value="data" />
</template>

<script>
import { defineComponent } from 'vue';
import { convertSchemaToStyle } from '@/util';
import store from '@/store';

const InputWidget = defineComponent({
  name: 'inputWidget',
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

export default InputWidget;
</script>

<style scoped lang="less">
@import 'src/style/mixin';

.selected {
  .selected();
  &:before {
    content: '输入框';
  }
}
</style>
