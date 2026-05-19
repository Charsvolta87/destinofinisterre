const container = document.getElementById("eventos-container");

eventos.forEach(evento => {

  const section = document.createElement("div");
  section.classList.add("evento-block");

  let fotosHTML = "";

  evento.fotos.forEach(foto => {

    fotosHTML += `
      <img src="${foto}"
     alt="${evento.nombre}"
     class="galeria-img modal-trigger">
    `;

  });

  let videosHTML = "";

  evento.videos.forEach(video => {

    videosHTML += `
      <video controls class="galeria-video">
        <source src="${video}" type="video/mp4">
      </video>
    `;

  });

  section.innerHTML = `

    <div class="evento-header">
      <h3>${evento.nombre}</h3>
      <p>${evento.fecha}</p>
    </div>

    <div class="galeria-grid">
      ${fotosHTML}
      ${videosHTML}
    </div>

  `;

  container.appendChild(section);

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