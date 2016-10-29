var Bill = require('../models/bill');
var mongoose = require('mongoose');


module.exports = {
    addOne: (req, res, next) => {
        var userId = req.user._id;
        console.info(userId)
        var query = {
            _id: req.query._id || new mongoose.mongo.ObjectID()
        };

        var params = {
            userId: userId,
            symbol: req.body.symbol || req.query.symbol || '+',
            money: req.body.money || req.query.money || 0,
            createDate: req.body.createDate || req.query.createDate || new Date(),
        };
        Bill.update(query, params, { upsert: true }, (err, doc) => {
            if (err) return res.status(500).send({
                success: false,
                message: err
            });
            return res.json({
                success: true,
                message: '操作成功',
                user: req.user
            });

        });
    },
    delOne: (req, res, next) => {
        var userId = req.user._id;
    },
    findAll: (req, res, next) => {
        var userId = req.user._id;

        Bill.find({ userId: userId }, function (err, bills) {
            if (err) return res.status(500).send({
                success: false,
                message: '系统内部异常'
            });
            return res.json(bills);
        });

    },
    findOne: (req, res, next) => {
        var userId = req.user._id;
        var billId = req.params.id;

        Bill.find({ userId: userId ,_id: billId}, function (err, bill) {
            if (err) return res.status(500).send({
                success: false,
                message: '系统内部异常'
            });
            return res.json(bill);
        });

    }
}
