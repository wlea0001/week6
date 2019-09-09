// const mongoose = require('mongoose');
// let taskSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     from: {type: String, required: true, default: 'Sydney'},
//     to: {type: String, required: true,},
//     airline: {type: String, required: true,},
//     cost: {
//         type: Number,
//         validate: {
//             validator: function (costValue) {
//                 return costValue >= 0;
//             },
//             message: 'Cost should be positive'
//         }
//     },
// });
// module.exports = mongoose.model('Task', taskSchema);


const mongoose = require('mongoose');
const Travel = require('./Models/travelschema');
mongoose.connect('mongodb://localhost:27017/taskDB', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
});
    let travel1 = new Travel({
    _id: new mongoose.Types.ObjectId(),
    from: 'MEL',
    to: 'JNB',
    airline: 'VA',
    cost: 2500
});
travel1.save();
// travel1.save(function (err) {
//     if (err) throw err;
//     console.log('Task successfully Added to DB');
// )};