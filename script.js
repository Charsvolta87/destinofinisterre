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

    const sectionTop = section.offsetTop - 250;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
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

    const href = link.getAttribute("href");

    if (href === `#${currentSection}`) {
      link.classList.add("active");
    }

  });

}

window.addEventListener("scroll", setActiveLink);

window.addEventListener("load", setActiveLink);

setActiveLink();