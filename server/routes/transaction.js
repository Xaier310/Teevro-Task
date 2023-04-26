const router = require("express").Router();
const mongoose = require("mongoose");
const { TransactionRecordSchema } = require("../models/TransactionsRecord");
const TransactionRecord = require("../models/TransactionsRecord");


router.post("/",async (req,res)=>{
    try{
        let data = req.body;
        if(data && data.transactionId && data.username){
               let newTransaction = new TransactionRecord(req.body);
               let savedTransaction = await newTransaction.save();
               res.status(200).json(savedTransaction);
        }
        else{
            res.status(500).json("data incomplete");
        }
    }
    catch(err){
        res.status(500).json("internal error");
    }
});

router.get("/",async (req,res)=>{
    try {
    if(req.query){
    var alltransactions = await TransactionRecord.find({username:req.query.username});
    res.status(200).json(alltransactions);
}
else{
    res.send(500).json("not authenticated");
}
}
catch(err){
    console.log(err);
    res.send(500).json();
}
});


module.exports = router;