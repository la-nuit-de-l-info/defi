// Sélectionner l'élément
const randomBox = document.querySelector('.random-position');
const rainbowText = document.querySelector('.rainbow-text');

rainbowText.addEventListener('click', () => {
    rainbowText.classList.add('active');
    confetti({
        particleCount: 800,
        spread: 500,
        origin: { y: 0.6 }
    });
});

// Fonction pour générer une position aléatoire
function randomPosition() {
    const windowWidth = window.innerWidth;  // Largeur de la fenêtre
    const windowHeight = window.innerHeight; // Hauteur de la fenêtre

    // Génère des coordonnées aléatoires en restant dans les limites de l'écran
    const randomX = Math.random() * (windowWidth - randomBox.offsetWidth);
    const randomY = Math.random() * (windowHeight - randomBox.offsetHeight);

    // Applique les nouvelles positions
    randomBox.style.left = `${randomX}px`;
    randomBox.style.top = `${randomY}px`;
}

// Appeler la fonction toutes les secondes
setInterval(randomPosition, 1000);

// Appel initial pour positionner immédiatement l'élément
randomPosition();
