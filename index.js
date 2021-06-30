const express = require('express');
const bodyParser = require("body-parser");

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

const User = require('./src/models/User')


var app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();



//MIDDLEWARE
app.use(express.urlencoded({extended:true}))
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
  )



// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use(indexRoute)
app.use('/auth', authRoute);
app.use('/pinata', pinataRoute);





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

