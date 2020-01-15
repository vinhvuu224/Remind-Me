const express = require('express');
const router = express.Router();
const User = require('../models/users.model')

router.route('/sign-up').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.get('/sign-up', (req,res) => res.send('SignUp'));

router.route('/sign-up').post((req,res) => {
    const { name, user, password } = req.body;
    const newUser = new User({name,user,password})

    newUser.save()
    .then(user => {
        res.status(200);
        res.json('User added!');
        res.redirect('/sign-in');

})
    .catch(err => res.status(400).json('Error: ' + err));

    
})



module.exports = router;
