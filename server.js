const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');
const Track = require('./models/Track');

const app = express();

require('dotenv').config();

// ======= Middleware =======
app.use(cors());                         
app.use(express.json());                
app.use(methodOverride('_method'));     

// ======= MongoDB Connection =======
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) 
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ======= Routes =======

// POST /tracks - Create a new track
app.post('/tracks', async (req, res) => {
  try {
    const newTrack = await Track.create(req.body);
    res.status(201).json(newTrack); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to create track' }); 
  }
});

// GET /tracks - Get all tracks
app.get('/tracks', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tracks' }); 
  }
});

// GET /tracks/:id - Get a single track by ID
app.get('/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    res.status(200).json(track); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch track' }); 
  }
});

// PUT /tracks/:id - Update a track
app.put('/tracks/:id', async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json(updatedTrack);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update track' }); 
  }
});

// DELETE /tracks/:id - Delete a track
app.delete('/tracks/:id', async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedTrack); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete track' }); 
  }
});

// ======= Server Listen =======
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Reactville Jukebox API running on port ${PORT}`);
});
