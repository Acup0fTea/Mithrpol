const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const RedeemcCode = require('./redeemCode.model');
let userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    points: {
        type: Number,
        default: 0
    },
    rfmLevel: {
        type: String,
        default: 'Gold'
    },
    refreshToken:{
        type: String
    }
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.updateRFMLevel = function() {
    if (this.points >= 2000) {
        this.rfmLevel = 'Diamond';
    } else if (this.points >= 1000) {
        this.rfmLevel = 'Platinum';
    } else {
        this.rfmLevel = 'Gold';
    }
};

userSchema.methods.redeemCode = async function(code) {
    const pointsPerCode = 100;
    
    // Placeholder: Validate the code here
    const isValidCode = await this.validateRedeemCode(code);
    if (!isValidCode) {
        throw new Error('Invalid or already redeemed code');
    }

    // Update points
    this.points += pointsPerCode;

    // Update RFM level
    this.updateRFMLevel();

    // Save the updated user
    await this.save();
};

// placeholder method for redeem code validation
userSchema.methods.validateRedeemCode = async function(code) {
    const redeemCode = await RedeemCode.findOne({ code: code });

    if (!redeemCode || redeemCode.isRedeemed) {
        return false;
    }

    redeemCode.isRedeemed = true;
    redeemCode.redeemedBy = this._id;
    redeemCode.redeemedAt = new Date();
    await redeemCode.save();

    return true;
};

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model('User', userSchema);