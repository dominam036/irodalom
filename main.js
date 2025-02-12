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
  const szerzoHtml = document.getElementById('kolto_nev');
  const korHtml = document.getElementById('korszak');
  const szerelHtml = document.getElementById('szerelem1');
  const szerel2Checkbox = document.getElementById('masodik'); // Checkbox, hogy van-e második szerelem
  const szerel2Html = document.getElementById('szerelem2');

  // Input mezők értékeinek kinyerése
  const szerzoValue = szerzoHtml.value;
  const korValue = korHtml.value;
  const szerelValue = szerelHtml.value;
  let szerel2Value = szerel2Checkbox.checked ? szerel2Html.value : undefined;

  // Errorüzenet megadása
  const errormessage = "Kötelező megadni a költő nevét!"

  // Hibaüzenetek törlése az űrlapon
  const thisForm = e.currentTarget;
  const errorElements = thisForm.querySelectorAll('.error');
  for (const i of errorElements) {
      i.innerHTML = "";
  }

  let valid = true; // Validálás kezdeti állapota

  // Validációs ellenőrzések
  if(!validate(szerzoHtml, errormessage)){ //Megnézi, hogy a validate false-e
    valid = false; // Amennyiben false volt a valid értékét false-ra állítja
  };
  if(!validate(korHtml, errormessage)){ //Megnézi, hogy a validate false-e
    valid = false; // Amennyiben false volt a valid értékét false-ra állítja
  };
  if(!validate(szerelHtml, errormessage)){ //Megnézi, hogy a validate false-e
    valid = false; // Amennyiben false volt a valid értékét false-ra állítja
  };
  if(!validate2(szerel2Html, szerel2Value, errormessage)){  //Megnézi, hogy a szerel2Value értéke undefined-e
    valid = false; // A valid változó értékét hamisra állítjuk
  }

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