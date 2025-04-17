const tasks = [
    { question: "anrufen - später kommen - .", answer: "Ruf an, wenn du später kommst." },
    { question: "wenig Süßigkeiten essen - abnehmen wollen - .", answer: "Iss wenig Süßigkeiten, wenn du abnehmen willst." },
    { question: "Bescheid sagen - nicht kommen können - .", answer: "Sag Bescheid, wenn du nicht kommen kannst." },
    { question: "mit ihm sprechen - Probleme haben - .", answer: "Sprich mit ihm, wenn du Probleme hast." },
    { question: "mich heiraten - mich lieben - .", answer: "Heirate mich, wenn du mich liebst." },
    { question: "viel lesen - schnell Deutsch lernen möchten - .", answer: "Lies viel, wenn du schnell Deutsch lernen möchtest." },
    { question: "die Polizei rufen - einen Unfall haben - .", answer: "Ruf die Polizei, wenn du einen Unfall hast." },
    { question: "im Internet schauen - eine Arbeit suchen - .", answer: "Schau im Internet, wenn du eine Arbeit suchst." },
    { question: "viel Wasser trinken - oft Kopfschmerzen haben - .", answer: "Trink viel Wasser, wenn du oft Kopfschmerzen hast." },
    { question: "nach Thailand fliegen - im Dezember im Meer schwimmen wollen - .", answer: "Flieg nach Thailand, wenn du im Dezember im Meer schwimmen willst." },
    { question: "zu mir kommen - meine Hilfe brauchen - .", answer: "Komm zu mir, wenn du meine Hilfe brauchst." },
    { question: "die Lehrerin fragen - die Übung nicht verstehen - .", answer: "Frag die Lehrerin, wenn du die Übung nicht verstehst." },
    { question: "zum Arzt gehen - Schmerzen haben - .", answer: "Geh zum Arzt, wenn du Schmerzen hast." },
    { question: "mich besuchen - Zeit haben - .", answer: "Besuch mich, wenn du Zeit hast." },
    { question: "noch etwas nehmen - Hunger haben - .", answer: "Nimm noch etwas, wenn du Hunger hast." },
    { question: "mich fragen - etwas nicht verstehen - .", answer: "Frag mich, wenn du etwas nicht verstehst." },
    { question: "immer eine Fahrkarte kaufen - mit dem Bus fahren - .", answer: "Kauf immer eine Fahrkarte, wenn du mit dem Bus fährst." },
    { question: "früher aufstehen - pünktlich sein wollen - .", answer: "Steh früher auf, wenn du pünktlich sein willst." }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);