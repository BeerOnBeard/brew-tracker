const paleAleOne = 'e2991b61-e0aa-4c9c-8a8e-6bc5e8d2e61c';
const paleAleTwo = 'a9a2a6e2-5747-4ee5-90ed-dea718c4083e';

module.exports = {
  getBrews() {
    return [
      { id: paleAleOne, name: 'Pale Ale 1' },
      { id: paleAleTwo, name: 'Pale Ale 2' }
    ];
  },
  getBrew(id) {
    if (id === paleAleOne) {
      return {
        id: paleAleOne,
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
    } else if (id === paleAleTwo) {
      return {
        id: paleAleTwo,
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
    } else {
      return undefined;
    }
  }
};
