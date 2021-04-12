const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({

  
    marker: {
        type: String,
    },
    imageUrl: {
        type: String
    },
    userId: {
        type: String,
    },
});


const Project = mongoose.model('Project', projectSchema);
module.exports.Project = Project;

