const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String

    },
    civility: {
        type: String

    },
    post: {
        type: String
    },
    socialReason: {
        type: String
    },
    Role: {
        type: String,
        enum: [  "SOLAL","ADMIN", "USER","VISITEUR","ENTREPRISE","EMPLOYEE"]
    },
    etat: {
        type: String,
        enum: [  "ACTIF","DESACTIVER"]
    },
    payement: {
        type: Boolean
    },
    creation_dt: { type: Date, require: true }
    ,
    champs: [{
        type: Schema.Types.ObjectId,
        ref: "champ"
    }],
    entreprise: [{
        type: Schema.Types.ObjectId,
        ref: "entreprise"
    }],
});


const User = mongoose.model('user', userSchema);
module.exports.User = User;

