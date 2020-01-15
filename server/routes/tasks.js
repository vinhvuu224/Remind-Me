const router = require('express').Router();
let Task = require('../models/tasks.model');

router.route('').get((req,res) => {
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('').post((req,res) => {
    const user = req.body.user;
    const task = req.body.task;
    const newTask = new Task({user,task}); 

    newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) => {
    Task.findByIdAndDelete(req.params.id)
    .then(() => res.json({remove: true}))
    .catch(err => res.status(400).json('Error: ' + err));

})

router.route('/:id').put((req,res) => {
    Task.findByIdAndUpdate(req.params.id,req.body)
    .then(() => res.json({update: true}))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;