const items = [
    { organe: "coeur.png", mer: "maree.jpg", suivant: "cerveau.png", explication: "Le cœur et le système circulatoire transportent le sang, tout comme les marées et les courants transportent l'eau dans l'océan." },
    { organe: "cerveau.png", mer: "fond mysterieux.png", suivant: "poumons.png", explication: "Le cerveau est complexe et mystérieux, tout comme les abysses de l'océan." },
    { organe: "poumons.png", mer: "recifs.jpeg", suivant: "peau.png", explication: "Les poumons produisent de l'oxygène, tout comme les récifs coralliens." },
    { organe: "peau.png", mer: "vagues.jpg", suivant: "intestins.png", explication: "La peau protège le corps, tout comme la surface de l'océan régule les échanges avec l'atmosphère." },
    { organe: "intestins.png", mer: "profondeurs.jpg", suivant: "reins.png", explication: "Les intestins digèrent les aliments, tout comme les fonds marins recyclent les nutriments." },
    { organe: "reins.png", mer: "hydrothermale.webp", suivant: "lymphatique.png", explication: "Les reins filtrent le sang, tout comme les sources hydrothermales filtrent l'eau." },
    { organe: "lymphatique.png", mer: "salinite.png", suivant: "emotions.png", explication: "Le système lymphatique maintient l'équilibre des fluides, tout comme la salinité de l'eau." },
    { organe: "emotions.png", mer: "tempete.jpg", suivant: "", explication: "Les émotions humaines sont puissantes et changeantes, tout comme les tempêtes océaniques." }
];

let currentIndex = 0;

const organeEl = document.getElementById('organe');
const merEl = document.getElementById('mer');
const retourEl = document.getElementById('retour');
const explanationText = document.getElementById('explanation-text');

function hideAllImages() {
    const images = document.querySelectorAll('img.responsive-img');
    images.forEach(img => {
        img.classList.remove('show');
        img.style.display = 'none';
    });
}

function updateDisplay(index, showMer = false) {
    hideAllImages();
    const item = items[index];
    if (showMer) {
        merEl.src = `../images/${item.mer}`;
        merEl.style.display = 'block';
        merEl.classList.add('show');
        retourEl.style.display = 'block';
        explanationText.textContent = item.explication;
    } else {
        organeEl.src = `../images/${item.organe}`;
        organeEl.style.display = 'block';
        organeEl.classList.add('show');
        retourEl.style.display = 'none';
        explanationText.textContent = "";
    }
}

function showTransitionImage() {
    const transitionImg = document.getElementById('transition-img');
    transitionImg.style.display = 'block';
    transitionImg.classList.add('show');
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
        } else {
            showTransitionImage();
        }
    }, 1000);
});

updateDisplay(currentIndex);