const User = require("../models/user-model.js");

module.exports.signupRenderForm = (req,res) =>{
    res.send("regsiter");
   };

   module.exports.progress = (req,res)=>{
    res.send("progress");
   }

module.exports.signup = async(req,res)=>{
    try{
        let{username, email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=>{
          if(err){
            return next(err);
          }
           //  req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/progress");
        });
    }
     catch(e) {
        // req.flash("error", e.message);
        res.redirect("/register");
     } 
};

module.exports.loginRenderForm =  (req,res)=>{
    res.send("login");
  };

  module.exports.login = async(req,res)=>{
    //   res.flash("success","Welcome back to Wanderlust!");
      let redirectUrl = res.locals.redirectUrl || "/listings";
      res.redirect(redirectUrl);
    };

    module.exports.logout = (req,res, next)=>{
        req.logout((err)=>{
          if(err){
           return next(err);
          }
          // req.flash("success", "You are logged out!");
          res.redirect("/home");
        })
      };