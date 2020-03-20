<template>
  <form @submit.prevent="save">
    <Field
      label="Name"
      type="text"
      v-model="name"
      data-testid="recipe-edit__name"
    />
    <Field
      label="Yeast"
      type="text"
      v-model="yeast"
      data-testid="recipe-edit__yeast"
    />
    <Field
      label="Target original gravity"
      type="number"
      step="0.001"
      v-model.number="targetOriginalGravity"
    />
    <Field
      label="Target final gravity"
      type="number"
      step="0.001"
      v-model.number="targetFinalGravity"
    />
    <Field
      label="Fermentation temperature (&deg;F)"
      type="number"
      step="0.1"
      v-model.number="fermentationTemperature"
    />
    
    <SectionHeader :level="headerStartingLevel">Mash</SectionHeader>
    <div
      class="fermentables"
      data-testid="recipe-edit__fermentables-container"
    >
      <SectionHeader :level="headerStartingLevel + 1">
        Fermentables
        <span
          class="fermentables__add"
          @click="addFermentable"
          data-testid="recipe-edit__add-fermentable"
        >+</span>
      </SectionHeader>
      <input
        type="text"
        v-for="(_, i) in mash.fermentables"
        v-model="mash.fermentables[i]"
        :key="i"
      />
    </div>
    <Field
      label="Starting volume (gallons)"
      type="number"
      step="0.1"
      v-model.number="mash.startingVolume"
    />
    <Field
      label="Sparge volume (gallons)"
      type="number"
      step="0.1"
      v-model.number="mash.spargeVolume"
    />
    <Field
      label="Target final volume (gallons)"
      type="number"
      step="0.1"
      v-model.number="mash.targetFinalVolume"
    />
    <Field
      label="Mash temperature (&deg;F)"
      type="number"
      v-model.number="mash.mashTemperature"
    />
    <Field
      label="Mash-out temperature (&deg;F)"
      type="number"
      v-model.number="mash.mashOutTemperature"
    />

    <div data-testid="recipe-edit__hops-container">
      <SectionHeader :level="headerStartingLevel">
        Hops
        <span
          class="hops__add"
          @click="addHop"
          data-testid="recipe-edit__add-hop"
        >+</span>
      </SectionHeader>
      <div
        class="hop"
        v-for="(_, i) in hops"
        :key="i"
      >
        <Field
          label="Amount in Ounces"
          type="number"
          step="0.01"
          v-model.number="hops[i].amount"
          data-testid="recipe-edit__hop-amount"
        />
        <Field
          label="Name"
          type="text"
          v-model="hops[i].name"
          data-testid="recipe-edit__hop-name"
        />
        <Field
          label="%AA"
          type="number"
          step="0.1"
          v-model.number="hops[i].alphaAcids"
          data-testid="recipe-edit__hop-alpha-acids"
        />
        <Field
          label="Time in Minutes"
          type="number"
          v-model.number="hops[i].time"
          data-testid="recipe-edit__hop-time"
        />
        <input
          type="submit"
          class="hop__remove"
          @submit.prevent="removeHop(i)"
          value="Remove"
        />
      </div>
    </div>
    <input
      type="submit"
      value="Save"
      data-testid="recipe-edit__save"
    />
  </form>
</template>
<style scoped>
.fermentables__add, .hops__add{
  font-size: 1.5rem;
  color: green;
  cursor: pointer;
}
.fermentables input {
  line-height: 2rem;
  display: block;
  width: 100%;
  box-sizing: border-box;
}
.hop {
  border: 1px solid black;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
.hop__remove {
  color: red;
}
</style>
<script>
import Field from './Field.vue';
import SectionHeader from './SectionHeader.vue';
import deepCopy from '../util/deepCopy';

export default {
  name: 'RecipeEdit',
  components: {
    Field,
    SectionHeader
  },
  props: {
    recipe: {
      type: Object,
      required: true,
      validator: value => 
        value.mash !== undefined
          && Array.isArray(value.mash.fermentables)
          && Array.isArray(value.hops)
    },
    // the level for h tags (h1, h2, etc) to start at in this component
    headerStartingLevel: {
      type: Number,
      required: true
    }
  },
  data() {
    return deepCopy(this.recipe);
  },
  methods: {
    addFermentable() {
      this.mash.fermentables.push('');
    },
    addHop() {
      this.hops.push({amount: 0, name: '', alphaAcids: 0, time: 0 });
    },
    removeHop(index) {
      this.hops.splice(index, 1);
    },
    save() {
      this.$emit('saved', deepCopy(this.$data));
    }
  }
}
</script>
