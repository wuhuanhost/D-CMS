var express = require('express');
var router = express.Router();
var check = require('../src/utils/check.js');

//登录后的管理页面
router.get('/admin',check.checkAdminLogin, function(req, res, next) {
    var menu = [{
        name: "测试菜单1",
        href: "/test1.html"
    }, {
        name: "测试菜单2",
        href: "/test2.html"
    }, {
        name: "测试菜单3",
        href: "/test3.html"
    }]
    res.render('admin/admin', { menu: menu, user: { uid: req.session.uid, token: req.session.token } });
});

//admin登录方法
router.post('/login', function(req, res, next) {
    var account = req.body.account;
    var password = req.body.password;
    if (account === "admin" && password === "123") {
        req.session.account = account;
        req.session.password = password;
        req.session.uid = 1;
        req.session.token = account + password;
        res.redirect('./admin');
    } else {
        res.redirect(301, '/index?msg=account or password error');
    }
});


//后台登录首页
router.get('/index', function(req, res, next) {
    req.session.code = "123456";
    res.render('admin/index', { code: 12 });
});


module.exports = router;
