const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({

  
    markers: 
        [{
            type: Schema.Types.ObjectId,
            ref: "marker"
        }],
        
    name: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    userId: {
        type: String,
    },
});


const Project = mongoose.model('Project', projectSchema);
module.exports.Project = Project;

