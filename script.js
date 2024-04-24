
const kérdések = [
    {
        kérdés: "Melyik történelmi szín számít Madách Imre jelenének?",
        válaszok: ["Párizs", "Falaszter", "London", "Prága"],
        helyesVálaszIndex: 1
    },
    {
        kérdés: "Kiről mintázta Évát Madách Imre?",
        válaszok: ["A nővéréről", "A felesgéről", "Az nanyósáról", "A lányáról"],
        helyesVálaszIndex: 0
    },
    {
        kérdés: "Melyik szín NEM a jövőben játszódik?",
        válaszok: ["Paradicsom", "Falaszter", "Az Űr", "Eszkimó-világ"],
        helyesVálaszIndex: 0
    },
    {
        kérdés: "Az 1862. január 12-én megjelent művet mikor tiltották be a színházakban?",
        válaszok: ["A kommunizmus idején", "A bemutató után egyből", "Az első világháború után.", "Sosem tiltották be."],
        helyesVálaszIndex: 1
    },
    {
        kérdés: "Ádám melyik híres történelmi személyként NEM szerepel a műben?",
        válaszok: ["Miltiadész, arisztokrata", "Fourier, író", "Kepler, csillagász", "Danton, forradalmár"],
        helyesVálaszIndex: 3
    },
    {
        kérdés: "Melyik az a szín, ahol az álmot nem Lucifer irányítja, hanem Ádám?",
        válaszok: ["Athén", "Róma", "Párizs", "London"],
        helyesVálaszIndex: 3
    },
    {
        kérdés: "Ki Ádám és Éva fia az ötödik színben?",
        válaszok: ["Kimón", "Elpinice", "Erósz", "Kriszposz"],
        helyesVálaszIndex: 2
    }
];

const kvízKonténer = document.getElementById('kvíz-konténer');

let jelenlegiKérdésIndex = 0;
let jelenlegiKérdésMegválaszolva = false; 

function következőKérdés() {
    if (!jelenlegiKérdésMegválaszolva) return; 
    jelenlegiKérdésIndex++;
    jelenlegiKérdésMegválaszolva = false; 
    if (jelenlegiKérdésIndex < kérdések.length) {
        setTimeout(() => {
            addKártya(kérdések[jelenlegiKérdésIndex], jelenlegiKérdésIndex);
        }, 1500);
    }
}

function addKártya(kérdés, index) {
    const kártya = document.createElement('div');
    kártya.classList.add('kártya');

    const kártyaTartalom = `
        <h3>Kérdés ${index + 1}</h3>
        <p>${kérdés.kérdés}</p>
        <div class="lehetőségek">
            ${kérdés.válaszok.map((válasz, válaszIndex) => `
                <div class="lehetőség" data-index="${válaszIndex}">${válasz}</div>
            `).join('')}
        </div>
    `;

    kártya.innerHTML = kártyaTartalom;
    kvízKonténer.appendChild(kártya);

    const lehetőségek = kártya.querySelectorAll('.lehetőség');
    lehetőségek.forEach(lehetőség => {
        lehetőség.addEventListener('click', () => {
            const kiválasztottVálaszIndex = parseInt(lehetőség.getAttribute('data-index'));
            const helyesVálaszIndex = kérdés.helyesVálaszIndex;

            if (kiválasztottVálaszIndex === helyesVálaszIndex) {
                lehetőség.style.backgroundColor = 'lightgreen';
                jelenlegiKérdésMegválaszolva = true; 
                következőKérdés();
            }
        });
    });
}

addKártya(kérdések[jelenlegiKérdésIndex], jelenlegiKérdésIndex);