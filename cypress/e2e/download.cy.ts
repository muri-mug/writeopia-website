describe('Download Page', () => {
  beforeEach(() => {
    cy.visit('/download');
  });

  it('renders the download page', () => {
    cy.url().should('include', '/download');
  });

  it('shows platform download sections', () => {
    cy.contains('Windows').should('exist');
    cy.contains('Mac').should('exist');
    cy.contains('Linux').should('exist');
  });

  it('has a link back to home', () => {
    cy.get('header').should('exist');
  });
});
