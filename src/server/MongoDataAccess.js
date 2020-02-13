module.exports = function(db) {
  const recipesCollectionName = 'recipes';
  const brewsCollectionName = 'brews';

  return {
    async getRecipes() {
      let result = await db.collection(recipesCollectionName).find().toArray();
      return result;
    },
    async getRecipe(id) {
      let result = await db.collection(recipesCollectionName).findOne({ _id: id });
      return result;
    },
    async putRecipe(recipe) {
      await db.collection(recipesCollectionName).findOneAndReplace({ _id: recipe._id }, recipe, { upsert: true });
    },
    async getBrews(recipeId) {
      let result = await db.collection(brewsCollectionName).find({ "recipe._id" : recipeId }).toArray();
      return result;
    },
    async getBrew(id) {
      let result =  await db.collection(brewsCollectionName).findOne({ _id: id });
      return result;
    },
    async putBrew(brew) {
      await db.collection(brewsCollectionName).findOneAndReplace({ _id: brew._id }, brew, { upsert: true });
    }
  }
};
