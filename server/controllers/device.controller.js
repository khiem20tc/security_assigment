const md5 = require('md5')
const fs = require('fs')
const http = require('http')
const path = require('path')

const deviceModel = require("../models/device")


module.exports.getDevice = async function(req , res) {
    var userId;
    try
    {
        userId = req.body.userId
    }catch(err){
        res.send(err)
        return
    }

    var deviceList
    await deviceModel.find({
        userId: userId
    },function(err , data){
        if (err)
        {
            res.send(err)
            return
        }
        deviceList = data
    })

    res.send(deviceList)

}

module.exports.addDevice = async function(req , res){
    try{
        var userId, mode, name
        
        name = req.body.name
        userId = req.body.userId
        data = req.body.mode
        
        var deviceData = new deviceModel({
            userId : userId,
            name: name,
            mode : mode
        })

        await deviceData.save(function(err){
            if (err){
                res.send(err)
                return
            }
            res.send("success")
        })

    }catch(err){
        res.send(err)
    }
}

module.exports.updateMode = async function (req , res){
    try {
        var userId = req.body.userId;
        var deviceId = req.body.deviceId;
        var mode = req.body.mode;
        
        await deviceModel.findByIdAndUpdate({
            _id : deviceId
        },{
            $set: {
                mode : mode
            }
        }, function(err){
            if (err){
                res.send(err)
                return
            }
            res.send("success")
        })  
    } catch (error) {
        res.send(error)        
    }
}

