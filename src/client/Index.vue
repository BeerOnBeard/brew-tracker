<template>
  <div v-if="recipes">
    <router-link :to="{ name: 'new-recipe' }">New Recipe</router-link>
    <h1>Recipes</h1>
    <ul>
      <li v-for="recipe in recipes" :key="recipe._id">
        <router-link :to="{ name: 'recipe', params: { id: recipe._id } }">{{ recipe.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return { recipes: undefined }
  },
  async created() {
    const response = await fetch('recipes');
    const json = await response.json();
    this.recipes = json;
  }
}
</script>