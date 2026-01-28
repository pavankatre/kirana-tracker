// backend/middleware/productValidator.js
const mongoose = require('mongoose');

exports.validateStockUpdate = (req, res, next) => {
  const { id } = req.params;
  const { stockCount } = req.body;

  // 1. Validate MongoDB ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 'error', message: 'Invalid Product ID format' });
  }

  // 2. Validate Stock Count
  if (stockCount === undefined || typeof stockCount !== 'number' || stockCount < 0) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Stock count must be a non-negative number' 
    });
  }

  next();
};