var mongoose = require('mongoose');

var data = new mongoose.Schema({
    userId: { 
        type: String, 
        require: true   
    },
    name: {
        type: String, 
        require: true 
    },
    mode:{
        type: Object,
        require: true,
    },
    // vote :{
    //     type :Object,
    //     require: true
    // },
    // email:{
    //     type: String,
    //     require: true
    // },
    // permitsion:{
    //     type: Boolean
    // }
});

var deviceData = mongoose.model('deviceData', data, 'deviceData');

module.exports = deviceData;