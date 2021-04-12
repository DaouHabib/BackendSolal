const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offreSchema = new Schema({

    prix: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    
    

});


const Offre = mongoose.model('offre', offreSchema);
module.exports.Offre = Offre;

