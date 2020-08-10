export class JobPage {
  get titleField(): Cypress.Chainable {
    return cy.get('[data-test-id=field-title] input:first')
  }

  get contactEmailField(): Cypress.Chainable {
    return cy.get('[data-test-id=field-contact-email] input:first')
  }

  get descriptionField(): Cypress.Chainable {
    // No, there is not a '-' missing in 'data-testid'.
    // Draftjs has a unique technique for selecting and modifying text
    return cy.get('[data-testid=field-description]')
  }

  get applicationUrlField(): Cypress.Chainable {
    return cy.get('[data-test-id=field-application-url] input:first')
  }

  get jobTypeField(): Cypress.Chainable {
    return cy.get('#react-select-2-input')
  }

  get companyField(): Cypress.Chainable {
    return cy.get('#react-select-3-input')
  }

  get featuredField(): Cypress.Chainable {
    return cy.get('[data-test-id=field-featured] input:first')
  }

  get draftButton(): Cypress.Chainable {
    return cy.get('[data-test-id=draft-button]')
  }

  get publishButton(): Cypress.Chainable {
    return cy.get('[data-test-id=publish-button]')
  }

  inputTitle(title: string) {
    this.titleField.type(title)
  }

  inputContactEmail(email: string) {
    this.contactEmailField.type(email)
  }

  inputDescription(description: string) {
    this.descriptionField.then(input => {
      const textarea = input.get(0)

      const textEvent = document.createEvent('TextEvent')
      textEvent.initTextEvent('textInput', true, true, null, description)
      textarea.dispatchEvent(textEvent)
    })
  }

  inputApplicationUrl(url: string) {
    this.applicationUrlField.type(url)
  }

  selectJobType(type: 'fullTime' | 'partTime') {
    this.jobTypeField.type(type)
  }

  inputCompany(companyName: string) {
    this.companyField.type(companyName, { force: true })
  }

  toggleFeatured() {
    this.featuredField.check()
  }

  selectFirstCategory() {
    cy.get('.ant-tree-treenode:first .ant-tree-checkbox-inner').click()
  }

  saveDraft() {
    this.draftButton.click()
  }

  publish() {
    this.publishButton.click()
  }
}