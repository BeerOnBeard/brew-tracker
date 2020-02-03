module.exports = function(db) {
  const collectionName = 'brews';

  return {
    async getBrews() {
      let result = await db.collection(collectionName).find().toArray();
      return result;
    },
    async getBrew(id) {
      let result =  await db.collection(collectionName).findOne({ _id: id });
      return result;
    },
    async putBrew(brew) {
      await db.collection(collectionName).findOneAndReplace({ _id: brew._id }, brew, { upsert: true });
    }
  }
};
