Goals
-learn what sessions and cookies are
-learn how authenticaiton, session and cookies are all related
-implement authetication in your web apps

Recap-
Authentication: Checking the user is who they say they are

Authorization: the scope of what the user is permitted to do

LOGIN-
- allows our user to return to our applicaiton
- this is done through authentication 


LOGIN ROUTE SETUP
- 1st macro-step - "get" login route:
  1. user request the login form occours when user click login
  2. server side receives this request and sends back the login form; login page is rendered.


- 2nd macro-step - "post" login route:
  3. user fills the form and submits.
  4. form data gets received in the "post" login route in the serverside of our applicaiton and the verification process happens there:
    -is there a user registered with this email/username. if not notify user
    -if there is, is the password user entered correct? if no notify user
    -if both are correct, it's a success. the user gets authenticated and has access to the set of pages/actions in our app.


LOGIN FORM CODE
<div id="form">
  <h2>Login</h2>
 
  <form action="/login" method="POST">
 
    <label> Email
      <input type="email" name="email" placeholder="rockstar@ironhack.com" />
    </label>
 
    <label>Password
      <input type="password" name="password" placeholder="********" />
    </label>
 
    <button type="submit">Login</button>
 
    {{#if errorMessage}}
      <p class="error">{{errorMessage}}</p>
    {{/if}}
  </form>
</div>
//GET login form PAGE RENDERER 
router.get(`/login`, (req, res, next) => {
  res.render(`auth/login`)
})



//POST

router.post(`/login`, (req, res, next) => {
  const { email, password } = req.body;
//checks if the required fields are left blank
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
      } else if(bcryptjs.compareSync(password, user.passwordHash)) {
        res.render(`users/user-profile`, {user});
      } else {
        res.render(`auth/login`, {errorMessage: `Incorrect password`})
      }
    })
    .catch(error => {
      next(error);
    })

})


