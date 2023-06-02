<template>
  <view>
    <view class="label-wrapper">
      <label for="new-todo-input" class="label__lg">
        What needs to be done?
      </label>
    </view>
    <input
      type="text"
      id="new-todo-input"
      name="new-todo"
      autocomplete="off"
      v-model.lazy.trim="label"
      class="input__lg"
    />
    <x-button type="primary" size="lg" @click="onSubmit">Add</x-button>
  </view>
</template>

<script>
import XButton from "./XButton.vue";
export default {
  components: {
    XButton,
  },
  methods: {
    onSubmit() {
      if (this.label === "") {
        return;
      }
      this.$emit("todo-added", this.label);
      this.label = "";
    },
  },
  data() {
    return {
      label: "",
    };
  },
};
</script>
