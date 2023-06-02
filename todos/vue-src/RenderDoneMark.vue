<template>
  <image :src="`/assets/mark${markHash}.svg`" class="render-mark" @load="loaded"></image>
</template>

<script>
import { report } from './collector'
import { markHash } from './context'
export default {
  props: ['name'],
  setup() {
    return {
      markHash
    }
  },
  methods: {
    loaded() {
      report(this.name);
      // console.log('loaded')
    }
  }
}
</script>

<style>
.render-mark {
  width: 40px;
  height: 40px;
  flex: none;
}
</style>
