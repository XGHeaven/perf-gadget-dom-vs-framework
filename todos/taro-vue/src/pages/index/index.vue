<template>
  <Todo/>
</template>

<script>
import Todo from '../../todo/TodoTogglePage.vue'
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro'

export default {
  name: 'Index',
  components: {
    Todo
  },
}
</script>

<style>

</style>
