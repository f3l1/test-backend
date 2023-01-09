const { Schema, model } =  require('mongoose');
const  ObjectID = require('mongodb').ObjectId;

const logSchema = new Schema({    
        
    application_id: ObjectID, 

    type: String, 

    priority: String,

    path: String, 

    message: String, 

    request: { data: Schema.Types.Mixed }, 

    response: { data: Schema.Types.Mixed },

    created_at:{
        type: Date,
        default: Date.now
    },

    updated_at:{
        type: Date,
        default: null
    }    
});

module.exports = model('logs', logSchema);