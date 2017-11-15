const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recepients: [String]
})

mongoose.model('surveys', surveySchema);