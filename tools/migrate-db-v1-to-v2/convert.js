const moment = require('moment');

// getDate: function to get the current date in ISO-8601 format
// getGuid: function to get a new guid
module.exports = function(getDate, getGuid, originalBrew) {
  let recipe = {
    _id: getGuid(),
    name: originalBrew.name,
    ...originalBrew.recipe
  };

  let convertedBrew = {
    _id: originalBrew._id,
    recipe: recipe
  };

  let dateStarted = getDate();
  if (originalBrew.notes) {
    convertedBrew.notes = originalBrew.notes;
    dateStarted = originalBrew.notes
      .map(note => moment(note.time))
      .sort((left, right) => left.diff(right))
      .shift()
      .format();
  }

  convertedBrew.dateStarted = dateStarted;

  return {
    brew: convertedBrew,
    recipe: recipe
  };
};
