const cookieContainer = document.querySelector(".cookie-container");
const cookieCounter = document.querySelector(".cookie-counter");
let counter = 0;
let isCookieTiny = false;
let clickCount = 0; // Variable pour compter les clics sur le bouton "Oui"
const dolphin = document.createElement("img");
let randomMovementInterval;
const fakeCookies = [];

// Ajout de l'image du cookie
cookieContainer.innerHTML = `<img class="cookie" src="../src/img/nightmare_cookie.png" alt="Cookie maléfique">`;
const cookie = cookieContainer.querySelector(".cookie");

let evadeActive = false; // Indique si le cookie est en train de fuir
let evadeHandler; // Référence au gestionnaire d'événement evade

// Fonction pour générer des positions aléatoires dans la fenêtre
function getRandomPosition() {
    const maxX = window.innerWidth - 100; // Limite de la largeur de la fenêtre, pour que la question ne dépasse pas
    const maxY = window.innerHeight - 100; // Limite de la hauteur de la fenêtre, pour que la question ne dépasse pas
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    return { x: randomX, y: randomY };
  }

// Gestion des événements aléatoires
function randomEvent() {
  let luck = Math.floor(Math.random() * 10) + 1;
  switch (luck) {
    case 1:
      console.log("Le cookie devient insaisissable !");
      startEvading();
      break;
    case 2:
      console.log("Le cookie devient minuscule !");
      makeCookieTiny();
      break;
    case 3:
      showDolphinQuestion(); // Afficher la question du dauphin
      document.body.appendChild(dolphin); // Ajouter le dauphin
    case 4:
      console.log("Le cookie bouge aléatoirement !");

      // Lancer l'animation du mouvement aléatoire
      startRandomMovement();
      break;
    case 5:
      hideCookie();
    break;
    case 6:
  // Générer un nombre aléatoire de faux cookies entre 10 et 50
  const numFakeCookies = Math.floor(Math.random() * (50 - 10 + 1)) + 10; // Nombre entre 10 et 50

  // Récupérer les dimensions du conteneur
  const containerRect = cookieContainer.getBoundingClientRect();
  const cookieWidth = 30; // Estimation de la largeur du cookie
  const cookieHeight = 30; // Estimation de la hauteur du cookie

  // Créer les faux cookies
  for (let i = 0; i < numFakeCookies; i++) {
    const fakeCookie = document.createElement("img");
    fakeCookie.classList.add("cookie");
    fakeCookie.src = "../src/img/nightmare_cookie.png"; // Même image que le vrai cookie
    fakeCookie.alt = "Faux cookie";

    // Générer une position aléatoire pour chaque cookie
    const randomX = Math.random() * (containerRect.width - cookieWidth);
    const randomY = Math.random() * (containerRect.height - cookieHeight);

    // Positionner le cookie
    fakeCookie.style.position = "absolute";
    fakeCookie.style.left = `${randomX}px`;
    fakeCookie.style.top = `${randomY}px`;

    // Ajouter le cookie au conteneur
    cookieContainer.appendChild(fakeCookie);

    // Ajouter chaque faux cookie au tableau fakeCookies pour les supprimer plus tard
    fakeCookies.push(fakeCookie);

    // Ajouter l'événement pour supprimer le faux cookie lorsqu'il est cliqué
    fakeCookie.addEventListener("click", () => {
      fakeCookie.remove(); // Supprimer le faux cookie du DOM
    });
  }
  break;
  case 7:
    console.log("Le cookie est maintenant contrôlable avec les flèches du clavier !");

    // Désactiver temporairement les clics sur le cookie
    cookie.style.pointerEvents = "none";

    // Initialisation des variables pour le contrôle
    const cookieSpeed = 10; // Vitesse de déplacement du cookie
    let cookiePosition = { x: cookie.offsetLeft, y: cookie.offsetTop };
    let mousePosition = { x: 0, y: 0 }; // Position actuelle du curseur

    // Ajouter un texte de conseil
    const tips = document.createElement("div");
    tips.textContent = "Conseil ! Utilisez les flèches de votre clavier pour déplacer le cookie.";
    tips.style.position = "absolute";
    tips.style.top = "10px";
    tips.style.left = "50%";
    tips.style.transform = "translateX(-50%)";
    tips.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    tips.style.color = "white";
    tips.style.padding = "10px 20px";
    tips.style.borderRadius = "5px";
    tips.style.zIndex = "1000";
    tips.style.fontFamily = "Arial, sans-serif";
    document.body.appendChild(tips);

    // Supprimer le conseil après 5 secondes (au cas où)
    setTimeout(() => {
      tips.remove();
    }, 10000);

    // Mettre à jour la position du curseur lors des mouvements de souris
    document.addEventListener("mousemove", (event) => {
      mousePosition.x = event.clientX;
      mousePosition.y = event.clientY;
    });

    // Ajouter l'écouteur d'événements pour le clavier
    function moveCookie(event) {
      const containerRect = cookieContainer.getBoundingClientRect();
      const cookieRect = cookie.getBoundingClientRect();

      switch (event.key) {
        case "ArrowUp":
          cookiePosition.y = Math.max(0, cookiePosition.y - cookieSpeed);
          break;
        case "ArrowDown":
          cookiePosition.y = Math.min(
            containerRect.height - cookieRect.height,
            cookiePosition.y + cookieSpeed
          );
          break;
        case "ArrowLeft":
          cookiePosition.x = Math.max(0, cookiePosition.x - cookieSpeed);
          break;
        case "ArrowRight":
          cookiePosition.x = Math.min(
            containerRect.width - cookieRect.width,
            cookiePosition.x + cookieSpeed
          );
          break;
      }

      // Appliquer les nouvelles positions
      cookie.style.position = "absolute";
      cookie.style.left = `${cookiePosition.x}px`;
      cookie.style.top = `${cookiePosition.y}px`;

      // Vérifier si le cookie atteint le curseur
      const cookieCenterX = cookiePosition.x + cookieRect.width / 2;
      const cookieCenterY = cookiePosition.y + cookieRect.height / 2;

      // Si le cookie atteint la zone proche du curseur
      const proximityThreshold = 20; // Distance à laquelle le cookie peut être cliqué
      if (
        Math.abs(mousePosition.x - cookieCenterX) <= proximityThreshold &&
        Math.abs(mousePosition.y - cookieCenterY) <= proximityThreshold
      ) {
        console.log("Le cookie est proche du curseur, il peut être cliqué !");
        cookie.style.pointerEvents = "auto"; // Réactiver les clics sur le cookie
        document.removeEventListener("keydown", moveCookie); // Retirer l'écouteur clavier
        tips.remove(); // Supprimer le conseil immédiatement
      }
    }

    // Ajouter l'écouteur d'événements clavier
    document.addEventListener("keydown", moveCookie);

    break;
    case 8:
    console.log("Des GIFs de spam apparaissent et glissent à l'écran !");

    const gifs = [
        "../src/img/gif1.gif", // Remplacez par le chemin de votre premier GIF
        "../src/img/gif2.gif", // Remplacez par le chemin de votre deuxième GIF
        "../src/img/gif3.gif", // Remplacez par le chemin de votre troisième GIF
    ];

    gifs.forEach((gifSrc, index) => {
        // Créer un conteneur pour chaque GIF
        const spamGif = document.createElement("div");
        spamGif.classList.add("spam-popup");
        spamGif.style.backgroundImage = `url(${gifSrc})`;

        // Départ aléatoire à gauche ou à droite
        const startPosition = Math.random() < 0.5 ? "-150px" : "calc(100% + 150px)";
        const endPosition = startPosition === "-150px" ? "calc(100% + 150px)" : "-150px";

        // Position verticale aléatoire
        const topPosition = `${Math.random() * 80 + 10}%`; // Entre 10% et 90% de l'écran

        // Appliquer les styles initiaux
        spamGif.style.top = topPosition;
        spamGif.style.left = startPosition;

        // Ajouter le GIF à la page
        document.body.appendChild(spamGif);

        // Animation : transition lente à travers l'écran
        setTimeout(() => {
            spamGif.style.left = endPosition;
        }, 100); // Laisser le DOM charger le style initial avant de bouger

        // Supprimer le GIF après qu'il soit hors écran
        setTimeout(() => {
            spamGif.remove();
        }, 10000 + index * 1000); // Les délais varient légèrement pour chaque GIF
    });

    break;
    case 9:
        console.log("Activez le son pour faire apparaître le cookie !");
        const targetVolume = 0.08; // Volume minimum requis
        const consecutiveThresholds = 10; // Échantillons consécutifs nécessaires
        let audioContext, analyser, microphone, javascriptNode;
        let consecutiveHits = 0;
        let cookieRevealed = false;  // Flag pour suivre si le cookie a été révélé
    
        // Message pour l'utilisateur
        const soundTip = document.createElement("div");
        soundTip.classList.add("sound-tip");
        soundTip.innerText = "Parlez ou émettez un son suffisamment fort pour révéler le cookie !";
        soundTip.style.position = "fixed";
        soundTip.style.top = "10px";
        soundTip.style.left = "50%";
        soundTip.style.transform = "translateX(-50%)";
        soundTip.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        soundTip.style.color = "white";
        soundTip.style.padding = "10px 20px";
        soundTip.style.borderRadius = "5px";
        soundTip.style.zIndex = "1000";
        document.body.appendChild(soundTip);
    
        // Fonction pour démarrer l'analyse audio
        async function initAudio() {
            try {
                // Initialiser le contexte audio
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                analyser.smoothingTimeConstant = 0.3;
                analyser.fftSize = 1024;
    
                // Demander l'accès au microphone
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
    
                // Créer un script node pour analyser le volume
                javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
                analyser.connect(javascriptNode);
                javascriptNode.connect(audioContext.destination);
    
                // Surveillance du niveau sonore
                javascriptNode.onaudioprocess = () => {
                    const dataArray = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(dataArray);
    
                    // Calculer le volume moyen
                    const averageVolume = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length / 255;
    
                    console.log("Volume détecté :", averageVolume);
    
                    // Vérifier si le volume dépasse le seuil
                    if (averageVolume > targetVolume) {
                        consecutiveHits++;
                        if (consecutiveHits >= consecutiveThresholds && !cookieRevealed) {
                            activateCookie(); // Activer le cookie
                            cookieRevealed = true;  // Marquer le cookie comme révélé
                            stopAudioAnalysis(); // Arrêter l'analyse audio
                        }
                    } else {
                        consecutiveHits = 0; // Réinitialiser si le son est en dessous du seuil
                        deactivateCookie(); // Désactiver le cookie
                    }
                };
            } catch (err) {
                console.error("Erreur d'accès au microphone :", err);
                soundTip.innerText = "Erreur : impossible d'accéder au microphone. Vérifiez vos permissions.";
            }
        }
    
        // Fonction pour activer le cookie (le rendre cliquable)
        function activateCookie() {
            cookie.style.opacity = "1"; // Rendre le cookie visible
            cookie.style.pointerEvents = "auto"; // Réactiver les clics
            cookie.classList.remove("cookie-red");
            soundTip.remove(); // Supprimer le message
        }
    
        // Fonction pour désactiver le cookie (le rendre invisible et non cliquable)
        function deactivateCookie() {
            cookie.style.opacity = "0.5"; // Réduire l'opacité du cookie
            cookie.style.pointerEvents = "none"; // Désactiver les clics
            cookie.classList.add("cookie-red");
        }
    
        // Fonction pour arrêter l'analyse audio une fois le cookie révélé
        function stopAudioAnalysis() {
            if (audioContext) {
                audioContext.close();  // Ferme le contexte audio et arrête l'analyse
                microphone.disconnect();  // Déconnecte le microphone
                javascriptNode.disconnect();  // Déconnecte le script node
                console.log("Analyse audio arrêtée.");
            }
        }
    
        // Démarrer l'analyse audio et marquer l'entrée dans le case 9
        initAudio();
    
        break;
    }
}    


function removeAllFakeCookies() {
    fakeCookies.forEach((fakeCookie) => {
      fakeCookie.remove(); // Supprimer tous les faux cookies du DOM
    });
    // Vider le tableau après suppression
    fakeCookies.length = 0; // Si vous souhaitez également vider le tableau après suppression
  }
  

function startRandomMovement() {
  randomMovementInterval = setInterval(() => {
    const containerRect = cookieContainer.getBoundingClientRect();
    const cookieRect = cookie.getBoundingClientRect();

    // Générer un déplacement aléatoire
    const randomX = (Math.random() - 0.5) * 100; // Mouvement horizontal aléatoire
    const randomY = (Math.random() - 0.5) * 100; // Mouvement vertical aléatoire

    let newLeft = cookie.offsetLeft + randomX;
    let newTop = cookie.offsetTop + randomY;

    // Limiter les mouvements à l'intérieur du conteneur
    newLeft = Math.max(
      0,
      Math.min(newLeft, containerRect.width - cookieRect.width)
    );
    newTop = Math.max(
      0,
      Math.min(newTop, containerRect.height - cookieRect.height)
    );

    cookie.style.position = "absolute";
    cookie.style.left = `${newLeft}px`;
    cookie.style.top = `${newTop}px`;
  }, 50); // Intervalle de 50ms pour un mouvement fluide
}

function stopRandomMovement() {
  if (randomMovementInterval) {
    clearInterval(randomMovementInterval); // Arrêter le mouvement aléatoire
    randomMovementInterval = null; // Réinitialiser l'intervalle
  }
}

// Fonction pour faire apparaître le dauphin et poser une question
function showDolphinQuestion() {
  console.log("Le dauphin apparait !");

  // Ajouter une classe CSS pour rendre le cookie rouge et non cliquable
  cookie.classList.add("cookie-red");
  cookie.style.pointerEvents = "none"; // Désactiver les clics sur le cookie

  // Créer l'image du dauphin
  const dolphin = document.createElement("img");
  dolphin.src = "../src/img/dophin.webp"; // Remplacer par le chemin de l'image du dauphin
  dolphin.alt = "Dauphin";
  dolphin.style.position = "absolute";
  dolphin.style.left = "50%"; // Centrer horizontalement
  dolphin.style.bottom = "-150px"; // Placer le dauphin en bas de la page, en dehors de l'écran
  dolphin.style.transform = "translateX(-50%)"; // Centrer horizontalement par rapport à l'écran
  dolphin.style.transition = "bottom 3s ease-out"; // Augmenter la durée de la transition et utiliser 'ease-out' pour ralentir la fin
  document.body.appendChild(dolphin);

  // Attendre que le dauphin soit créé avant d'animer son apparition
  setTimeout(() => {
    dolphin.style.bottom = "0"; // Placer le dauphin en bas de la page (visible)
  }, 10); // Légère temporisation pour appliquer la transition

  // Afficher la question après un court délai
  setTimeout(() => {
    const question = [
      "Aimez-vous les dauphins ?",
      "Aimez-vous les cookies ?",
      "Aimez-vous les poissons ?",
    ];
    const randomQuestion =
      question[Math.floor(Math.random() * question.length)];
    const popUp = document.createElement("div");
    popUp.classList.add("popup");
    popUp.innerHTML = `
            <div>${randomQuestion}</div>
            <button class="yes-button">Oui</button>
        `;
    document.body.appendChild(popUp);

    // Générer une position aléatoire pour la pop-up
    const { x, y } = getRandomPosition();
    popUp.style.position = "absolute";
    popUp.style.left = `${x}px`;
    popUp.style.top = `${y}px`;

    const yesButton = popUp.querySelector(".yes-button");

    yesButton.addEventListener("click", () => {
      console.log("Réponse : Oui");

      setTimeout(() => {
        // Rendre le cookie à son état normal (retirer la classe et réactiver les clics)
        cookie.classList.remove("cookie-red");
        cookie.style.pointerEvents = "auto";

        dolphin.style.bottom = "-1600px"; // Faire disparaître le dauphin en bas
        setTimeout(() => {
          // Supprimer la pop-up et le dauphin après un court délai
          document.body.removeChild(popUp); // Supprimer la pop-up
          document.body.removeChild(dolphin); // Retirer le dauphin
        }, 500);
      }, 1000); // Délai pour la disparition du dauphin
    });
  }, 1000); // Attendre 1 seconde avant de faire apparaître la question
}

// Fonction pour rendre le cookie minuscule
function makeCookieTiny() {
  if (isCookieTiny) return; // Evite que le cookie devienne minuscule plusieurs fois

  cookie.style.transition = "transform 0.2s ease"; // Animation douce
  cookie.style.transform = "scale(0.05)"; // Réduire le cookie à 5% de sa taille

  isCookieTiny = true; // Le cookie est devenu minuscule
  console.log("Le cookie est devenu minuscule !");
}

// Fonction pour restaurer la taille du cookie
function restoreCookieSize() {
  if (!isCookieTiny) return; // Si le cookie n'est pas minuscule, ne rien faire

  cookie.style.transition = "transform 0.2s ease"; // Animation douce
  cookie.style.transform = "scale(1)"; // Réinitialiser la taille
  isCookieTiny = false; // Le cookie est revenu à sa taille normale
  console.log("Le cookie a retrouvé sa taille normale.");
}

function hideCookie() {
  cookie.classList.add("hidden"); // Ajoute la classe pour l'animation de disparition
}

// Fonction pour réapparaître le cookie
function showCookie() {
  cookie.classList.remove("hidden"); // Supprime la classe pour annuler l'animation
  cookie.style.opacity = 1; // S'assurer que l'opacité est rétablie à 1
}

// Fonction pour que le cookie évite la souris rapidement
function startEvading() {
  if (evadeActive) return; // Empêche d'activer plusieurs fois la fuite
  evadeActive = true;

  const containerRect = cookieContainer.getBoundingClientRect();

  evadeHandler = function (event) {
    const cookieRect = cookie.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const cookieX = cookieRect.left + cookieRect.width / 2;
    const cookieY = cookieRect.top + cookieRect.height / 2;

    // Calcul de la direction opposée
    let deltaX = cookieX - mouseX;
    let deltaY = cookieY - mouseY;

    // Normalisation des valeurs
    const magnitude = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    deltaX /= magnitude;
    deltaY /= magnitude;

    // Déplacement du cookie
    const moveX = deltaX * 100; // Intensité accrue pour une fuite rapide
    const moveY = deltaY * 100;

    let newLeft = cookie.offsetLeft + moveX;
    let newTop = cookie.offsetTop + moveY;

    // Limiter le déplacement à l'intérieur du conteneur
    newLeft = Math.max(
      0,
      Math.min(newLeft, containerRect.width - cookieRect.width)
    );
    newTop = Math.max(
      0,
      Math.min(newTop, containerRect.height - cookieRect.height)
    );

    cookie.style.position = "absolute";
    cookie.style.left = `${newLeft}px`;
    cookie.style.top = `${newTop}px`;
  };

  // Attacher l'événement mousemove pour une fuite rapide
  cookieContainer.addEventListener("mousemove", evadeHandler);
}

// Fonction pour téléporter le cookie à une position aléatoire dans le conteneur
function teleportCookie() {
  const containerRect = cookieContainer.getBoundingClientRect();

  // Calcul d'une position aléatoire à l'intérieur du conteneur
  const randomX = Math.random() * (containerRect.width - cookie.offsetWidth);
  const randomY = Math.random() * (containerRect.height - cookie.offsetHeight);

  cookie.style.position = "absolute";
  cookie.style.left = `${randomX}px`;
  cookie.style.top = `${randomY}px`;

  console.log("Le cookie a été téléporté !");
}

// Gestion des clics
cookie.addEventListener("click", () => {
  counter++;
  cookieCounter.innerHTML = counter;
  console.log(`Nombre de cookies : ${counter}`);

  cookie.classList.add("clicked");

  // Supprimer l'effet de fuite si actif
  if (evadeActive) {
    cookieContainer.removeEventListener("mousemove", evadeHandler);
    evadeActive = false;
    console.log("Le cookie arrête de fuir.");
  }

  setTimeout(() => {
    cookie.classList.remove("clicked");
  }, 200);

  restoreCookieSize();

  removeAllFakeCookies();

  showCookie();

  stopRandomMovement();

  randomEvent(); // Lancer un événement aléatoire après chaque clic

  teleportCookie(); // Téléporte le cookie après chaque clic
});
