import Index from '../Index.vue';
import Recipe from '../Recipe.vue';
import RecipeCreate from '../RecipeCreate.vue';
import Brew from '../Brew.vue';

const indexRoute = { path: '/', name: 'index', component: Index };
const recipeRoute = { path: '/recipes/:id', name: 'recipe', component: Recipe, props: true }
const recipeCreateRoute = { path: '/new-recipe', name: 'recipeCreate', component: RecipeCreate };
const brewRoute = { path: '/brew/:id', name: 'brew', component: Brew, props: true };

const routes = [ indexRoute, recipeRoute, recipeCreateRoute, brewRoute ];

export { indexRoute, recipeRoute, recipeCreateRoute, brewRoute, routes };