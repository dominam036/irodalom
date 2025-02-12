const fejlec = {
    szerzo: "Szerző neve", // Fejléc: költő neve
    kor: "Korszak",        // Fejléc: korszak
    szerel: "Szerelmek"    // Fejléc: szerelem oszlop
}
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

// Fejléc (thead) létrehozása és hozzáadása a táblázathoz
const thead = document.createElement('thead');
table.appendChild(thead); // Fejléc hozzáadása a táblázathoz

// Fejléc sor létrehozása
const th_Row = document.createElement('tr'); 
thead.appendChild(th_Row); // Fejléc sor hozzáadása a fejléchez

// Fejléc oszlopok létrehozása és beállítása
const th_szerzo = document.createElement('th'); 
th_szerzo.innerHTML = fejlec.szerzo; // Beállítjuk a költő oszlop fejlécét
th_Row.appendChild(th_szerzo); // Fejléc oszlop hozzáadása a sorhoz

const th_kor = document.createElement('th'); 
th_kor.innerHTML = fejlec.kor; // Beállítjuk a korszak oszlop fejlécét
th_Row.appendChild(th_kor); // Fejléc oszlop hozzáadása a sorhoz

const th_szerel = document.createElement('th'); 
th_szerel.colSpan = 2; // Az utolsó oszlop két oszlopot foglalhat el (ha van második szerelem)
th_szerel.innerHTML = fejlec.szerel; // Beállítjuk a szerelem oszlop fejlécét
th_Row.appendChild(th_szerel); // Fejléc oszlop hozzáadása a sorhoz

// Táblázat törzsének létrehozása
const tbody = document.createElement('tbody');
table.appendChild(tbody); // Táblázat törzsének hozzáadása a táblázathoz

// Függvény, amely kirajzolja a táblázat adatait
function renderTable() {
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


// Táblázat megjelenítése
renderTable(); 

// Form adatok kezelése (input beolvasás és validálás)
const form = document.getElementById('form');
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Alapértelmezett küldés megakadályozása

  // Input mezők lekérése
  const szerzoHtml = document.getElementById('kolto_nev');
  const korHtml = document.getElementById('korszak');
  const szerelHtml = document.getElementById('szerelem1');
  const szerel2Checkbox = document.getElementById('masodik'); // Checkbox, hogy van-e második szerelem
  const szerel2Html = document.getElementById('szerelem2');

  // Input mezők értékeinek kinyerése
  const szerzoValue = szerzoHtml.value; // Költő neve
  const korValue = korHtml.value; // Korszak
  const szerelValue = szerelHtml.value; // Első szerelem
  let szerel2Value = szerel2Checkbox.checked ? szerel2Html.value : undefined; // Második szerelem, ha van

  // Hibaüzenetek törlése az űrlapon
  const thisForm = e.currentTarget;
  const errorElements = thisForm.querySelectorAll('.error');
  for (const i of errorElements) {
      i.innerHTML = ""; // Hibaüzenetek törlése
  }

  let valid = true; // Validálás kezdeti állapota

  // Validációs ellenőrzések
  if (szerzoValue === "") { 
      const parentElement = szerzoHtml.parentElement;
      parentElement.querySelector('.error').innerHTML = "Kötelező megadni a költő nevét!"; // Hibás költő név
      valid = false;
  }
  if (korValue === "") { 
      const parentElement = korHtml.parentElement;
      parentElement.querySelector('.error').innerHTML = "Kötelező megadni a korszakot!"; // Hibás korszak
      valid = false;
  }
  if (szerelValue === "") { 
      const parentElement = szerelHtml.parentElement;
      parentElement.querySelector('.error').innerHTML = "Kötelező megadni az első szerelmét!"; // Hibás első szerelem
      valid = false;
  }

  // Ha minden adat megadott, új elemet adunk hozzá a tömbhöz
  if (valid) {
      const newElement = {
          szerzo: szerzoValue,  // Költő neve
          kor: korValue,        // Korszak
          szerel: szerelValue, // Első szerelem
          szerel2: szerel2Value // Második szerelem
      };

      tomb.push(newElement); // Hozzáadjuk az új adatokat a tömbhöz
  }

  // Táblázat újrarenderelése
  tbody.innerHTML = ''; 
  renderTable(); // Táblázat frissítése
});
