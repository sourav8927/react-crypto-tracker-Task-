// src/services/cachingSystem.ts
import redis from 'redis';

const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => console.error('Redis client error', err));

export function cachePriceUpdates(prices: { [crypto: string]: number }) {
    client.setex('crypto_prices', 60, JSON.stringify(prices));
}

export function getCachedPrices(callback: (error: any, prices: { [crypto: string]: number } | null) => void) {
    client.get('crypto_prices', (error, reply) => {
        if (error) {
            callback(error, null);
            return;
        }
        if (reply) {
            const prices = JSON.parse(reply);
            callback(null, prices);
        } else {
            callback(null, null);
        }
    });
}
