/**
 * file: js/js.js
 * purpose: Behaviors
 **/
console.log('Success: JavaScript from js/js.js running!')

"use strict";

console.log('Success: JavaScript from js/burgermenu.js running!')

document.addEventListener('DOMContentLoaded', () => { 
  // Når hele HTML-dokumentet er indlæst (men før billeder og stylesheets er færdigindlæst),
  // udføres denne funktion. Det sikrer, at JavaScript ikke forsøger at bruge elementer,
  // som ikke er klar endnu.

  const burgerMenu = document.querySelector('.burger-menu'); 
  // Henter burger-menu ikonet fra HTML ved at finde elementet med klassen "burger-menu".
  // Dette ikon er de tre horisontale streger, der vises som menu-knappen.

  const menu = document.querySelector('.menu'); 
  // Henter selve navigationsmenuen (listen af links) ved at finde elementet med klassen "menu".
  // Denne menu er som standard skjult via CSS.

  const menuLinks = document.querySelectorAll('.menu a'); 
  // Henter alle links (a-tags) inde i menuen.
  // Disse links er menupunkterne, der bruges til at navigere til forskellige sektioner på siden.

  // Tilføj en 'click' event listener til burger-menu ikonet
  burgerMenu.addEventListener('click', () => { 
      // Når brugeren klikker på burger-menuen (de tre streger):
      menu.classList.toggle('open'); 
      // Klassen "open" tilføjes til menuen, hvis den ikke allerede er der.
      // Hvis klassen "open" allerede findes, fjernes den i stedet.
      // Dette skifter menuens synlighed (åben/lukket) baseret på CSS, hvor "open" gør menuen synlig.
  });

  // For hver af menuens links (a-tags) gør følgende:
  menuLinks.forEach(link => { 
      // Går gennem alle links i menuen ét ad gangen.

      // Tilføj en 'click' event listener til hvert link
      link.addEventListener('click', (e) => { 
          // Når brugeren klikker på et af menuens links:
          
          menuLinks.forEach(link => link.classList.remove('active')); 
          // Fjerner klassen "active" fra alle links i menuen.
          // Dette sørger for, at kun ét link kan være aktivt ad gangen (det, der er klikket på).

          e.currentTarget.classList.add('active'); 
          // Tilføjer klassen "active" til det link, som brugeren lige har klikket på.
          // Klassen "active" kan bruges til at ændre linkets udseende (f.eks. gøre det fremhævet).
      });
  });
});


// Infografik med swipe-funktionalitet

// Hent carousel-elementer og dots-container
const slides = document.querySelectorAll('.carousel-element'); 
// Dette finder alle slides i karusellen. Hvert slide repræsenterer en del af karusellen (f.eks. et billede eller en tekstblok).

const dotsContainer = document.querySelector('.carousel-dots'); 
// Dette finder det HTML-element, hvor navigationsprikkerne skal placeres.

let currentIndex = 0; // Vi starter med det første slide i karusellen (index 0).
let startX = 0;       // Bruges til at gemme startpositionen, når brugeren begynder at swipe.
let endX = 0;         // Bruges til at gemme slutpositionen, når brugeren slipper skærmen.

// Opret navigationsprikker baseret på antal slides
slides.forEach((_, index) => { 
  // Vi looper gennem alle slides. "index" repræsenterer nummeret på det nuværende slide.
  
  const dot = document.createElement('div'); 
  // Vi laver et nyt HTML-element <div>, som bliver en prik i navigationssystemet.
  
  dot.classList.add('dot'); 
  // Tilføj klassen "dot" til den nye prik, så vi kan style den med CSS.
  
  if (index === 0) dot.classList.add('active'); 
  // Hvis det er den første slide (index 0), gør vi denne prik "aktiv" (visuelt markeret).
  
  dotsContainer.appendChild(dot); 
  // Tilføj prikken til dots-containeren i HTML.

  // Gør prikken klikbar, så den kan navigere til det tilsvarende slide
  dot.addEventListener('click', () => { 
    currentIndex = index; 
    // Sæt currentIndex til det slide, der svarer til den klikkede prik.
    updateCarousel(); 
    // Opdater karusellen for at vise det nye aktive slide og opdatere prikkerne.
  });
});

// Funktion til at opdatere carousel og prikker
function updateCarousel() {
  // Fjern klassen "active" fra alle slides og prikker, så ingen af dem længere er markeret.
  slides.forEach(slide => slide.classList.remove('active'));
  dotsContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

  // Tilføj klassen "active" til det slide og den prik, der matcher currentIndex.
  slides[currentIndex].classList.add('active'); 
  dotsContainer.querySelectorAll('.dot')[currentIndex].classList.add('active'); 
}

// Skift til næste slide
function nextSlide() {
  currentIndex += 1; 
  // Øg currentIndex med 1 for at gå til næste slide.
  
  if (currentIndex >= slides.length) { 
    // Hvis vi er nået til det sidste slide, start forfra ved det første slide.
    currentIndex = 0; 
  }
  
  updateCarousel(); 
  // Opdater karusellen for at vise det nye aktive slide og prik.
}

// Skift til forrige slide
function prevSlide() {
  currentIndex -= 1; 
  // Mindsk currentIndex med 1 for at gå til forrige slide.
  
  if (currentIndex < 0) { 
    // Hvis vi er før det første slide, gå til det sidste slide.
    currentIndex = slides.length - 1; 
  }
  
  updateCarousel(); 
  // Opdater karusellen for at vise det nye aktive slide og prik.
}

// Håndtering af swipe-bevægelser (kun relevant på touch-enheder som mobiler)
slides.forEach(slide => {
  slide.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; 
    // Når brugeren starter en swipe-bevægelse, gemmer vi startpositionen for fingeren (x-koordinat).
  });

  slide.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX; 
    // Når brugeren bevæger fingeren, opdaterer vi slutpositionen (x-koordinat).
  });

  slide.addEventListener('touchend', () => {
    // Når brugeren slipper skærmen, beregner vi swipe-retningen:
    if (startX - endX > 50) { 
      // Hvis startX er mere end 50 pixel større end endX, har brugeren swipet til venstre.
      nextSlide(); // Gå til næste slide.
    } else if (endX - startX > 50) { 
      // Hvis endX er mere end 50 pixel større end startX, har brugeren swipet til højre.
      prevSlide(); // Gå til forrige slide.
    }
  });
});

// Initial opdatering
updateCarousel(); 
// Opdater karusellen ved start, så det første slide og den første prik vises korrekt.


// Auto-rotér carouselen hver 5. sekund (valgfrit)
// setInterval(nextSlide, 5000);

// Fade-in effekter for andre tekst-sektioner
// Find alle elementer med klassen "fade-in". 
// Disse elementer skal få en fade-in effekt, når de bliver synlige i viewporten.
const fadeInElements = document.querySelectorAll('.fade-in');
// Denne linje finder ALLE HTML-elementer, der har klassen "fade-in", og opretter en liste af dem (Nodelist).
// Eksempel: Hvis din HTML har <div class="fade-in"></div>, så bliver dette element en del af `fadeInElements`.

// Dette er en IntersectionObserver til at holde øje med elementer i viewporten
const observer = new IntersectionObserver((entries) => {
  // IntersectionObserver overvåger, om elementerne fra `fadeInElements` er synlige på skærmen.
  entries.forEach(entry => {
    // For hvert element (entry), som observeren holder øje med:
    if (entry.isIntersecting) {
      // Hvis elementet er synligt på skærmen:
      entry.target.classList.add('animate');
      // Tilføjer klassen "animate" til elementet, så CSS kan starte fade-in animationen.
      
      observer.unobserve(entry.target);
      // Når animationen er startet, stopper observeren med at overvåge dette element.
      // Dette er for at spare ressourcer og forhindre gentagne animationer.
    }
  });
});

// Tilføjer observeren til alle fade-in elementer
fadeInElements.forEach(element => {
  // Gennemgår hvert element i `fadeInElements` og sætter dem til at blive overvåget af observeren.
  observer.observe(element);
  // Dette betyder, at IntersectionObserver nu holder øje med dette specifikke element.
});