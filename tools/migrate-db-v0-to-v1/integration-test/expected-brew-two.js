module.exports = {
  _id: '2c2f231e-0a47-436c-c9f6bf29a1dd',
  name: 'Cascade-Ekuanot Pale Ale',
  recipe: {
      yeast: 'SafAle US-05',
      targetOriginalGravity: 1.047,
      targetFinalGravity: 1.009,
      fermentationTemperature: 70,
      mash: {
          fermentables: [
              '9 lbs 2-row',
              '1 lb English Crystal 10L'
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
              name: 'Nugget',
              alphaAcids: '15',
              time: '60'
          },
          {
              amount: '0.28',
              name: 'Nugget',
              alphaAcids: '15',
              time: '20'
          },
          {
              amount: '2',
              name: 'Cascade',
              alphaAcids: '5.6',
              time: '10'
          },
          {
              amount: '1',
              name: 'Ekuanot Cryo',
              alphaAcids: '24.9',
              time: 0
          }
      ]
  },
  notes: [
      {
          time: '2020-02-05T12:30:24-05:00',
          type: 'Tasting',
          text: 'It\'s not carbonated as much as the last pale ale. There is a nice sweetness and a slightly melony taste. There is a lingering citrus note that hangs out after swallowing. The fridge was at 44*F.\n\nI set the fridge thermostat to 1, it was originally just passed off, and I will shake the keg again to hopefully get more CO2 dissolved.'
      },
      {
          time: '2020-02-05T13:20:15-05:00',
          type: 'Tasting',
          text: 'Rolled the keg on the floor for a bit at ~10psi. Tasted again and the carbonation is much better. The beer has a slightly higher perceived bitterness that rounds out the sweet and melony flavors.'
      },
      {
          time: '2020-02-05T13:32:29-05:00',
          type: 'Tasting',
          text: 'I set the fridge thermostat just above off again.'
      }
  ]
};
