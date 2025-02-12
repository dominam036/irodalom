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

/**
 * a fejléc legenerálása
 */
function fejlecGen() {
  const fejlec =   {
    szerzo: "Szerző neve", // Fejléc: szerző neve
    kor: "Korszak",        // Fejléc: korszak
    szerel: "Szerelmek"    // Fejléc: szerelmek oszlop
  }
  // Fejléc (thead) létrehozása és hozzáadása a táblázathoz
  const thead = document.createElement('thead');
  table.appendChild(thead);
  
  // Fejléc sor létrehozása
  const th_Row = document.createElement('tr'); 
  thead.appendChild(th_Row);

  let counter = 0;
  for(const i in fejlec){ // Iterálás a fejlec objektumon
    const th = document.createElement('th'); // Th elem létrehozása
    th.innerHTML = fejlec[i]; // A th elem szövegének beállítása
    th_Row.appendChild(th); // Th hozzáadása a tr-hez
    counter++;
    // Ha elértük a harmadik oszlopot, a szerelmek oszlophoz colSpan értéket adunk
    if (counter === 3) {
      th.colSpan = 2; // A harmadik oszlopot kétszeres szélességűre állítjuk
    }
  }
}

// Táblázat törzsének létrehozása
const tbody = document.createElement('tbody');
table.appendChild(tbody);

// Függvény, amely kirajzolja a táblázat adatait
/**
 * a table legenerálása
 * @param {Array} tomb 
 */
function renderTable(tomb) {
  fejlecGen();
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

/**
 * 
 * @param {HTMLElement} inputElement 
 * @param {String} errormessage 
 * @returns 
 */
function validate(inputElement, errormessage){ // Függvény létrehozésa két bemeneti értékkel
  let validation = true; // Kezdőértékként igazra állítjuk a validációs változót
  if(inputElement.value === ""){ // Ellenőrizzük, hogy az input mező üres-e
      const parentElement = inputElement.parentElement; // Megkeressük az évszám input mezőjének szülőelemét
      const error = parentElement.querySelector('.error'); // Az inputElement mező szülőelemében keresünk egy "error" osztályú elemet
      error.innerHTML = errormessage; // Beállítjuk a hibaüzenetet
      validation = false; // A valid változó értékét hamisra állítjuk
  }
  return validation;  //Vissaztér a validation értékével, ami igaz vagy hamis lehet
}

/**
 * Az elem validálása a value-ja alapján
 * @param {HTMLElement} inputElement 
 * @param {String} inputElementValue 
 * @param {String} errormessage 
 * @returns 
 */
function validate2(inputElement, inputElementValue, errormessage) { // Függvény, amely validálja az input mezőt és hibaüzenetet jelenít meg
  let validation = true; // Kezdőértékként igazra állítjuk a validációs változót
  if (inputElementValue === "" && inputElementValue !== undefined) { // Ellenőrizzük, hogy az input mező értéke üres-e, és nem undefined
      const parentElement = inputElement.parentElement; // Megkeressük az input mező szülőelemét, hogy hozzáférjünk a hibaüzenethez
      const error = parentElement.querySelector('.error'); // A szülőelemben keresünk egy 'error' osztályú elemet a hibaüzenet megjelenítésére
      error.innerHTML = errormessage; // Beállítjuk a hibaüzenetet az 'error' elemben
      validation = false; // Ha hibát találtunk, a validáció hamisra változik
  }
  return validation; // Visszatérünk a validációs eredménnyel, amely lehet igaz vagy hamis
}


renderTable(tomb); // Táblázat megjelenítése

/**
 * a form legenerálása
 */
function generateForm() {  // Függvény létrehozása, amely létrehozza és hozzáadja az űrlapot az oldalhoz
  const form = document.createElement('form'); // Létrehoz egy új <form> elemet
  form.id = 'form'; // Beállítja az űrlap egyedi ID-ját, hogy később könnyen hivatkozhassunk rá
  form.action = '#'; // Beállítja az űrlap action attribútumát, amely azt jelzi, hogy hová küldjük el az adatokat (itt a # azt jelzi, hogy nem küldjük el)
  
  const formt = [ // Az űrlap mezőinek adatstruktúrája: minden mező egy objektum, amely tartalmazza a címkét (label), az id-t és a nevét (name)
    { 
        label: 'Költő neve:',            // Az űrlapmező címkéje: "Költő neve"
        id: 'kolto_nev',                 // A mező egyedi azonosítója
        name: 'kolto_nev'                // A mező neve, amely a kódon belül is használható
    },  
    { 
        label: 'Korszak:',               // Az űrlapmező címkéje: "Korszak"
        id: 'korszak',                   // A mező egyedi azonosítója
        name: 'korszak'                  // A mező neve, amely a kódon belül is használható
    },  
    { 
        label: 'Szerelme:',              // Az űrlapmező címkéje: "Szerelme"
        id: 'szerelem1',                 // A mező egyedi azonosítója
        name: 'szerelem1'                // A mező neve, amely a kódon belül is használható
    },  
    { 
        label: 'Volt másik szerelme?',   // Az űrlapmező címkéje: "Volt másik szerelme?"
        id: 'masodik',                   // A mező egyedi azonosítója
        name: 'masodik',                 // A mező neve, amely a kódon belül is használható
        type: 'checkbox'                 // Checkbox mező, amely logikai értéket tárol (true/false)
    },  
    { 
        label: 'Szerelme:',              // Az űrlapmező címkéje: "Szerelme"
        id: 'szerelem2',                 // A mező egyedi azonosítója
        name: 'szerelem2'                // A mező neve, amely a kódon belül is használható
    }
  ];

  // Iterálunk a formt tömb minden egyes elemén (mezőjén)
  for (const i of formt) {
      const fieldDiv = document.createElement('div'); // Létrehoz egy új <div> elemet, amely tartalmazza az input mezőt
      fieldDiv.className = 'field'; // Beállítja a div osztályát, hogy stílusokat rendeljen hozzá
      const label = document.createElement('label'); // Létrehoz egy <label> elemet
      label.htmlFor = i.id; // A label-t összekapcsolja az input mezővel az id alapján
      label.textContent = fo.label; // A label szövegét beállítja
      fieldDiv.appendChild(label); // Hozzáadja a label-t a mező div-hez
      fieldDiv.appendChild(document.createElement('br')); // Sortörést ad hozzá a div-hez, hogy az input mező és a címke ne legyenek egy sorban

      const input = document.createElement('input'); // Létrehoz egy új <input> elemet
      input.type = i.type || 'text'; // Beállítja az input típusát (alapértelmezett típus 'text', ha a mező nem checkbox, akkor 'text')
      input.id = i.id; // Beállítja az input mező ID-ját
      input.name = i.name; // Beállítja az input mező nevét
      fieldDiv.appendChild(input); // Hozzáadja az input mezőt a div-hez
      fieldDiv.appendChild(document.createElement('br')); // Sortörést ad hozzá az input mező után

      const errorDiv = document.createElement('div'); // Létrehoz egy új div-et, amely tárolni fogja a hibaüzeneteket
      errorDiv.className = 'error'; // Beállítja a div osztályát 'error' névre, hogy stílusozni lehessen
      fieldDiv.appendChild(errorDiv); // Hozzáadja a hibát tartalmazó div-et a mező div-hez

      form.appendChild(fieldDiv); // Hozzáadja a mezőt tartalmazó div-et az űrlaphoz
  }
  
  const button = document.createElement('button'); // Létrehoz egy új gombot
  button.type = 'submit'; // Beállítja a gomb típusát 'submit'-ra, hogy elküldje az űrlapot
  button.textContent = 'Hozzáadás'; // Beállítja a gomb szövegét
  form.appendChild(button); // Hozzáadja a gombot az űrlaphoz
  
  document.body.appendChild(form); // Hozzáadja az űrlapot a dokumentum body-jához, így az megjelenik az oldalon
}

generateForm(); // A függvény meghívása, hogy az űrlap megjelenjen


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
  tbody.innerHTML = ''; 
  renderTable(tomb);
});