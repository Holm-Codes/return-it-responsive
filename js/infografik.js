/**
 * file: js/js.js
 * purpose: Behaviors
 **/
console.log('Success: JavaScript from js/js.js running!')

"use strict";

console.log('Success: JavaScript from js/burgermenu.js running!')

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu'); // Hent burger-menu ikonet (de tre horisontale streger)
    const menu = document.querySelector('.menu'); // Hent selve menuen, som er skjult som standard
    const menuLinks = document.querySelectorAll('.menu a'); // Hent alle linkene i menuen (a-tags)

    // Tilføj en 'click' event listener til burger-menu ikonet
    burgerMenu.addEventListener('click', () => {
        menu.classList.toggle('open'); // Når burger-menuen bliver klikket, toggles 'open' class, som viser/skjuler menuen
    });

    // For hver af menuens links (a-tags) gør følgende:
    menuLinks.forEach(link => {
        // Tilføj en 'click' event listener til hvert link
        link.addEventListener('click', (e) => {
            // Fjern 'active' class fra alle links for at fjerne aktiv stil
            menuLinks.forEach(link => link.classList.remove('active'));

            // Tilføj 'active' class til det link, der er blevet klikket på
            e.currentTarget.classList.add('active');
        });
    });
});


// Infografik

// Hent carousel-elementer og dots-container
const slides = document.querySelectorAll('.carousel-element');
const dotsContainer = document.querySelector('.carousel-dots');
let currentIndex = 0; // Start på det første slide

// Opret navigationsprikker baseret på antal slides
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active'); // Første prik er aktiv
  dotsContainer.appendChild(dot);

  // Klik på prikken navigerer til det tilsvarende slide
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel(); // Opdater carousel
  });
});

// Funktion til at opdatere carousel og prikker
function updateCarousel() {
  // Fjern "active" fra alle slides og prikker
  slides.forEach(slide => slide.classList.remove('active'));
  dotsContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

  // Tilføj "active" til aktuelt slide og prik
  slides[currentIndex].classList.add('active');
  dotsContainer.querySelectorAll('.dot')[currentIndex].classList.add('active');
}

// Skift til næste slide (uden %)
function nextSlide() {
  currentIndex += 1; // Øg currentIndex med 1
  if (currentIndex >= slides.length) {
    currentIndex = 0; // Hvis vi når slutningen, gå tilbage til første slide
  }
  updateCarousel();
}

// Initial opdatering
updateCarousel();

// Auto-rotér carouselen hver 5. sekund (valgfrit)
// setInterval(nextSlide, 5000);

// Fade-in effekter for andre tekst-sektioner
// Find alle elementer med klassen "fade-in" og observer, hvornår de bliver synlige i viewporten.
// Når de kommer i syne, tilføjes klassen "animate" for at starte animationen.
const fadeInElements = document.querySelectorAll('.fade-in');

// Dette er en IntersectionObserver til at holde øje med elementer i viewporten
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Tilføjer klassen "animate", når elementet er synligt
      entry.target.classList.add('animate');
      // Stopper observeringen for dette element, efter animationen er kørt
      observer.unobserve(entry.target);
    }
  });
});

// Tilføjer observeren til alle fade-in elementer
// Gennemgår alle elementer med klassen "fade-in" og sæter dem til at blive observeret af IntersectionObserver.
fadeInElements.forEach(element => {
  observer.observe(element);
});