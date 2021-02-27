const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    accountNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    secretNumber: {
        type: String,
        required: true
    },    
    pinCode: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    approved: {
        type: Boolean,
        default: false
    }
});
UserSchema.set('toJSON', {
    virtuals: true
});
module.exports = User = mongoose.model('user', UserSchema);