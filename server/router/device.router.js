const express = require('express');
const multer = require('multer')
var router = express.Router();
const sharp = require('sharp')
const fs = require('fs')
var path = require('path')

const deviceController = require("../controllers/device.controller")


router.post('/add' , deviceController.addDevice);

router.get("/get"  , deviceController.getDevice)

router.post("/updateMode" , deviceController.updateMode)

module.exports = router