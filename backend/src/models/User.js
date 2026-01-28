// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['user', 'admin'], default: 'user' }
// }, { timestamps: true });

// // ✅ Use a REGULAR function here, NOT an arrow function
// userSchema.pre('save', async function (next) {
//     // Only hash the password if it has been modified (or is new)
//     if (!this.isModified('password')) return next();

//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next(); 
//     } catch (err) {
//         next(err);
//     }
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

// ✅ REMOVE 'next' from the arguments
userSchema.pre('save', async function () { 
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // ✅ REMOVE next() here. Returning from an async function 
        // tells Mongoose you are done.
    } catch (err) {
        throw err; // Throwing an error here stops the save process correctly
    }
});

module.exports = mongoose.model('User', userSchema);