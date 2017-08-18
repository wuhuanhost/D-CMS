 var nodemailer = require('nodemailer');
 var transporter = nodemailer.createTransport({
     host: 'smtp.163.com',
     port: 465,
     secure: true,
     auth: {
         user: 'username@163.com', //邮箱的账号
         pass: 'userpass' //邮箱的密码
     }
 });
 exports.post = function(email, subject, content, cb) {
     var mailOptions = {
         from: '"Fred Foo 👻" <username@163.com>',
         to: email,
         subject: subject,
         html: content
     };
     transporter.sendMail(mailOptions, function(error, info) {
         cb(error, info);
     });
 }
