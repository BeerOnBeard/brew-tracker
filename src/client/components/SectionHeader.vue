<script>
export default {
  name: 'SectionHeader',
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  render(createElement) {
    return createElement('h' + this.level, this.$slots.default);
  }
}
</script>
