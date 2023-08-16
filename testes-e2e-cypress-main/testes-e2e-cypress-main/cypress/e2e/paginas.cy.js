describe('Testando múltiplas páginas', () => { 
    it('Deve conseguir acessar a página de cartões', ()=>{
        cy.visit('http://localhost:3000/')
      cy.getByData('botao-login').click()
      cy.getByData('email-input').type('neilton@alura.com')
      cy.getByData('senha-input').type('123456')
      cy.getByData('botao-enviar').click()
      cy.getByData('app-home').find('a').eq(1).click()
      cy.getByData('titulo-cartoes').should('exist').and('have.text', 'Meus cartões')
  
    })
   })
    
    
    
    
    
    
    
    
        //cy.visit('http://localhost:3000/')
  