const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json()); // Zum Lesen von Body-Requests

app.use(cors({ // API-Sharing freigeben für Port 5050 & 5500
    origin: ["http://127.0.0.1:5500", "http:localhost:5500", "http://127.0.0.1:5050", "http:localhost:5050"],
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));

function getUserPlaylist(username) {
    const filePath = path.join(__dirname, "../userPlaylists", `${username}.json`);

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));

        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
}

function saveUserPlaylist(username, playlist) {
    const filePath = path.join(__dirname, "../userPlaylists", `${username}.json`);
    fs.writeFileSync(filePath, JSON.stringify(playlist, null, 2));
}

// Hilfsfunktion
function readFile() {
    const data = fs.readFileSync("music.json", "utf-8");
    return JSON.parse(data);
}

function writeFile(data) {
    fs.writeFileSync("music.json", JSON.stringify(data, null, 2));
}

app.get("/playlist/:username", (req, res) => {
    const { username } = req.params;
    const playlist = getUserPlaylist(username);
    res.json(playlist);
});

// Song hinzufügen
app.post("/playlist/:username", (req, res) => {
    const { username } = req.params;
    const song = req.body;

    let playlist = getUserPlaylist(username);
    playlist.push(song);

    saveUserPlaylist(username, playlist);
    res.json({ message: "Song hinzugefügt", playlist });
});
// Song entfernen
app.delete("/playlist/:username/:index", (req, res) => {
    const { username, index } = req.params;
    let playlist = getUserPlaylist(username);
    playlist.splice(index, 1);
    saveUserPlaylist(username, playlist);

    res.json({ message: "Song entfernt", playlist });
});

// GET
app.get("/songsglobal", (req, res) => {
    try {
        const songs = readFile(); // Korrektur: Die Daten aus der Datei lesen
        res.json(songs); // Korrektur: Die gelesenen Daten zurückgeben
    } catch (error) {
        console.error("Fehler beim Lesen der music.json:", error);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// POST
app.post("/post", (req, res) => {

})

// DELETE

// USER Login Modul

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const data = JSON.parse(fs.readFileSync("users.json", "utf8"));
    const user = data.find(user => user.username === username && user.password === password);

    if (user) {
        res.status(200).json({ message: "Login erfolgreich", username });
        console.log("Login erfolgreich für:", username);
    } else {
        res.status(401).json({ message: "Ungültige Anmeldedaten" });
        console.log("Login fehlgeschlagen:", username);
    }
});

app.post("/register", (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Benutzername und Passwort erforderlich!" });
        }

        const usersFile = "users.json";

        if (!fs.existsSync(usersFile)) {
            fs.writeFileSync(usersFile, JSON.stringify([]));
        }

        const data = JSON.parse(fs.readFileSync(usersFile, "utf8"));

        if (data.find(user => user.username === username)) {
            return res.status(409).json({ message: "Benutzername bereits vergeben" });
        }

        data.push({ username, password });

        fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));

        console.log("Aktueller Inhalt von users.json:", fs.readFileSync(usersFile, "utf8"));

        const playlistDir = path.join(__dirname, "../userPlaylists");
        if (!fs.existsSync(playlistDir)) {
            fs.mkdirSync(playlistDir, { recursive: true });
        }

        const userPlaylistFile = path.join(playlistDir, `${username}.json`);
        fs.writeFileSync(userPlaylistFile, JSON.stringify([]));

        console.log(`Benutzer registriert: ${username}`);
        console.log(`Datei für ${username} erstellt: ${userPlaylistFile}`);

        res.status(201).json({ message: "Benutzer registriert" });
    } catch (error) {
        console.error("Fehler bei der Registrierung:", error);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

app.delete("/delete", (req, res) => {
    try {
        const { username } = req.body;

        const usersFile = path.join(__dirname, "users.json");
        const playlistFile = path.join(__dirname, "../userPlaylists", `${username}.json`);

        if (!fs.existsSync(usersFile)) {
            return res.status(500).json({ message: "Benutzerdatenbank nicht gefunden" });
        }

        let data = JSON.parse(fs.readFileSync(usersFile, "utf8"));

        const userIndex = data.findIndex(user => user.username === username);

        if (userIndex === -1) {
            return res.status(404).json({ message: "Benutzer nicht gefunden" });
        }

        data.splice(userIndex, 1);
        fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));

        console.log(`Benutzer gelöscht: ${username}`);

        if (fs.existsSync(playlistFile)) {
            fs.unlinkSync(playlistFile);
            console.log(`Playlist-Datei gelöscht: ${playlistFile}`);
        } else {
            console.log(`Keine Playlist-Datei für ${username} gefunden.`);
        }

        res.status(200).json({ message: "Benutzer und Playlist-Datei gelöscht" });
    } catch (error) {
        console.error("Fehler beim Löschen des Benutzers:", error);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// -----
app.listen(5050, () => console.log("Server läuft auf Port 5050"));