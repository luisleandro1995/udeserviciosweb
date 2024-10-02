const gameArea = document.getElementById('game-area');
let pacman, ghost;
let pacmanX = 185;
let pacmanY = 185;
let score = 0; // Track the score
const moveDistance = 5;

// Ghost coordinates and messages
const ghosts = [
    { x: 0, y: 0, message: "Un service worker es un worker manejado por eventos registrado para una fuente y una ruta", interacted: false },
    { x: 370, y: 0, message: "Una ServiceWorker es capaz de alterar las respuestas del servidor, interceptar las peticiones del cliente, mandar información específica a ciertas direcciones, recibir notificaciones push, hacer actualizaciones aunque la página no esté abierta, y eventualmente se irán añadiendo otras capacidades", interacted: false },
    { x: 0, y: 370, message: "Creado por Guillermo y Leandro", interacted: false }
];
const pacmanSize = 30; // Assuming Pac-Man size is 30px

function startGame() {
    // Create Main Pac-Man
    pacman = document.createElement('div');
    pacman.classList.add('pacman');
    pacman.style.top = pacmanY + 'px';
    pacman.style.left = pacmanX + 'px';
    gameArea.appendChild(pacman);
    
    // Create Ghosts in the corners
    ghosts.forEach(g => {
        let newGhost = document.createElement('div');
        newGhost.classList.add('ghost');
        newGhost.style.top = g.y + 'px';
        newGhost.style.left = g.x + 'px';
        newGhost.setAttribute('data-message', g.message);
        gameArea.appendChild(newGhost);
    });

    // Add event listener for arrow keys
    window.addEventListener('keydown', movePacman);
}

function movePacman(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (pacmanY > 0) pacmanY -= moveDistance;
            break;
        case 'ArrowDown':
            if (pacmanY < 370) pacmanY += moveDistance; // 400px - 30px (Pac-Man's size)
            break;
        case 'ArrowLeft':
            if (pacmanX > 0) pacmanX -= moveDistance;
            break;
        case 'ArrowRight':
            if (pacmanX < 370) pacmanX += moveDistance; // 400px - 30px (Pac-Man's size)
            break;
    }
    pacman.style.top = pacmanY + 'px';
    pacman.style.left = pacmanX + 'px';

    checkProximity();
}

function checkProximity() {
    ghosts.forEach(g => {
        let distanceX = Math.abs(pacmanX - g.x);
        let distanceY = Math.abs(pacmanY - g.y);
        if (distanceX < pacmanSize && distanceY < pacmanSize && !g.interacted) {
            showMessage(g.message, g);
        }
    });
}

function showMessage(message, ghostData) {
    alert(message); // Display the message in a pop-up
    ghostData.interacted = true; // Mark this Ghost as interacted
    updateScore();
}

function updateScore() {
    score += 10; // Increment score by 10 for each interaction
    document.getElementById('score').textContent = `Puntaje: ${score}`;
}

document.getElementById('start-game').addEventListener('click', startGame);
