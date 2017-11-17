const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

export default class Mailer extends helper.Mail {
    constructor({ subject, recepients }, content) {
        super();

        this.from_email = new helper.Email('no-reply@dispatcher.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recepients = this.formatAddresses(recepients);
    }

}