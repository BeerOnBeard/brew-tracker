function copyArray(array) {
  let copy = [];
  for(let i = 0; i < array.length; i++) {
    copy.push(deepCopy(array[i]));
  }

  return copy;
}

function deepCopy(parent) {
  if (typeof(parent) !== 'object' && Array.isArray(parent) === false) {
    return parent;
  }

  let copy = {};
  for (let property in parent) {
    if (Array.isArray(parent[property])) {
      const newArray = copyArray(parent[property]);
      copy[property] = newArray;
      continue;
    }

    copy[property] = deepCopy(parent[property]);
  }

  return copy;
};

export default deepCopy;
