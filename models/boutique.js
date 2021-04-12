const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boutiqueSchema = new Schema({

    nomArticle: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    prix: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    

});


const Boutique = mongoose.model('boutique', boutiqueSchema);
module.exports.Boutique = Boutique;

