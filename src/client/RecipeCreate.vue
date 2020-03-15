<template>
  <form
    @submit.prevent="commit"
    class="new-recipe"
  >
    <h1>New Recipe</h1>
    <Field
      label="Name"
      type="text"
      v-model="name"
    />
    <Field
      label="Yeast"
      type="text"
      v-model="yeast"
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
    
    <h2>Mash</h2>
    <div class="fermentables">
      <h3>
        Fermentables
        <span
          class="fermentables__add"
          @click="addFermentable"
        >+</span>
      </h3>
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

    <div class="hops">
      <h2>
        Hops
        <span
          class="hops__add"
          @click="addHop"
        >+</span>
      </h2>
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
        />
        <Field
          label="Name"
          type="text"
          v-model="hops[i].name"
        />
        <Field
          label="%AA"
          type="number"
          step="0.1"
          v-model.number="hops[i].alphaAcids"
        />
        <Field
          label="Time in Minutes"
          type="number"
          v-model.number="hops[i].time"
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
      value="Commit"
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
import { v4 as getGuid } from 'uuid';
import { putRecipe } from './dataAccess';
import { recipeRoute } from './routing/routes';
import Field from './components/Field.vue';

export default {
  name: 'RecipeCreate',
  components: {
    Field
  },
  data() {
    return {
      _id: getGuid(),
      _version: 0,
      name: '',
      yeast: '',
      targetOriginalGravity: 1.047,
      targetFinalGravity: 1.009,
      fermentationTemperature: 70,
      mash: {
        fermentables: [],
        startingVolume: 7,
        spargeVolume: 0.4,
        targetFinalVolume: 5.5,
        mashTemperature: 150,
        mashOutTemperature: 170,
      },
      hops: []
    }
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
    async commit() {
      const response = await putRecipe(this.$data);
      if (response.err) {
        alert('No dice. Check the console.');
        console.error(response.err);
        return;
      }

      this.$router.push({ name: recipeRoute.name, params: { id: this.$data._id } });
    }
  }
}
</script>