const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.get('/song_history', (req, res) => {
    const outputDir = path.join(__dirname, '..', 'song-generator', 'output');
    fs.readdir(outputDir, (err, files) => {
        if (err) {
            console.error(`Error reading song history: ${err.message}`);
            return res.status(500).send('Failed to retrieve song history');
        }
        
        const songs = files.map(file => path.basename(file, '.mp3'));
        res.json(songs);
    });
});

module.exports = app;