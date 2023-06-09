const SibApiV3Sdk = require('sib-api-v3-sdk');
const Config = require('../configs/config');
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = Config.sendinblue.token

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Send a mail
 * @constructor
 * @param {string} email - Email of the receiver
 * @param {string} templateNumber - Template on sendinblue
 * @param {string} content - params to send to sendinblue. It's an object
 * @return {Promise} - Return a promise
 */
async function sendTemplatedMail(email, templateNumber, params) {
    if (Config.dev) {
        console.log('Mail sent', email, templateNumber, params);
        return;
    }
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.templateId = templateNumber;
    sendSmtpEmail.params = params;

    return apiInstance.sendTransacEmail(sendSmtpEmail);
}

/**
 * Add a contact to a mailling list
 * @constructor
 * @param {string} email - Email of the subscriber
 * @param {string} listId - ID of the email list
 * @param {string} firstname - Firstname of the subscriber
 * @param {string} lastname - Lastname of the subscriber
 * @param {string} currentStatus - Status (student, entreprenor, etc.) of the subscriber
 * @param {string} city - City of subscriber
 * @param {string} zipcode - Zipcode of subscriber
 * @return {Promise} - Return a promise
 */
async function addContact(email, listId, firstname, lastname) {
    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let createContact = new SibApiV3Sdk.CreateContact();

    createContact.email = email;
    if (firstname || lastname) {
        createContact.attributes = {
            FIRSTNAME: firstname,
            LASTNAME: lastname
        };
    }
    try {
        const info = await apiInstance.getContactInfo(email);
    } catch (e) {
        if (e.status === 404) {
            await apiInstance.createContact(createContact);
        }
    }

    let contactEmails = new SibApiV3Sdk.AddContactToList();
    contactEmails.emails = [email];

    return apiInstance.addContactToList(listId, contactEmails);
}

module.exports = {
    addContact,
    sendTemplatedMail
}
