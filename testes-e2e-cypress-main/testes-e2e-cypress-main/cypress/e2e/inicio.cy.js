describe('Página inicial', () => {
  it('Deve renderizar o h1 com o texto correto', () => {
    beforeEach(()=>{
      cy.visit('http://localhost:3000/');
    })
    cy.getByData('titulo-principal').contains(
      'Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!'
    );
  });
});