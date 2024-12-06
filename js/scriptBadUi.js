console.log("hello world");

let logoNav = document.getElementById("logoNav");
let mouetteCote = document.getElementById("mouette-cote");
let burgerMenuButton = document.querySelector(".burger-menu-button")
let burgerMenu = document.querySelector(".burger-menu")
let vibrate =  document.querySelector(".soutenir");
let odysse = document.querySelector(".odysse");
console.log("vibrate",vibrate);



burgerMenuButton.addEventListener("click", ()  =>{
    console.log("btn clicked");  
    caBalle.style.display ="flex"
    console.log(caBalle);
    

})

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY; // Position actuelle du scroll vertical

    // Switch pour gérer les niveaux de scroll
    switch (true) {
        case (scrollY >= 100 && scrollY < 200): // Niveau 1 : entre 100px et 300px
            console.log("Action 1 : entre 100px et 300px");
                console.log("animation");
                logoNav.classList.add("logo-anim");
                mouetteCote.classList.remove("penche")
            break;

        case (scrollY >= 250): // Niveau 2 : au-delà de 300px
            console.log("Action 2 : au-delà de 300px");
            mouetteCote.classList.add("penche")
            odysse.classList.add("logo-anim")
            break;

        default: // Aucun niveau atteint
            console.log("Aucune action");
            mouetteCote.classList.remove("penche")
            odysse.classList.remove("penche")

            break;
    }
});





  const messageElement = document.querySelector('.soutenir');
  const tremblingDiv = document.querySelector('.soutenir');
  let videoContainer = document.querySelector('video');
  console.log("vide",videoContainer);
  

  tremblingDiv.addEventListener('click', () => {
    console.log("click");
        console.log("animation");
        vibrate.classList.toggle("vibrate")
        vibrate.classList.toggle("shake")
        videoContainer.classList.toggle("shake");
        videoContainer.classList.toggle("glitch");
        videoContainer.classList.toggle("blink");
        videoContainer.classList.toggle("vibrate");

      const messages = [
          "Merci beaucoup !",
          "OU PAS !!!!!",
        ];
        function changeMessage() {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElement.textContent = randomMessage;
  }

  // Change le message toutes les 2 secondes
  changeMessage();
  })
  // Fonction pour changer le message

