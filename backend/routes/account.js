const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware.js")
const {Account} = require("../db.js");
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async(req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    if(account){
        return res.json({
            balance: account.balance
        })
    }else{
        res.status(404).json({
            message: "Requested user balance not found"
        })
    }
});

router.post("/transfer", authMiddleware, async(req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    try{
        const { amount, to } = req.body;
    
    //Fetch the account of curr user
    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    //Now check if user has sufficient balance
    if(account.balance < amount){
        await session.abortTransaction();
        return res.status(402).json({
            message: "Insufficient balance"
        })
    }

    //Fetch the account of receiver
    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Account not found"
        })
    }

    //Perform the transfer
    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: { balance: -amount}
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc: { balance: amount }
    }).session(session);

    //commit the transaction
    await  session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
    } catch(err){
        res.status(400).json({
            message: err
        })
    } finally{
        await session.endSession();
    }
});

module.exports = router;