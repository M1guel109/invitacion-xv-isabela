/* ==========================================================================
   CONFIGURACIÓN DE LA INVITACIÓN
   Cambia aquí todos los datos. No hace falta tocar index.html, styles.css ni app.js.
   Los textos marcados como "provisional" son de ejemplo: reemplázalos.
   ========================================================================== */
window.INVITACION = {
  // --- Identidad -----------------------------------------------------------
  titulo: "Mis XV Años",
  quinceanera: "Isabela",                       // provisional

  // --- Evento --------------------------------------------------------------
  evento: {
    // Fecha y hora reales con su desfase horario. Colombia = -05:00.
    // Formato: AAAA-MM-DDTHH:MM:SS-05:00
    fechaISO: "2026-11-21T19:00:00-05:00",
    zonaHoraria: "America/Bogota",
    lugar: {
      nombre: "Finca Las Delicias",
      direccion: "Vereda Santa Ana",
      mapsUrl: "https://maps.app.goo.gl/jzsDFU9wkQWTsVcT6"                             // enlace de Google Maps. Vacío = botón desactivado
    }
  },

  // --- Familia -------------------------------------------------------------
  padres: {
    encabezado: "Con la bendición y el amor de mis padres",
    nombres: ["Jeysson Gonzáles", "Yeny Paola Rey"]
  },
  padrinos: {
    encabezado: "Mis padrinos",
    nombres: []                               // vacío = la sección de padrinos no se muestra
  },

  // --- Mensajes (provisionales, editables) ---------------------------------
  mensajeCorazon: "Una noche mágica te espera. Eres parte de mi historia y quiero compartirla contigo.",
  invitacion: "Hay momentos en la vida que se guardan para siempre en el corazón… y hoy queremos compartir uno de ellos con ustedes. ✨ Isabela celebra sus 15 años, una etapa que comienza llena de sueños, ilusiones y nuevas historias por vivir. Nos encantaría contar con su presencia para hacer de esta noche un recuerdo inolvidable.",
  presentacion: "Una noche mágica se acerca, llena de sueños, alegría y un nuevo capítulo por comenzar: una niña deja atrás su niñez para convertirse en una joven llena de sueños.",
  mensajePrincipal: "La magia de cumplir 15 años no estaría completa sin personas como tú. ¡Espero verte en mi celebración!",

  vestuario: {
    codigo: "Semi formal",
    nota: "Se reserva el color lila, en todas sus tonalidades, para la quinceañera."
  },

  dedicatoria: {
    saludo: "Querida familia y amigos,",
    lineas: [
      "Hoy celebro 15 años de amor, sueños y alegría.",
      "Cada uno de ustedes ha llenado mi vida de luz,",
      "y por eso quiero que sean parte de este día tan especial.",
      "Este es solo el comienzo de un futuro lleno de posibilidades y logros."
    ],
    cierre: "Con todo mi amor,",
    firma: "Isabela"                             // provisional
  },

  // --- Mesa de regalos -----------------------------------------------------
  // Si "url" está vacía, la tarjeta muestra "disponible próximamente".
  regalos: {
    texto: "En esta noche mágica, tu compañía es el mejor regalo. Pero si deseas añadir una chispa más de luz con una lluvia de sobres, lo guardaré con gratitud en mi corazón.",
    sobre: { etiqueta: "Lluvia de sobres", url: "", detalle: "" }
  },

  // --- Confirmación de asistencia -------------------------------------------
  confirmacion: {
    mensaje: "Tu presencia es importante para nosotros, por favor confírmanos tu asistencia.",
    permitirAcompanantes: true,
    maxAsistentes: 6,
    // OPCIÓN A (recomendada): servicio de formularios que reciba un POST JSON.
    //   Ej. Formspree: "https://formspree.io/f/xxxxxxx"
    endpoint: "",
    // OPCIÓN B: abre WhatsApp con el mensaje listo. Número con código de país, sin + ni espacios.
    //   Ej. Colombia: "573001234567". Solo se usa si "endpoint" está vacío.
    whatsapp: ""
  },

  // --- Cierre --------------------------------------------------------------
  cierre: {
    titulo: "¡Te esperamos!",
    texto: "Esta invitación ha sido pensada especialmente para ti. Es personal e intransferible."
  },

  // --- Música --------------------------------------------------------------
  // Pon tu archivo en la carpeta assets/ y escribe su ruta, p. ej. "assets/musica.mp3".
  // Vacío = el reproductor queda preparado, sin simular reproducción.
  musica: {
    archivo: "assets/Chayanne, Danna Paola - Veo en ti la luz (De Enredados Video Oficial).mp3",
    iniciarAlAbrirSobre: true                 // empieza al tocar el sobre (gesto del usuario)
  }
};
