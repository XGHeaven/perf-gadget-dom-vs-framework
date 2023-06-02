import { createApp } from 'vue'
import App from './todo/TodoTogglePage.vue'

export function render(root) {
  return createApp(App).mount(root)
}
