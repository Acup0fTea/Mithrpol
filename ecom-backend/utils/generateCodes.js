require('dotenv').config();
const dbconnect = require('../config/db.connector');
const mongoose = require('mongoose');
const RedeemCode = require('../models/redeemCode.model');
dbconnect();
function generateRandomCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function generateRedeemCodes(numberOfCodes) {
    const codes = new Set();
    while (codes.size < numberOfCodes) {
        const code = generateRandomCode(10);
        codes.add(code);
    }

    const bulkOps = Array.from(codes).map(code => ({
        insertOne: {
            document: { code }
        }
    }));

    try {
        await RedeemCode.bulkWrite(bulkOps);
        console.log(`${numberOfCodes} redeem codes generated and saved.`);
    } catch (error) {
        console.error('Error generating redeem codes:', error);
    }
}

// Generate and save 100,0000 redeem codes
generateRedeemCodes(10).then(() => {
    mongoose.disconnect();
});