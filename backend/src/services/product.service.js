const Product = require('../models/Product');

class ProductService {
    async createProduct(productData, userId) {
        console.log(productData);
        // Business logic: Ensure the product name is unique for this user
        const existingProduct = await Product.findOne({ 
            name: productData.name, 
            userId 
        });

        if (existingProduct) {
            throw new Error('You already have a product with this name');
        }

        return await Product.create({
            ...productData,
            userId
        });
    }

    // Method 2: Get (Must be inside the class!)
    async getUserProducts(userId) {
        // Scenario 1: No User ID provided (Programmatic error)
        if (!userId) {
            throw new Error('User identification is required to fetch inventory');
        }

        const products = await Product.find({ userId }).sort({ createdAt: -1 });

        // Scenario 2: User exists but has 0 products
        // We return the empty array, but the Controller will handle the '404' feel if needed.
        return products;
    }

    async updateProductStock(productId, newCount) {
        // Find and update in one atomic operation
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                $set: {
                    stockCount: newCount,
                    lastUpdated: new Date()
                }
            },
            { new: true, runValidators: true }
        );

        return updatedProduct;
    }

    // backend/src/services/product.service.js

    async deleteProduct(productId) {
        // Find and delete the document by its MongoDB _id
        return await Product.findByIdAndDelete(productId);
    }

}

module.exports = new ProductService();