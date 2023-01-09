const { Schema, model } = require("mongoose");
const  ObjectID = require('mongodb').ObjectId;

const authorizationSchema = new Schema({
    
    application_id: ObjectID, 

    token: String,

    created_at:{
        type: Date,
        default: Date.now
    },

    updated_at:{
        type: Date,
        default: null
    }

});

module.exports = model('authorizations', authorizationSchema);