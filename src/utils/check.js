
//校验登录的中间件
 exports.checkAdminLogin=function(req, res, next) {
    if (req.session.uid === undefined || req.session.uid === null) {
        res.redirect(301, '/index');
    } else {
        next();
    }
}