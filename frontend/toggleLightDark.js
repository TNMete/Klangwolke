document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById('toggleMode');
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        button.textContent = 'Lightmode';
    }

    button.addEventListener("click", () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            button.textContent = 'Lightmode';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            button.textContent = 'Darkmode';
        }
    });
});

