const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require('../models/user');

const signup_get = (req, res) => {
    if (res.locals.currentUser) {
        return res.redirect("/")
    } 
    res.render('signup')
    
}

const signup_post = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        } else {
            const user = new User({
                username:req.body.username,
                password: hashedPassword
            }).save(err => {
                if (err) {
                    console.log('ERROR:'+err)
                    return next(err);
                }
                res.redirect("/");
            });
        }
    });
}

const login_get = (req, res) => {
    if (res.locals.currentUser) {
        return res.redirect("/")
    } 
        res.render('login')
    
}

const login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
})

const logout_get = (req, res) => {
    req.logout();
    res.redirect("/");
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get
}

