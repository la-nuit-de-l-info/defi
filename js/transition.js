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
