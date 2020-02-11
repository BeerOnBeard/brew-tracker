<template>
  <div>
    <a href="/">Back to List</a>
    <button @click="startNewBrewDay">Start New Brew Day</button>
    <h1>{{ recipe.name }}</h1>
    <recipe :recipe="recipe"></recipe>
    <div>
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
import recipe from './components/recipe.vue';
import moment from 'moment';
import getGuid from 'uuid/v4';

export default {
  props: { id: String },
  data() {
    return { recipe: undefined, brews: undefined };
  },
  async created() {
    this.recipe = await this.fetchRecipe(this.id);
    this.brews = await this.fetchBrews(this.id);
  },
  components: {
    recipe
  },
  methods: {
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