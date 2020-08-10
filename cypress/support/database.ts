
enum TestCollections {
  jobs = 'jobsTest',
  draftJobs = 'draftJobsTest',
  companies = 'companiesTest',
  draftCompanies = 'draftCompanies'
}

export class Database {
  saveJob(job: any): Cypress.Chainable {
    return cy.callFirestore('add', TestCollections.jobs, job)
  }

  saveJobDraft(draft: any): Cypress.Chainable {
    return cy.callFirestore('add', TestCollections.draftJobs, draft)
  }

  saveCompany(company: any): Cypress.Chainable {
    return cy.callFirestore('add', TestCollections.companies, company)
  }

  saveDraftCompany(draft: any): Cypress.Chainable {
    return cy.callFirestore('add', TestCollections.draftCompanies, draft)
  }

  purgeAllData(): Cypress.Chainable {
    return this
      .deleteAllInCollection(TestCollections.jobs)
      .then(() => this.deleteAllInCollection(TestCollections.draftJobs))
      .then(() => this.deleteAllInCollection(TestCollections.companies))
  }

  private deleteAllInCollection(collection: string): Cypress.Chainable {
    return cy.callFirestore('delete', collection)
  }
}
