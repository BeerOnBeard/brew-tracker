<template>
  <div v-if="recipes" class="container">
    <a href="new-recipe.html">New Recipe</a>
    <h1>Recipes</h1>
    <ul>
      <li v-for="recipe in recipes" :key="recipe._id">
        <a :href="'recipe.html?id=' + recipe._id">{{ recipe.name }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
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