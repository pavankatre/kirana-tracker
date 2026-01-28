const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateStockUpdate } = require('../middlewares/productValidator');

// POST /api/products/add
// The 'protect' or 'verifyToken' function from your auth.middleware
router.post('/add', authMiddleware.protect, productController.addProduct);
// Ensure this matches your testing URL
router.get('/all', authMiddleware.protect, productController.getInventory);
router.patch(
    '/update-stock/:id',
    validateStockUpdate,
    productController.updateStock
);
// backend/src/routes/product.routes.js
router.delete('/delete-item/:id', authMiddleware.protect, productController.deleteItem);

module.exports = router;