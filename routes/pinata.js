const router = require('express').Router()
//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const small = require('../pinatas/small')
const mongoose = require('mongoose')
const Pinata = require('../src/models/Pinata')
const User = require('../src/models/User')



mongoose.set('useFindAndModify', false);

router.post('/', ensureAuth ,async (req, res) => {
    console.log(req.body);


    const newPinata = {
        amount: 0,
        limit: 100,
        crackedAt: null,
        winner:null,
      }

    try {
        //find the user in our database 

        let user = await User.findById(req.user._id).exec()
        //find one an dupadate reserved false (xor lock)

        //reserved true
        let pinata = await Pinata.findOneAndUpdate({ winner: null, reserved: false}, {reserved: true}).exec();
        //let user = User.findById(req.user._id).exec()
        //console.log(pinata);
        console.log(req.user);
        console.log('following is user from db');
        console.log(user);
        console.log(user.balance);



        if (pinata !== null) {



          
        var userAmount = parseInt(req.body.amount);
        var userBalance = parseInt(req.user.balance);
        var pinataAmount = pinata.amount;
        var newAmount = pinataAmount+userAmount;
        var newUserBalance = (userBalance-userAmount);

        


        if(userBalance<userAmount){ 
          //reserved false
          pinata.reserved = false;
          var query = {'_id': pinata._id, 'reserved': true};

          await Pinata.findOneAndUpdate(query, pinata, function(err, doc) {
            if (err) console.log(err);
              console.log('pinata updated');
          });
          console.log('error: user balance not sufficient');
          res.send('insufficient funds')
          
          return;
        }
        else{
          user.balance = newUserBalance;
          console.log('user Balance: '+userBalance);
          console.log('user Amount: '+userAmount);
          console.log('new user Balance: '+newUserBalance);
          user.save();
        }

            //Pinata cracked
        if((pinataAmount+userAmount)>=pinata.limit){
                console.log('cracked');
                pinata.amount = newAmount;
                pinata.crackedAt = Date.now();
                pinata.winner = /*req.*/user.googleId;
                pinata.timesHit = pinata.timesHit +1;
                pinata.reserved = false;

                var query = {'_id': pinata._id, 'reserved': true};

                await Pinata.findOneAndUpdate(query, pinata, function(err, doc) {
                  if (err) console.log(err);
                    console.log('pinata updated');
                });
                

                freshPinata = new Pinata(newPinata);
                freshPinata.save()
                              
                user.balance = user.balance+pinata.limit;
                
                var userQuery = {'_id': user._id};
                await User.findOneAndUpdate(userQuery, user, function(err, doc) {
                  if (err) console.log(err);
                    console.log('user updated');
                    console.log(user.balance);
                    console.log(newUserBalance);
                    console.log(pinataAmount);
                });

                
            }
            //Pinata not cracked
        else{
                console.log('added balance');
                pinata.amount = newAmount;
                pinata.timesHit = pinata.timesHit +1;
                pinata.reserved = false;
                

                var query = {'_id': pinata._id, 'reserved': true};

                await Pinata.findOneAndUpdate(query, pinata, function(err, doc) {
                  if (err) console.log(err);
                    console.log('pinata updated');
                });


                //pinata.reserved = false;
                //pinata.save();
                console.log(pinata);
                console.log('added funds');
            }
        //Pinata not there for some reason
        } else {
          console.log('no pinata found. created new one');
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
    console.log(req.user);
    res.send(req.user);
  })

module.exports=router;