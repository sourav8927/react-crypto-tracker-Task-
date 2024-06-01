// src/models/user.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    alerts: [{
        crypto: { type: String, required: true },
        targetPrice: { type: Number, required: true }
    }]
});

export const User = mongoose.model('User', userSchema);
