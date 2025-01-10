# Crypto Stats API

This is a server-side application built using **Node.js** and **MongoDB** that fetches and stores cryptocurrency data from CoinGecko every 2 hours. It provides two API endpoints to retrieve the latest stats and calculate the standard deviation of cryptocurrency prices.

## Features
- Fetches data for **Bitcoin**, **Matic**, and **Ethereum** every 2 hours.
- Stores price, market cap, and 24-hour change in a MongoDB database.
- Provides an API to get the latest stats for a cryptocurrency.
- Provides an API to calculate the standard deviation of the last 100 prices for a cryptocurrency.

## Technologies Used
- **Node.js**
- **Express**
- **MongoDB** (with Mongoose)
- **Axios** for HTTP requests
- **node-cron** for scheduling background jobs
- **CoinGecko API** for cryptocurrency data

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local instance or MongoDB Atlas)

### Steps to Run the Project Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/rajgharat07/Crypto-Stats-Api.git
   cd crypto-stats-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI:
   ```bash
   MONGO_URI=your-mongodb-connection-string
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm run start
   ```

5. The server will be running at `http://localhost:3000`

## API Endpoints

### 1. **Get Latest Stats**
**Endpoint:** `GET /api/stats`

**Query Parameters:**
| Parameter | Description                          | Required |
|-----------|--------------------------------------|----------|
| `coin`    | The ID of the cryptocurrency (`bitcoin`, `matic-network`, `ethereum`) | Yes      |

**Example Request:**
```bash
curl "http://localhost:3000/api/stats?coin=bitcoin"
```

**Sample Response:**
```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

---

### 2. **Get Standard Deviation of Prices**
**Endpoint:** `GET /api/deviation`

**Query Parameters:**
| Parameter | Description                          | Required |
|-----------|--------------------------------------|----------|
| `coin`    | The ID of the cryptocurrency (`bitcoin`, `matic-network`, `ethereum`) | Yes      |

**Example Request:**
```bash
curl "http://localhost:3000/api/deviation?coin=bitcoin"
```

**Sample Response:**
```json
{
  "deviation": 4082.48
}
```

## Background Job
A background job runs every 2 hours using **node-cron**, fetching the following data from the CoinGecko API:
- Current price in USD
- Market cap in USD
- 24-hour percentage change

The job stores this data in the MongoDB database.

## Deployment

You can access the APIs via:
- `https://crypto-stats-api.onrender.com/api/stats?coin=bitcoin`
- `https://crypto-stats-api.onrender.com/api/deviation?coin=bitcoin`


## Acknowledgments
- [CoinGecko API Documentation](https://docs.coingecko.com/v3.0.1/reference/introduction)
