module.exports = {
  _id: '7be38ec1-3436-4321-a1fb-305c4a60152f',
  _version: 1,
  name: 'Sabro Pale Ale',
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
          amount: '0.5',
          name: 'Sabro',
          alphaAcids: '14.5',
          time: '20'
      },
      {
          amount: '1.5',
          name: 'Sabro',
          alphaAcids: '14.5',
          time: '10'
      },
      {
          amount: '2',
          name: 'Sabro',
          alphaAcids: '14.5',
          time: 0
      }
  ]
};
