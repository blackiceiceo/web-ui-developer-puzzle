describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  // afterEach(() => {
  //   cy.startAt('/');
  //   cy.get('[data-testing="toggle-reading-list"]').click();
  //   cy.get('[data-testing="book-remove"]').click({multiple:true});
  // })

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should click on the finish checkbox', () => {
    cy.get('input[type="search"]').type('java');
    cy.get('form').submit();

    cy.get('[data-testing="add-book"]').first().click();

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('.reading-list-item').should('have.length', 1);
    cy.get('[data-testing="add-book"]').first().should('have.text', ' Want to Read ');

    cy.get('[data-testing="finished-toggle"]').first().click();

    cy.get('[data-testing="add-book"]').first().should('have.text', ' Finished ');
    cy.get('[data-testing="finished-book-info"]').first().should('contain.text', ' Finished book on ')

    cy.get('[data-testing="finished-toggle"]').first().click();
    cy.get('[data-testing="add-book"]').first().should('have.text', ' Want to Read ');

  });
});
