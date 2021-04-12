const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const champSchema = new Schema({

    label: {
        type: String,
        required: true
    },
    superficie: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    lattitude: {
        type: Number,
        required: true
    },
    bassins: [{
        type: Schema.Types.ObjectId,
        ref: "bassin"
    }],

});


const Champ = mongoose.model('champ', champSchema);
module.exports.Champ = Champ;

