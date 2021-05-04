const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markerSchema = new Schema({

  
    actions: 
        [{
            type: Schema.Types.ObjectId,
            ref: "Action"
        }],
    imageUrl: {
        type: String,
    },
    markerUrl: {
        type: String,
    },
    markerName: {
        type: String,
    },
});


const Marker = mongoose.model('marker', markerSchema);
module.exports.Marker = Marker;

