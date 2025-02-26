function checkUser(req, res, next) {
    const user = req.session.user;

    if(!user) {
        req.flash("error", "Please login first!");
        return res.redirect('/login');
    }

    console.log("Siapa yang login sekarang: ", user);

    next();
}

module.exports = checkUser;