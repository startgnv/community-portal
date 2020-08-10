/// <reference types="cypress" />
import { Database } from '../support/database';
import { draftJob1, draftJob2, draftJob3, job1, job2, job3 } from '../data/jobs';
import { JobsPage } from '../support/pages/jobs-admin.page';
import { JobPage } from '../support/pages/job-admin.page';
import { JobRequestPage } from '../support/pages/job-request.page';


const db = new Database()

const seedData = () => {
  return db
    .saveJob(job1)
    .then(() => db.saveJob(job2))
    .then(() => db.saveJob(job3))
    .then(() => db.saveJobDraft(draftJob1))
    .then(() => db.saveJobDraft(draftJob2))
    .then(() => db.saveJobDraft(draftJob3))
}

describe('Jobs', () => {
  const jobsPage = new JobsPage()
  const jobPage = new JobPage()
  const jobRequestPage = new JobRequestPage()

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

  it('Loads saved jobs in the admin portal', () => {
    jobsPage.visit()

    const publishedJobs = jobsPage.publishedJobs;
    const unpublishedJobs = jobsPage.unpublishedJobs;

    publishedJobs.should('have.length', 3)
    unpublishedJobs.should('have.length', 3)
  })

  it('Saves a new job as a draft when coming from the + Icon on the jobs page', () => {
    jobsPage.visit()
    jobsPage.addIcon.click()
    cy.url().should('eq', 'http://localhost:3000/admin/jobs/new')

    jobPage.inputTitle('Test Job')
    jobPage.inputContactEmail('person@test.com')
    jobPage.inputApplicationUrl('linkedin.com')
    jobPage.saveDraft()

    jobsPage.visit()
    jobsPage.unpublishedJobs.should('have.length', 4)
    jobsPage.publishedJobs.should('have.length', 3)
  })

  it('Publishes a new job when coming from the + Icon on the jobs page', () => {
    jobsPage.visit()
    jobsPage.addIcon.click()

    jobPage.inputTitle('Test Job')
    jobPage.inputContactEmail('person@test.com')
    jobPage.inputDescription('Job Description')
    jobPage.inputApplicationUrl('linkedin.com')
    jobPage.inputCompany('Studio Reach{enter}')
    jobPage.selectFirstCategory()
    jobPage.publish()

    jobsPage.visit()
    jobsPage.unpublishedJobs.should('have.length', 3)
    jobsPage.publishedJobs.should('have.length', 4)
  })

  it('Saves a job submitted through the request form as a draft', () => {
    jobRequestPage.visit()

    jobRequestPage.inputTitle('Test Job')
    jobRequestPage.inputApplicationUrl('linkedin.com')
    jobRequestPage.inputContactEmail('person@test.com')
    jobRequestPage.inputCompanyName('Studio Reach')
    jobRequestPage.submitRequest()
    cy.wait(3000)

    jobsPage.visit()
    jobsPage.publishedJobs.should('have.length', 3)
    jobsPage.unpublishedJobs.should('have.length', 4)
  })
})