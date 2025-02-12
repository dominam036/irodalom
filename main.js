const fejlec ={
  szerzo: "Szerző neve", // Fejléc: Szerző neve
  kor: "Korszak",     // Fejléc: kor
  szerel: "Szerelmek"    // Fejléc: szerel
}
const tomb = [
  {
    szerzo: "Balassi Bálint", // Az első sor: Szerző neve
    kor: "reformáció",     // Az első sor: kor
    szerel: "Losonczy Anna",  // Az első sor: Első szerelem
    szerel2: "Dobó Krisztina"  // Az első sor: Második szerelem
  },
  {
    szerzo: "Csokonai Vitéz Mihály", // A második sor: Szerző neve
    kor: "felvilágosodás",        // A második sor: kor
    szerel: "Vajda Juliána"          // A második sor: Első szerelem (összevont oszlop)
  },
  {
    szerzo: "Petőfi Sándor",      // A harmadik sor: Szerző neve
    kor: "magyar romantika",   // A harmadik sor: kor
    szerel: "Mednyánszky Berta",  // A harmadik sor: Első szerelem
    szerel2: "Szendrey Júlia"      // A harmadik sor: Második szerelem
  },
  {
    szerzo: "Ady Endre",    // A negyedik sor: Szerző neve
    kor: "20. század",   // A negyedik sor: kor
    szerel: "Léda",         // A negyedik sor: Első szerelem
    szerel2: "Csinszka"      // A negyedik sor: Második szerelem
  }
];

const table = document.createElement('table'); // Táblázat létrehozása
document.body.appendChild(table); // Táblázat hozzáadása a dokumentum törzséhez
const thead = document.createElement('thead'); // Fejléc rész létrehozása
table.appendChild(thead); // Fejléc hozzáadása a táblázathoz
const th_Row = document.createElement('tr'); // Fejléc sor létrehozása
thead.appendChild(th_Row); // Fejléc sor hozzáadása a fejléc részhez
const th_szerzo = document.createElement('th'); // Első fejléc cella létrehozása
th_szerzo.innerHTML = fejlec.szerzo; // Szöveg beállítása az első cellában
th_Row.appendChild(th_szerzo); // Első fejléc cella hozzáadása a fejléc sorhoz
const th_kor = document.createElement('th'); // Második fejléc cella létrehozása
th_kor.innerHTML = fejlec.kor; // Szöveg beállítása a második cellában
th_Row.appendChild(th_kor); // Második fejléc cella hozzáadása a fejléc sorhoz

const th_szerel = document.createElement('th'); // Harmadik fejléc cella létrehozása
th_szerel.colSpan = 2; // Cella oszlopainak összevonása
th_szerel.innerHTML = fejlec.szerel; // Szöveg beállítása a harmadik cellában
th_Row.appendChild(th_szerel); // Harmadik fejléc cella hozzáadása a fejléc sorhoz

const tbody = document.createElement('tbody'); // Táblázat törzs részének létrehozása
table.appendChild(tbody); // Törzs hozzáadása a táblázathoz

function renderTable() { // A renderTable függvény létrehozása
  for (let i = 0; i < tomb.length; i++) { // Végigiterálunk a `tomb` tömb elemein
      const row = document.createElement('tr'); // Új sor létrehozása a táblázathoz
      tbody.appendChild(row); // A létrehozott sort hozzáadjuk a táblázat törzséhez (tbody)

      const szerzo = document.createElement('td'); // Létrehozunk egy cellát a szerző nevének
      szerzo.innerHTML = tomb[i].szerzo; // Beállítjuk a cella tartalmát az aktuális szerző nevére
      row.appendChild(szerzo); // A cellát hozzáadjuk a sorhoz

      const kor = document.createElement('td'); // Létrehozunk egy cellát a korszak számára
      kor.innerHTML = tomb[i].kor; // Beállítjuk a cella tartalmát az aktuális korszak nevére
      row.appendChild(kor); // A cellát hozzáadjuk a sorhoz

      const szerel = document.createElement('td'); // Létrehozunk egy cellát az első szerelem számára
      szerel.innerHTML = tomb[i].szerel; // Beállítjuk a cella tartalmát az aktuális első szerelem nevére

      if (!tomb[i].szerel2) { // Ha az adott szerzőnek nincs második szerelme (szerel2 értéke undefined, null vagy üres)
          szerel.colSpan = 2; // Az első szerelem cellája két oszlopnyi helyet foglaljon el
          row.appendChild(szerel); // A cellát hozzáadjuk a sorhoz
      } else { // Ha van második szerelem is
          row.appendChild(szerel); // Az első szerelem celláját hozzáadjuk a sorhoz

          const szerel2 = document.createElement('td'); // Létrehozunk egy cellát a második szerelem számára
          szerel2.innerHTML = tomb[i].szerel2; // Beállítjuk a cella tartalmát a második szerelem nevére
          row.appendChild(szerel2); // A második szerelem celláját hozzáadjuk a sorhoz
      }
  }
}

renderTable() //Függvény meghívása

const form = document.getElementById('form'); // A form elemet kérjük le az ID alapján
form.addEventListener('submit', function(e) { // Eseményfigyelőt adunk a submit eseményre
  e.preventDefault(); // Megakadályozzuk az alapértelmezett form beküldését
  const szerzoHtml = document.getElementById('kolto_nev'); // Költő nevének input mezője
  const korHtml = document.getElementById('korszak'); // kor input mezője
  const szerelHtml = document.getElementById('szerelem1'); // Első szerelem input mezője
  const szerel2Checkbox = document.getElementById('masodik'); // Második szerelem checkbox
  const szerel2Html = document.getElementById('szerelem2'); // Második szerelem input mezője
  const szerzoValue = szerzoHtml.value; // Költő nevének értéke
  const korValue = korHtml.value; // kor értéke
  const szerelValue = szerelHtml.value; // Első szerelem értéke
  const szerel2Value = szerel2Checkbox.checked ? szerel2Html.value : undefined;

  const newElement = {
    szerzo: szerzoValue, // Költő neve
    kor: korValue, // kor
    szerel: szerelValue, // Első szerelem
    szerel2: szerel2Value // Második szerelem
  };
  tomb.push(newElement); // Új objektum hozzáadása az tomb-hez
  tbody.innerHTML = ''; // Táblázat tartalmának törlése
  renderTable(); // Táblázat újrarenderelése
  });