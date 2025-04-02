const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json()); // Zum Lesen von Body-Requests

app.use(cors({ // API-Sharing freigeben für Port 5050
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"], 
}));

// Hilfsfunktio
function readFile() {
    const data = fs.readFileSync("music.json", "utf-8");
    return JSON.parse(data);
}

function writeFile(data) {
    fs.writeFileSync("music.json", JSON.stringify(data, null, 2));
}

// GET
app.get("/get", (req, res) => {

})

// POST
app.post("/post", (req, res) => {

})

// PUT

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

        const data = JSON.parse(fs.readFileSync("users.json", "utf8"));

        if (data.find(user => user.username === username)) {
            return res.status(409).json({ message: "Benutzername bereits vergeben" });
        }

        data.push({ username, password });

        fs.writeFileSync("users.json", JSON.stringify(data, null, 2));

        console.log("Aktueller Inhalt von users.json:", fs.readFileSync("users.json", "utf8")); 

        res.status(201).json({ message: "Benutzer registriert" });
        console.log("Benutzer registriert:", username);
    } catch (error) {
        console.error("Fehler bei der Registrierung:", error);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

app.delete("/delete", (req, res) => {
    const { username } = req.body;
    const data = JSON.parse(fs.readFileSync("users.json", "utf8"));
    const userIndex = data.findIndex(user => user.username === username);

    if (userIndex !== -1) {
        data.splice(userIndex, 1);
        writeFile(data);
        res.status(200).json({ message: "Benutzer gelöscht" });
        console.log("Benutzer gelöscht:", username);
    } else {
        res.status(404).json({ message: "Benutzer nicht gefunden" });
        console.log("Benutzer nicht gefunden:", username);
    }
});

// -----
app.listen(5050, () => console.log("Server läuft auf Port 5050"));