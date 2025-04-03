document.addEventListener('DOMContentLoaded', () => {
    const playlistUserTable = document.querySelector('#playlistUserTable tbody');
    const playlistGlobalTable = document.querySelector('#playlistGlobalTable tbody');
    const audioPlayer = document.querySelector('#audioPlayer');


    // Funktion zum Abrufen der Playlist-Daten von der API
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


    // Funktion zum Anzeigen der Playlist in der Tabelle
    function displayPlaylist(playlist, table) {
        table.innerHTML = ''; // Tabelle leeren, bevor neue Daten angezeigt werden
        playlist.forEach(song => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${song.title}</td>
                <td>${song.artist}</td>
                <td>${song.genre}</td>
                <td>${song.time}</td>
            `;
            row.addEventListener('click', () => {
                audioPlayer.src = song.src;
                audioPlayer.play();
            });
            table.appendChild(row);
        });
    }


   // Initialisierung der Playlists
   async function initializePlaylists() {
    // const userPlaylist = await fetchData('URL_DEINER_USER_PLAYLIST_API');
    // displayPlaylist(userPlaylist, playlistUserTable);

    const globalPlaylist = await fetchPlaylistData('http://localhost:5050/songsglobal');
    displayPlaylist(globalPlaylist, playlistGlobalTable);
}

initializePlaylists();
});