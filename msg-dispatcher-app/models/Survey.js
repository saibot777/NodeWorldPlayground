const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecepientSchema = require('./Recepient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recepients: [RecepientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
});

mongoose.model('surveys', surveySchema);