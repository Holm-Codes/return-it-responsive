/**
 * file: js/js.js
 * purpose: Behaviors
 **/
console.log('Success: JavaScript from js/js.js running!')
// "use strict" aktiverer "strict mode" i JavaScript, som gør din kode mere sikker og robust.
// Det hjælper ved at:
// 1. Fange fejl tidligt: F.eks. hvis du ved et uheld prøver at bruge en variabel uden at definere den først.
// 2. Forhindre brug af visse "farlige" funktioner og funktionaliteter, som ellers kan skabe problemer.
// 3. Gøre din kode mere forudsigelig og let at debugge, da den følger strammere regler.
// Kort sagt: Det er som at sige til JavaScript: "Ingen sjusk – følg reglerne!"
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
      // "toggle" skifter klassen "open" frem og tilbage:
      // - Hvis klassen ikke findes på menuen, tilføjes den.
      // - Hvis klassen allerede findes, fjernes den.
      // Dette bruges til at kontrollere menuens synlighed (åben/lukket) ved hjælp af CSS.
  });

// For hver af menuens links (a-tags) gør følgende:
menuLinks.forEach(link => { 
  // Tilføj en 'click' event listener til hvert link
  link.addEventListener('click', (e) => { 
      // "e" er event-objektet, som automatisk sendes af browseren, når hændelsen sker.
      // Det indeholder information om hændelsen (her et klik), og hvilket element der blev klikket på.

      // Fjerner klassen "active" fra alle links i menuen
      menuLinks.forEach(link => link.classList.remove('active'));
      // Dette sørger for, at kun ét link kan være aktivt ad gangen (det, der er klikket på).

      // Tilføjer klassen "active" til det link, brugeren lige har klikket på
      e.currentTarget.classList.add('active'); 
      // "e.currentTarget" refererer til det element, der har udløst hændelsen (her det link, der blev klikket på).
      // Klassen "active" bruges ofte til at fremhæve linket, f.eks. med farve eller en anden stil.
  });
});
});


// Infografik med swipe-funktionalitet

// Hent carousel-elementer og dots-container
const slides = document.querySelectorAll('.carousel-element'); 
// Dette finder alle slides i karusellen. Hvert slide repræsenterer en del af karusellen (f.eks. et billede eller en tekstblok).

const dotsContainer = document.querySelector('.carousel-dots'); 
// Dette finder det HTML-element, hvor navigationsprikkerne skal placeres.

let currentIndex = 0; // Holder styr på, hvilket slide der vises lige nu. Vi starter med det første slide (index 0). 
// Dette bruges også til at opdatere de visuelle prikker, så de viser, hvilket slide der er aktivt.

let startX = 0;       // Gemmer den vandrette startposition (x-koordinat), når brugeren begynder at swipe.
// Swipe-funktionen bruger denne værdi til at afgøre, hvor brugeren starter sin bevægelse.

let endX = 0;         // Gemmer den vandrette slutposition (x-koordinat), når brugeren slipper skærmen efter at have swipet.
// Ved at sammenligne endX med startX beregner vi, om brugeren har swipet til højre eller venstre, 
// og vi opdaterer både det aktive slide og de tilhørende prikker.
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
// Når du swiper med fingeren på skærmen, registrerer vi, hvor fingeren **starter** (startX) og **slutter** (endX).
// Forskellen mellem de to positioner (startX - endX eller endX - startX) fortæller os, hvor meget fingeren er blevet trukket.

// **Hvorfor 50 pixels?**
// 1. Når du bare klikker på skærmen (uden at trække fingeren), er bevægelsen meget lille.
//    Din finger kan måske flytte sig nogle få pixels (fx 2-10 pixels) uden at du swiper rigtigt.
//    Så vi siger: Hvis bevægelsen er mindre end **50 pixels**, er det for småt til at være en swipe, og vi ignorerer det.

// 2. Hvis du **trækker fingeren** på skærmen (swiper), bevæger du normalt fingeren over en større afstand, fx 50 pixels eller mere.
//    Det er derfor, vi har valgt **50 pixels** som en tærskel:
//    - Det er langt nok til at skelne mellem en lille utilsigtet bevægelse og en reel swipe.
//    - Det betyder, at systemet kun reagerer på en bevidst handling (en rigtig swipe).

// **Så hvad sker der, hvis du klikker 50 pixels væk?**
// - Det kan du faktisk ikke gøre med en enkelt berøring, fordi et klik normalt ikke skaber en bevægelse.
// - For at nå 50 pixels forskel skal du fysisk **trække fingeren** på skærmen fra startpositionen til slutpositionen.
// - Systemet ved derfor, at det var en swipe og ikke et klik, fordi der er en reel bevægelse af fingeren mellem start og slut.

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

/**
 *  * Hvad er DOM-manipulation?
 * 
 * DOM-manipulation refererer til processen, hvor JavaScript bruges til at ændre eller interagere
 * med HTML-elementer og deres egenskaber i dokumentets struktur (DOM - Document Object Model).
 * 
 * Dette gør det muligt at:
 * 1. Ændre indholdet af elementer (f.eks. opdatere tekst eller billeder).
 * 2. Tilføje, fjerne eller oprette HTML-elementer dynamisk.
 * 3. Ændre klasser eller stilarter på elementer for at opdatere deres udseende.
 * 4. Reagere på brugerinteraktioner som klik, tastetryk eller scroll og opdatere siden i realtid.
 * 
 * Kort sagt bruges DOM-manipulation til at gøre websider interaktive og dynamiske ved at tilpasse,
 * hvordan de præsenterer sig for brugeren.
 * 
 * 
 * DOM-manipulation i koden:
 * 
 * 1. **Hente elementer fra DOM'en**:
 *    - `document.querySelector` og `document.querySelectorAll` bruges til at hente specifikke elementer som
 *      menuikoner, links, slides og dots-containeren.
 *    - Dette gør det muligt at manipulere elementerne baseret på brugerens interaktioner.
 * 
 * 2. **Ændring af klasser på elementer**:
 *    - `classList.add`, `classList.remove`, og `classList.toggle` bruges til dynamisk at ændre elementers udseende eller tilstand:
 *      - F.eks. toggles klassen `open` for at vise eller skjule menuen.
 *      - Klassen `active` tilføjes eller fjernes for at fremhæve det aktive menu-link, slide eller prik.
 * 
 * 3. **Oprettelse af nye DOM-elementer**:
 *    - `document.createElement` bruges til at oprette nye HTML-elementer (f.eks. prikker i karusellen).
 *    - Disse elementer tilføjes derefter til DOM'en ved hjælp af `appendChild`.
 * 
 * 4. **Interaktive hændelser**:
 *    - `addEventListener` bruges til at lytte efter klik og swipe-events:
 *      - Klik på menu-links eller burger-menuen opdaterer DOM'en ved at ændre klasser.
 *      - Swipe-bevægelser registreres med `touchstart`, `touchmove`, og `touchend`, hvorefter slides opdateres.
 * 
 * 5. **Observering af elementer**:
 *    - `IntersectionObserver` bruges til at overvåge, om elementer med klassen `fade-in` er synlige i viewporten.
 *      - Når et element bliver synligt, tilføjes klassen `animate`, som udløser en CSS-animation.
 * 
 * Samlet set bruges DOM-manipulation til at gøre websiden interaktiv og dynamisk:
 * - Brugerhandlinger som klik eller swipe opdaterer menuen, karusellen eller animationer på siden.
 * - Nye elementer genereres og tilpasses i realtid, mens tilstanden af eksisterende elementer opdateres efter behov.
 */