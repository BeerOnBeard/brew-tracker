<template>
  <textarea
    class="text-area-field"
    :value="value"
    @input="$emit('input', $event.target.value)"
  ></textarea>
</template>
<style scoped>
.text-area-field {
  margin: 1rem 0;
  display: block;
  width: 100%;
  box-sizing: border-box;
}
</style>
<script>
export default {
  name: 'Field',
  props: {
    value: [String, Number]
  }
}
</script>
