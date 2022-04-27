require('dotenv').config();
const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./models/user');

const PORT = process.env.PORT || 3000;

const mongoDb = `mongodb+srv://main_user:${process.env.PASSWORD}@cluster0.fdqfy.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoDb, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({
            username: username
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: "Incorrect username"
                });
            } else { 
                return done(null, user);
            }

            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    // passwords match! log user in
                    return done(null, user)
                } else {
                    // passwords do not match!
                    return done(null, false, {
                        message: "Incorrect password"
                    })
                }
            })

            return done(null, user);
        });
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


app.use(session({
    secret: "r8q,+&1LM3)CD*zSGpx1xm{NeQhc;#",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({
    extended: false
}));

app.use(function(req, res, next) {
    
    res.locals.currentUser = req.user;
    next();
});

const indexRouter = require('./routes/routes.js');

app.use('/', indexRouter)

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => console.log("Listening on port " + PORT));