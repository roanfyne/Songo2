document.getElementById('song-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const songName = document.getElementById('song-name').value;
    const response = await fetch(`/api/generate_song?songName=${encodeURIComponent(songName)}`);
    
    if (response.ok) {
        const data = await response.json();
        const downloadLink = document.getElementById('download-link');
        downloadLink.innerHTML = `<a href="${data.downloadUrl}" download="${songName}.mp3">Download ${songName}</a>`;
        updateSongHistory();
    } else {
        alert('Failed to generate song');
    }
});

async function updateSongHistory() {
    const response = await fetch('/api/song_history');
    if (response.ok) {
        const history = await response.json();
        const songHistoryDiv = document.getElementById('song-history');
        songHistoryDiv.innerHTML = '<h2>Song History</h2>';
        const list = document.createElement('ul');
        history.forEach(song => {
            const listItem = document.createElement('li');
            listItem.textContent = song;
            list.appendChild(listItem);
        });
        songHistoryDiv.appendChild(list);
    }
}