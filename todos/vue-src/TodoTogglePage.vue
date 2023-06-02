<template>
  <view>
    <view style="text-align: center">{{ status }}</view>
    <button @tap="toggle">Toggle</button>
    <button @tap="toggleAllChecked">Toggle All Checked</button>
    <button @tap="toggleTest">Start Toggle Test</button>
    <button @tap="toggleCheckedTest">Start Toggle Checked Test</button>
    <Todo v-if="displayed" ref="todo"/>
  </view>
</template>

<script>
import { ref } from 'vue'
import { delay } from './utils'
import Todo from './Todo.vue'
import { waitReported, collect } from './collector'
export default {
  components: {
    Todo,
  },
  setup() {
    const displayed = ref(false)
    const todo = ref(null)
    const status = ref('(none)')

    let step = 0;
    let totalCount = 0;
    let currentCount = 0;
    let result

    function resetStep() {
      step = 0;
      totalCount = 0;
      currentCount = 0;
      result = undefined
    }

    function nextStep(count) {
      step++;
      totalCount = count;
      currentCount = 0;
      updateStatus()
    }

    function nextCount() {
      currentCount++
      updateStatus()
    }

    function updateStatus() {
      if (result) {
        status.value = Object.keys(result).map(k => `${k}:${result[k]}ms`).join(' | ')
        return
      }
      const stepString = step === 1 ? 'warnup' : 'running';
      status.value = `${stepString} ${currentCount}/${totalCount}`
    }

    return {
      displayed,
      todo,
      status,
      toggle() {
        displayed.value = !displayed.value
      },
      toggleAllChecked() {
        todo.value.toggleAllTodos();
      },
      async toggleTest() {
        resetStep()
        nextStep(5)
        // warm up
        for (let i = 0; i < 5; i++) {
          displayed.value = false;
          await delay(1000)
          displayed.value = true;
          await waitReported('button')
          nextCount()
          await delay(500);
        }

        nextStep(10)
        const results = []
        for (let i = 0; i < 10; i++) {
          console.log(`Run ${i}`)
          displayed.value = false;
          await delay(1000)
          displayed.value = true
          await waitReported('button')
          results.push(collect())
          nextCount()
          await delay(500)
        }

        const sum = results.reduce((time, result) => {
          Object.keys(result).forEach(metric => {
            time[metric] = (time[metric] || 0) + result[metric]
          })
          return time
        })

        Object.keys(sum).forEach(metric => {
          sum[metric] /= results.length
        })

        result = sum;
        updateStatus()
        console.log(sum)
      },
      async toggleCheckedTest() {
        if (!displayed.value) {
          displayed.value = true;
          await waitReported('button')
        }
        resetStep()
        nextStep(5)
        for (let i = 0; i < 5; i++) {
          todo.value.toggleAllTodos();
          await waitReported('button')
          nextCount()
          await delay(500);
        }

        nextStep(10)
        const results = []
        for (let i = 0; i < 10; i++) {
          todo.value.toggleAllTodos();
          await waitReported('button')
          results.push(collect())
          nextCount()
          await delay(500);
        }

        const sum = results.reduce((time, result) => {
          Object.keys(result).forEach(metric => {
            time[metric] = (time[metric] || 0) + result[metric]
          })
          return time
        })

        Object.keys(sum).forEach(metric => {
          sum[metric] /= results.length
        })

        result = sum;
        updateStatus()
        console.log(sum)
      }
    }
  }
}
</script>
