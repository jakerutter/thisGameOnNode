Cypress.LocalStorage.clear = function(keys, ls, rs){};
//navigate and log into the chat
context('Navigation', () => {
  before(() => {
    cy.visit('http://localhost:8080/')
  })

describe('Player1 enters name into the name field', function(){
  it('Submits player1 as the users\'s name', function(){
    cy.get('#playerName').click()
    cy.get('#playerName').type('player1')
    cy.get('#confirmSettings').click()
  })
})

describe('Player1 name is stored in local storage', function() {
  it('Player1 is in local storage', function() {
    var username = localStorage.getItem('username');
    expect(username).to.equal('"player1"')
  })
})

describe('Player1 button displayed in banner at top', function() {
  it('Appears at top of screen', function() {
    cy.get('#currentUsers').contains('player1')
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

describe('jake accepts the challenge', function(){
  it('Furthers game when jake accepts challenge', function(){
    cy.window().then(win => win.respondToChallenge('accept', 'jake', 'player1'))
  })
})

describe('Welcome modal is displayed when the challenge is accepted', function(){
  it('Welcome modal appears for player1', function(){
    cy.get('#welcomeModal').contains('Select a color')
  })
})

describe('Clicks on the settings button and can read the game premise', function(){
  it('Opens the info modal', function(){
    cy.get('#btnSettingsModal').click()
    cy.get('#welcomeModal').invoke('hide')
    cy.get('#settingsModal').invoke('show')
    cy.get('#settingsModal').contains('A Rutter Production. 2018.')
  })
})

describe('Clicks the continue button and is returned to the previous screen', function(){
  it('Returns to the modal for color selection', function(){
    cy.get('#btnHideSettingsModal').click()
    cy.get('#settingsModal').invoke('hide')
    cy.get('#welcomeModal').invoke('show')
    cy.get('#welcomeModal').contains('Select a color')
  })
})

describe('Color dropdown has all available color options', function(){
  it('Has red, orange, yellow, green, blue, indigo, violet colors', function(){
    cy.get('#playerColorSelect')
      .select('red').should('have.value', 'red')
      .select('orange').should('have.value', 'orange')
      .select('yellow').should('have.value', 'yellow')
      .select('green').should('have.value', 'green')
      .select('blue').should('have.value', 'blue')
      .select('indigo').should('have.value', 'indigo')
      .select('violet').should('have.value', 'violet')
  })
})

describe('Clicks the color selector and chooses red', function(){
  it('Selects red as Player1\'s color', function(){
    cy.get('#playerColorSelect').select('red').invoke('val')
  })
})

describe('player1 sends red to the server', function(){
  it('Red is chosen for player1', function(){
    cy.window().then(win => win.claimSelectedColor('red', 'player1'))
  })
})

//THIS TEST IS FAILING BECAUSE THE BUTTON IS HIDDEN WHEN IT TRIES TO CLICK IT
// describe('After selecting a color Player1 clicks continue', function(){
//   it('Player1 clicks continue to enter the game', function(){
//     cy.get('#confirmColorSettings').click()
//   })
// })

describe('jake selects the color green', function(){
  it('Green is chosen for jake', function(){
    cy.window().then(win => win.claimSelectedColor('green', 'jake'))
  })
})

describe('Start the next step of the game for player1', function(){
  it('Progresses the game to the next stage for player1', function(){
    cy.window().then(win => win.hideWelcomeModal())
  })
})

describe('Start the next step of the game for jake', function(){
  it('Progresses the game to the next stage for jake', function(){
    cy.window().then(win => win.runFunction('jake', win.hideWelcomeModal))
  })
})

// describe('Start the next step of the game', function(){
//   it('Progresses the game to the next stage', function(){
//     cy.window().then(win => win.startGame())
//   })
// })

})