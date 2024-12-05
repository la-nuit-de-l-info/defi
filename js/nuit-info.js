const items = [
    { organe: "coeur.png", mer: "maree.jpg", suivant: "cerveau.png" },
    { organe: "cerveau.png", mer: "fond mysterieux.png", suivant: "poumons.png" },
    { organe: "poumons.png", mer: "recifs.jpeg", suivant: "peau.png" },
    { organe: "peau.png", mer: "vagues.jpg", suivant: "intestins.png" },
    { organe: "intestins.png", mer: "profondeurs.jpg", suivant: "reins.png" },
    { organe: "reins.png", mer: "hydrothermale.webp", suivant: "lymphatique.png" },
    { organe: "lymphatique.png", mer: "salinite.png", suivant: "emotions.png" },
    { organe: "emotions.png", mer: "tempete.jpg", suivant: "" }
];

let currentIndex = 0;

const organeEl = document.getElementById('organe');
const merEl = document.getElementById('mer');
const retourEl = document.getElementById('retour');

function hideAllImages() {
    const images = document.querySelectorAll('img.responsive-img');
    images.forEach(img => img.style.display = 'none');
}

function updateDisplay(index, showMer = false) {
    hideAllImages();
    const item = items[index];
    if (showMer) {
        merEl.style.display = 'block';
        merEl.src = `../images/${item.mer}`;
        retourEl.style.display = 'block';
    } else {
        organeEl.style.display = 'block';
        organeEl.src = `../images/${item.organe}`;
        retourEl.style.display = 'none';
    }
}

organeEl.addEventListener('click', function () {
    updateDisplay(currentIndex, true);
});

retourEl.addEventListener('click', function () {
    updateDisplay(currentIndex, false);
    setTimeout(() => {
        if (currentIndex + 1 < items.length) {
            currentIndex++;
            updateDisplay(currentIndex, false);
            organeEl.scrollIntoView({ behavior: 'smooth' });
        }
    }, 1000);
});

updateDisplay(currentIndex);
merEl.style.display = 'none';
