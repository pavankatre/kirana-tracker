const productService = require('../services/product.service');
const { sendLowStockAlert } = require('../utils/mailer');
exports.addProduct = async (req, res, next) => {
    try {
        // Defensive check
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Request body is missing'
            });
        }

        const product = await productService.createProduct(req.body, req.user.id);
        res.status(201).json({ status: 'success', data: product });
    } catch (error) {
        next(error); 
    }
};



exports.getInventory = async (req, res, next) => {
    try {
        const products = await productService.getUserProducts(req.user.id);

        // Scenario 3: Handle the "No Products Found" message
        if (!products || products.length === 0) {
            return res.status(200).json({
                status: 'success',
                message: 'No products found for this account. Start by adding your first item!',
                results: 0,
                data: []
            });
        }

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};





// exports.updateStock = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { stockCount } = req.body;

//         const updatedProduct = await productService.updateProductStock(id, stockCount);

//         // ERROR: Product might have been deleted while the user was looking at the screen
//         if (!updatedProduct) {
//             return res.status(404).json({ 
//                 status: 'fail', 
//                 message: 'No product found with that ID' 
//             });
//         }

//         res.status(200).json({
//           status: 'success',
//           data: updatedProduct
//         });

//     } catch (err) {
//         console.error("DETAILED ERROR:", err);
//         res.status(500).json({ 
//             status: 'error', 
//             message: 'An internal server error occurred while updating stock' 
//         });
//     }
// };

exports.updateStock = async (req, res, next) => { // Added next here
    try {
        const { id } = req.params;
        const { stockCount } = req.body;

        const updatedProduct = await productService.updateProductStock(id, stockCount);

        // CHECK: If stock is at or below threshold, send email
//   if (updatedProduct.stockCount <= updatedProduct.minThreshold) {
//     await sendLowStockAlert(updatedProduct.name, updatedProduct.stockCount);
//   }

        if (!updatedProduct) {
            return res.status(404).json({ 
                status: 'fail', 
                message: 'No product found with that ID' 
            });
        }

        res.status(200).json({
          status: 'success',
          data: updatedProduct
        });

    } catch (err) {
        console.error("DETAILED ERROR:", err);
        next(err); // Use next to pass the error to your global handler
    }
};

// backend controller
// backend/src/controllers/product.controller.js

exports.deleteItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productService.deleteProduct(id);

        if (!deletedProduct) {
            return res.status(404).json({ 
                status: 'fail', 
                message: 'Product not found' 
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Product successfully removed from inventory'
        });
    } catch (err) {
        next(err);
    }
};
