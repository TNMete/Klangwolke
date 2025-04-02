document.addEventListener('DOMContentLoaded', () => {
    const playlist = [
        { title: 'No Rival', artist: 'Alaina Cross', genre: 'Pop', time: '3:18', src: 'http://127.0.0.1:5500/songs/Alaina Cross, Maestro Chives, Egzod - No Rival [NCS Release].mp3' },
        { title: 'Move Like This', artist: 'Bad Computer', genre: 'Pop', time: '3:35', src: 'http://127.0.0.1:5500/songs/Bad Computer - Move Like This [NCS Release].mp3' },
    ];

    const tableBody = document.querySelector('#playlistTable tbody');
    const audioPlayer = document.querySelector('#audioPlayer');

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
        tableBody.appendChild(row);
    });
});