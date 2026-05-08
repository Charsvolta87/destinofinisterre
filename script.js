history.scrollRestoration = "manual";

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }

  });

});

const hiddenElements = document.querySelectorAll('.member-card, .card');

hiddenElements.forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

function setActiveLink() {

  let currentSection = "";

  sections.forEach(section => {

    const rect = section.getBoundingClientRect();

    if (
      rect.top <= window.innerHeight * 0.4 &&
      rect.bottom >= window.innerHeight * 0.4
    ) {
      currentSection = section.id;
    }

  });

  // 🔥 detectar final de página
  if (
    window.innerHeight + window.scrollY
    >= document.body.offsetHeight - 120
  ) {
    currentSection = "redes";
  }

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }

  });

}

window.addEventListener("scroll", setActiveLink);

window.addEventListener("load", setActiveLink);

setActiveLink();

