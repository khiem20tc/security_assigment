const md5 = require('md5')
const fs = require('fs')
const http = require('http')
const path = require('path')

const userData = require('../models/user')


module.exports.creatAcount = async function(req , res){
    console.log(req.body )
    // console.log(req.file)
    var image = fs.readFileSync('./public/image/avatar/' + 'edited-' + req.file.originalname).toString('base64')
    var finalImage = {
        type: 'image/png',
        image: Buffer.from(image , 'base64')
    }
    var data = new userData({
        name : req.body.name,
        pass : md5(req.body.pass),
        email: req.body.email,
        avatar : finalImage,
        permitsion: false
    })

   console.log(req.body.email)
    await data.save(function(err){
        if(err){
            res.send(JSON.stringify(err))
            return
        }
        res.send("success")
        // res.redirect("http://moewreview.press/login.html") 
    })

}

module.exports.login = function(req , res){
    res.render('login'); 
};

module.exports.postLogin = async function(req , res){

    // console.log(req.body)
    
    res.cookie('userId', req.body.userData._id, {
                signed : true
            });
    res.redirect('/creat');
}

module.exports.signOut = function(req , res){
 
    res.clearCookie('userId');
    res.redirect('login');
}

module.exports.loginUser = function(req, res){
   
    if (req.body.success == true)
        req.body.userData.pass = ''
    
    res.send(JSON.stringify( req.body))
}

module.exports.checkMail = async function(req , res){
    const email = req.body.email
    var check = await userData.find({
        email: email
    })

    if (check.length == 0) {
        res.send(true)
        console.log(check)
        return
    }
    console.log(1)  

    res.send(false)  
}

module.exports.test = function(req, res){
    const fileUpload = req.file
    const fileName = fileUpload.originalname
    var temp = __dirname.replace('controllers' , '')
    const files = fs.readdirSync(path.join(  temp + 'public/image/avatar/'))

    for (const file of files) {
        console.log(file)
    }

    // var nameHTMLPage = req.params.content
    res.sendFile(path.join(  temp + 'public/image/avatar/'+ fileName))
}