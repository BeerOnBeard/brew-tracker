<template>
  <div>
    <form @submit.prevent="commit" class="new-recipe">
      <h1>New Recipe</h1>
      <label>
        Name <input type="text" v-model="name" />
      </label>
      <label>
        Yeast <input type="text" v-model="yeast" />
      </label>
      <label>
        Target original gravity <input type="number" step="0.001" v-model="targetOriginalGravity" />
      </label>
      <label>
        Target final gravity <input type="number" step="0.001" v-model="targetFinalGravity" />
      </label>
      <label>
        Fermentation temperature (&deg;F) <input type="number" step="0.1" v-model="fermentationTemperature" />
      </label>
      
      <h2>Mash</h2>
      <div class="fermentables">
        <h3>Fermentables <span class="fermentables__add" @click="addFermentable">+</span></h3>
        <input type="text" v-for="(_, i) in mash.fermentables" v-model="mash.fermentables[i]" :key="i" />
      </div>
      <label>
        Starting volume (gallons) <input type="number" step="0.1" v-model="mash.startingVolume" />
      </label>
      <label>
        Sparge volume (gallons) <input type="number" step="0.1" v-model="mash.spargeVolume" />
      </label>
      <label>
        Target final volume (gallons) <input type="number" step="0.1" v-model="mash.targetFinalVolume" />
      </label>
      <label>
        Mash temperature (&deg;F) <input type="number" v-model="mash.mashTemperature" />
      </label>
      <label>
        Mash-out temperature (&deg;F) <input type="number" v-model="mash.mashOutTemperature" />
      </label>

      <div class="hops">
        <h2>Hops <span class="hops__add" @click="addHop">+</span></h2>
        <div class="hop" v-for="(_, i) in hops" :key="i">
          <label>
            Amount in Ounces
            <input type="number" step="0.01" v-model="hops[i].amount" />
          </label>
          <label>
            Name
            <input type="text" v-model="hops[i].name" />
          </label>
          <label>
            %AA
            <input type="number" step="0.1" v-model="hops[i].alphaAcids" />
          </label>
          <label>
            Time in Minutes
            <input type="number" v-model="hops[i].time" />
          </label>
          <button class="hop__remove" @click="removeHop(i)">Remove</button>
        </div>
      </div>
      <button type="submit">Commit</button>
    </form>
  </div>
</template>
<style scoped>
.new-recipe label {
  display: block;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
}
.new-recipe input {
  line-height: 2rem;
  display: block;
}
.new-recipe .fermentables {
  margin-bottom: 1rem;
}
.new-recipe .fermentables__add{
  font-size: 1.5rem;
  color: green;
  cursor: pointer;
}
.new-recipe .hops__add {
  color: green;
  cursor: pointer;
}
.new-recipe .hop {
  border: 1px solid black;
  padding: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.new-recipe .hop__remove {
  background: red;
  color: white;
  height: 2rem;
}
</style>
<script>
import getGuid from 'uuid/v4';
import DataAccess from './DataAccess';

export default {
  name: 'RecipeCreate',
  data() {
    return {
      _id: getGuid(),
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
      const response = await DataAccess.putRecipe(this.$data);
      if (response.err) {
        alert('No dice. Check the console.');
        console.error(response);
        return;
      }

      this.$router.push({ name: 'recipe', params: { id: this.$data._id } });
    }
  }
}
</script>