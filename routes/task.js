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


//create new Task http://localhost:3000/task/
router.post('/new', (req, res, next) =>{
    Task.create(req.body)
       .then(post=>{
           res.json(post);
       }).catch(e=>{
           res.send(e);
   })
});


// Searh all the tasks in db
router.get('/', (req, res)=>{
   Task.find()
       .populate("user", "name")
       .populate("clusters")
       .then(posts=>{
           res.json(posts);
       })
       .catch(e=>{
           console.log(e);
           res.send("No funco papud")
       })
});

//delete a task
router.delete('/delete/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(doc)
    })
})

// View Single Task
router.get('/:id', (req, res, next) => {
    Task.findById(req.params.id, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// Edit Task
router.put('/edit/:id', (req, res, next) => {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(meta => {
            res.json(meta)
        })
        .catch(e => next(e))
});

module.exports = router;