import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';


interface CompanyResponse {
  companyAddress: string
  companyName: string
  email: string
  name: string
}

exports.emailCompanyResponse = functions.firestore
  .document('addCompanyResponses/{response}')
  .onCreate((snap, context) => {
    sgMail.setApiKey(functions.config().sendgrid.apikey);
    const response = snap.data() as CompanyResponse;

    if (response === undefined) throw new Error('Could not extract data from document');

    sgMail.send({
      to: 'lauren@startupgnv.com',
      from: 'will@startupgnv.com',
      subject: 'New Company Response',
      html: `
        <h1>New Company Response</h1>
        <ul>
          <li><strong>Name:</strong> ${response.name}</li>
          <li><strong>Email:</strong> ${response.email}</li>
          <li><strong>Company Name:</strong> ${response.companyName}</li>
          <li><strong>Company Address:</strong> ${response.companyAddress}</li>
        </ul>
      `,
    });
});
