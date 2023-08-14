Cypress.Commands.add('getByData', (seletor)=> {
    return cy.get(`[data-test=${seletor}]`)
})
