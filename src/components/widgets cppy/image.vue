<template>
  <img :src="schema.props.url" :alt="schema.props.alt" :style="curStyle" :class="{ selected }" @click="selectWidget"/>
</template>

<script>
import {defineComponent} from 'vue';
import {convertSchemaToStyle} from '@/util';
import store from '@/store';

const ImgWidget = defineComponent({
  name: 'image-widget',
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

export default ImgWidget;

</script>

<style scoped lang="less">
@import 'src/style/mixin';

.selected {
  .selected();
  &:before {
    content: '图片';
  }
}
</style>
