import express from 'express';
const app = express();
import mongodb from 'mongodb';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

var MongoClient = mongodb.MongoClient;

app.use(cors());
app.use(express.json())



app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 


const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(uri,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.get('/', function (req, res) {
    res.send('working....');
});
