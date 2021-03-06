// returns { err, recipes }
async function getRecipes() {
  const response = await fetch('recipes');
  if (!response.ok) {
    return { err: response };
  }

  const json = await response.json();
  return { recipes: json };
};

// returns { err, recipe }
async function getRecipe(id) {
  const response = await fetch(`recipes/${id}`);
  if (!response.ok) {
    return { err: response };
  }

  const json = await response.json();
  return { recipe: json };
};

// returns { err }
async function putRecipe(recipe) {
  const response = await fetch(`recipes/${recipe._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  });

  const json = await response.json();
  if (!response.ok) {
    return { err: response, recipe: json };
  }

  return { recipe: json };
};

// returns { err, brews }
async function getBrews(recipeId) {
  const response = await fetch(`brews?recipeId=${recipeId}`);
  if (!response.ok) {
    return { err: response };
  }

  const json = await response.json();
  return { brews: json };
};

// returns { err, brews }
async function getRecentBrews() {
  const response = await fetch('recent-brews');
  if (!response.ok) {
    return { err: response };
  }

  const json = await response.json();
  return { brews: json };
};

// returns { err, brew }
async function getBrew(id) {
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
};

// returns { err, brew }
async function putBrew(brew) {
  const response = await fetch(`brews/${brew._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(brew)
  });

  const json = await response.json();
  if (!json.notes) {
    // if notes are undefined and then instantiated later,
    // the computed property will not update correctly. If
    // we instantiate the collection now, we're all good.
    json.notes = [];
  }
  
  if (!response.ok) {
    return { err: response, brew: json };
  }

  return { brew: json };
};

export { getRecipes, getRecipe, putRecipe, getBrews, getRecentBrews, getBrew, putBrew };
