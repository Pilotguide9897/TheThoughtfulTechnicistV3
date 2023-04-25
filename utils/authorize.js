//Creating custom middleware to check if the user is logged in before allowing them to access content or interact with features.
const hasAuthorization = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = hasAuthorization;