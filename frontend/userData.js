function showForm(action) {
    const container = document.getElementById("form-container");
    container.innerHTML = `
        <input type="text" id="input-username" placeholder="Benutzername">
        <input type="password" id="input-password" placeholder="Passwort">
        <button id="confirm">Bestätigen</button>
    `;

    document.getElementById("confirm").addEventListener("click", async () => {
        const username = document.getElementById("input-username").value;
        const password = document.getElementById("input-password").value;

        if (!username || !password) {
            alert("Bitte fülle alle Felder aus!");
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
        alert(data.message);

        if (response.status === 200 && action === "login") {
            document.getElementById("username").textContent = username;
        }

        // Eingabefelder wieder entfernen
        container.innerHTML = "";
    });
}

document.getElementById("register").addEventListener("click", () => showForm("register"));
document.getElementById("login").addEventListener("click", () => showForm("login"));

document.getElementById("delete").addEventListener("click", async () => {
    const username = document.getElementById("username").textContent;

    if (username === "Benutzername") {
        alert("Kein Benutzer eingeloggt!");
        return;
    }

    const response = await fetch("http://localhost:5050/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
    });

    const data = await response.json();
    alert(data.message);

    if (response.status === 200) {
        document.getElementById("username").textContent = "Benutzername";
    }
});