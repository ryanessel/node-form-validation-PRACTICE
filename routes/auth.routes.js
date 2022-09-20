const { Router } = require('express');
const router = new Router();
//settiing up the bcrypt methods to be usable
const bcryptjs = require(`bcryptjs`);
const saltRounds = 10;
const User = require('../models/User.model');// makes model accesable
const { default: mongoose } = require('mongoose');
const { route } = require('./index.routes');

//requiring the auth "custom" middlware
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');


//※※※※※※※※※※※START-SIGNUP-ROUTE※※※※※※※※※※※※※※※※※
// The get method reveals that upon the get request from 
// the user, as a response the file signup.hbs will be 
// sent and rendered to them
router.get(`/signup`, isLoggedOut, (req, res, next) => {// remeber you need a "/" in the route for the local host!
    res.render(`auth/signup`)
})
//SIGNUP VALIDATION line 16-68.
router.post(`/signup`, (req, res, next) => {
    // console.log(`Form Data: `, req.body);
    const { username, email, password } = req.body;

    //if any of the forms are empty run the following mssage.
    // at the signup.hbs at the bottomo of the page.
    if(!username || !email || !password) {
        res.render(`auth/signup`, {errorMessage: `✖Please fill out all feilds!!!!`})
    }
    //PASSWORD STRENGTH CHECKER!!!
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!regex.test(password)){
      res
        .status(500)
        .render(`auth/signup`, {errorMessage: `Password needs to have at least 6 characters and must contain at least one number and one lowercase and uppercase letter `})

    }


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
      .catch(error => {//ALL ERRORS FROM THIS BIT WILL APPEAR ON signup.hbs
        //Validation error
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render('auth/signup', { errorMessage: error.message });
        } else if (error.code === 11000) {// telling message to send if a type of error code is thrown desu.
          res.status(500).render(`auth/signup`, {
            errorMessage: `Username and email need to be unique. This email or user name is already in use`
          })
        }
        
        else {
            next(error);
        }


      });

});

// middleware protect is added (from route-guard.js)
router.get(`/userProfile`, isLoggedIn, (req, res, next) => {
  //userInSession will be called on the user-profile.hbs file in the {{}}
  res.render('users/user-profile', { userInSession: req.session.currentUser });

});
//※※※※※※※※※※※END-SIGNUP-ROUTE※※※※※※※※※※※※※※※※※

//※※※※※※※※※※※START-LOGIN-ROUTE※※※※※※※※※※※※※※※※※
//GET ROUTE TO DISPLAY LOGIN PAGE
router.get(`/login`, isLoggedOut, (req, res, next) => {
  res.render(`auth/login`)
})



//POST ROUTE TO ALLOW THE FORM DATA TO BE SENT AND VERIFIED
router.post(`/login`, (req, res, next) => {
  console.log('SESSION =====> ', req.session);

  const { email, password } = req.body;
//checks if the required fields are left blank and throws an error if they are
  if (email === `` || password === ``) {
    res.render(`auth/login`, {
      errorMessage: `Please enter both, email and password to login`
    });
    return;
  }
// checking if email exists in the db(checking if its registered)
  User.findOne({ email })// chceks if email exsits in db
    .then(user => { //user is param placeholder. Represnets the response from the DB(true/false)
      if (!user) {//if no user in db inform person who is trying to login
        res.render(`auth/login`, {errorMessage: `Email is not registered. Try with other email.`});
        return;
      } 
      
     //If user exists in db, compare provided password hash sum
     // with databaseにあるHash Sum 
      else if(bcryptjs.compareSync(password, user.passwordHash)) {
    //if provided password hash sum === dbにあるhash sum then pass
    //user object to this view ------------
        //res.render(`users/user-profile`, {user});// "user" is the　DBに存在確認済みのuser; See User.findOne({user}) above.


        //res.render() line above is removed when this line 115 and 116 are added
        req.session.currentUser = user;
        res.redirect(`/userProfile`);


      } else {
        //if provided password hash sum doesn't === db にあるhash sum for this user then rerturn error message to viewer
        res.render(`auth/login`, {errorMessage: `Incorrect password`})
      }
    })
    .catch(error => {
      next(error);
    })

})

//※※※※※※※※※※※END-LOGIN-ROUTE※※※※※※※※※※※※※※※※※

//※※※※※※※※※※※START-LOGOUT-ROUTE※※※※※※※※※※※※※※※※※

router.post(`/logout`, (req, res, next) => {
  req.session.destroy(err => {//destroy() method is avaliable through the express-session npm package.
    if(err) next(err);
    res.redirect(`/`);
  })
})
// THIS WILL NOT DELETE THE COOKIE,
//IT WILL REMOVE THE SESSION FROM THE DATABASES IN THE SESSION COLLECTION


//※※※※※※※※※※※END-LOGOUT-ROUTE※※※※※※※※※※※※※※※※※



module.exports = router;