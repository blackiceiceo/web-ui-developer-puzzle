describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
    // cy.get('[data-testing="toggle-reading-list"]').click();
    // cy.get('[data-testing="remove-reading-list"]').click({multiple:true});

  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to add a book and undo it', () => {
    cy.get('input[type="search"]').type('testing');
    cy.get('form').submit();

    cy.get('[data-testing="add-book"]').first().click();

    cy.get('.mat-simple-snackbar-action .mat-button').last().click();
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('.reading-list-item').should('have.length', 0);
  });

  it('Then: I should be able to remove a book from my reading list and undo it', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();

    cy.get('[data-testing="add-book"]').first().click();

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('.reading-list-item').should('have.length', 1);

    cy.get('[data-testing="remove-reading-list"]').click();
    cy.get('.mat-simple-snackbar-action .mat-button').last().click();

    cy.get('.reading-list-item').should('have.length', 1);
  });

});