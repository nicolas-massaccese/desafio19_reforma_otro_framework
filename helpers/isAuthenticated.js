
function isAuthenticated(req, res, next) {

    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash('errorMsg', 'Not authorized');

        res.redirect('/');
    }
};

module.exports = {isAuthenticated};