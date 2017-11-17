const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

export default class Mailer extends helper.Mail {

}