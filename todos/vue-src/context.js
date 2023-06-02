import { ref } from 'vue'

export const markHash = ref(0)

export function updateMarkHash() {
  markHash.value = (markHash.value + 1) % 2;
}
