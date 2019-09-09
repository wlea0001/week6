const mongoose = require('mongoose');
let developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    level: { //need to save in all caps
        type: String,
        required: true,
        validate: {
            validator: function (levelValue) {
                return levelValue == 'BEGINNER' || levelValue == 'EXPERT';
            },
            message: 'Level should be beginner or expert'
        }
    },

    address: {
        State: String,
        Suburb: String,
        Street: String,
        Unit: Number
    },
 
});
module.exports = mongoose.model('Developer', developerSchema);