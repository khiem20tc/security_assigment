// const express = require('express');
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const mongoose = require('mongoose')
// const path = require('path')
// require('dotenv').config();


// const authRouter = require('./router/authen.router')
// const logRouter = require('./router/log.router')
// const validateAuth = require('./validate/auth.validate')
// const deviceRouter = require('./router/device.router')

// const sessionMiddleware = require('./middleware/session.middleware')


// mongoose.connect(process.env.MONGO_URL, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true, 
//     serverSelectionTimeoutMS: 5000 
// }).catch(err => console.log(err)); 
// mongoose.set('useFindAndModify', false);

// const app = express();
// const port = process.env.PORT || 8080;

// // app.set('view engine', 'pug');
// // app.set('views', './views');

// app.use(bodyParser.urlencoded({ extended: true }))
 
// // parse application/json
// app.use(bodyParser.json())
// app.use(cookieParser('process.env.SESSION_SECRET'));
// app.use(sessionMiddleware)

// app.use(express.static('public'));

// // app.get('/', function (req, res) {
// //     res.render('home');
// // });

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,  X-Auth-Token');
//   next();
// });




// app.use('/auth' , authRouter)
// app.use('/log' , logRouter)
// app.use('/device',deviceRouter)



// app.listen(8080, function () {
//     console.log("port: " + port);
// }) 

const express = require("express");
const session = require("express-session");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;

let app = express();

// Globals
const OKTA_ISSUER_URI = process.env.OKTA_ISSUER_URI;
const OKTA_CLIENT_ID = process.env.OKTA_CLIENT_ID;
const OKTA_CLIENT_SECRET = process.env.OKTA_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const PORT = process.env.PORT || "3000";
const SECRET = process.env.SECRET;

// App settings
app.set("view engine", "pug");

// App middleware
app.use("/static", express.static("static"));

app.use(session({
  cookie: { httpOnly: true },
  secret: process.env.SECRET
}));

let oidc = new ExpressOIDC({
  issuer: OKTA_ISSUER_URI,
  client_id: OKTA_CLIENT_ID,
  client_secret: OKTA_CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  routes: { callback: { defaultRedirect: "/dashboard" } },
  scope: 'openid profile'
});

// App routes
app.use(oidc.router);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard", oidc.ensureAuthenticated(), (req, res) => {
  res.render("dashboard", { user: req.userinfo });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

oidc.on("ready", () => {
  console.log("Server running on port: " + PORT);
  app.listen(parseInt(PORT));
});

oidc.on("error", err => {
  console.error(err);
});
