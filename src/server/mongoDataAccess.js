module.exports = function(db) {
  const recipesCollectionName = 'recipes';
  const brewsCollectionName = 'brews';

  return {
    documentOutOfDateError: 'DOCUMENT_OUT_OF_DATE',
    async getRecipes() {
      let result = await db.collection(recipesCollectionName).find().toArray();
      return result;
    },
    async getRecipe(id) {
      let result = await db.collection(recipesCollectionName).findOne({ _id: id });
      return result;
    },

    // returns { err, recipe }
    // the returned recipe is the document as it exists in the database
    async putRecipe(recipe) {
      // make a copy of the object and delete _id and _version to prep for update
      let model = { ...recipe };
      const id = model._id;
      delete model._id;
      const version = model._version;
      delete model._version;

      try {
        await db.collection(recipesCollectionName).updateOne(
          { _id: id, _version: version },
          { '$inc': { _version: 1 }, '$set': { ...model } },
          { upsert: true}
        );
      } catch(exception) {
        if (exception.code === 11000) {
          const currentRecipe = await this.getRecipe(id);
          return { err: this.documentOutOfDateError, recipe: currentRecipe };
        }
        
        throw exception;
      }

      const currentRecipe = await this.getRecipe(id);
      return { recipe: currentRecipe };
    },
    async getBrews(recipeId) {
      let result = await db.collection(brewsCollectionName).find({ "recipe._id" : recipeId }).toArray();
      return result;
    },
    /** Return the 10 most recent brews */
    async getRecentBrews() {
      let result = await db.collection(brewsCollectionName).find({}).sort({ dateStarted: -1}).limit(10).toArray();
      return result;
    },
    async getBrew(id) {
      let result =  await db.collection(brewsCollectionName).findOne({ _id: id });
      return result;
    },

    // returns { err, brew }
    // the returned brew is the document as it exists in the database
    async putBrew(brew) {
      // make a copy of the object and delete _id and _version to prep for update
      let model = { ...brew };
      const id = model._id;
      delete model._id;
      const version = model._version;
      delete model._version;

      try{
        await db.collection(brewsCollectionName).updateOne(
          { _id: id, _version: version },
          { '$inc': { _version: 1 }, '$set': { ...model } },
          { upsert: true }
        );
      } catch(exception) {
        if (exception.code === 11000) {
          const currentBrew = await this.getBrew(id);
          return { err: this.documentOutOfDateError, brew: currentBrew };
        }

        throw exception;
      }

      const currentBrew = await this.getBrew(id);
      return { brew: currentBrew };
    }
  }
};
