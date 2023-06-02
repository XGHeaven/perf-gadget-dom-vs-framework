<template>
	<button class="btn" :class="[typeClassName, sizeClassName]" @click="$emit('click')">
		<slot></slot>
		<render-done-mark v-if="collector" name="button"/>
	</button>
</template>

<script>
	import { computed } from 'vue'
import { report } from './collector'
import RenderDoneMark from './RenderDoneMark.vue'
	export default {
		props: ['type', 'size', 'collector'],
		components: {
			RenderDoneMark
		},
		mounted() {
			report('mounted')
		},
		setup(props) {
			const typeClassName = computed(() => props.type ? `btn__${props.type}` : '')
			const sizeClassName = computed(() => props.size ? `btn__${props.size}` : '')
			return {
				typeClassName,
				sizeClassName
			}
		}
	}
</script>

<style>
.btn {
  /* padding: 8px 10px 7px; */
  border: 2px solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ca3c3c;
  border-color: #bd2130;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #c82333;
}
.btn__primary {
  color: #fff;
  background-color: #000;
}
</style>