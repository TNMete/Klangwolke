async function fetchUserPlaylist(username) {
    try {
        const response = await fetch(`http://localhost:5050/songsUser?username=${username}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer-Playlist:', error);
        return [];
    }
}

function showForm(action) {
    const container = document.getElementById("form-container");
    
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";

    container.innerHTML = `
        <input type="text" id="input-username" placeholder="Benutzername">
        <input type="password" id="input-password" placeholder="Passwort">
        <button id="confirm">Bestätigen</button>
    `;

    document.getElementById("confirm").addEventListener("click", async () => {
        const username = document.getElementById("input-username").value;
        const password = document.getElementById("input-password").value;

        if (!username || !password) {
            console.log("Bitte fülle alle Felder aus!");
            return;
        }

        let url = "";
        let method = "POST";

        if (action === "register") {
            url = "http://localhost:5050/register";
        } else if (action === "login") {
            url = "http://localhost:5050/login";
        }

        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log(data.message);

        if (response.status === 200 && action === "login") {
            document.getElementById("username").textContent = username;
            updateUI(true, username); 
            
            container.innerHTML = "";


            fetchUserPlaylist(username).then(userPlaylist => {
                console.log(userPlaylist);
                if (userPlaylist && userPlaylist.length > 0) {
                    displayPlaylist(userPlaylist, document.querySelector('#playlistUserTable tbody'));
                } else {
                    console.log('[KAYT] Keine Playlist gefunden.');
                }
            });            

        } else {
            console.log('Login fehlgeschlagen oder andere Aktion erforderlich.');
        }

        container.innerHTML = ""; 
    });
}

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
            const addButtonCell = document.createElement('td');
            const addButton = document.createElement('button');
            addButton.textContent = 'x';
            addButton.classList.add('delete-playlist-button');
            addButtonCell.appendChild(addButton);
            row.appendChild(addButtonCell);
        row.addEventListener('click', () => {
            audioPlayer.src = song.src;
            audioPlayer.play();
        });
        table.appendChild(row);
    });
}

document.getElementById("register").addEventListener("click", () => showForm("register"));
document.getElementById("login").addEventListener("click", () => showForm("login"));

document.getElementById("delete").addEventListener("click", async () => {
    const username = document.getElementById("username").textContent;

    if (username === "Benutzername") {
        console.log("Kein Benutzer eingeloggt!");
        return;
    }

    const confirmDelete = confirm(`Bist du sicher, dass du den Benutzer "${username}" löschen möchtest?`);
    if (!confirmDelete) {
        return;
    }

    const response = await fetch("http://localhost:5050/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
    });

    const data = await response.json();
    console.log(data.message);

    if (response.status === 200) {
        document.getElementById("username").textContent = "Benutzername";
        updateUI(false);
    }
});

function updateUI(isLoggedIn, username = null) {
    console.log('[KAYT] UI wird aktualisiert. Eingeloggt:', isLoggedIn, 'Benutzer:', username);
    
    document.getElementById("register").style.display = isLoggedIn ? "none" : "block";
    document.getElementById("login").style.display = isLoggedIn ? "none" : "block";
    document.getElementById("delete").style.display = isLoggedIn ? "block" : "none";
    document.getElementById("username").style.display = isLoggedIn ? "block" : "none";
    
    if (isLoggedIn) {
        document.getElementById("username").textContent = username;
    }
}
