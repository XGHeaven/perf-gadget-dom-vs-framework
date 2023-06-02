<template>
  <view id="app" class="app">
    <view class="h1">To-Do List</view>
    <to-do-form @todo-added="addToDo"></to-do-form>
    <view id="list-summary" tabindex="-1">{{ listSummary }}</view>
    <view aria-labelledby="list-summary" class="stack-large">
      <view v-for="(item, index) in ToDoItems" :key="item.id" class="list-item">
        <to-do-item
          :label="item.label"
          :done="item.done"
          :id="item.id"
          :collector="index === ToDoItems.length - 1"
          @checkbox-changed="updateDoneStatus(item.id)"
          @item-deleted="deleteToDo(item.id)"
          @item-edited="editToDo(item.id, $event)">
        </to-do-item>
      </view>
    </view>
  </view>
</template>

<script>
import ToDoItem from "./ToDoItem.vue";
import ToDoForm from "./ToDoForm.vue";
import uniqueId from "lodash.uniqueid";
import { init, report } from "./collector";
import { updateMarkHash } from './context';

const initialData = new Array(1e2).fill(0).map((_, i) => ({
	id: uniqueId("todo-"),
	label: "Learn Vue " + i,
	done: i % 2 == 0
}))

export default {
  name: "app",
  components: {
    ToDoItem,
    ToDoForm,
  },
  created() {
    init('mounted', 1 + 1 + 100 * 3)
    init('button', 1)
  },
  mounted() {
	  report('mounted')
  },
  data() {
    return {
      ToDoItems: [
        // { id: uniqueId("todo-"), label: "Learn Vue", done: false },
        // {
        //   id: uniqueId("todo-"),
        //   label: "Create a Vue project with the CLI",
        //   done: true,
        // },
        // { id: uniqueId("todo-"), label: "Have fun", done: true },
        // { id: uniqueId("todo-"), label: "Create a to-do list", done: false },
		...initialData,
      ],
    };
  },
  methods: {
    addToDo(toDoLabel) {
      this.ToDoItems.push({
        id: uniqueId("todo-"),
        label: toDoLabel,
        done: false,
      });
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToUpdate.done = !toDoToUpdate.done;
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex((item) => item.id === toDoId);
      this.ToDoItems.splice(itemIndex, 1);
      this.$refs.listSummary.focus();
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToEdit.label = newLabel;
    },
    toggleAllTodos() {
      this.ToDoItems.forEach(v => v.done = !v.done)
      updateMarkHash()
      init('button', 1)
    }
  },
  computed: {
    listSummary() {
      const numberFinishedItems = this.ToDoItems.filter(
        (item) => item.done
      ).length;
      return `${numberFinishedItems} out of ${this.ToDoItems.length} items completed`;
    },
  },
};
</script>

<style>
/* Global styles */
/* .btn {
  padding: 12.8px 16px 11.2px;
  border: 3.2px solid #4d4d4d;
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
} */
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > .btn {
  flex: 1 1 auto;
}
.btn-group > .btn + .btn {
  margin-left: 12.8px;
}
.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
[class*="__lg"] {
  display: inline-block;
  width: 100%;
  font-size: 19px;
}
[class*="__lg"]:not(:last-child) {
  margin-bottom: 16px;
}
@media screen and (min-width: 620px) {
  [class*="__lg"] {
    font-size: 38.4px;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
/* [class*="stack"] > * {
  margin-top: 0;
  margin-bottom: 0;
}
.stack-small > * + * {
  margin-top: 20px;
}
.stack-large > * + * {
  margin-top: 40px;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 22.4px;
  }
  .stack-large > * + * {
    margin-top: 44.8px;
  }
} */
/* End global styles */
.app {
  background: #fff;
  margin: 32px 0 64px 0;
  padding: 16px;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 40px 80px 0 rgba(0, 0, 0, 0.1);
}
.app {
	margin: 16px;
}
/* @media screen and (min-width: 550px) {
  #app {
    padding: 64px;
  }
} */
/* #app > * {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
} */
/* #app > form {
  max-width: 100%;
} */
.app .h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 16px;
}
.list-item + .list-item {
	margin-top: 25px;
}
</style>
