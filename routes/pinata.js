const router = require('express').Router()
//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const small = require('../pinatas/small')
const mongoose = require('mongoose')
const Pinata = require('../src/models/Pinata')
const User = require('../src/models/User')





router.post('/'/*, ensureAuth*/ ,async (req, res) => {
    console.log(req.body);


    const newPinata = {
        amount: 0,
        limit: 100,
        crackedAt: null,
        winner:null,
      }

    const user = {_id: "60d9e8b1170cdd08d035b330",
        googleId:"104412984954338180869",displayName:"Sibi Mobon",firstName:"Sibi",lastName:"Mobon",image:"https://lh3.googleusercontent.com/a/AATXAJyBXKUtzqQ0SmN_RgSrGt2hHX4ZKrI-vscZ5Dk0=s96-c",email:"siluloe@gmail.com",createdAt:"2021-06-28T15:20:17.928Z",__v:0}
    
    try {
        //find the user in our database 
        let pinata = await Pinata.findOne({ winner: null }).exec();
        //let user = User.findById(req.user._id).exec()

        //console.log(pinata !== null);

        
        if (pinata !== null) {

            var userAmount = parseInt(req.body.amount);
            var userBalance = parseInt(req.body.balance);
            var pinataAmount = pinata.amount;
            var newAmount = userAmount+pinataAmount;


            console.log(typeof userAmount);
            console.log(typeof pinataAmount);
            console.log(typeof newAmount);


            console.log(userAmount);
            console.log(pinataAmount);
            console.log(newAmount);



            console.log(pinata);
            console.log('found pinata');
            console.log(pinataAmount);
            console.log(userAmount);
            console.log(pinata.limit);
            console.log(userAmount+pinataAmount);
            console.log((pinataAmount+userAmount)>pinata.limit);
            if((pinataAmount+userAmount)>pinata.limit){
                pinata.amount = newAmount;
                pinata.crackedAt = Date.now();
                pinata.winner = req.user.googleId;

                newPinata = pinata = new Pinata(newPinata);

                user.balance = userBalance+pinataAmount;

                pinata.save();
                user.save();
            }
            else{
                pinata.amount = pinataAmount+userAmount;
                pinata.save();
                console.log('added funds');
            }
        } else {
          pinata = new Pinata(newPinata);
          pinata.save();
          console.log('new pinata')
          console.log(pinata.amount)
        }

      } catch (err) {
        console.error(err)
      }
   // const curr = Pinata.find();
    //console.log(curr);
   // console.log(req.user)
    res.send(req.body.amount);
  })

  router.get('/', ensureAuth ,(req, res) => {
    res.send(req.user);
  })

module.exports=router;