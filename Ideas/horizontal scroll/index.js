if (window.innerWidth > 768) {
  const slide2Text = document.querySelector(".slide-2");
  slide2Text.innerHTML = '<p class="split-text">IS A FRONTEND DEVELOPER.</p>';
}

gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.defaults({
//   markers: {
//     startColor: "purple",
//     endColor: "purple",
//     fontSize: "22px",
//     indent: 10
//   }
// });



let followCircle = document.querySelector('.cursor-follower');
let menuBtn = document.querySelector('.mouse-hover');
let isMenuBtnHovered = false;

gsap.set(followCircle, {
    xPercent: -50,
    yPercent: -50,
    scale: 1
});

window.addEventListener("mousemove", (e) => {
    if (!isMenuBtnHovered) {
        gsap.set(followCircle, {
            xPercent: -50,
            yPercent: -50,
            
        });
        gsap.to(followCircle, {
            duration: 1,
            overwrite: "auto",
            x: e.clientX,
            y: e.clientY,
            stagger: 1,
            scale: 1,
            ease: "elastic.out(1,0.3)"
        });
    }
});


menuBtn.addEventListener('mouseenter', (e) => {
    isMenuBtnHovered = true;
    gsap.set(followCircle, {
    xPercent: -20,
    yPercent: 50,
    scale: 1
    })

    gsap.to(followCircle, {
        duration: 0.2,
        overwrite: "auto",
        x: e.target.offsetLeft,
        y: e.target.offsetTop,
        stagger: 1,
        scale: 0,
        ease: "power1.out",

    });
});

menuBtn.addEventListener('mouseleave', () => {
    isMenuBtnHovered = false;
});



const menu = document.querySelector('.menu');
const listExchangeBtn = document.querySelector('.list-exchange span');
const openMenuBtn = document.querySelector('.open-menu');


openMenuBtn.addEventListener('click', () => {
    if (!menu.classList.contains('show')) {
        menu.classList.add('show');
        menu.classList.remove('hide')
        listExchangeBtn.innerHTML = 'Close';
        listExchangeBtn.classList.toggle('opened');
    } else {
        menu.classList.remove('show');
        menu.classList.add('hide')
        listExchangeBtn.innerHTML = 'Menu';
        listExchangeBtn.classList.toggle('opened');
       
    }

  
});

var mWrap = document.querySelectorAll("[data-magnetic-wrap]");

function parallaxIt(e, wrap, movement = 1) {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var boundingRect = wrap.getBoundingClientRect();
    var relX = e.pageX - boundingRect.left;
    var relY = e.pageY - boundingRect.top;
  
    var maxX = boundingRect.width / 2 * 0.2; // Limit to 20% from center in each side
    var maxY = boundingRect.height / 2 * 0.5; // Limit to 50% towards top and bottom
  
    var restrictedX = Math.max(-maxX, Math.min(maxX, (relX - boundingRect.width / 2) * movement));
    var restrictedY = Math.max(-maxY, Math.min(maxY, (relY - boundingRect.height / 2 - scrollTop) * movement));
  
    gsap.to(wrap.querySelector("[data-magnetic-content]"), {
      x: restrictedX,
      y: restrictedY,
      ease: "power1",
      duration: 0.6
    });
}

mWrap.forEach(function (wrap) {
  wrap.addEventListener("mousemove", function(e) {
    parallaxIt(e, wrap);
  });
  
  wrap.addEventListener("mouseleave", function (e) {
    gsap.to(wrap.querySelector("[data-magnetic-content]"), {
      scale: 1,
      x: 0,
      y: 0,
      ease: "elastic.out(1,0.3)",
      duration: 0.6
    });
  });
});
















    




let sections = gsap.utils.toArray(".slide");

// Caclulate toatal width of all .slides
const totalWidth = sections.reduce(
  (acc, element) => acc + element.getBoundingClientRect().width,
  0
);
console.warn(totalWidth);

const tl = gsap.timeline({
  scrollTrigger: {
    id: "horizonal",
    trigger: ".horizontal-sliders",
    pin: ".main",
    pinSpacing: true,
    scrub: 1,
    end: "+=2000 bottom" 
  }
});
tl.to(sections, {
  // xPercent: -90 * (sections.length - 1),
  x: () => -(totalWidth - window.innerWidth), 
  ease: "none"
});



const splitText = new SplitType(".split-text", { types: "chars" });
const chars = splitText.chars;

chars.forEach((char, index) => {
  gsap.from(char, {
    y: index % 2 === 0 ? 100 : -100,
    x: -30,
    rotate: index % 2 === 0 ? 50 : -50,
    opacity: 0,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: char,
      start: () => `top left-=${index * 90}`,
      end: "top bottom",
      scrub: 1,
      horizontal: true, 
      containerAnimation: tl, 
      start: "left right-=10%", 
      end: "right right-=10%"
    }
  });
});


