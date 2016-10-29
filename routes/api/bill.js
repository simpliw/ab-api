var express = require('express'),
router = express.Router();

var bill = require('../../controllers/bill');


//get all bill
router.get('/bill', (req,res,next) => {
    bill.findAll(req,res,next);
});

//get id = :id bill
router.get('/bill/:id', (req,res,next) => {
    bill.findOne(req,res,next);
});


module.exports = router