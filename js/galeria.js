const container = document.getElementById("eventos-container");

eventos.forEach(evento => {

  const section = document.createElement("div");
  section.classList.add("evento-block");

  section.id = evento.id;

  section.dataset.id = evento.id;



  let videosHTML = "";

evento.videos.forEach(video => {

  // extraer ID de youtube
  let videoId = "";

  if(video.includes("watch?v=")){

    videoId = video.split("watch?v=")[1];

  } else if(video.includes("youtu.be/")){

    videoId = video.split("youtu.be/")[1];

  }

  // eliminar parámetros extras
  videoId = videoId.split("&")[0];

  videosHTML += `
  
    <div class="youtube-video">

      <iframe
        src="https://www.youtube.com/embed/${videoId}"
        title="${evento.nombre}"
        allowfullscreen>
      </iframe>

    </div>

  `;

});

  section.innerHTML = `

  <div class="evento-header">

    <div class="evento-info">
      <h3>${evento.nombre}</h3>
      <p>${evento.fecha}</p>
    </div>

    <button class="toggle-btn">
      VER
    </button>

  </div>

  <div class="galeria-wrapper">

  <button class="scroll-btn left">
    &#10094;
  </button>

  <div class="galeria-grid collapsed"></div>

  <button class="scroll-btn right">
    &#10095;
  </button>

</div>

`;

  container.appendChild(section);

});

/* =========================
   TOGGLE GALERIA
========================= */

const toggleButtons = document.querySelectorAll(".toggle-btn");

toggleButtons.forEach(btn => {

  btn.addEventListener("click", () => {

    const currentBlock =
      btn.closest(".evento-block");

    const currentGrid =
      currentBlock.querySelector(".galeria-grid");

    const currentId =
      currentBlock.dataset.id;

    const evento =
      eventos.find(e => e.id === currentId);

    const isCollapsed =
      currentGrid.classList.contains("collapsed");

    // cerrar todos

    document.querySelectorAll(".galeria-grid")
      .forEach(grid => {

        grid.classList.add("collapsed");

        grid.innerHTML = "";

      });

    document.querySelectorAll(".toggle-btn")
      .forEach(button => {

        button.textContent = "VER";

      });

    // abrir SOLO el actual

    if(isCollapsed){

      let contenidoHTML = "";

      /* =========================
         FOTOS
      ========================= */

      evento.fotos.forEach(foto => {

        contenidoHTML += `

          <img
            src="${foto}"
            alt="${evento.nombre}"
            class="galeria-img modal-trigger"
            loading="lazy"
            decoding="async">

        `;

      });

      /* =========================
         VIDEOS
      ========================= */

      evento.videos.forEach(video => {

        let videoId = "";

        if(video.includes("watch?v=")){

          videoId =
            video.split("watch?v=")[1];

        } else if(video.includes("youtu.be/")){

          videoId =
            video.split("youtu.be/")[1];

        }

        videoId = videoId.split("&")[0];

        contenidoHTML += `

          <div class="youtube-video">

            <iframe
              src="https://www.youtube.com/embed/${videoId}"
              title="${evento.nombre}"
              allowfullscreen>
            </iframe>

          </div>

        `;

      });

      currentGrid.innerHTML =
        contenidoHTML;

      currentGrid.classList.remove("collapsed");

      btn.textContent = "OCULTAR";

    }

  });

});

/* =========================
   MODAL
========================= */

const modal = document.getElementById("modal");

const modalImg = document.getElementById("modal-img");

const closeModal = document.querySelector(".close-modal");

let scale = 1;

/* abrir modal */

document.addEventListener("click", e => {

  if(e.target.classList.contains("modal-trigger")){

    modal.classList.add("active");

    modalImg.src = e.target.src;

    scale = 1;

    modalImg.style.transform = `scale(${scale})`;

  }

});

/* cerrar */

closeModal.addEventListener("click", () => {

  modal.classList.remove("active");

});

/* cerrar tocando fondo */

modal.addEventListener("click", e => {

  if(e.target === modal){

    modal.classList.remove("active");

  }

});

/* zoom rueda mouse */

modalImg.addEventListener("wheel", e => {

  e.preventDefault();

  if(e.deltaY < 0){

    scale += 0.15;

  } else {

    scale -= 0.15;

  }

  scale = Math.min(Math.max(1, scale), 5);

  modalImg.style.transform = `scale(${scale})`;

});

/* =========================
   ABRIR EVENTO DESDE HASH
========================= */

/* =========================
   ABRIR EVENTO DESDE HASH
========================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    const hash = window.location.hash;

    if(!hash) return;

    const targetEvent = document.querySelector(hash);

    if(!targetEvent) return;

    // cerrar TODOS

    document.querySelectorAll(".galeria-grid")
      .forEach(grid => {

        grid.classList.add("collapsed");

      });

    document.querySelectorAll(".toggle-btn")
      .forEach(btn => {

        btn.textContent = "VER";

      });

    // abrir SOLO el elegido

const grid =
  targetEvent.querySelector(".galeria-grid");

const button =
  targetEvent.querySelector(".toggle-btn");

const currentId =
  targetEvent.dataset.id;

const evento =
  eventos.find(e => e.id === currentId);

let contenidoHTML = "";

/* =========================
   FOTOS
========================= */

evento.fotos.forEach(foto => {

  contenidoHTML += `

    <img
      src="${foto}"
      alt="${evento.nombre}"
      class="galeria-img modal-trigger"
      loading="lazy"
      decoding="async">

  `;

});

/* =========================
   VIDEOS
========================= */

evento.videos.forEach(video => {

  let videoId = "";

  if(video.includes("watch?v=")){

    videoId =
      video.split("watch?v=")[1];

  } else if(video.includes("youtu.be/")){

    videoId =
      video.split("youtu.be/")[1];

  }

  videoId = videoId.split("&")[0];

  contenidoHTML += `

    <div class="youtube-video">

      <iframe
        src="https://www.youtube.com/embed/${videoId}"
        title="${evento.nombre}"
        allowfullscreen>
      </iframe>

    </div>

  `;

});

grid.innerHTML = contenidoHTML;

grid.classList.remove("collapsed");

button.textContent = "OCULTAR";



    // scroll suave

    targetEvent.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }, 200);

});


/* =========================
   SCROLL HORIZONTAL
========================= */

document.addEventListener("click", e => {

  // DERECHA

  if(e.target.classList.contains("right")){

    const grid = e.target
      .parentElement
      .querySelector(".galeria-grid");

    grid.scrollBy({
      left: 900,
      behavior: "smooth"
    });

  }

  // IZQUIERDA

  if(e.target.classList.contains("left")){

    const grid = e.target
      .parentElement
      .querySelector(".galeria-grid");

    grid.scrollBy({
      left: -900,
      behavior: "smooth"
    });

  }

});