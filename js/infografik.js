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

let currentIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-element');
const totalItems = carouselItems.length;

// Funktion til at opdatere carouselen
function updateCarousel() {
  // Fjern "active" fra alle slides
  carouselItems.forEach(item => item.classList.remove('active'));

  // Tilføj "active" til den nuværende slide
  carouselItems[currentIndex].classList.add('active');
}

// Skift til næste slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalItems; // Gå videre til næste slide
  updateCarousel();
}

// Skift til forrige slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Gå tilbage til forrige slide
  updateCarousel();
}

// Start carouselen
updateCarousel();

// Auto-rotér carouselen hver 5. sekund (valgfrit)
setInterval(nextSlide, 5000);