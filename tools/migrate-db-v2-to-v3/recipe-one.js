module.exports = {
  _id: 'bd2834d4-f8cb-4491-8388-5848a1eab3a2',
  name: 'Medusa Pale Ale',
  yeast: 'SafAle US-05',
  targetOriginalGravity: 1.047,
  targetFinalGravity: 1.009,
  fermentationTemperature: 70,
  mash: {
      fermentables: [
          '8 lbs 2-row',
          '1.5 lbs Malted White Wheat',
          '0.5 lbs English Crystal 60L'
      ],
      startingVolume: 7,
      spargeVolume: 0.4,
      targetFinalVolume: 5.5,
      mashTemperature: 150,
      mashOutTemperature: 170
  },
  hops: [
      {
          amount: '0.25',
          name: 'Warrior',
          alphaAcids: '17.7',
          time: '60'
      },
      {
          amount: '0.5',
          name: 'Medusa',
          alphaAcids: '7.5',
          time: '20'
      },
      {
          amount: '1.5',
          name: 'Medusa',
          alphaAcids: '7.5',
          time: '10'
      },
      {
          amount: '2',
          name: 'Medusa',
          alphaAcids: '7.5',
          time: 0
      }
  ]
};
