let authMiddleware = function (req, res, next) {
    const token = req.cookies.Authorization;
    if (!token) return res.redirect("/")
    return next();
}

let authntMiddleware = function (req, res, next) {
    const token = req.cookies.Authorization;
    if (token) return res.redirect("/tasks")
    return next();
}
module.exports = {
    authMiddleware,
    authntMiddleware
}