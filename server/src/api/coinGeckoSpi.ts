// src/api/coinGeckoApi.ts
import fetch from 'node-fetch';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export async function fetchCryptocurrencyPrice(cryptos: string[]): Promise<{ [key: string]: number }> {
    const ids = cryptos.join(',');
    const url = `${COINGECKO_API_URL}?ids=${ids}&vs_currencies=usd`;

    const response = await fetch(url);
    const data = await response.json();

    const prices: { [key: string]: number } = {};
    for (const crypto of cryptos) {
        prices[crypto] = data[crypto]?.usd ?? 0;
    }

    return prices;
}
