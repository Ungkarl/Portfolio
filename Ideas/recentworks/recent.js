const teaser = document.querySelector('.teaser');
const rows = document.querySelectorAll('.row');
const teaserTabs = document.querySelectorAll('.project');
let isHovering = false;
let currentProject = 1; // Start med det første projekt

gsap.set(teaser, { xPercent: -50, yPercent: -50 });


rows.forEach((row) => {
  row.addEventListener('mouseenter', () => {
    teaser.classList.remove('teaser-not-visible');
    teaser.classList.add('teaser-visible');
    isHovering = true;
    gsap.to(teaser, { duration: 0.3 });


    const hoveredRowId = row.id;
    

    const targetTeaserTab = Array.from(teaserTabs).find(tab => tab.id === hoveredRowId);

    if (targetTeaserTab) {
      
      currentProject = parseInt(hoveredRowId, 10);
      updateProjects(); 
    }
  });

  row.addEventListener('mouseleave', () => {
    teaser.classList.remove('teaser-visible');
    teaser.classList.add('teaser-not-visible');
    isHovering = false;
    gsap.to(teaser, { duration: 0.3 });
  });
});

// Funktion til at opdatere .projects-containeren for at vise det relevante projekt
function updateProjects() {
  const projectsContainer = document.querySelector('.projects');
  projectsContainer.classList.remove('show-project1', 'show-project2', 'show-project3', 'show-project4');
  projectsContainer.classList.add(`show-project${currentProject}`);
}

updateProjects(); // Opdater .projects for at vise det første projekt
let xTo = gsap.quickTo(teaser, "x", { duration: 0.5, ease: "power3" });
let yTo = gsap.quickTo(teaser, "y", { duration: 0.5, ease: "power3" });

window.addEventListener('mousemove', (e) => {
  if (isHovering) {
    xTo(e.clientX);
    yTo(e.clientY);
  }
});


