export class JobsPage {
  private readonly baseUrl = 'http://localhost:3000/admin/jobs/'

  visit() {
    cy.visit(this.baseUrl)
  }

  get publishedJobs(): Cypress.Chainable {
    return cy.get('[data-test-id^=job-published-]')
  }

  get unpublishedJobs(): Cypress.Chainable {
    return cy.get('[data-test-id^=job-unpublished-]')
  }

  get addIcon(): Cypress.Chainable {
    return cy.get('[data-test-id=add-icon]')
  }

  sortUnpublished(sort: 'Updated' | 'Created') {

  }
}