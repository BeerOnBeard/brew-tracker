<template>
  <form @submit.prevent="save">
    <Field
      label="Original Brix"
      type="number"
      step="0.01"
      v-model.number="localOriginalBrix"
      data-testid="alcohol-calculator__original-brix"
    />
    <Field
      label="Final Brix"
      type="number"
      step="0.01"
      v-model.number="localFinalBrix"
      data-testid="alcohol-calculator__final-brix"
    />
    <Field
      label="ABV"
      type="number"
      readonly
      v-model.number="abv"
    />
    <input
      type="submit"
      value="Save"
      data-testid="alcohol-calculator__save"
    />
  </form>
</template>
<script>
import Field from './Field.vue';
export default {
  name: 'AlcoholCalculator',
  props: {
    originalBrix: Number,
    finalBrix: Number
  },
  components: {
    Field
  },
  data() {
    return {
      localOriginalBrix: this.originalBrix,
      localFinalBrix: this.finalBrix
    };
  },
  computed: {
    abv() {
      if (!this.localOriginalBrix || !this.localFinalBrix) {
        return undefined;
      }

      const FG = 1 + (-0.002349 * this.localOriginalBrix) + (0.006276 * this.localFinalBrix);
      const ABW = (0.67062 * this.localOriginalBrix) - (0.66091 * this.localFinalBrix);
      const ABV = (FG * ABW) / 0.791;
      return ABV.toFixed(2);
    }
  },
  methods: {
    save() {
      this.$emit('save', { originalBrix: this.localOriginalBrix, finalBrix: this.localFinalBrix});
    }
  }
}
</script>
