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
    currentAudio = new Audio(`songs/${song}`);
    currentAudio.play();
}

function stopSong() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}