document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-btn, .start-travel a'); // Sélectionne les liens
    
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche la navigation immédiate
            
            const target = event.target.getAttribute('href'); // Récupère l'URL cible
            document.body.classList.add('fade-out'); // Ajoute la classe d'animation
            
            setTimeout(() => {
                window.location.href = target; // Redirige après l'animation
            }, 1000); // Durée correspondant à l'animation
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // Ajouter la classe fade-in pour le fondu d'apparition
    body.classList.add("fade-in");

    // Retirer la classe après la durée de l'animation (2 secondes ici)
    setTimeout(() => {
        body.classList.remove("fade-in");
    }, 2000); // 2000ms = 2s
});