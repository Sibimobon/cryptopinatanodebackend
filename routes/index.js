
const router = require('express').Router()
const mongoose = require('mongoose')

//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const User = require('../src/models/User')


router.get('/', ensureGuest ,(req, res) => {
    res.render('login')
  })

router.get("/log",ensureAuth, async(req,res)=>{
    res.render('index',{userinfo:req.user})
})

router.get("/user",ensureAuth, async(req,res)=>{
  console.log(req.headers);
  console.log(req.user);
  let user = await User.findById(req.user._id).exec()
  console.log(user)
  res.send(user);
})

module.exports=router;