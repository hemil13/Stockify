const express = require('express');
const connectDB = require('./config/db');
const attendanceRoutes = require('./routes/attendanceRoutes');
const stockRoutes = require('./routes/stockRoutes');
const priceListRoutes = require('./routes/priceRoutes');
// Include process module
const cors = require('cors');

require('dotenv').config()


const app = express();
app.use(cors({
  origin: 'https://stockify-blush.vercel.app', // Allow only your frontend domain
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Connect to MongoDB
connectDB();

app.use(express.json());  // Parse JSON bodies

// Use routes
app.use('/api/attendance', attendanceRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/price', priceListRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
