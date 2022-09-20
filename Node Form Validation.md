GOALS
- differenatiate client and server-side validation
- undestand and use mongoose validation
- establish proper "communication" with users trhough error messages and notifications
- apply password strength validation.


TWO TYPES OF VALIDATION
- client-side validation -ex: browser, thanks to HTML attributes such as require, type etc.

- server-side validation - needed because anyone with a browser has access to our html and can change the code locally on their computer to "hack" our code 

  - 1. require that all feilds be filled in.


!!!!CHECKPOINT!!!!!!!
   3     Make sure data in the database is clean - no duplicates please!
It is very important to make sure that our users can’t pass invalid data to the database, but we also don’t want to allow any duplicates there. In the model schema, we set the validation for both email and username to be unique. Now we have to notify users if they try to register with usernames or emails that already exist in the database.

First, let’s see what error message we will get back from validator if we try to do this. Imagine we have already saved user with username ironhacker in the database. If we try to create an account with this username, we will see in the terminal console error message:


ERRORS-
E11000 - navtie mongo validation error.

4. Make sure users use strong passwords

//IF STATEMENT TO ADD IN TO A .post() to make sure users use a password set under our parameters.
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!regex.test(password)){
      res
        .status(500)
        .render(`auth/signup`, {errorMessage: `Password needs to have at least 6 characters and must contain at least one number and one lowercase and uppercase letter `})

    }