const container = document.getElementById("eventos-container");

eventos.forEach(evento => {

  const section = document.createElement("div");
  section.classList.add("evento-block");

  let fotosHTML = "";

  evento.fotos.forEach(foto => {

    fotosHTML += `
      <img src="${foto}" alt="${evento.nombre}" class="galeria-img">
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