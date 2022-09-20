Goals
- create and use **custom middleware**
- understand correlation between, authentication, sessions and cokoies
- protect (guard) routes based on the authentication state of user; wherther or not the user is authenticated.
- protect (guard) routes based on the role of the user


**Sessions** and **Sessinon cookie** to protect specific routes and allow acces only to users who are logged in; authenticated.


**Authetntication - verifying the user**

**Session: a record of the succesful authentication is kept; proof that you already logged in** - this is made in ddatabase; backend.

**Cookie with session id: "Proof that user successfully logged in"**
Client side- a cooke is sent to the clinet side as a response as evidence that you successfully logged in.(were verified). Guest braclet (automatically stored on the user's browser)

**User cookie is checked to see if they are verified if they leave and comeback**

**2 MAIN THINGS HAPPEN WHEN LOG IN IS SUCCESFULL**
_1. on the serverside/backaend a session record is created in the database and is given an id_
_2. The id of the session in the database is taken and set on the **cookie** and is sent back with the response to the browser_
----------------------------------------------------------------
INCOMING REQUESTS

What does the **express-sessions** middleware do?

-object **req.session.currentUser** is created by **express-session** package for every incoming request containing a "cookie with the session id"

For each incoming request that reaches our server, **express-session** does the following

1. chekcs if "cookie with session id" exists on the request
 - if request contains a valid "cookie wiht session id"
   - it gets user data from the sessions stored in the database
   - sets user data from the session as the object req.session.currentUser
- if not, express-session middlware doesn't set the req.session.currentUser
2. In the end it forwards the request to the next middleware or reoute.


Auth middleware - route guard

Authenticated vs. Unauthenticated requests

※If an incoming request has a valid "cookie with the session id" an object req.session.currentUser is created by **express-session**, specifying that request is coming form a **user who is authernitcated**


we can check if a request is authenticated by and contains "cookie with session id" by checking is req.session.currentUser exists.


**SYNTAX FOR CUSTOM MIDDLEWARE**
const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/login');
  }
  next();
};
-------------------------------------------------------------

**SYNTAX TO USE CUSTOM MIDDLEWARE TO PROTECT A ROUTE**


const { isLoggedIn } = require('./path-to-file-with-middleware');
 
app.get('/example-route', isLoggedIn, (req, res, next) => {
  // Route logic ...
});
-------------------------------------------------------