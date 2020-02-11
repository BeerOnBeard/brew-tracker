Vue.component('recipe', {
  props: ['recipe'],
  template: `
<div>
  <h2>Recipe</h2>
  <div>Yeast: {{ recipe.yeast }}</div>
  <div>Target original gravity: {{ recipe.targetOriginalGravity }}</div>
  <div>Target final gravity: {{ recipe.targetFinalGravity }}</div>
  <div>Fermentation temperature: {{ recipe.fermentationTemperature }}&deg;F</div>
  <div>
    <h3>Mash</h3>
    <div v-for="fermentable in recipe.mash.fermentables">{{ fermentable }}</div>
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
        <tr v-for="hop in recipe.hops">
          <td>{{ hop.amount }}oz</td>
          <td>{{ hop.name }}</td>
          <td>{{ hop.alphaAcids }}</td>
          <td>{{ hop.time }} minutes</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`
});
