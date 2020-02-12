import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Index from './Index.vue';
import Recipe from './Recipe.vue';
import RecipeCreate from './RecipeCreate.vue';
import Brew from './Brew.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', name: 'index', component: Index },
    { path: '/recipes/:id', name: 'recipe', component: Recipe, props: true },
    { path: '/new-recipe', name: 'new-recipe', component: RecipeCreate },
    { path: '/brew/:id', name: 'brew', component: Brew, props: true }
  ]
});

new Vue({
  el: '#root',
  router: router,
  render: h => h(App)
});
