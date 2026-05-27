const container = document.getElementById("eventos-container");

eventos.forEach(evento => {

  const section = document.createElement("div");
  section.classList.add("evento-block");

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

  <div class="galeria-grid collapsed"></div>

`;

  container.appendChild(section);

});

/* =========================
   TOGGLE GALERIA
========================= */

const toggleButtons = document.querySelectorAll(".toggle-btn");

toggleButtons.forEach(btn => {

  btn.addEventListener("click", () => {

    const eventoBlock = btn.closest(".evento-block");

    const grid = eventoBlock.querySelector(".galeria-grid");

    const eventoId = eventoBlock.dataset.id;

    const evento = eventos.find(e => e.id === eventoId);

    // ABRIR

    if(grid.classList.contains("collapsed")){

      let contenidoHTML = "";

      // FOTOS

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

      // VIDEOS

      evento.videos.forEach(video => {

        let videoId = "";

        if(video.includes("watch?v=")){

          videoId = video.split("watch?v=")[1];

        } else if(video.includes("youtu.be/")){

          videoId = video.split("youtu.be/")[1];

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

      btn.textContent = "OCULTAR";

    }

    // CERRAR

    else {

      grid.classList.add("collapsed");

      grid.innerHTML = "";

      btn.textContent = "VER";

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