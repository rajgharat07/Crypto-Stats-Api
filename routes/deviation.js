const express = require('express');
const Crypto = require('../models/Crypto');
const router = express.Router();

router.get('/deviation', async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: 'Coin is required' });

  const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
  if (records.length === 0) return res.status(404).json({ error: 'No data found for the requested coin' });

  const prices = records.map((record) => record.price);
  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
  const stdDeviation = Math.sqrt(variance);

  res.json({ deviation: stdDeviation.toFixed(2) });
});

module.exports = router;
