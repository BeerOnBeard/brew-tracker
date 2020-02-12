import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './app.vue';
import index from './index.vue';
import recipe from './recipe.vue';
import newRecipe from './new-recipe.vue';
import brew from './brew.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/recipes/:id', name: 'recipe', component: recipe, props: true },
    { path: '/new-recipe', name: 'new-recipe', component: newRecipe },
    { path: '/brew/:id', name: 'brew', component: brew, props: true }
  ]
});

new Vue({
  el: '#root',
  router: router,
  render: h => h(app)
});
