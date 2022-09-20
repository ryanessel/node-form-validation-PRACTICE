Data Persistence using "sessions" and "cookies"

Client vs. server and HTTP methods - once again.


Express- MVC(MODEL VIEW CONTROLLER) framemwork
       - everything except the View part is actually the server side of the application.
       - sever is the backend part or the logic ofthe app. The View part which is in our "views" directory, the part that is visible to our user is the "client" side of the app.
       Browser = clinet side



This is important at this moment because---
- communicaiton between clinet and server consists of multiple HTTP requests. 
- EXAMPLE: user requests to see login form page, that is the "get" request and the user submits the login form that si the "post" request. Each of these reqeusts are done seperatly and are not aware of each other.


HTTP- statless protocol. Whcih  means everytime a new request is sent from the client to the server, the info about the previous request is lost. This is precisecly why "session" is requried 




**ULTRA MEGA SUEPR IMMPROTANT!!!! SESSION**
**Session**
>Session -
    >always lives on the server side.
    >used to persist state info between different HTTP requests (to preserve data so it doesn't get lost between different HTTP requests)
    >used as semi-permanent info interchange between 2 or more communicaiting devices, usually a serrver and client
    > ends when the user closes the browser or after leaving the site unless saved in the db


_How To Set set up sessions in our app?_

In the node.js encosystem we can use:
>**express session** npm package to generate sessions in express
>**connect-mongo** npm package to store session data inside our db( we will use it combied with the express session package)






- Cookies
    -are stored client-side(in the browser of a user's computer)
    -is a text file sent by the server to the client (browser) at one time at the moement when the session is create. Their purpose is to allow and simplify the future communication between them;
    -is sent by the client (browser) to the server whenever a user requests something from the server
    - usually has the **session　id** which makes it easy to be used for identificaiton purposes ( which user is currenrtly in the session, it is returning a user (we can keep track of a number of visits if we want), etc).


Cookies are a Convient way to carry info between client and server. 
**When we establish a session through our app, the cookie gets generated and "passed" to the client(browser).**

Can see cookies form chrome dev tag.

npm install express-session




**SESSION MANAGEMET/ CONNECT TO DATABASE**
Examaple of sessions without authentication(not logged in)
like when you go to a webiste put shoes in a cart leave and come back those shoes will still be their because the session is being maintained through cookies desu.

- Sessions aren't indefinite, they will expire at some point.
- Session will expire when the cookies do.