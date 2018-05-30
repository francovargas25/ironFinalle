const router = require ('express').Router();
const Task = require('../models/Task');
const multer = require('multer');
const upload = multer({dest:'../public/images/tasks'})
//se importan clusters y usuarios
const Cluster = require('../models/Cluster');
const User = require('../models/User');

function checkIfLogged(req, res, next){
    if(req.isAuthenticated()) return next();
    res.status(403);
    res.send("You are not authorized");
}


//create new Task http://localhost:3000/cluster/
router.post('/new', (req, res, next) =>{
    Cluster.create(req.body)
       .then(post=>{
           res.json(post);
       }).catch(e=>{
           res.send(e);
   })
});


// Searh all the clusters in db
router.get('/', (req, res)=>{
   Cluster.find()
       .populate("user", "name")
       .populate("tasks")
       .then(posts=>{
           res.json(posts);
       })
       .catch(e=>{
           console.log(e);
           res.send("No funco papud")
       })
});

//delete a cluster
router.delete('/delete/:id', (req, res) => {
    Cluster.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(doc)
    })
})

// View Single cluster
router.get('/:id', (req, res, next) => {
    Cluster.findById(req.params.id, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// Edit cluster
router.put('/edit/:id', (req, res, next) => {
    Cluster.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(meta => {
            res.json(meta)
        })
        .catch(e => next(e))
});


module.exports = router;