export default class DataAccess {
  // returns { err }
  static async putRecipe(recipe) {
    const response = await fetch(`recipes/${recipe._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe)
    });

    if (!response.ok) {
      return { response };
    }

    return {};
  }
}
