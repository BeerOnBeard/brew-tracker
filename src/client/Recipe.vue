<template>
  <div v-if="recipe">
    <router-link :to="{ name: routes.indexRoute.name }">Back to List</router-link>
    <div v-if="!editing">
      <h1 data-testid="recipe__name">{{ recipe.name }}</h1>
      <button @click="editing = true">Edit</button>
      <RecipeView
        :recipe="recipe"
        :headerStartingLevel="2"  
      />

      <button
        @click="startNewBrewDay"
        class="start-brew-day"
        data-testid="recipe__start-new-brew-day"
      >Start New Brew Day</button>
      <div v-if="brews">
        <h2>Brews</h2>
        <ul>
        <li
          v-for="brew in brews"
          :key="brew._id"
        >
          <router-link :to="{ name: routes.brewRoute.name, params: { id: brew._id } }">
            {{ brew.dateStarted | formatBrewDate }}
          </router-link>
        </li>
        </ul>
      </div>
    </div>

    <div v-if="editing">
      <RecipeEdit
        :recipe="recipe"
        :headerStartingLevel="1"
        @saved="save"
      />
    </div>
  </div>
</template>
<style scoped>
.start-brew-day {
  margin-top: 2rem;
}
</style>
<script>
import RecipeView from './components/RecipeView.vue';
import RecipeEdit from './components/RecipeEdit.vue';
import { getRecipe, putRecipe, getBrews, putBrew } from './dataAccess';
import moment from 'moment';
import { v4 as getGuid}  from 'uuid';
import { indexRoute, brewRoute } from './routing/routes';

export default {
  name: 'Recipe',
  props: { id: String },
  data() {
    return {
      recipe: undefined,
      brews: undefined,
      routes: { indexRoute, brewRoute },
      editing: false
    };
  },
  async created() {
    const recipeResponse = await getRecipe(this.id);
    if (recipeResponse.err) {
      alert('No dice. Check the console.');
      console.error(recipeResponse.err)
      return;
    }

    this.recipe = recipeResponse.recipe;

    const brewsResponse = await getBrews(this.id);
    if (brewsResponse.err) {
      alert('No dice. Check the console.');
      console.error(brewsResponse.err)
      return;
    }

    this.brews = brewsResponse.brews;
  },
  components: {
    RecipeView,
    RecipeEdit
  },
  methods: {
    async startNewBrewDay() {
      const brewId = getGuid();
      const response = await putBrew({
        _id: brewId,
        _version: 0,
        recipe: this.recipe,
        dateStarted: moment().format()
      });

      if (response.err) {
        alert('No dice. Check the console.');
        console.error(response.err);
        return;
      }

      this.$router.push({ name: brewRoute.name, params: { id: brewId }});
    },
    async save(payload) {
      const response = await putRecipe(payload);
      if (response.err && response.err.statusText === 'DOCUMENT_OUT_OF_DATE') {
        alert('The recipe was changed while you were making changes. Sadly, you are going to have to make your changes again.');
        console.error(response);
      } else if (response.err) {
        alert('No dice. Check the console.');
        console.error(response.err);
        return;
      }

      this.recipe = response.recipe;
      this.editing = false;
    }
  },
  filters: {
    formatBrewDate(value) {
      return moment(value).format('YYYY-MM-DD');
    }
  }
}
</script>
