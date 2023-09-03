const Transaction = require("../models/transaction");

// get all transactions
// GET/api/v1/transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      sucess: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//  add transactions
// POST/api/v1/transactions
exports.addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      sucess: true,
      data: transaction,
    });
  } catch (error) {
    if (error.name === "ValidationError"){
        const message = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({
            success: false,
            error : message
        })
    }else{
        return res.status(500).json({
            success: false,
            error: "Server Error",
          });
    }
    // console.log(error)
  }
};

// delete transactions
// DELETE/api/v1/transactions/:id
exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
    if(!transaction) {
        return res.status(404).json({
            success : false,
            error : "No Transactions Found"
        })
    }

    await transaction.deleteOne()

    return res.status(200).json({
        success : true,
        data : {}
    })
  } catch (err) {
    return res.status(500).json({
            success: false,
            error: "Server Error",
          });
  }
};
