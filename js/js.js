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