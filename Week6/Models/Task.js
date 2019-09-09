const mongoose = require('mongoose');
let taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    },
    dueDate: {
        type: Date,
    },
    status: {
        type: String,
        validate: {
            validator: function (statusValue) {
                console.log(statusValue);
                return statusValue == 'In Progress' || statusValue == 'Complete';
            },
            message: 'Status should be in progress or complete'
        }
    },

    description: {
        type: String
    }
});
module.exports = mongoose.model('Task', taskSchema);