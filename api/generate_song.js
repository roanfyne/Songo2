const express = require('express');
const app = express();
const { exec } = require('child_process');
const path = require('path');

app.get('/generate_song', (req, res) => {
    const songName = req.query.songName;
    if (!songName) {
        return res.status(400).send('Song name is required');
    }
    
    exec(`python song-generator/generate_song.py "${songName}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error generating song: ${error.message}`);
            return res.status(500).send('Failed to generate song');
        }
        
        const downloadUrl = `/output/${songName}.mp3`;
        res.json({ downloadUrl });
    });
});

module.exports = app;