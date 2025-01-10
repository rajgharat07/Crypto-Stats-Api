// jobs/fetchCryptoData.js
const axios = require('axios');
const Crypto = require('../models/Crypto');

const COINS = ['bitcoin', 'matic-network', 'ethereum'];
const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

const fetchCryptoData = async () => {
  try {
    const { data } = await axios.get(API_URL, {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true'
      }
    });

    const entries = COINS.map((coin) => ({
      coin,
      price: data[coin].usd,
      marketCap: data[coin].usd_market_cap,
      change24h: data[coin].usd_24h_change
    }));

    await Crypto.insertMany(entries);
    console.log('Crypto data fetched and stored successfully.');
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
  }
};

module.exports = fetchCryptoData;
