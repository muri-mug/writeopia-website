describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('header is visible and contains main nav links', () => {
    cy.get('header').should('be.visible');
    cy.contains('How it works').should('be.visible');
    cy.contains('Privacy').should('be.visible');
    cy.contains('Plans').should('be.visible');
    cy.contains('Docs').should('be.visible');
  });

  it('navigates to docs page', () => {
    cy.contains('Docs').click();
    cy.url().should('include', '/docs');
    cy.get('main, [role="main"], #docs-content, .docs').should('exist');
  });

  it('navigates to download page via CTA in header', () => {
    cy.contains('Become a Beta Tester').first().click();
    cy.url().should('include', '/download');
  });

  it('logo link navigates to home', () => {
    cy.visit('/download');
    cy.get('header a').first().click();
    cy.url().should('match', /\/$|\/$/);
  });

  it('renders footer with social links', () => {
    cy.get('footer').should('exist');
    cy.get('footer a[aria-label="LinkedIn"]').should('exist');
    cy.get('footer a[aria-label="GitHub"]').should('exist');
  });
});
