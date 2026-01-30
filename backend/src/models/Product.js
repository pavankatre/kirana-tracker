const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    category: { 
        type: String, 
        required: true, 
       // Added 'Snacks', 'Instant Food', and 'Baby Care'
        enum: [
            'Groceries', 'Grains', 'Dairy', 'Vegetables', 'Fruits',
            'Personal Care', 'Household', 'Snacks', 'Instant Food', 'Baby Care'
        ]
    },
    stockCount: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    minThreshold: { 
        type: Number, 
        required: true, 
        default: 1 
    },
    // We link the product to the user who created it
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);