const mongoose = require("mongoose");

const TransactionRecordSchema = new mongoose.Schema({
    username:{
        type:String
    },
    date:String,
    transactionId:String,
    amount:Number,
    reward:Number,
    netAmount:Number,
    status: String
},{ timestamps: true });

module.exports = mongoose.model("TransactionRecord", TransactionRecordSchema);
module.exports.TransactionRecordSchema = TransactionRecordSchema;

// export default mongoose.model("TransactionRecord", TransactionRecordSchema);