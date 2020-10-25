<template>
  <div v-if="recipes">
    <router-link :to="{ name: routes.recipeCreateRoute.name }" data-testid="index__new-recipe-link">New Recipe</router-link>
    <h2>Recent Brews</h2>
    <ul>
      <li v-for="brew in brews" :key="brew._id">
        <router-link :to="{ name: routes.brewRoute.name, params: { id: brew._id } }">{{ brew.recipe.name }}</router-link>
      </li>
    </ul>
    <h2>Recipes</h2>
    <ul>
      <li v-for="recipe in recipes" :key="recipe._id">
        <router-link :to="{ name: routes.recipeRoute.name, params: { id: recipe._id } }">{{ recipe.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { recipeRoute, recipeCreateRoute, brewRoute } from './routing/routes';
import { getRecipes, getRecentBrews } from './dataAccess';

export default {
  name: 'Index',
  data() {
    return {
      recipes: undefined,
      brews: undefined,
      routes: { recipeRoute, recipeCreateRoute, brewRoute }
    }
  },
  async created() {
    const [ getRecipesResult, getRecentBrewsResult ] = await Promise.all([ getRecipes(), getRecentBrews() ]);
    if (getRecipesResult.err || getRecentBrewsResult.err) {
      alert('No dice. Check the console.');
      console.error('Get Recipes Result');
      console.error(getRecipesResult.err);
      console.error('Get Recent Brews Result');
      console.error(getRecentBrewsResult.err);
      return;
    }

    this.recipes = getRecipesResult.recipes;
    this.brews = getRecentBrewsResult.brews;
  }
}
</script>
