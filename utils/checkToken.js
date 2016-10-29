var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = (req,res,next) => {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, config.secret ,(err,decoded) => {
            if(err) {
                return res.json({
                    sucess:false,
                    message:'不正确的token!'
                })
            }
            req.user = decoded._doc;
            next();
        })
    }else {
        return res.status(403).send({
            success: false,
            message: '没有提供token！'
        })
    }

}