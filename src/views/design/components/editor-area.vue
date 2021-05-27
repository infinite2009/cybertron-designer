<template>
  <div class="w-375 h-812 dark:border border dark:border-border mx-auto my-20 box-content">
    <page :schema="schema"></page>
  </div>
</template>

<script>
import Page from '@/views/design/components/page.vue';

export default {
  name: 'editor-area',
  components: {
    page: Page
  },
  props: {
    schema: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log(this.schema);
  }
};
</script>

<style scoped></style>
