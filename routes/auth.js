const express = require ('express');
const router = express.Router();
const User = require ('../models/User');
const Task = require ('../models/Task.js')
const passport = require('passport');

function checkIfLogged(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } 
        return res.status(403).json({message:
        "favor de iniciar sesion"})
};

//create user
router.post('/signup', (req,res,next)=>{
    console.log(req.body)
    User.register(req.body, req.body.password, (err,user)=>{
        if(err) return res.json(err);
        return res.json(user);
    })
});

//login user
router.post ('/login', passport.authenticate('local'),
(req,res,next)=>{
    return res.json(req.user);
});

//logout user
router.get('/logout', (req,res)=>{
    req.logout();
    res.json({message:"Hasta pronto!"});
})

//
router.get('/private', checkIfLogged,(req,res)=>{
res.json({message:"Bienvenido" + req.user})
})

// Searh all the users in db
router.get('/users', (req, res)=>{
    User.find()
        .populate("user", "name")
        .populate("clusters")
        .then(users=>{
            res.json(users);
        })
        .catch(e=>{
            console.log(e);
            res.send("No funco papud")
        })
 });

module.exports = router;