const passport = require("passport");
const {Strategy: LocalStrategy} = require('passport-local');

const User = require('../models/user');
const {sendMail} =require('../helpers/sendMail')

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((id, done) => {
    const user = User.findById(id)
    done(null, user)
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    
    const user = await User.findOne({email:email});

    if(user !== undefined && user !== null ){
        return done(null, false, req.flash('signupMessage', 'The email already exists!'));
    } else {
        
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.firstname = req.body.firstname;
        newUser.adress = req.body.adress;
        newUser.age = req.body.age;
        newUser.phone = req.body.phone;

        await newUser.save();
        sendMail(newUser);
        done(null, newUser);
    }

}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    
    const user = await User.findOne({email:email});
    if(user === null){
        return done(null, false, req.flash('loginMessage', 'No user found!'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Incorrect password!'));
    }else{
    const regUser = new User();
    regUser.email = email;
    regUser.password = regUser.encryptPassword(password);
    regUser.firstname = req.body.firstname;
    regUser.adress = req.body.adress;
    regUser.age = req.body.age;
    regUser.phone = req.body.phone;
    console.log(regUser)
    return done(null, regUser);
}
}));
