<template>
  <label class="field">
    {{ label }}
    <input
      class="field__input"
      v-bind="$attrs"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>
<style scoped>
.field {
  margin: 1rem 0;
  display: block;
}
.field__input {
  width: 100%;
  line-height: 2rem;
  box-sizing: border-box;
}
</style>
<script>
export default {
  name: 'Field',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: [String, Number]
  }
}
</script>
