<template>
  <div v-if="recipes">
    <router-link :to="{ name: routes.recipeCreateRoute.name }">New Recipe</router-link>
    <h1>Recipes</h1>
    <ul>
      <li v-for="recipe in recipes" :key="recipe._id">
        <router-link :to="{ name: routes.recipeRoute.name, params: { id: recipe._id } }">{{ recipe.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { recipeRoute, recipeCreateRoute } from './routing/routes';
import { getRecipes } from './dataAccess';

export default {
  name: 'Index',
  data() {
    return {
      recipes: undefined,
      routes: { recipeRoute, recipeCreateRoute }
    }
  },
  async created() {
    const response = await getRecipes();
    if (response.err) {
      alert('No dice. Check the console.');
      console.error(response.err);
      return;
    }

    this.recipes = response.recipes;
  }
}
</script>
