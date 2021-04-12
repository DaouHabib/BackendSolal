const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrepirseSchema = new Schema({

    label: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    

});


const Entreprise = mongoose.model('entreprise', entrepirseSchema);
module.exports.Entreprise = Entreprise;

