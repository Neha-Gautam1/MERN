require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
// const contactRoute = require("./router/contact-router.js");
const authRoute = require("./router/auth-router.js");
const connectDb = require("./utils/db.js");
const User = require("./models/user-model.js");
const errorMidddleware = require('./middleware/error-middleware.js');

//let's tackle cors
const corsOptions = {
  origin:"http://localhost:5173/register",
  methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials:true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth",authRoute);
// app.use("/api/form",contactRoute);
const sessionOptions={
  secret:"mysupersecretstring",
  resave:false, 
  saveUninitialized:true,
  cookie:{
    expires:Date.now() + 7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },
};


 app.use(session(sessionOptions));
 // app.use(flash());
 app.use(passport.initialize());
 app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  //  res.locals.success = req.flash("success");
  //  res.locals.error= req.flash("error");
  //  console.log(success);
  res.locals.currUser = req.user;
   next();
  });

  app.use("/", authRoute);

  app.use((err,req,res,next)=>{
    let{statusCode= 500, message= "Something went wrong!"} = err;
      res.status(statusCode).render("listings/error.ejs", {err});
  });


app.use(errorMidddleware);

connectDb().then(() =>{
  app.listen(5000,()=>{
    console.log("app is listening to port 5000");
  });
});
