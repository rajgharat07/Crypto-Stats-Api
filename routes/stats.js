const express = require('express');
const Crypto = require('../models/Crypto');
const router = express.Router();

router.get('/stats', async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: 'Coin is required' });

  const latestRecord = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
  if (!latestRecord) return res.status(404).json({ error: 'No data found for the requested coin' });

  res.json({
    price: latestRecord.price,
    marketCap: latestRecord.marketCap,
    '24hChange': latestRecord.change24h
  });
});

module.exports = router;
