<template>
  <div>
    <h2>Recipe</h2>
    <div data-testid="recipe-view__yeast">Yeast: {{ recipe.yeast }}</div>
    <div>Target original gravity: {{ recipe.targetOriginalGravity }}</div>
    <div>Target final gravity: {{ recipe.targetFinalGravity }}</div>
    <div>Fermentation temperature: {{ recipe.fermentationTemperature }}&deg;F</div>
    <div>
      <h3>Mash</h3>
      <div
        v-for="fermentable in recipe.mash.fermentables"
        :key="fermentable"
        data-testid="recipe-view__fermentable"
      >{{ fermentable }}</div>
      <br />
      <div>Starting volume: {{ recipe.mash.startingVolume }} gallons</div>
      <div>Sparge volume: {{ recipe.mash.spargeVolume }} gallons</div>
      <div>Target final volume: {{ recipe.mash.targetFinalVolume }} gallons</div>
      <div>Mash temperature: {{ recipe.mash.mashTemperature }}&deg;F</div>
      <div>Mash-out temperature: {{ recipe.mash.mashOutTemperature }}&deg;F</div>
    </div>
    <div>
      <h3>Hops</h3>
      <table class="recipe-hops-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Name</th>
            <th>%AA</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="hop in recipe.hops"
            :key="hop.amount + hop.name + hop.alphaAcids + hop.time"
            data-testid="recipe-view__hop"
          >
            <td>{{ hop.amount }}oz</td>
            <td>{{ hop.name }}</td>
            <td>{{ hop.alphaAcids }}</td>
            <td>{{ hop.time }} minutes</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
.recipe-hops-table {
  border-spacing: 0.5rem;
  border-collapse: collapse;
}
.recipe-hops-table th,
.recipe-hops-table td {
  border: 1px solid black;
  padding: 0.5rem;
  text-align: left;;
}
</style>
<script>
export default {
  name: 'RecipeView',
  props: {
    recipe: Object
  }
}
</script>
