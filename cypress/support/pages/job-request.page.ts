export class JobRequestPage {
  private readonly baseUrl = 'http://localhost:3000/request-job'

  visit() {
    cy.visit(this.baseUrl)
  }

  get titleField(): Cypress.Chainable {
    return cy.get('[data-test-id=field-job-title]')
  }

  get contactEmailField(): Cypress.Chainable {
    return cy.get('[data-test-id=field-contact-email]')
  }

  get descriptionField(): Cypress.Chainable {
    // No, there is not a '-' missing in 'data-testid'.
    // Draftjs has a unique technique for selecting and modifying text
    return cy.get('[data-testid=field-description]')
  }

  get applicationUrlField(): Cypress.Chainable {
    return cy.get('[data-test-id=field-application-url]')
  }

  get companyNameField(): Cypress.Chainable {
    return cy.get('[data-test-id=field-company-name]')
  }

  get submitButton(): Cypress.Chainable {
    return cy.get('[data-test-id=submit]')
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

  inputCompanyName(companyName: string) {
    this.companyNameField.type(companyName)
  }

  submitRequest() {
    this.submitButton.click()
  }
}