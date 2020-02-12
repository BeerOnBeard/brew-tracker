<template>
  <div v-if="recipe">
    <a href="/">Back to List</a>
    <button @click="startNewBrewDay">Start New Brew Day</button>
    <h1>{{ recipe.name }}</h1>
    <RecipeView :recipe="recipe" />
    <div v-if="brews">
      <h2>Brews</h2>
      <ul>
      <li v-for="brew in brews" :key="brew._id">
        <router-link :to="{ name: 'brew', params: { id: brew._id } }">{{ brew.dateStarted | formatBrewDate }}</router-link>
      </li>
      </ul>
    </div>
  </div>
</template>
<script>
import RecipeView from './components/RecipeView.vue';
import DataAccess from './DataAccess';
import moment from 'moment';
import getGuid from 'uuid/v4';

export default {
  name: 'Recipe',
  props: { id: String },
  data() {
    return { recipe: undefined, brews: undefined };
  },
  async created() {
    const recipeResponse = await DataAccess.getRecipe(this.id);
    if (recipeResponse.err) {
      alert('No dice. Check the console.');
      console.error(recipeResponse.err)
      return;
    }

    this.recipe = recipeResponse.recipe;

    const brewsResponse = await DataAccess.getBrews(this.id);
    if (brewsResponse.err) {
      alert('No dice. Check the console.');
      console.error(brewsResponse.err)
      return;
    }

    this.brews = brewsResponse.brews;
  },
  components: {
    RecipeView
  },
  methods: {
    async startNewBrewDay() {
      const brewId = getGuid();
      const response = await DataAccess.putBrew({
        _id: brewId,
        recipe: this.recipe,
        dateStarted: moment().format()
      });

      if (response.err) {
        alert('No dice. Check the console.');
        console.error(response.err);
        return;
      }

      this.$router.push({ name: 'brew', params: { id: brewId }});
    }
  },
  filters: {
    formatBrewDate(value) {
      return moment(value).format('YYYY-MM-DD');
    }
  }
}
</script>
