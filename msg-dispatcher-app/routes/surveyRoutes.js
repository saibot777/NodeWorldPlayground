const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email =>  ({ email })),
            _user: req.user.id,
            dateSent: Date.now()
        }); 

        let mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await mailer.save();
            req.user.credits -= 1;
            let user = await req.user.save();
    
            // res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
}