const convert = require('./convert');

test('Correctly converts a brew', () => {
  let result = convert(originalBrew);
  expect(result).toEqual(expectedConversion);
});

test('Correctly converts a brew with no notes', () => {
  let result = convert(originalBrewWithNoNotes);
  expect(result).toEqual(expectedConversionWithNoNotes);
});

const originalBrew = {
  _id: 'a0ee1a09-57f6-5ebc-4804dc3a5e7a',
  name: 'Medusa Pale Ale',
  recipe: {
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
  },
  brewNotes: [
    {
      time: '2020-02-06T09:15:32-05:00',
      note: 'Started 7 gallons heating to 154*F.'
    },
    {
      time: '2020-02-06T10:30:52-05:00',
      note: 'Reached 154*F. Mashing in.'
    }
  ],
  fermentationNotes: [
    {
      time: '2020-02-06T16:06:52-05:00',
      note: 'Temperature: 64.5*F'
    },
    {
      time: '2020-02-06T20:04:56-05:00',
      note: 'Air is going back through the airlock into the fermenter.'
    }
  ],
  tastingNotes: [
    {
      time: '2020-02-05T12:30:24-05:00',
      note: 'It\'s not carbonated as much as the last pale ale. There is a nice sweetness and a slightly melony taste. There is a lingering citrus note that hangs out after swallowing. The fridge was at 44*F.\n\nI set the fridge thermostat to 1, it was originally just passed off, and I will shake the keg again to hopefully get more CO2 dissolved.'
    },
    {
      time: '2020-02-05T13:20:15-05:00',
      note: 'Rolled the keg on the floor for a bit at ~10psi. Tasted again and the carbonation is much better. The beer has a slightly higher perceived bitterness that rounds out the sweet and melony flavors.'
    }
  ]
};

const expectedConversion = {
  _id: 'a0ee1a09-57f6-5ebc-4804dc3a5e7a',
  name: 'Medusa Pale Ale',
  recipe: {
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
  },
  notes: [
    {
      time: '2020-02-06T09:15:32-05:00',
      type: 'Brew',
      text: 'Started 7 gallons heating to 154*F.'
    },
    {
      time: '2020-02-06T10:30:52-05:00',
      type: 'Brew',
      text: 'Reached 154*F. Mashing in.'
    },
    {
      time: '2020-02-06T16:06:52-05:00',
      type: 'Fermentation',
      text: 'Temperature: 64.5*F'
    },
    {
      time: '2020-02-06T20:04:56-05:00',
      type: 'Fermentation',
      text: 'Air is going back through the airlock into the fermenter.'
    },
    {
      time: '2020-02-05T12:30:24-05:00',
      type: 'Tasting',
      text: 'It\'s not carbonated as much as the last pale ale. There is a nice sweetness and a slightly melony taste. There is a lingering citrus note that hangs out after swallowing. The fridge was at 44*F.\n\nI set the fridge thermostat to 1, it was originally just passed off, and I will shake the keg again to hopefully get more CO2 dissolved.'
    },
    {
      time: '2020-02-05T13:20:15-05:00',
      type: 'Tasting',
      text: 'Rolled the keg on the floor for a bit at ~10psi. Tasted again and the carbonation is much better. The beer has a slightly higher perceived bitterness that rounds out the sweet and melony flavors.'
    }
  ]
};

const originalBrewWithNoNotes = {
  _id: 'a0ee1a09-57f6-5ebc-4804dc3a5e7a',
  name: 'Medusa Pale Ale',
  recipe: {
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
  }
};

const expectedConversionWithNoNotes = {
  _id: 'a0ee1a09-57f6-5ebc-4804dc3a5e7a',
  name: 'Medusa Pale Ale',
  notes: [],
  recipe: {
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
  }
};