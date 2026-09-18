import Transaction from "../models/transaction.js";



export const createTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransaction= async(req,res,next)=>{
  try {
    const transactions= await Transaction.find({ createdBy: req.user._id})
    res.json(transactions)
  } catch (error) {
    next(error)
  }
}

export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const monthlySummary = async (req, res, next) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $match: {
          createdBy: req.user._id,
        },
      },

      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(summary);
  } catch (error) {
    next(error);
  }
};