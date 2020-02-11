<template>
  <div class="container" v-if="recipe">
    <a href="/">Back to List</a>
    <button @click="startNewBrewDay">Start New Brew Day</button>
    <h1>{{ recipe.name }}</h1>
    <recipe :recipe="recipe"></recipe>
    <div v-if="brews">
      <h2>Brews</h2>
      <ul>
      <li v-for="brew in brews" :key="brew._id">
        <a :href="'brew.html?id=' + brew._id">{{ brew.dateStarted | formatBrewDate }}</a>
      </li>
      </ul>
    </div>
  </div>
</template>
<script>
import recipe from './components/recipe.vue';
import moment from 'moment';
import getGuid from 'uuid/v4';

export default {
  data() {
    return { recipe: undefined, brews: undefined };
  },
  async created() {
    const recipeId = this.getRecipeId();
    this.recipe = await this.fetchRecipe(recipeId);
    this.brews = await this.fetchBrews(recipeId);
  },
  components: {
    recipe
  },
  methods: {
    getRecipeId() {
      const url = new URL(window.location);
      const parameters = new URLSearchParams(url.search);
      return parameters.get('id');
    },
    async fetchRecipe(id) {
      const response = await fetch(`recipes/${id}`);
      return await response.json();
    },
    async fetchBrews(recipeId) {
      const response = await fetch(`brews?recipeId=${recipeId}`);
      if (response.ok) {
        return await response.json();
      } else if (response.status !== 404) {
        alert('There was an error getting the brews related to this recipe. Check the console');
        console.error(response);
      }

      return [];
    },
    async startNewBrewDay() {
      const brewId = getGuid();
      const response = await fetch(`brews/${brewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: brewId,
          recipe: this.recipe,
          dateStarted: moment().format()
        })
      });

      if (!response.ok) {
        alert('No dice. Check the console.');
        console.error(response);
        return;
      }

      window.location.href = `/brew.html?id=${brewId}`;
    }
  },
  filters: {
    formatBrewDate(value) {
      return moment(value).format('YYYY-MM-DD');
    }
  }
}
</script>