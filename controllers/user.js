var User = require('../models/user');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../config');


module.exports = { 
    addUser: (req, res, next) => {
        console.log(req.body);
        var params = {
            _id: new mongoose.mongo.ObjectID(),
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            gender: req.body.gender
        };

        User.findOne({ username: params.username}, (err, user) => {

            if (err) return res.status(500).send({
                success: false,
                message: err
            });

            if (user) {
                return res.json({
                    success: false,
                    message: '用户名已存在'
                });
            }


            User.create(params, (err, user) => {
                if (err) return res.status(500).send({
                    success: false,
                    message: err
                });

                var token = jwt.sign(user, config.secret, {
                    'expiresIn': 60 * 60 * 24
                });

                return res.json({
                    success: true,
                    message: 'you got our token!',
                    token: token,
                    user: user
                })

            });
        });
    },
    checkUser: (req, res, next) => {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (err) throw err;
            if (!user) {
                res.json({
                    success: false,
                    message: '认证失败，用户名不存在',
                    errCode: '001'
                });
            } else if (user) {
                if (user.password != req.body.password) {
                    return res.json({
                        success: false,
                        message: '认证失败，密码错误',
                        errCode: '002'
                    });
                }
                var token = jwt.sign(user, config.secret, {
                    'expiresIn': 60 * 60 * 24
                });

                return res.json({
                    success: true,
                    message: 'you got our token!',
                    token: token,
                    user: user
                })
            }
        })
    }
}
