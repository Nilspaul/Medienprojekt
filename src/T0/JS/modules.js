// MODUL KONSTANTEN UND VARIABLEN
const modules = [];
const specmodules = [];
const twpm = [];
const tvm = [];
const wwpm = [];
const wvm = [];
const lcm = [];
var lcmwahl = [];
let bigDotpos; 
let semList = document.getElementsByClassName("mList");
var aktuellesSem;
var aktschwerpunkt;
let semModul = [];
let semModulNames = []; 

// JSON DATEI EINBINDEN
window.onload = function () {
    fetch("../../../res/modules.json")
        .then(response => response.json()
            .then(module => {
                for (const [key, value] of Object.entries(module)) {
                    modules.push(value);
                }
            }))
    fetch("../../../res/specificModules.json")
        .then(response => response.json()
            .then(specmodule => {
                for (const [key, value] of Object.entries(specmodule)) {
                    specmodules.push(value);
                }
                for (let i = 0; i < specmodules.length; i++) {
                    if (specmodules[i].art == "Technisches Wahlpflichtmodul") {
                        twpm.push(specmodules[i]);
                    } else if (specmodules[i].art == "Technisches Vertiefungsmodul") {
                        tvm.push(specmodules[i]);
                    } else if (specmodules[i].art == "Wirtschaftliches Wahlpflichtmodul") {
                        wwpm.push(specmodules[i]);
                    } else if (specmodules[i].art == "LCM-Vertiefungsmodul") {
                        lcm.push(specmodules[i]);
                    } else if (specmodules[i].art == "Wirtschaftliches Vertiefungsmodul") {
                        wvm.push(specmodules[i]);
                    }
                }
                lcmwahl = lcm.concat(wwpm, wvm);
            }))
}

// SIDEBAR-LISTE LÖSCHEN
function deleteList() {
    let limodul = document.getElementById("modulList");
    let modul = document.getElementsByClassName("mList");
    for (var i = 0; i < modul.length; i++) {
        limodul.remove();
    }
}

// SCHWERPUNKT UND SEMESTER GLOBAL SETZEN
function setAttributesSemAndSchwerpunkt(sem, schwerpunkt){
    aktschwerpunkt = schwerpunkt;
    aktuellesSem = sem; 
}

// AKTUELLE MODULE DES JEWEILIGEN SEMESTERS UND SCHWERPUNKTES
function setSemModuleByName(){
semModulNames = [];
semModul = [];
    for (const [key, value] of Object.entries(modules)) {
        if (value.semester == aktuellesSem && (value.schwerpunkt == aktschwerpunkt || value.schwerpunkt == "Grundlagenmodul")) {
         semModulNames.push(value.name);        // Liste mit den Modulnamen
         semModul.push(value);                  // Liste mit den Modulobjekten
        }
    }
}

// SIDEBAR-LISTE AUS JSON-DATEI ERSTELLEN
function setList(sem, schwerpunkt) {        // Schwerpunkt sowie aktuelles Semester muss übergeben werden
    deleteList();                                // Falls eine Liste existiert, Lösche diese
    setAttributesSemAndSchwerpunkt(sem, schwerpunkt);
    let sideSectionList = document.getElementById("sidesection");
    let ul = document.createElement("ul");        
    ul.setAttribute("id", "modulList");
    sideSectionList.appendChild(ul);
    setSemModuleByName()
    for (let i = 0; i < semModulNames.length; i++) {         // Laufe durch die Module des aktuellen Semesters und erstelle für jedes Modul ein Listenitem
        let li = document.createElement("li");
        li.classList.add("mList");
        let content = document.createTextNode (semModulNames[i]);
        li.appendChild(content);
        ul.appendChild(li);
        findModuleArt(semList[i], i);             
    }
}

// UNTERSCHEIDUNG ZWISCHEN NORMALEM ODER VERTIEFUNGSMODUL
function findModuleArt(listObj, i){
    listObj.onclick = function () {
        for (const [key, value] of Object.entries(specmodules)) {                                                           // Überprüfe, ob das angeklickte Modul ein Vertiefungs-, Wahlpflicht oder normales Modul ist und wenn ja welches
            var name = listObj.innerHTML
            if (name.includes("Wahlpflichtmodul (technisch, wirtschaftlich, LCM-spezifisch)")) {
                vertiefungswahl(lcmwahl);
                break;
            } else if (name == value.art && (value.schwerpunkt == aktschwerpunkt || value.schwerpunkt == "Grundlagenmodul")) {
                findVWModules(value.art);
                break;
            } else {
                modulwahl();
            }
        }
        setAllContent(i);
        setDots(name);
        sidebarend();
        toggleBG();
    }
}
 
// UNTERSCHEIDE ZWISCHEN VERTIEFUNGS- UND WAHLPFLICHT-MODULEN
// Lade je nachdem welche Art das jweilige Modul hat, das dazugehörige HTML Template
function findVWModules(art) {
    if (art == "Technisches Vertiefungsmodul") {
        vertiefungswahl(tvm);
    } else if (art == "Wirtschaftliches Wahlpflichtmodul") {
        vertiefungswahl(wwpm)
    } else if (art == "Technisches Wahlpflichtmodul") {
        vertiefungswahl(twpm)
    } else if (art == "Wirtschaftliches Vertiefungsmodul") {
        vertiefungswahl(wvm);
    } else if (art == "LCM-Vertiefungsmodul") {
        vertiefungswahl(lcm);
    } else if( art.includes("Wahlpflichtmodul (technisch, wirtschaftlich, LCM-spezifisch)")){
       vertiefungswahl(lcmwahl);
    } else {
        modulwahl();
    }
}

// DOT NAVIGATION IN DER MODUL- UND VERTIEFUNGSANSICHT
function setDots(name) {
    delDots();     // Lösche alle Dots falls vorhanden
    let smallsec = document.getElementById("smallsec");
    let dotsDiv = document.getElementById("dots");
    for (let i = 0; i < semList.length; i++) {              // Erstelle in der DOT-Navigation so viele Punkte, wie das jeweilige Semester Module hat.
        let newDot = document.createElement("div");
        newDot.classList.add("dot")
        dotsDiv.appendChild(newDot);
    }
    smallsec.appendChild(dotsDiv);
    setBigDot(name);      
}

// SETZE EINEN GROßEN PUNKT AN DER ENTSPRECHENDEN POSITION
function setBigDot(name){
    let dots = document.getElementsByClassName("dot");
    for (let j = 0; j < dots.length; j++) {                // Laufe durch die DOT-Navigation und mache den Punkt groß, an dem der Name der aktuellen Liste dem des Headers entspricht 
        if (semList[j].innerHTML == name) {
            dots[j].classList.add("bigDot")
            bigDotpos = j;
        }
    }
}

// LÖSCHE DIE DOT-LISTE
function delDots() {
    let dots = document.getElementById("dots");

    while (dots.firstChild) {
        dots.removeChild(dots.firstChild);
    }

}

// SETZTE IN DER DOT-NAVIGATION DEN GROßEN DOT AN DER NÄCHSTEN STELLE PLUS
function dotPlus() {
    let dots = document.getElementsByClassName("dot");
    dots[bigDotpos].classList.remove("bigDot");
    if (bigDotpos == dots.length - 1) {                           // Wenn die letzte Stelle erreicht ist, dann soll die erste Stelle aufgrufen werden
        bigDotpos = 0;
        dots[bigDotpos].classList.add("bigDot");
    } else {
        ++bigDotpos;
        dots[bigDotpos].classList.add("bigDot");
    }
}

// SETZTE IN DER DOT-NAVIGATION DEN GROßEN DOT AN DER NÄCHSTEN STELLE MINUS
function dotMinus() {
    let dots = document.getElementsByClassName("dot");
    dots[bigDotpos].classList.remove("bigDot");
    if (bigDotpos == 0) {                                        // Wenn die erste Stelle erreicht ist, dann soll die letzte Stelle aufgrufen werden
        bigDotpos = dots.length - 1;
        dots[bigDotpos].classList.add("bigDot");
    } else {
        --bigDotpos;
        dots[bigDotpos].classList.add("bigDot");
    }
}

// SETZE DEN INHALT MODULSPZIFISCH
function setAllContent(x) {
    let h = document.getElementById("modulUeberschrift");
    let t = document.getElementById("modulInhalt");
    let img = document.getElementById("modulBild");
    h.innerHTML = semModul[x].name;
    t.innerHTML = semModul[x].inhalt;
    img.src = semModul[x].imgLink;
}

// SWITCH MODULE RIGHT
function switchmodulright() {
    let h = document.getElementById("modulUeberschrift");
    for (var j = 0; j < semModul.length + 1; j++) {
        if (j > (semModul.length - 1)) {
            findVWModules(semModul[0].name);
            setAllContent(0);
            break;
        } else if (h.innerHTML == semModul[j].name && j < (semModul.length - 1)) {
            findVWModules(semModul[j + 1].name);
            setAllContent(j + 1);
            break;
        }
    }
}

// SWITCH MODULE LEFT
function switchmodulleft() {
    let h = document.getElementById("modulUeberschrift");
    for (var j = semModul.length - 1; j >= 0; j--) {
        if (j < 1) {
            findVWModules((semModul.length - 1).name);
            setAllContent(semModul.length - 1);
            break;
        } else if (h.innerHTML == semModul[j].name && j > 0) {
            findVWModules(semModul[j - 1].name);
            setAllContent(j - 1);
            break;
        }
    }
}

// HEADER ZURÜCKSETZTEN
function closeModule() {
    let h = document.getElementById("modulUeberschrift");
    h.innerHTML = "Semesterauswahl";
}