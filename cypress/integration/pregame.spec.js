{/* <reference types="Cypress" /> */}

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
    cy.get('#playerName').click()
    cy.get('#playerName').type('player1')
    cy.get('#confirmSettings').click()
  })


describe('My first passing test', function() {
    it('Does not do much!', function() {
        expect(true).to.equal(true);
    })
})


})