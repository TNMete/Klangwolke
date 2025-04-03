document.addEventListener('DOMContentLoaded', () => {
    const playlistUserTable = document.querySelector('#playlistUserTable tbody');
    const playlistGlobalTable = document.querySelector('#playlistGlobalTable tbody');
    const audioPlayer = document.querySelector('#audioPlayer');
    const trackInfoDiv = document.querySelector('.track-info');

    async function fetchPlaylistData(url, table) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
            alert('Fehler beim Abrufen der Playlist-Daten.');
            return [];
        }
    }

    function displayPlaylist(playlist, table) {
        table.innerHTML = '';
        playlist.forEach(song => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${song.title}</td>
                <td>${song.artist}</td>
                <td>${song.genre}</td>
                <td>${song.time}</td>
            `;

            if (table === playlistGlobalTable) {
                const addButtonCell = document.createElement('td');
                const addButton = document.createElement('button');
                addButton.textContent = '+';
                addButton.classList.add('add-to-playlist-button');
                addButtonCell.appendChild(addButton);
                row.appendChild(addButtonCell);
            }

            row.addEventListener('click', () => {
                audioPlayer.src = song.src;
                audioPlayer.play();
                updateTrackInfo(song); // Track-Info aktualisieren
            });
            table.appendChild(row);
        });
    }

    // Track-Info-Funktion
    function updateTrackInfo(song) {
        trackInfoDiv.innerHTML = `
            <td><strong>Titel:</strong> ${song.title}</td><br>
            <td><strong>Künstler:</strong> ${song.artist}</td>
        `;
    }

    async function initializePlaylists() {
        const globalPlaylist = await fetchPlaylistData('http://localhost:5050/songsglobal', playlistGlobalTable);
        displayPlaylist(globalPlaylist, playlistGlobalTable);
    }

    initializePlaylists();
});