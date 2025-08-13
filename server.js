const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');

const trackRoutes = require('./routes/tracks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/reactville-jukebox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/tracks', trackRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
