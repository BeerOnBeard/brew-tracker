export default class DataAccess {

  // return { err, recipe }
  static async getRecipe(id) {
    const response = await fetch(`recipes/${id}`);
    if (!response.ok) {
      return { err: response };
    }

    const json = await response.json();
    return { recipe: json };
  }

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

  // returns { err, brews }
  static async getBrews(recipeId) {
    const response = await fetch(`brews?recipeId=${recipeId}`);
    if (!response.ok) {
      return { err: response };
    }

    const json = await response.json();
    return { brews: json };
  }

  // returns { err, brew }
  static async getBrew(id) {
    const response = await fetch(`brews/${id}`);
    if (!response.ok) {
      return { err: response };
    }

    const json = await response.json();
    if (!json.notes) {
      // if notes are undefined and then instantiated later,
      // the computed property will not update correctly. If
      // we instantiate the collection now, we're all good.
      json.notes = [];
    }

    return { brew: json };
  }

  // returns { err }
  static async putBrew(brew) {
    const response = await fetch(`brews/${this.brew._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.brew)
    });

    if (!response.ok) {
      return { err: response };
    }

    return {};
  }
}
