const { Schema, model } = require("mongoose");

const aplicationSchema = new Schema({
    
    name: String,

    created_at:{
        type: Date,
        default: Date.now
    },

    updated_at:{
        type: Date,
        default: null
    }

});

module.exports = model('aplications', aplicationSchema);