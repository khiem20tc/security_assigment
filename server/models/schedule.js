var mongoose = require('mongoose');

var data = new mongoose.Schema({
    userId: { 
        type: String, 
        require: true   
    },
    schedule: {
        type: Object, 
        require: true 
    }
});

var scheduleData = mongoose.model('userData', data, 'userData');

module.exports = scheduleData;