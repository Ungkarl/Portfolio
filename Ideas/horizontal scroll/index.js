gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.defaults({
//   markers: {
//     startColor: "purple",
//     endColor: "purple",
//     fontSize: "22px",
//     indent: 10
//   }
// });

if (window.innerWidth > 768) {
  const slide2Text = document.querySelector(".slide-2");
  slide2Text.innerHTML = '<p class="split-text">IS A FRONTEND DEVELOPER.</p>';
}

const sections = gsap.utils.toArray(".slide");
const lastSection = sections[sections.length - 1]; 
const horizontalSliderOptions = {
  trigger: ".horizontal-sliders",
  pin: ".main",
  pinSpacing: true,
  scrub: -1,
  
  
};

const expandingCircle = document.querySelector('.expanding-circle') 
const nextBlock = document.querySelector('.next-block')
const spotlightText1 = document.querySelector('.skills-spotlight-text p:nth-child(1)')
const spotlightText2 = document.querySelector('.skills-spotlight-text p:nth-child(2)')








let tl;

if (window.innerWidth > 1600) {
  tl = gsap.timeline({
    onStart: function(){ console.log('play') },
        onComplete: function(){ console.log('finish') },
    scrollTrigger: { ...horizontalSliderOptions, end: "+=7000 bottom" }, 
    
    
  });
} else if (window.innerWidth > 1024) {
  tl = gsap.timeline({
    onStart: function(){ console.log('play') },
        onComplete: function(){ console.log('finish') },
    scrollTrigger: { ...horizontalSliderOptions, end: "+=5000 bottom" },
    
  });
} else if (window.innerWidth > 764) {
  tl = gsap.timeline({
    onStart: function(){ console.log('play') },
        onComplete: function(){ console.log('finish') },
    scrollTrigger: { ...horizontalSliderOptions, end: "+=4000 bottom" },
    
  })
} else {
  tl = gsap.timeline({
    scrollTrigger: { ...horizontalSliderOptions, end: "+=3000 bottom" },
    
  });
}

const totalWidth = sections.reduce(
  (acc, element) => acc + element.getBoundingClientRect().width,
  0
);

tl.to(sections, {
  x: () => -(totalWidth - window.innerWidth),
  ease: "none",
})




const splitText = new SplitType(".split-text", { types: "chars" });
const chars = splitText.chars;

chars.forEach((char, index) => {
  gsap.from(char, {
    y: index % 2 === 0 ? 200 : -200,
    
   
    opacity: 0,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: char,
      start: () => `top left-=${index * 90}`,
      end: "top bottom",
      scrub: 0,
      horizontal: true,
      containerAnimation: tl,
      start: "left right-=30%",
      end: "right right-=50%",
    },
  });
});





console.log(spotlightText1)
gsap.set(expandingCircle, {
  scale: 0
})

gsap.from(spotlightText1, {
x: '-100%',
scrollTrigger: {
  trigger: nextBlock,
  start: "top top",
  end: "bottom bottom",
  scrub: 0,
  markers: {
    startColor: "purple",
    endColor: "purple",
    fontSize: "22px",
    indent: 10
  }
},



})

gsap.from(spotlightText2, {
  x: '100%',
  scrollTrigger: {
    trigger: nextBlock,
    start: "top top",
    end: "bottom bottom",
    scrub: 0,
    markers: {
      startColor: "purple",
      endColor: "purple",
      fontSize: "22px",
      indent: 10
    }
  },
})


const expandingCircleOptions = {
  trigger: nextBlock,
  start: "top top",
  end: "bottom bottom",
  scrub: 0,
}


if (window.innerWidth > 1600) {
  gsap.to(expandingCircle, {
    scale: 2.5,
    scrollTrigger: {
      ...expandingCircleOptions,
      
    },
    
    }
  
  
  )

} else if (window.innerWidth > 1024) {
  gsap.to(expandingCircle, {
    scale: 2.5,
    scrollTrigger: {
      ...expandingCircleOptions,
      
    },
    
    }
  
  
  )
  
} else if (window.innerWidth > 764) {
  gsap.to(expandingCircle, {
    scale: 4,
    scrollTrigger: {
      ...expandingCircleOptions,
      
    },
    
    }
  
  
  )
  
} else {
  gsap.to(expandingCircle, {
    scale: 5,
    scrollTrigger: {
      ...expandingCircleOptions,
      
    },
    
    }
  
  
  )
}


  












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
            ease: "elastic.out(1,0.4)"
        });
    } 
});

window.addEventListener("scroll", (e) => {
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
          ease: "elastic.out(1,0.4)"
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
  
    var maxX = boundingRect.width / 2 * 0.2; 
    var maxY = boundingRect.height / 2 * 0.5; 
  
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