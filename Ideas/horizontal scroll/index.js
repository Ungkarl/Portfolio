if (window.innerWidth > 768) {
  const slide2Text = document.querySelector(".slide-2");
  slide2Text.innerHTML = '<p class="split-text">IS A FRONTEND DEVELOPER.</p>';
}

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  markers: {
    startColor: "purple",
    endColor: "purple",
    fontSize: "22px",
    indent: 10
  }
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


