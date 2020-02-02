const paleAleOne = {
  id: 'e2991b61-e0aa-4c9c-8a8e-6bc5e8d2e61c',
  name: 'Pale Ale 1',
  recipe: {
    yeast: 'SafAle US-05',
    targetOriginalGravity: 1.047,
    targetFinalGravity: 1.009,
    fermentationTemperature: 21,
    mash: {
      fermentables: [
        '9 lbs 2-row',
        '1 lb Crystal 10L'
      ],
      startingVolume: 26.5,
      spargeVolume: 1.5,
      targetFinalVolume: 21,
      temperature: 65,
      mashOutTemperature: 77
    },
    hops: [
      { amount: 7, name: 'Nugget pellets', alphaAcids: 15, time: 60 },
      { amount: 7, name: 'Nugget pellets', alphaAcids: 15, time: 20 },
      { amount: 57, name: 'Cascade pellets', alphaAcids: 7.6, time: 10 },
      { amount: 57, name: 'Cascade pellets', alphaAcids: 7.6, time: 0 }
    ]
  },
  brewNotes: [
    { time: '2020-01-18T12:00:00-05:00', note: 'Started 7 gallons' },
    { time: '2020-01-18T13:00:00-05:00', note: 'Reached mash temp. Starting mash.' }
  ],
  fermentationNotes: [
    { time: '2020-01-20T12:00:00-05:00', note: 'Airlock is bubbling' },
    { time: '2020-01-21T13:00:00-05:00', note: 'Airlock stopped bubbling' }
  ],
  tastingNotes: [
    { time: '2020-02-10T13:00:00-05:00', note: 'Slight banana smell' },
    { time: '2020-02-10T17:00:00-05:00', note: 'Banana smell is gone' }
  ]
};

const paleAleTwo = {
  id: 'a9a2a6e2-5747-4ee5-90ed-dea718c4083e',
  name: 'Pale Ale 2',
  recipe: {
    yeast: 'SafAle US-05',
    targetOriginalGravity: 1.047,
    targetFinalGravity: 1.009,
    fermentationTemperature: 21,
    mash: {
      fermentables: [
        '9 lbs 2-row',
        '1 lb Crystal 10L'
      ],
      startingVolume: 26.5,
      spargeVolume: 1.5,
      targetFinalVolume: 21,
      temperature: 65,
      mashOutTemperature: 77
    },
    hops: [
      { amount: 7, name: 'Nugget pellets', alphaAcids: 15, time: 60 },
      { amount: 7, name: 'Nugget pellets', alphaAcids: 15, time: 20 },
      { amount: 57, name: 'Cascade pellets', alphaAcids: 7.6, time: 10 },
      { amount: 57, name: 'Cascade pellets', alphaAcids: 7.6, time: 0 }
    ]
  },
  brewNotes: [
    { time: '2020-01-18T12:00:00-05:00', note: 'Started 7 gallons' },
    { time: '2020-01-18T13:00:00-05:00', note: 'Reached mash temp. Starting mash.' }
  ],
  fermentationNotes: [
    { time: '2020-01-20T12:00:00-05:00', note: 'Airlock is bubbling' },
    { time: '2020-01-21T13:00:00-05:00', note: 'Airlock stopped bubbling' }
  ],
  tastingNotes: [
    { time: '2020-02-10T13:00:00-05:00', note: 'Slight banana smell' },
    { time: '2020-02-10T17:00:00-05:00', note: 'Banana smell is gone' }
  ]
};

module.exports = function () {
  let brews = [ paleAleOne, paleAleTwo ];
  return {
    getBrews() {
      return brews.map(brew => { return { id: brew.id, name: brew.name }});
    },
    getBrew(id) {
      return brews.find(brew => brew.id == id);
    },
    putBrew(brew) {
      let existingBrewIndex = brews.findIndex(x => x.id == brew.id);
      if (existingBrewIndex === -1) {
        brews.push(brew);
      }

      brews.splice(existingBrewIndex, 1, brew);
    }
  };
};
