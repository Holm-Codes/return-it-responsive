console.log("JavaScript loaded!");
// Følgende er et bjekt, som gemmer data for hvert trin i genanvendelsesprocessen. 
// Hvert trin har et navn (f.eks. "Indledende Samtale") som nøgle, og tilknyttet er et billede og en beskrivelse.
const processData = {
    "Indledende samtale": {
        image: "images/forhandling.webp",
        description: "Vi indleder samarbejdet med en dialog, hvor du bliver præsenteret for vores cirkulære koncept. Samtidig drøfter vi, hvordan løsningen bedst kan tilpasses behovene for netop dit arrangement."
    },
    "Produktion": {
        image: "images/produktion.webp",
        description: "Efter den indledende samtale påbegynder vi produktionen af emballagen til dit event. Vi sikrer at emballagen baseres på bæredygtige materialer og innovative metoder."
    },
    "Levering": {
        image: "images/levering.webp",
        description: "Efter produktionen af emballagen bliver din ordre leveret til dig i god tid inden eventet. Vi garanterer en præcis og fleksibel levering, så i kan fokusere på jeres arrangement."
    },
    "Brug af emballage": {
        image: "images/emballage.webp",
        description: "Emballagen er designet til både at være æstetisk og praktisk. Den sikrer nem håndtering for dig som arrangør og passer samtidig perfekt til dit events bæredygtige profil."
    },
    "Indsamling": {
        image: "images/indsamling.webp",
        description: "Til jeres event vil i blive forsynet med specielle affaldsspande, der skal indsamle det brugte emballage. Efter eventet sørger vi for effektiv indsamling. Dette er første skridt i vores cirkulære proces."
    },
    "Afhentning": {
        image: "images/afhentning.webp",
        description: "Alt emballage afhentes hurtigt og professionelt via vores samarbejdspartnere. Vi minimerer derigennem dine logistiske bekymringer ved at tage ansvar for hele processen."
    },
    "Vask og omsmeltning": {
        image: "images/vask_omsmeltning.webp",
        description: "Efter emballagen er fragtet tilbage til os påbegynder genanvendelsesprocessen. Vi vasker og omsmelter emballagen til nye produkter, og derigennem understøtter jeres bæredygtige ambitioner."
    },
    "Klar til ny emballage": {
        image: "images/ny_emballage.webp",
        description: "Processen slutter med, at det nye emballage er klar til brug på fremtidige events. Med vores cirkulære system får du en bæredygtig og økonomisk løsning, der sparer dig og dit arrangement ressourcer."
    }
};

// Her findes HTML-elementerne med id'erne "process-title" og "process-description". 
// De indeholder overskriften og beskrivelsen, som vises i midten af cirklen.
const processTitle = document.getElementById("process-title");
const processDescription = document.getElementById("process-description");

// Der bruges querySelectorAll til at finde alle elementer med klassen "process-step" (ikonerne) 
// og "pil" (pile), så der kan tilføjes funktionalitet til dem senere.
// De gemmes i to variabler:
// - "steps" indeholder alle ikonerne i cirklen.
// - "pile" indeholder alle pile, som hører til hvert ikon.
const steps = document.querySelectorAll(".process-step");
const pile = document.querySelectorAll(".pil");

// Gennemgår alle ikoner (elementer med klassen "process-step") og tilføjer en "click"-hændelse.
// Når et ikon bliver klikket på, opdateres teksten i midten af cirklen, og den tilsvarende pil markeres.
steps.forEach((step, index) => {
    step.addEventListener("click", function () {
        // Henter titlen fra ikonet (teksten i <figcaption>)
        const title = step.querySelector("figcaption").textContent.trim();
        // Finder den tilsvarende data (billede og beskrivelse) i objektet "processData"
        const data = processData[title];

        if (data) {
           // Tilføjer en fade-out effekt til midterteksten
            const details = document.querySelector('.process-details');
            details.classList.add('fade'); // Gør teksten usynlig midlertidigt

            setTimeout(() => {
                // Opdaterer overskriften og beskrivelsen, når fade-out er færdig
                processTitle.textContent = title;
                processDescription.textContent = data.description;

                // Fjerner fade-out effekten, så teksten bliver synlig igen
                details.classList.remove('fade');
            }, 300); // Matcher fade-out tiden i CSS 

            // Fjerner "active"-klassen fra alle ikoner og pile
            steps.forEach(s => s.classList.remove("active"));
            pile.forEach(p => p.classList.remove("active"));

            // Tilføjer "active"-klassen til det valgte ikon og den tilsvarende pil
            step.classList.add("active");
            pile[index].classList.add("active");
        } else {
            // Hvis der ikke findes data for det valgte ikon, vises en fejl i konsollen
            console.error("Data for '" + title + "' ikke fundet!");
        }
    });
});

// Sætter standardteksten ved start
processTitle.textContent = "Sådan sikrer Return It en bæredygtig emballageløsning for dig";
processDescription.textContent = "Klik på et ikon og følg hvert trin i genanvendelsesprocessen";

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
 * Samlet oversigt over DOM-manipulation i koden:
 *
 * 1. **Hente elementer fra DOM'en**:
 *    - Ved hjælp af `getElementById` og `querySelectorAll` hentes specifikke HTML-elementer:
 *      - `processTitle` og `processDescription`: Bruges til at vise overskriften og beskrivelsen i midten af cirklen.
 *      - `steps` og `pile`: Indeholder henholdsvis ikonerne og pilene i processen.
 *
 * 2. **Tilføje hændelser**:
 *    - `addEventListener` tilføjes til hvert ikon (`steps`) for at håndtere klik fra brugeren.
 *    - Når brugeren klikker på et ikon, opdateres indhold og klasser dynamisk.
 *
 * 3. **Ændre indhold**:
 *    - `textContent` bruges til at opdatere teksten i midten af cirklen baseret på det trin, brugeren har klikket på.
 *    - Beskrivelsen og titlen hentes fra objektet `processData`, som indeholder information om hvert trin.
 *
 * 4. **Ændre klasser**:
 *    - `classList.add` og `classList.remove` bruges til at tilføje eller fjerne klasser:
 *      - Klassen `fade` styrer fade-out-effekten, når teksten ændres.
 *      - Klassen `active` fremhæver det valgte ikon og den tilsvarende pil.
 *
 * 5. **Dynamisk timing**:
 *    - `setTimeout` bruges til at vente på, at fade-out-effekten er færdig, før teksten opdateres og fade-in-effekten begynder.
 *
 * 6. **Opstartstilstand**:
 *    - Ved starten sættes en standardtitel og -beskrivelse med `processTitle.textContent` og `processDescription.textContent`.
 *
 * Formålet med denne DOM-manipulation er at skabe en interaktiv brugeroplevelse, hvor brugeren kan klikke på ikoner
 * for at lære om hvert trin i processen. Samtidig opdateres visuelle elementer som pile og tekst dynamisk, hvilket
 * forbedrer engagementet og forståelsen af processen.
 */