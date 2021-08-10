const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const mongoose = require('mongoose');
const dotenv = require('dotenv')
const passport = require('passport')
const router = express.Router()
const session = require('express-session')
const MongoStore = require('connect-mongo');
require('./config/passport');


const indexRoute = require("./routes/index");
const authRoute = require('./routes/auth');
const pinataRoute = require('./routes/pinata');
const balanceRoute = require('./routes/balance');

const User = require('./src/models/User')


var app=express();



dotenv.config();



//MIDDLEWARE

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.urlencoded({extended:true}))
app.use(
    session({
      secret: 'achimbubert123',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
  )
  app.use(cookieParser('achimbubert123'))



// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use(indexRoute)
app.use('/auth', authRoute);
app.use('/pinata', pinataRoute);
//app.use('/balance', balanceRoute);


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


const port = process.env.PORT || 5000;

app.use(express.static('public'))
app.set('view engine','ejs');


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then( () => {
    console.log('Connected to database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 

