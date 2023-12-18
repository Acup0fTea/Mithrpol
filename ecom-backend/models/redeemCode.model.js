const mongoose = require('mongoose');

const redeemCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    isRedeemed: {
        type: Boolean,
        default: false
    },
    redeemedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    redeemedAt: {
        type: Date
    }
});

const RedeemCode = mongoose.model('RedeemCode', redeemCodeSchema);

module.exports = RedeemCode;
