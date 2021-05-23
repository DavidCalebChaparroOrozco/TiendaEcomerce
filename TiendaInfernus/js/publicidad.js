Swal.fire({
    title: '¡Oferta album Neffex!', // Titulo modal
    html: '<a href="#" class="btn btn-light">Comprar ahora</a>', // Codigo html, reemplaza el text
    icon: undefined, // Success
    footer: "Anuncio", // Footer, texto o html
    width: '300px',
    padding: '1rem',
    background: '#fff',
    grow: false, // 'row', 'column', 'fullscreen', false
    backdrop: false,
    timer: 20000, // Tiempo que queremos para el popup
    timerProgressBar: true, // Si queremos una barra de progreso
    toast: false, // Estilo toast para el popup
    position: 'bottom-end', // Posición del popup
    allowOutsideClick: false,
    allowEscapeKey: false,
    stopKeydownPropagation: false, // permitir eventos de teclados

    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: true, // Mostrar la X de cerrar
    closeButtonAriaLabel: 'Cerrar esta alerta',

    imageUrl : 'img/neffex4.jpg',
    imageWidth: '100%'
});