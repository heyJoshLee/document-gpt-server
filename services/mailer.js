import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;
const ADMIN_EMAIL_PASSWORD = process.env.ADMIN_EMAIL_PASSWORD;
const ADMIN_SENDING_FROM_NAME = process.env.ADMIN_SENDING_FROM_NAME;
const DOMAIN_NAME = process.env.DOMAIN_NAME;

// Helper function to generate HTML for document links
const generateReviewDocumentLinkHtml = (document) => {
  const documentLink = `${DOMAIN_NAME}/admin/documents/${document._id}`;
  return `<p>${document.title}: Click <a href="${documentLink}">here</a> to view the document.</p>`
}

// Base function to send an email
export function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ADMIN_EMAIL_ADDRESS,
      pass: ADMIN_EMAIL_PASSWORD
    }
  })

  let mailOptions = {
    from: ADMIN_SENDING_FROM_NAME,
    to: to,
    subject: subject,
    html
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email successfully sent to ' + to);
      console.log('Email sent: ' + info.response);
    }
  });
}

// Takes a submission and an array of documents and sends an email to the admin with links to review the documents
export function sendAdminEmailToReviewDocuments(submission, documentArray) {
  try {
    let emailBody = `
    <h1>New Documents to Review</h1>
    <p>${documentArray[0]?.userEmail} has generated the following documents</p>
    <p>There are ${documentArray.length} new documents to review.</p>
    <p>View all the documents <a href='${DOMAIN_NAME}/admin/submissions/${submission._id}' >here.</a></p>
    `
    documentArray.forEach(document => {
      emailBody += generateReviewDocumentLinkHtml(document);
    })
    sendEmail(
      ADMIN_EMAIL_ADDRESS,
      `${documentArray.length} New Documents to Review`,
      emailBody,
    )
  } catch (error) {
    sendAdminDocumentErrorEmail(document, error);
    return;
  };
}

// Sends an email to the user when their document is approved. Link goes to the user's documents page, not a specific document page
export function sendCustomerEmailDocumentApproved(user, sendTo = null) {
  try {
    const documentLink = `${DOMAIN_NAME}/users/${user._id}/documents/`;
    let emailBody = `
      <h1>Your documents are ready</h1>
      <p>Please <a href='${documentLink}'>click here</a> to download your documents</p>
      <p>Thank you for using our service!</p>
      <p>For any problems, please email ${ADMIN_EMAIL_ADDRESS}</p>
      `;

    sendEmail(
      sendTo ?? user.email,
      'Document Approved',
      emailBody,
    );
    return;
  } catch (error) {
    sendAdminGenericErrorEmail(error);
    return;
  }
}

const sendAdminDocumentErrorEmail = (document, error = 'Unspecified error') => {
  const emailBody = `
  <h1>Error processing document</h1>
  <p>There was an error processing document '${document?.title}'. Document ID: ${document?._id}</p>
  <p>Timestamp: ${new Date()}</p>
  <p>Error: ${error}</p>
  `;

  sendEmail(
    ADMIN_EMAIL_ADDRESS,
    'Error processing document',
    emailBody,
  );
  return;
}

const sendAdminGenericErrorEmail = (error = 'Unspecified error') => {
  const emailBody = `
  <h1>Server error</h1>
  <p>There was an error on the server.</p>
  <p>Timestamp: ${new Date()}</p>
  <p>Error: ${error}</p>
  `;
  sendEmail(
    ADMIN_EMAIL_ADDRESS,
    'Server error',
    emailBody,
  );
}