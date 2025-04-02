const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json()); // Zum Lesen von Body-Requests

app.use(cors({ // API-Sharing freigeben für Port 5050
    origin: ["https://127.0.0.1:5500", "http://localhost:5500"]
}));

function readFile() {
    const data = fs.readFileSync("music.json", "utf-8");
    return JSON.parse(data);
}

// Hilfsfunktio
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

// -----
app.listen(5050, () => console.log("Server läuft auf Port 5050"));