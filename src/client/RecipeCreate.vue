<template>
  <div>
    <h1>New Recipe</h1>
    <RecipeEdit
      :recipe="recipe"
      :headerStartingLevel="2"
      @committed="commit"
    />
  </div>
</template>
<script>
import { v4 as getGuid } from 'uuid';
import { putRecipe } from './dataAccess';
import { recipeRoute } from './routing/routes';
import RecipeEdit from './components/RecipeEdit.vue';

export default {
  name: 'RecipeCreate',
  components: {
    RecipeEdit
  },
  data() {
    return {
      recipe: {
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
    };
  },
  methods: {
    async commit(payload) {
      const response = await putRecipe(payload);
      if (response.err) {
        alert('No dice. Check the console.');
        console.error(response.err);
        return;
      }

      this.$router.push({ name: recipeRoute.name, params: { id: payload._id } });
    }
  }
}
</script>
