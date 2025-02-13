/**
 * label elem legenerálása, szövegének megadása és hozzáadása a parent-hez
 * @param {String} elementType ami az elem típusának a neve (pl:"td", "th")
 * @param {HTMLElement} parent 
 * @param {String} id 
 * @param {String} label 
 */
function addLabelElement(elementType, parent, id, label){
  const temp = document.createElement(elementType);
  temp.htmlFor = id;
  temp.textContent = label;
  parent.appendChild(temp);
  parent.appendChild(document.createElement('br'));
}

/**
 * input elem legenerálása és hozzáadása a parent-hez
 * @param {String} elementType ami az elem típusának a neve (pl:"td", "th")
 * @param {HTMLElement} parent 
 * @param {String} id 
 * @param {String} type 
 * @param {String} name 
 */
function addInputElement(elementType, parent, id, type, name){
  const temp = document.createElement(elementType);
  temp.type = type || 'text';
  temp.id = id;
  temp.name = name;
  parent.appendChild(temp);
  parent.appendChild(document.createElement('br'));
}

/**
 * létrehoz egy elemet, értéket ad neki és hozzáadja a parent-hez
 * @param {String} elementType ami az elem típusának a neve (pl:"td", "th")
 * @param {String} className 
 * @param {HTMLElement} parent 
 */
function addDivElement(elementType, className, parent){
  const temp = document.createElement(elementType); // Létrehozunk egy cellát
  temp.className = className; // Beállítjuk a cella tartalmát az aktuális értékre
  parent.appendChild(temp); // A cellát hozzáadjuk a parent-hez
}

/**
 * létrehoz egy elemet, értéket ad neki és hozzáadja a parent-hez
 * @param {String} elementType ami az elem típusának a neve (pl:"td", "th")
 * @param {String} contain 
 * @param {HTMLElement} parent 
 */
function addElement(elementType, contain, parent){
  if(contain != undefined){
    const temp = document.createElement(elementType); // Létrehozunk egy cellát
    temp.innerHTML = contain; // Beállítjuk a cella tartalmát az aktuális értékre
    parent.appendChild(temp); // A cellát hozzáadjuk a parent-hez
  }
  else{
    parent.lastChild.colSpan = 2;
  }
}

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

// Függvény, amely kirajzolja a táblázat adatait
/**
 * a table legenerálása
 * @param {Array} tomb 
 */
function renderTable(tomb) {
    fejlecGen();
    // Táblázat törzsének létrehozása
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    for (let i = 0; i < tomb.length; i++) { // Végigiterálunk a `tomb` tömb elemein
        const row = document.createElement('tr'); // Új sor létrehozása a táblázathoz
        tbody.appendChild(row); // A létrehozott sort hozzáadjuk a táblázat törzséhez (tbody)

        addElement('td', tomb[i].szerzo, row);
  
        addElement('td', tomb[i].kor, row);
  
        addElement('td', tomb[i].szerel, row);

        addElement('td', tomb[i].szerel2, row);
    }
}
  
/**
* 
* @param {HTMLElement} inputElement 
* @param {String} errormessage 
* @returns hogy az elem valid-e
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
   * @returns hogy az elem valid-e
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
        addLabelElement('label', fieldDiv, i.id, i.label);

        addInputElement('input', fieldDiv, i.id, i.type, i.name);

        addDivElement('div', 'error', fieldDiv);
  
        form.appendChild(fieldDiv); // Hozzáadja a mezőt tartalmazó div-et az űrlaphoz
    }
    
    const button = document.createElement('button'); // Létrehoz egy új gombot
    button.type = 'submit'; // Beállítja a gomb típusát 'submit'-ra, hogy elküldje az űrlapot
    button.textContent = 'Hozzáadás'; // Beállítja a gomb szövegét
    form.appendChild(button); // Hozzáadja a gombot az űrlaphoz
    
    document.body.appendChild(form); // Hozzáadja az űrlapot a dokumentum body-jához, így az megjelenik az oldalon
    return form;
  }