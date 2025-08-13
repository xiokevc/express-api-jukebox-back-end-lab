const express = require('express');
const router = express.Router();
const Track = require('../models/Track');

// CREATE - Add new track
router.post('/', async (req, res) => {
  try {
    const newTrack = await Track.create(req.body);
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create track', details: err.message });
  }
});

// READ - Get all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tracks', details: err.message });
  }
});

// READ - Get single track
router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    res.status(200).json(track);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch track', details: err.message });
  }
});

// UPDATE - Update a track
router.put('/:id', async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTrack);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update track', details: err.message });
  }
});

// DELETE - Remove a track
router.delete('/:id', async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedTrack);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete track', details: err.message });
  }
});

module.exports = router;
