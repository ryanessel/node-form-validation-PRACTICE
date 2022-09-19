const { Router } = require('express');
const router = new Router();
//settiing up the bcrypt methods to be usable
const bcryptjs = require(`bcryptjs`);
const saltRounds = 10;
const User = require('../models/User.model');// makes model accesable


// The get method reveals that upon the get request from 
// the user, as a response the file signup.hbs will be 
// sent and rendered to them
router.get(`/signup`, (req, res, next) => {// remeber you need a "/" in the route for the local host!
    res.render(`auth/signup`)
})

router.post(`/signup`, (req, res, next) => {
    // console.log(`Form Data: `, req.body);
    const { username, email, password } = req.body;

    bcryptjs
      .genSalt(saltRounds)
      .then(salt => bcryptjs.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
            username,
            email,
            passwordHash: hashedPassword

        })
      })
      .then(userFromDb => {
        // console.log(`New user created: `, userFromDb)
        res.redirect(`/userProfile`)
      })
      .catch(error => {
        next(error)
      });

});


router.get(`/userProfile`, (req, res, next) => {
    res.render(`users/user-profile`)

});




module.exports = router;