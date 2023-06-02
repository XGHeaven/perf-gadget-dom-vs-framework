<template>
  <view class="form stack-small" @submit.prevent="onSubmit">
    <view class="form-child">
      <view class="edit-label">Edit Name for &quot;{{ label }}&quot;</view>
      <input
        :id="id"
        class="input"
        type="text"
        autocomplete="off"
        v-model.lazy.trim="newLabel"
      />
    </view>
    <view class="btn-group form-child">
      <x-button @click="onCancel"> Cancel </x-button>
      <x-button type="primary" @click="onSubmit" :collector="true"> Save </x-button>
    </view>
  </view>
</template>
<script>
import XButton from "./XButton.vue";
export default {
  components: {
    XButton,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newLabel: this.label,
    };
  },
  methods: {
    onSubmit() {
      if (this.newLabel && this.newLabel !== this.label) {
        this.$emit("item-edited", this.newLabel);
      }
    },
    onCancel() {
      this.$emit("edit-cancelled");
    },
  },
  mounted() {
    // const labelInputRef = this.$refs.labelInput;
    // labelInputRef.focus();
  },
};
</script>
<style scoped>
.edit-label {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #0b0c0c;
  display: block;
  margin-bottom: 5px;
}
.input {
  display: inline-block;
  margin-top: 0.64px;
  width: 100%;
  min-height: 4.64px;
  padding: 0.64px 12.8px;
  border: 2px solid #565656;
}
.form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.form-child {
  flex: 0 0 100%;
}
</style>
