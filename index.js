const express = require('express');
const mongoose = require('mongoose');
const statsRoute = require('./routes/stats');
const deviationRoute = require('./routes/deviation');
const fetchCryptoData = require('./jobs/fetchCryptoData');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', statsRoute);
app.use('/api', deviationRoute);
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://gharatraj077:raj24@cluster0.sfksq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


fetchCryptoData();

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
