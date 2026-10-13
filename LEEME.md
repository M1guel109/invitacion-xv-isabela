# Invitación XV Años: guía rápida

Sitio estático (HTML + CSS + JS, sin dependencias). Se sube tal cual a Hostinger, Netlify, GitHub Pages, etc.

## Qué editar
Todo está en **config.js**: nombre, fecha y hora, zona horaria, lugar, enlace de Google Maps,
padres y padrinos, mensajes, código de vestuario, regalos, música y confirmación de asistencia.
No hace falta tocar los demás archivos.

## Pendientes antes de publicar
1. **Fecha real**: `evento.fechaISO`. La del archivo es la de la referencia (14-jun-2026) y ya pasó,
   por eso la cuenta regresiva muestra "¡El gran día ya llegó!". Para probar sin editar, abre `index.html?fecha=2027-06-13T17:45:00-05:00`.
2. **Lugar**: nombre, dirección y `mapsUrl` (sin enlace, el botón queda desactivado).
3. **Padres/padrinos**: reemplaza los marcadores "Nombre del padre / de la madre".
4. **Música**: copia el MP3 a `assets/` y escribe la ruta en `musica.archivo`.
5. **Confirmación de asistencia** (elige una):
   - `confirmacion.endpoint`: URL de un servicio de formularios que reciba un POST JSON
     (Formspree: crea un formulario y pega `https://formspree.io/f/xxxxxxx`).
     Recibirás `nombre`, `asistentes`, `evento` y `enviado`.
   - `confirmacion.whatsapp`: número con código de país, sin + (ej. `573001234567`).
     Abre WhatsApp con el mensaje listo; la persona debe enviarlo.
   Sin ninguna de las dos, el formulario avisa que la confirmación no está disponible; nunca finge un envío.
6. **Regalos**: `regalos.fisico.url` y `regalos.sobre.url` (vacíos = "disponible próximamente").

## Ilustraciones
Todas son SVG dibujados en `art.js` (diseño propio, sin imágenes externas). Para usar tus propias
imágenes, reemplaza el contenido de las escenas o añade `<img>` en `index.html`.

## Notas técnicas
- Las tipografías vienen de Google Fonts (necesita internet). Sin conexión se usan tipografías serif del sistema.
- Respeta "reducir movimiento" del sistema: sin animaciones, todo el contenido sigue visible.
- La música solo arranca tras un toque del usuario (sobre o corazón).
