//navigate and log into the chat
context('Navigation', () => {
  before(() => {
    cy.visit('http://localhost:8080/')
    cy.get('#playerName').click()
    cy.get('#playerName').type('player1')
    cy.get('#confirmSettings').click()
  })

describe('Player1 button displayed in banner at top', function() {
  it('Appears at top of screen', function() {
    cy.get('#currentUsers').contains('player1');
  })
})

describe('Player1 can submit chat text into the chat forum by typing Enter', function(){
  it('Text appears in the chat room', function(){
    cy.get('#m').type('Testing the chat input')
    cy.get('#m').click().type('{enter}')
    cy.get('#chatFeature').contains('Testing the chat input')
  })
})

describe('Player1 can submit chat text into the chat forum by clicking Send', function(){
  it('Text appears in the chat room', function(){
    cy.get('#m').type('Testing the chat input again')
    cy.get('#chatSend').click()
    cy.get('#chatFeature').contains('Testing the chat input again')
  })
})

describe('Player1 can click on Jake\'s player button', function(){
  it('Clicks on the player button with ID of jake', function(){
    cy.get('#jake').click()
  })
})


})