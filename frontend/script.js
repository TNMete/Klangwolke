document.addEventListener('DOMContentLoaded', () => {
    const playlistUserTable = document.querySelector('#playlistUserTable tbody');
    const playlistGlobalTable = document.querySelector('#playlistGlobalTable tbody');
    const audioPlayer = document.querySelector('#audioPlayer');
    const trackInfoDiv = document.querySelector('.track-info');

    async function fetchPlaylistData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
            alert('Fehler beim Abrufen der Playlist-Daten.');
            return [];
        }
    }

    async function fetchUserPlaylist(username) {
        try {
            const response = await fetch(`http://localhost:5050/playlist/${username}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async function addToUserPlaylist(username, song) {
        try {
            const response = await fetch(`http://localhost:5050/playlist/${username}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(song),
            });
            if (response.ok) {
                alert('Song wurde zur Playlist hinzugefügt!');
                updateUserPlaylist(username);
            } else {
                const errorData = await response.json();
                console.error('Fehler beim Hinzufügen des Songs:', errorData);
                alert(`Fehler beim Hinzufügen des Songs: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Fehler beim Senden der Anfrage:', error);
            alert('Es gab ein Problem beim Hinzufügen des Songs.');
        }
    }

    async function updateUserPlaylist(username) {
        const playlist = await fetchUserPlaylist(username);
        displayPlaylist(playlist, playlistUserTable);
    }

    function displayPlaylist(playlist, table) {
        table.innerHTML = '';
        playlist.forEach((song) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${song.title}</td>
                <td>${song.artist}</td>
                <td>${song.genre}</td>
                <td>${song.time}</td>
            `;
            row.dataset.src = song.src;

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
                updateTrackInfo(song);
            });
            table.appendChild(row);
        });
    }

    playlistGlobalTable.addEventListener('click', async (event) => {
        if (event.target.classList.contains('add-to-playlist-button')) {
            event.preventDefault();

            const row = event.target.closest('tr');
            const song = {
                title: row.cells[0].textContent,
                artist: row.cells[1].textContent,
                genre: row.cells[2].textContent,
                time: row.cells[3].textContent,
                src: row.dataset.src,
            };
            const username = document.getElementById('username').textContent.trim();
            if (username && username !== 'Benutzername') {
                await addToUserPlaylist(username, song);
            } else {
                alert('Bitte melde dich zuerst an.');
            }
        }
    });

    function updateTrackInfo(song) {
        trackInfoDiv.innerHTML = `
            <p><strong>Titel:</strong> ${song.title}</p>
            <p><strong>Künstler:</strong> ${song.artist}</p>
        `;
    }

    async function initializePlaylists() {
        const globalPlaylist = await fetchPlaylistData('http://localhost:5050/songsglobal');
        displayPlaylist(globalPlaylist, playlistGlobalTable);
    }

    initializePlaylists();
});
