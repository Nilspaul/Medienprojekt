/* GEMEINSAME JS FÜR NAVIGATION UND FOOTER */

//NAVIGATION animation
var navTl = gsap.timeline({ paused: true });

navTl.to('.sectionfull', {

    display: "block",
    ease: Expo.easeInOut
})
.to('.backgroundnav', {
    duration: 0.2,
    opacity: 1,
    ease: Expo.easeInOut
})
.from('.main-menu li a', {
    duration: 1,
    y: "100%",
    stagger: 0.2,
    ease: Expo.easeInOut
});

navTl.reverse();

buttonlogo.addEventListener('click', function() {
    navTl.reversed(!navTl.reversed());
});




//FOOTER animation for swipe up and down and arrow rotation 

function footerStart() {
    const $footer = $('.footer-section');

    if (!$footer.hasClass('collapsed')) {
        gsap.to(".ArrowFooter", {
            rotation: 0,
            duration: 0,
        });
        gsap.to(".ArrowFooter", {
            rotation: 180,
            duration: 0.5,
            ease: "none",
        });
        gsap.to(".footer-section", {
            width: '100%',
            height: "12fr",
            duration: 0.5,
            ease: "none",
        });
        gsap.to(".footerSmall table", {
            visibility: "visible"
        });
        gsap.to(".footerSmall", {
            height: "25vh",
        });

    } else {
        gsap.to(".footerSmall", {
            height: "5vh",
        });
        gsap.to(".footerSmall table", {
            visibility: "hidden"
        });
        gsap.to(".ArrowFooter", {
            rotation: 360,
            duration: 0.5,
            ease: "none",
        });
        gsap.to(".footer-section", {
            height: "10fr",
            duration: 0.5,
            ease: "none",
        });
    };
    $footer.toggleClass('collapsed');

}



// SIDEBAR ANIMATION
// Methode überprüft, ob eine neue Sidebar generiert, oder die alte Sidebar geschlossen werden soll         
var semesterAlt = 0; 
function sidebarswitch(semesterNeu) {   // bei Klick muss das aktuell angeklickte Semester übergeben werden
    if (semesterAlt != semesterNeu) {
        sidebarstart();
        semesterAlt = semesterNeu;
    } else if (semesterAlt == semesterNeu) {
        sidebarend();
        semesterAlt = 0;
    }
}

//ÖFFNE SIDEBAR
function sidebarstart() {
    const tl = new TimelineLite();
    const $sidebar = $('.sidebar');
    tl.to($sidebar, 0, {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
        ease: Power4.easeOut
    })
    .to($sidebar, 0.3, {
        width: '40vw',
        height: "100%",
        ease: Back.easeOut
    })
    .to($sidebar, 0.25, {
        borderTopRightRadius: '0%',
        borderBottomRightRadius: '0%',
        ease: Power4.easeOut
    }, '-=0.13');
};

//SCHLIEßE SIDEBAR
function sidebarend() {
    xy = 0;
    const tl = new TimelineLite();
    const $sidebar = $('.sidebar');
    tl.to($sidebar, 0.3, {
        width: 0,
        height: "100%",
        ease: Power4.easeOut
    });
};
