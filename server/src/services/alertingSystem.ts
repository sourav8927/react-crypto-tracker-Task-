// src/services/alertingSystem.ts
import { fetchCryptocurrencyPrice } from '../api/coinGeckoApi';
import { User } from '../models/user';
import { sendAlert } from '../notification/sendAlert';
import { cachePriceUpdates, getCachedPrices } from './cachingSystem';

const CRYPTOS_TO_MONITOR = ['bitcoin', 'ethereum'];

export async function monitorPricesAndAlert() {
    setInterval(async () => {
        try {
            const cachedPrices = await new Promise<{ [key: string]: number }>((resolve, reject) => {
                getCachedPrices((error, prices) => {
                    if (error) reject(error);
                    else resolve(prices || {});
                });
            });

            let prices = cachedPrices;
            if (!prices || Object.keys(prices).length === 0) {
                prices = await fetchCryptocurrencyPrice(CRYPTOS_TO_MONITOR);
                cachePriceUpdates(prices);
            }

            const users = await User.find();
            for (const user of users) {
                for (const alert of user.alerts) {
                    const currentPrice = prices[alert.crypto];
                    if (currentPrice >= alert.targetPrice) {
                        sendAlert(user.email, `${alert.crypto} has reached ${currentPrice}!`);
                    }
                }
            }
        } catch (error) {
            console.error('Error monitoring prices:', error);
        }
    }, 60000); // Check every minute
}
