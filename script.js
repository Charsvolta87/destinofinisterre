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

    // 🔥 detecta si la sección está visible
    if (
      rect.top <= window.innerHeight * 0.35 &&
      rect.bottom >= window.innerHeight * 0.35
    ) {
      currentSection = section.id;
    }

  });

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

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
// 🔥 detectar final de página

if (
  window.innerHeight + window.scrollY
  >= document.body.offsetHeight - 250
) {
  current = "redes";
}