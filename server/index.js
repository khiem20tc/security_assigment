const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config();


const authRouter = require('./router/authen.router')
const logRouter = require('./router/log.router')
const validateAuth = require('./validate/auth.validate')
const deviceRouter = require('./Router/device.router')

const sessionMiddleware = require('./middleware/session.middleware')


mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverSelectionTimeoutMS: 5000 
}).catch(err => console.log(err)); 
mongoose.set('useFindAndModify', false);

const app = express();
const port = process.env.PORT || 8080;

// app.set('view engine', 'pug');
// app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser('process.env.SESSION_SECRET'));
app.use(sessionMiddleware)

app.use(express.static('public'));

// app.get('/', function (req, res) {
//     res.render('home');
// });

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,  X-Auth-Token');
  next();
});




app.use('/auth' , authRouter)
app.use('/log' , logRouter)
app.use('/device',deviceRouter)



app.listen(8080, function () {
    console.log("port: " + port);
}) 