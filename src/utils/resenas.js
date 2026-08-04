document.addEventListener('DOMContentLoaded', () => {
  const reviewForm = document.getElementById('reviewForm');
  const reviewsList = document.getElementById('reviewsList');
  const fileInput = document.getElementById('reviewPhotos');
  const fileCountText = document.getElementById('fileCount');


  if (fileInput) {
    fileInput.addEventListener('change', function() {
      const totalArchivos = this.files.length;
      if (totalArchivos > 0) {
        fileCountText.textContent = `¡${totalArchivos} foto(s) seleccionada(s)!`;
        fileCountText.style.color = '#001f4d'; 
      } else {
        fileCountText.textContent = 'Ninguna foto seleccionada';
        fileCountText.style.color = '#64748b';
      }
    });
  }


  reviewForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nombre = document.getElementById('visitorName').value;
    const comentario = document.getElementById('visitorComment').value;
    
    const estrellaSeleccionada = document.querySelector('input[name="rating"]:checked');
    let estrellasText = '☆☆☆☆☆'; 
    
    if (estrellaSeleccionada) {
      const puntaje = parseInt(estrellaSeleccionada.value);
      estrellasText = '★'.repeat(puntaje) + '☆'.repeat(5 - puntaje);
    }

 
    const archivos = fileInput.files;
    let htmlImagenes = '';

  
    if (archivos.length > 0) {
      htmlImagenes = `<div class="review-gallery">`;
      for (let i = 0; i < archivos.length; i++) {
        const urlTemporal = URL.createObjectURL(archivos[i]);
        htmlImagenes += `<img src="${urlTemporal}" alt="Foto compartida por el huésped">`;
      }
      htmlImagenes += `</div>`;
    }


    const nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.classList.add('review-card');
    
    nuevaTarjeta.innerHTML = `
      <div class="review-header">
        <h4>${nombre}</h4>
        <div class="stars-display">${estrellasText}</div>
      </div>
      <p class="review-text">${comentario}</p>
      ${htmlImagenes}
    `;


    reviewsList.insertBefore(nuevaTarjeta, reviewsList.firstChild);


    reviewForm.reset();
    fileCountText.textContent = 'Ninguna foto seleccionada';
    fileCountText.style.color = '#64748b';
  })

})