describe('Home Page tests', () => {
  it('Displays the initial information', () => {
    cy.visit('/')

    cy.contains("Because they aren't.")
    cy.contains('Write your ideas. Keep your docs safe and private. Decide where your data goes.')
    cy.contains('Become a Beta Tester')
    cy.contains('Available on:')
    cy.contains('Windows')
    cy.contains('Linux')
    cy.contains('Mac')
  })

  it('Displays navigation links', () => {
    cy.visit('/')

    cy.contains('How it works')
    cy.contains('Privacy')
    cy.contains('Plans')
    cy.contains('Docs')
  })

  it('It should be possible to navigate to download page', () => {
    cy.visit('/')

    cy.contains('Become a Beta Tester').click()

    cy.url().should('include', '/download')
  })
})
