/// <reference types="cypress" />
import { Database } from '../support/database';
import { draftJob1, draftJob2, draftJob3, job1, job2, job3 } from '../data/jobs';
import { company1, company2, company3, draftCompany1, draftCompany2 } from '../data/companies';


const db = new Database()

const seedData = () => {
  return db
    .saveCompany(company1)
    .then(() => db.saveCompany(company2))
    .then(() => db.saveCompany(company3))
    .then(() => db.saveDraftCompany(draftCompany1))
    .then(() => db.saveDraftCompany(draftCompany2))
}

describe('Companies', () => {

  before(() => {
    cy.login('nzcd3jzMKFbLYOvd7rHIk3066yD2') // Login UID for Testing Service account
  })

  beforeEach(() => {
    db.purgeAllData()
      .then(() => {
        return seedData()
      })
      .then(() => {
        console.log('Seeded!')
      })
  })

  it('Is ready for testing', () => {
    expect(true).to.equal(true)
  })
})