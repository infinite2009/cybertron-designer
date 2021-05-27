<template>
  <div>
    {{ msg }}
  </div>
</template>

<script lang="ts">
export default {
  name: 'not-found',
  data() {
    return {
      msg: '路由不正确或者未找到需要加载的组件'
    };
  }
};
</script>

<style lang="less" scoped></style>
