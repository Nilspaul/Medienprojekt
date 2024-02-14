
// Schwerpunkt Informationen von der JSON-Datei auslesen
const schwerpunktInfo = []
window.onload = function() {
    fetch("../Schwerpunktwahl/resources/schwerpunktinfo.json")
        .then(response => response.json()
            .then(info => {
                for (const [key, value] of Object.entries(info)) {
                  schwerpunktInfo.push(value);
                }
            }))
}

document.getElementById("maschinenbaulogo-inner").onclick = function () {
  location.href = "../Modulansicht/Maschinenbau/Maschinenbau.html";
};

document.getElementById("lifecyclelogo-inner").onclick = function () {
  location.href = "../Modulansicht/Lifecycle Management/lcm.html";
};

document.getElementById("elektrotechniklogo-inner").onclick = function () {
  location.href = "../Modulansicht/Elektrotechnik/elektrotechnik.html";
};

// Slide Animation

const slides = document.querySelectorAll(".page");
const infoslides = document.querySelectorAll(".info");
const container = document.querySelector(".page-container");

let duration = 0.5;
let offsetsX = [];
let offsetsY = [];
let oldSlideX = 0;
let activeSlideX = 0;
let oldSlideY = 0;
let activeSlideY = 0;
let dots = document.querySelector(".dots");
let navDots = [];
let iw = window.innerWidth;
let ih = window.innerHeight;
let hheight;
let fheight;
let mainheight;

// Arrow Navigation Listeners
document.querySelector(".arrowdown").addEventListener("click", slideAnim);
document.querySelector(".arrowup").addEventListener("click", slideAnim);

// Navigations Dots erstellen
for (let i = 0; i < slides.length; i++) {
    let newDot = document.createElement("div");
    newDot.className = "dot";
    newDot.index = i;
    navDots.push(newDot);
    newDot.addEventListener("click", slideAnim);
    dots.appendChild(newDot);
  }

  function getactiveSlideXIndex(e){
    activeSlideX = e;
    alert(activeSlideX);
  }
  
  // Elemente positionieren
  gsap.set(".dots", {xPercent: -50});
  gsap.set(".arrowdown", {xPercent: -50});
  gsap.set(".arrowup", {xPercent: -50});
  gsap.set(".subheadline", {xPercent: -50}); 
  
  // Dot Animation
  const dotAnim = gsap.timeline({ paused: true });
  dotAnim.to(
  ".dot",
  {
    stagger: { each: 1, yoyo: true, repeat: 1 },
    scale: 2.1,
    rotation: 0.1,
    ease: "none"
  },
  0.5
  );
  dotAnim.time(1);

  let dragMe = Draggable.create(container, {
    type: "x",
    edgeResistance: 1,
    bounds: ".master-container",
    onDrag: tweenDot,
    onThrowUpdate: tweenDot,
    onDragEnd: slideAnim,
    allowNativeTouchScrolling: true,
    zIndexBoost: false
  });
  dragMe[0].id = "dragger"; 

  // Function der Slide Animation
  function slideAnim(e) {
    oldSlideX = activeSlideX;
    oldSlideY = activeSlideY;
    if (this.id === "dragger") {
      for (var i = 0; i < offsetsX.length - 1; i++){
        if (this.endX >= offsetsX[i+1] / 2) {
          activeSlideX = i;
          break;
        }
        activeSlideX = 2;
      }
    } else {
      if (gsap.isTweening(container)) {
        return;
      }if (this.className === "dot") {
        activeSlideX = this.index;
      } else if (this.className === "arrowdown") {
          activeSlideY = 1;
      } else if (this.className === "arrowup") {
        activeSlideY = 0;
    }
    } 
    // Am Anfang oder Ende stoppen
    activeSlideX = activeSlideX < 0 ? 0 : activeSlideX;
    activeSlideX = activeSlideX > slides.length - 1 ? slides.length - 1 : activeSlideX;
    if (oldSlideX === activeSlideX && oldSlideY === activeSlideY) {
      return;
    }
    if (activeSlideY === 1 && activeSlideX != oldSlideX) {
      return;
    }

    gsap.to(container, duration, { x: offsetsX[activeSlideX], y: offsetsY[activeSlideY], onUpdate: tweenDot });
    showCorrectNavElem(activeSlideY);

  }

  // Richtige Sizes und Positionen berechnen
  function sizeIt() {
    offsetsX = [];
    offsetsY = [];
    iw = window.innerWidth;
    padding = parseFloat($("header").css("padding-top")) + parseFloat($("header").css("padding-bottom"));
    hheight = parseFloat($('header').height()) + parseFloat($("header").css("borderBottomWidth")) + padding;
    fheight = parseFloat($(".footer").height()) + parseFloat($(".footer").css("borderTopWidth"));
    mainheight = $(window).height() - (hheight + fheight);
    gsap.set(".master-container",{width: "100%", height: mainheight, position: "absolute", overflow: "hidden", top: hheight + "px"});
    gsap.set(".page", {position: "relative", float: "left", top: 0, height: mainheight});
    gsap.set(".info", {position: "relative", float: "left", top: 0, height: mainheight});
    gsap.set(".page-container", { visibility: "visible", top: 0});
    gsap.set(".page-container", { width: slides.length * iw, height: mainheight});
    showCorrectNavElem(activeSlideY);
    gsap.set(slides, { width: iw });

    for (let i = 0; i < slides.length; i++) {
      offsetsX.push(-slides[i].offsetLeft);
    }
    offsetsY.push(-slides[0].offsetTop);
    offsetsY.push(-infoslides[1].offsetTop);
    gsap.set(container, { x: offsetsX[activeSlideX],});
    dragMe[0].vars.snap = offsetsX;
  }

  // Richtige Navigationselemente anzeigen
  function showCorrectNavElem(y){
    if (y == 0) {
      gsap.set(".dots",{visibility: "visible"});
      gsap.set(".arrowdown",{visibility: "visible"});
      gsap.set(".arrowup",{visibility: "hidden"});
    } else if (y == 1){
      gsap.set(".dots",{visibility: "hidden"});
      gsap.set(".arrowdown",{visibility: "hidden"});
      gsap.set(".arrowup",{visibility: "visible"});
    }
  }

  function tweenDot() {
    gsap.set(dotAnim, {
      time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
    });
  }

//Zoom Animation
  
var root  = document.documentElement;
var body  = document.body;
var pages = document.querySelectorAll(".page");
var tiles = document.querySelectorAll(".tafelspalte");
var icons = document.querySelectorAll(".responsiveimg");


for (var i = 0; i < tiles.length; i++) {  
  addListeners(tiles[i], pages[i], icons[i]);
}

// Zoom Animaton Listener
function addListeners(tile, page, icon) {
  
  icon.addEventListener("click", function() {
    animateTafel(tile, page);
  });
  
  //Auskommentiert da nicht gewollt (in der Theorie um wieder rauszuzoomen) 
  /*page.addEventListener("click", function() {
    animateTafel(page, tile);
  }); */ 
}

function animateTafel(fromPos, toPos) {
  // Größe des main Parts berechnen
  $(function() {
    padding = parseFloat($("header").css("padding-top")) + parseFloat($("header").css("padding-bottom"));
    hheight = parseFloat($('header').height()) + parseFloat($("header").css("borderBottomWidth")) + padding;
    fheight = parseFloat($(".footer").height()) + parseFloat($(".footer").css("borderTopWidth"));
    mainheight = $(window).height() - (hheight + fheight);
    $('.page').css({'top' : hheight + 'px'});
    $(".page").height(mainheight);
    $('.info').css({'top' : hheight + 'px'});
    $(".info").height(mainheight);
  })

  $(function() {
    $("#info-maschinenbau").html(schwerpunktInfo[0].inhalt);
    $("#info-lifecycle").html(schwerpunktInfo[1].inhalt);
    $("#info-elektrotechnik").html(schwerpunktInfo[2].inhalt);
  })

  // Neu Sizen wenn die Bilschrimgröße verändert wird
  window.addEventListener('resize', function() {
    sizeIt();
  }, true);

  if (fromPos.id == "tafelspalte1") activeSlideX = 0;
  else if (fromPos.id == "tafelspalte2") activeSlideX = 1;
  else if (fromPos.id == "tafelspalte3") activeSlideX = 2;

  var clone = fromPos.cloneNode(true);
      
  var from = calculatePosition(fromPos);
  var to = calculatePosition(toPos); 
  
  TweenLite.set([fromPos, toPos], { visibility: "hidden" });
  TweenLite.set(clone, { position: "absolute", margin: 0 });
  
  body.appendChild(clone);  
      
  var style = {
    x: to.left - from.left,
    y: to.top - from.top,
    width: to.width,
    height: to.height,
    autoRound: false,
    ease: Power1.easeOut,
    onComplete: onComplete
  };
   
  TweenLite.set(clone, from);  
  TweenLite.to(clone, 1, style)
    
  function onComplete() {
    
    TweenLite.set(toPos, { visibility: "visible",});
    body.removeChild(clone);
    sizeIt();
    tweenDot();
    gsap.set(".dots",{visibility: "visible"});
  }
}

// Position berechnen
function calculatePosition(element) {
    
  var rect = element.getBoundingClientRect();
  
  var scrollTop  = window.pageYOffset || root.scrollTop  || body.scrollTop  || 0;
  var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
  
  var clientTop  = root.clientTop  || body.clientTop  || 0;
  var clientLeft = root.clientLeft || body.clientLeft || 0;
    
  return {
    top: Math.round(rect.top + scrollTop - clientTop),
    left: Math.round(rect.left + scrollLeft - clientLeft),
    height: rect.height,
    width: rect.width,
  };
}

// Testfunktion
function test(){
  console.log("test");
}