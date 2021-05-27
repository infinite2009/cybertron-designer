<template>
  <div>
    <component :is="componentIconName"></component>
    <span>{{ componentName }}</span>
  </div>
</template>

<script>
export default {
  name: 'component-item',
  props: {
    componentName: {
      type: String,
      default: () => ''
    },
    componentIconName: {
      type: String,
      default: () => ''
    }
  }
};
</script>

<style scoped></style>
