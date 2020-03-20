function getTestElement(id) {
  return cy.get(`[data-testid=${id}]`);
}

const baseUri = Cypress.env('BASE_URI') || 'http://localhost:3000/',
      recipeName = 'Sabro Pale Ale',
      recipeYeast = 'SafAle US-05',
      recipeFermentableOne = '9 lbs 2-row',
      recipeFermentableTwo = '1 lb Malted White Wheat',
      recipeHopOne = {
        amount: 2,
        name: 'Sabro',
        alphaAcids: 14.4,
        time: 60
      },
      recipeHopTwo = {
        amount: 4,
        name: 'Sabro',
        alphaAcids: 14.4,
        time: 5
      },
      brewNoteType = 'Brew',
      brewNoteText = 'Starting to heat water',
      alcoholOriginalBrix = 13,
      alcoholFinalBrix = 6;

/*
 * Assumes that the system is on the create recipe page.
 * Fills in fields and submits the form.
 */
function createRecipe() {
  getTestElement('recipe-edit__name')
    .type(recipeName);
    
  getTestElement('recipe-edit__yeast')
    .type(recipeYeast);
  
  // add two fermentables
  getTestElement('recipe-edit__add-fermentable')
    .click()
    .click();
  
  getTestElement('recipe-edit__fermentables-container')
    .within(() => {
      cy.get('input:first')
        .type(recipeFermentableOne);
      cy.get('input:last')
        .type(recipeFermentableTwo);
    });
  
  // add two hops
  getTestElement('recipe-edit__add-hop')
    .click()
    .click();

  getTestElement('recipe-edit__hops-container')
    .within(() => {
      
      cy.get('div.hop:first')
        .within(() => {
          getTestElement('recipe-edit__hop-amount')
            .type(recipeHopOne.amount);
          
          getTestElement('recipe-edit__hop-name')
            .type(recipeHopOne.name);

          getTestElement('recipe-edit__hop-alpha-acids')
            .type(recipeHopOne.alphaAcids);
          
          getTestElement('recipe-edit__hop-time')
            .type(recipeHopOne.time);
        });

      cy.get('div.hop:last')
        .within(() => {
          getTestElement('recipe-edit__hop-amount')
            .type(recipeHopTwo.amount);
          
          getTestElement('recipe-edit__hop-name')
            .type(recipeHopTwo.name);
          
          getTestElement('recipe-edit__hop-alpha-acids')
            .type(recipeHopTwo.alphaAcids);

          getTestElement('recipe-edit__hop-time')
            .type(recipeHopTwo.time);
        });
    });

  getTestElement('recipe-edit__commit')
    .click();
}

/*
 * Assumes that the system is on the recipe page.
 * Verifies that elements contain the correct values.
 */
function verifyRecipe() {
  getTestElement('recipe__name')
    .should('contain', recipeName);
  
  getTestElement('recipe-view__yeast')
    .should('contain', recipeYeast);
  
  getTestElement('recipe-view__fermentable')
    .first().should('contain', recipeFermentableOne)
    .next().should('contain', recipeFermentableTwo);
  
  getTestElement('recipe-view__hop')
    .first().within(() => {
      cy.get('td')
        .first().should('contain', recipeHopOne.amount)
        .next().should('contain', recipeHopOne.name)
        .next().should('contain', recipeHopOne.alphaAcids)
        .next().should('contain', recipeHopOne.time);
    });
  
  getTestElement('recipe-view__hop')
    .next().within(() => {
      cy.get('td')
        .first().should('contain', recipeHopTwo.amount)
        .next().should('contain', recipeHopTwo.name)
        .next().should('contain', recipeHopTwo.alphaAcids)
        .next().should('contain', recipeHopTwo.time);
    });
}

/*
 * Assumes the system is on the brew page.
 */
function addBrewNote() {
  getTestElement('brew__note-type')
    .type(brewNoteType);
  
  getTestElement('brew__note-text')
    .type(brewNoteText);
  
  getTestElement('brew__add-note')
    .click();
}

/*
 * Assumes the system is on the brew page.
 */
function addAlcohol() {
  getTestElement('alcohol-calculator__original-brix')
    .type(alcoholOriginalBrix);
  
  getTestElement('alcohol-calculator__final-brix')
    .type(alcoholFinalBrix);

  getTestElement('alcohol-calculator__save')
    .click();
}

/*
 * Assumes the system is on the brew page.
 * Verifies that note and alcohol exist as expected.
 */
function verifyBrewPage() {
  // NOTE: Yes, this is a stretch. It saved me from writing
  //       something much more complicated that doesn't provide
  //       all that much value.
  getTestElement('brew__notes-container')
    .should('contain' , brewNoteText);

  // NOTE: Need to convert to string because that's how HTML works
  getTestElement('alcohol-calculator__original-brix')
    .should('have.value', alcoholOriginalBrix.toString());
  
  getTestElement('alcohol-calculator__final-brix')
    .should('have.value', alcoholFinalBrix.toString());
}

describe('Happy Flow', () => {
  it('works', () => {
    cy.visit(baseUri);

    getTestElement('index__new-recipe-link')
      .click();

    createRecipe();

    // we should now be in the recipe detail page
    cy.url().should('contain', `${baseUri}#/recipes/`);

    verifyRecipe();

    // start a new brew day
    getTestElement('recipe__start-new-brew-day')
      .click();
    
    cy.url().should('contain', `${baseUri}#/brew/`);
    
    addBrewNote();
    addAlcohol();
    
    // reload the page and verify info is saved
    cy.reload();

    verifyBrewPage();
  });
});
