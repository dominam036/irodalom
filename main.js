// Létrehozunk egy tömböt, amely költők adatait tartalmazza
const tomb = [
  {
      szerzo: "Balassi Bálint", // Első adat: költő neve
      kor: "reformáció",        // Első adat: korszak
      szerel: "Losonczy Anna",  // Első adat: első szerelem
      szerel2: "Dobó Krisztina" // Első adat: második szerelem
  },
  {
      szerzo: "Csokonai Vitéz Mihály", // Második adat: költő neve
      kor: "felvilágosodás",          // Második adat: korszak
      szerel: "Vajda Juliána"         // Második adat: első szerelem (második nincs megadva)
  },
  {
      szerzo: "Petőfi Sándor",     // Harmadik adat: költő neve
      kor: "magyar romantika",     // Harmadik adat: korszak
      szerel: "Mednyánszky Berta", // Harmadik adat: első szerelem
      szerel2: "Szendrey Júlia"    // Harmadik adat: második szerelem
  },
  {
      szerzo: "Ady Endre",     // Negyedik adat: költő neve
      kor: "20. század",       // Negyedik adat: korszak
      szerel: "Léda",          // Negyedik adat: első szerelem
      szerel2: "Csinszka"      // Negyedik adat: második szerelem
  }
];

// Létrehozzuk a táblázatot
const table = document.createElement('table'); 
document.body.appendChild(table); // Táblázat hozzáadása a dokumentumhoz

renderTable(tomb); // Táblázat megjelenítése

// Form adatok kezelése (input beolvasás és validálás)
const form = generateForm(); // A függvény meghívása, hogy az űrlap megjelenjen és a form változó értékadása
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Alapértelmezett küldés megakadályozása

  // Input mezők lekérése
  const mezok = {
    szerzo: document.getElementById('kolto_nev'),
    kor: document.getElementById('korszak'),
    szerelem: document.getElementById('szerelem1'),
    szerel2: document.getElementById('szerelem2'),
    szerel2Checkbox: document.getElementById('masodik')
  };

  // Errorüzenet megadása
  const errormessage = "Kötelező megadni a költő nevét!"

  // Hibaüzenetek törlése az űrlapon
  const thisForm = e.currentTarget;
  const errorElements = thisForm.querySelectorAll('.error');
  for (const i of errorElements) {
      i.innerHTML = "";
  }

  // Validációs ellenőrzések
  let valid = ['szerzo', 'kor', 'szerelem'].every(mező => validate(mezok[mező], hibaUzenet));
  const szerel2Value = mezok.szerel2Checkbox.checked ? mezok.szerel2.value : undefined;
  valid = valid && validate2(mezok.szerel2, szerel2Value, hibaUzenet);

  // Ha minden adat megadott, új elemet adunk hozzá a tömbhöz
  if (valid) {
      const newElement = {
          szerzo: szerzoValue,
          kor: korValue,
          szerel: szerelValue,
          szerel2: szerel2Value
      };

      tomb.push(newElement); // Hozzáadjuk az új adatokat a tömbhöz
  }

  // Táblázat újrarenderelése
  table.innerHTML = ''; 
  renderTable(tomb);
});