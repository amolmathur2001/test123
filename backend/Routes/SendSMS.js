const express = require('express');
const router = express.Router();
const client = require('twilio')("ACe8f7a7222d10d0abd978304c3bda4aef","8c2b2ab9874d4d6639a7551989e98d92");

router.post('/sendMessage',(req,res) =>{
    const phone = req.body.phone;
    const name = req.body.name;
    client.messages.create({
        body : `Hello ${name},Your table at Barbeque City is Booked,Please reach 10min beofore the time`,
        from: "+14325276039",
        to : phone,
    }).then((messages) =>{
        res.status(200).json({msg : "Your Otp is send"});
    }).catch((err) =>{
        console.log(err.message);
        return res.json({error : err.message});
    })
    
});
module.exports = router