module.exports = function(originalBrew) {
  let convertedBrew = {
    _id: originalBrew._id,
    name: originalBrew.name,
    recipe: originalBrew.recipe
  };

  convertedBrew.notes = [];
  if (originalBrew.brewNotes) {
    convertedBrew.notes.push(...originalBrew.brewNotes.map(brewNote => { return { time: brewNote.time, type: 'Brew', text: brewNote.note }}));
  }

  if (originalBrew.fermentationNotes) {
    convertedBrew.notes.push(...originalBrew.fermentationNotes.map(fermentationNote => { return { time: fermentationNote.time, type: 'Fermentation', text: fermentationNote.note }}));
  }

  if (originalBrew.tastingNotes) {
    convertedBrew.notes.push(...originalBrew.tastingNotes.map(tastingNote => { return { time: tastingNote.time, type: 'Tasting', text: tastingNote.note }}));
  }
  
  return convertedBrew;
};
