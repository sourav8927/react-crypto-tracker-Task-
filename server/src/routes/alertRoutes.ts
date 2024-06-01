// src/routes/alertRoutes.ts
import { Router } from 'express';
import { User } from '../models/user';

const router = Router();

router.post('/set-alert', async (req, res) => {
    const { email, crypto, targetPrice } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { email },
            { $push: { alerts: { crypto, targetPrice } } },
            { new: true, upsert: true }
        );

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to set alert' });
    }
});

export default router;
