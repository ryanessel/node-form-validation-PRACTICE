//※※※※HOW TO PROTECT/GUARD A ROUTE※※※※※※※※※※※


//isLoggedIn middleware - to check if a user is in the session.
// if they aren't logged in they will be redirected to log in
//if they are logged in they shoudl be able to go to the page they want to see
const isLoggedIn = (req, res, next) => {
    if(!req.session.currentUser) {// if the req.session.currentUser doesn't exist then redirect user to login page desu. req.session.currentUser exsiting would be proof that authenticated user has "cookie with session id" 
        return res.redirect('/login');
    }
next();
};





//isLoggedOut middleware- checks if the user is logged out
//1. to stop non-logged in user from accessing protected/guraded pages
//2. to stop logged in users from accessing logged in page. Since they are already logged in an wouldn't need to log in agian
const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {  //if the req.session.currentUser exists then the user is redirected if they try to go to the login page.
        return res.redirect('/');
    }
    next();
  };

//exporting these 2 "custom" middleware
module.exports =  {
    isLoggedIn,
    isLoggedOut
  }