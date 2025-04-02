document.addEventListener('DOMContentLoaded', () => {
    const playlist = [
        { title: 'No Rival', artist: 'Alaina Cross', genre: 'Pop', time: '3:18', src: '../songs/Alaina Cross, Maestro Chives, Egzod - No Rival [NCS Release].mp3' },
        { title: 'Move Like This', artist: 'Bad Computer', genre: 'Pop', time: '3:35', src: '../songs/Bad Computer - Move Like This [NCS Release].mp3' },
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
const songList = [
    "Electro-Light - Symbolism [NCS Release].mp3", "Unknown Brain, Heather Sommer - Perfect 10 (feat. Heather Sommer) [NCS Release].mp3", "BEAUZ, JVNA - Crazy [NCS Release].mp3", "She Is Jules, Lost Sky - Vision pt. II [NCS Release].mp3", "Warriyo - Dunes [NCS Release].mp3",
    "Alaina Cross, Maestro Chives, Egzod - No Rival [NCS Release].mp3", "Barren Gates - Devil [NCS Release].mp3", "Lensko - Let's Go! [NCS Release].mp3", "Scythermane, SH3RWIN, NXGHT! - DANÇA DO VERÃO [NCS Release].mp3", "Halvorsen, Netrum - Phoenix [NCS Release].mp3",
    "Bad Computer - Move Like This [NCS Release].mp3", "DEAF KEV - Invincible [NCS Release].mp3", "waera - harinezumi [NCS Release].mp3", "Syn Cole - Feel Good [NCS Release].mp3", "Robin Hustin, Tobimorrow - Light It Up [NCS Release].mp3",
    "Lost Sky, Jex - Where We Started (feat. Jex) [NCS Release].mp3", "Cartoon, Coleman Trapp, Jéja - Why We Lose (feat. Coleman Trapp) [NCS Release].mp3", "Egzod, Neoni, Maestro Chives, Warriyo - Mortals x Royalty Mashup [NCS Release].mp3", "Janji, Johnning - Heroes Tonight (feat. Johnning) [NCS Release].mp3", "Maestro Chives, Egzod, Neoni - Royalty [NCS Release].mp3"
];

const playlist = document.getElementById("playlist");
let currentAudio = null;

songList.forEach((song, index) => {
    const songElement = document.createElement("div");
    songElement.classList.add("song");
    songElement.innerHTML = `
        <span>${song}</span>
        <button onclick="playSong('${song}')">▶️ Play</button>
        <button onclick="stopSong()">⏹ Stop</button>
    `;
    playlist.appendChild(songElement);
});

function playSong(song) {
    stopSong();
    currentAudio = new Audio(`../songs/${song}`);
    currentAudio.play();
}

function stopSong() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}
