/* ==========================================================================
   Lógica de la invitación. Todos los datos salen de config.js.
   ========================================================================== */
(function () {
  'use strict';

  var C = window.INVITACION || {};
  var root = document.documentElement;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function get(o, p) { return p.split('.').reduce(function (a, k) { return a == null ? a : a[k]; }, o); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function isHttp(u) { try { var x = new URL(u); return x.protocol === 'https:' || x.protocol === 'http:'; } catch (e) { return false; } }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (reduce) { var fv = document.getElementById('finaleVideo'); if (fv) fv.pause(); }

  root.lang = 'es';
  root.classList.add('js', 'locked');
  document.title = (C.titulo || 'Invitación') + ' ' + (C.quinceanera || '');

  /* ---------- Datos y decoración ---------- */
  $$('[data-bind]').forEach(function (el) {
    var v = get(C, el.getAttribute('data-bind'));
    if (typeof v === 'string') el.textContent = v;
  });
  $$('[data-corners]').forEach(function (s) {
    ['tl', 'tr', 'bl', 'br'].forEach(function (c) {
      s.insertAdjacentHTML('afterbegin', '<svg class="corner ' + c + '" viewBox="0 0 230 230" aria-hidden="true"><use href="#rosecorner"/></svg>');
    });
  });
  $$('.ln').forEach(function (e) { e.innerHTML = '<svg viewBox="0 0 60 90" aria-hidden="true"><use href="#lantern"/></svg>'; });
  $$('.bf').forEach(function (e) { e.innerHTML = '<svg viewBox="0 0 60 50" aria-hidden="true"><use href="#butterfly"/></svg>'; });
  $$('.sp').forEach(function (e) { e.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#sparkle"/></svg>'; });
  $$('[data-scene]').forEach(function (el) { el.innerHTML = Art.scene(el.getAttribute('data-scene')); });
  $$('[data-torn]').forEach(function (el, i) { el.style.clipPath = Art.torn(el.getAttribute('data-torn'), i + 1); });
  $$('[data-lanterns]').forEach(function (el) {
    var n = +el.getAttribute('data-lanterns'), small = el.hasAttribute('data-lantern-small'), html = '', i;
    for (i = 0; i < n; i++) {
      var w = small ? 16 + (i * 7) % 14 : 20 + (i * 11) % 22;
      html += '<span class="sky-ln" style="--x:' + (6 + (i * 37) % 86) + '%;--w:' + w + 'px;--t:' + (13 + (i * 5) % 9) + 's;--d:-' + ((i * 3.1) % 14).toFixed(1) + 's;--dx:' + ((i % 2 ? 1 : -1) * (14 + (i * 9) % 30)) + 'px"><svg viewBox="0 0 60 90" aria-hidden="true"><use href="#lantern"/></svg></span>';
    }
    el.outerHTML = html;
  });

  /* ---------- Mensajes ---------- */
  function setText(id, t) { var e = document.getElementById(id); if (e) e.textContent = t || ''; }
  setText('invMsg', C.invitacion);
  setText('presMsg', C.presentacion);
  setText('mainMsg', C.mensajePrincipal);
  setText('giftTxt', C.regalos && C.regalos.texto);
  setText('rsvpMsg', C.confirmacion && C.confirmacion.mensaje);
  setText('cierreTitulo', C.cierre && C.cierre.titulo);
  setText('cierreTexto', C.cierre && C.cierre.texto);

  function nameBlock(el, group) {
    if (!el) return;
    var names = (group && group.nombres || []).filter(Boolean);
    if (!names.length) { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = '<p class="lbl">' + esc(group.encabezado) + '</p>' +
      names.map(function (n, i) { return (i ? '<span class="y">y</span>' : '') + '<span class="nm">' + esc(n) + '</span>'; }).join('');
  }
  nameBlock($('#parentsBlock'), C.padres);
  nameBlock($('#godBlock'), C.padrinos);

  (function letter() {
    var d = C.dedicatoria || {}, el = $('#letter');
    if (!el) return;
    el.innerHTML = '<p class="greet">' + esc(d.saludo) + '</p>' +
      (d.lineas || []).map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('') +
      '<p class="close">' + esc(d.cierre) + '</p><p class="sign">' + esc(d.firma) + '</p>';
  })();

  /* ---------- Fecha, calendario y cuenta regresiva ---------- */
  var q = new URLSearchParams(location.search), qf = q.get('fecha');
  var fechaISO = (qf && !isNaN(new Date(qf))) ? qf : (C.evento && C.evento.fechaISO);
  var tz = (C.evento && C.evento.zonaHoraria) || 'UTC';
  var target = new Date(fechaISO);
  var targetOK = !isNaN(target.getTime());

  function zonedParts(d) {
    var o = {};
    new Intl.DateTimeFormat('es-CO', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(d).forEach(function (p) { o[p.type] = p.value; });
    return { y: +o.year, m: +o.month, d: +o.day, h: +o.hour % 24, mi: +o.minute };
  }
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var pad = function (n) { return String(n).padStart(2, '0'); };

  if (targetOK) {
    var P = zonedParts(target);
    var dow = new Date(Date.UTC(P.y, P.m - 1, P.d)).getUTCDay();
    var h12 = P.h % 12 || 12, ampm = P.h >= 12 ? 'P.M.' : 'A.M.';
    var horaTxt = h12 + ':' + pad(P.mi) + ' ' + ampm;
    setText('calMonth', cap(MESES[P.m - 1]));
    setText('calYear', String(P.y));
    setText('calDow', cap(DIAS[dow]));
    setText('calNum', pad(P.d) + '.' + pad(P.m) + '.' + P.y);
    setText('calTime', horaTxt);
    setText('factFecha', cap(DIAS[dow]) + ' ' + P.d + ' de ' + MESES[P.m - 1] + ' de ' + P.y);
    setText('factHora', horaTxt);

    var grid = $('#calGrid');
    var first = (new Date(Date.UTC(P.y, P.m - 1, 1)).getUTCDay() + 6) % 7;      // semana que inicia en lunes
    var dim = new Date(Date.UTC(P.y, P.m, 0)).getUTCDate();
    var html = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(function (l) { return '<span class="dw" role="columnheader">' + l + '</span>'; }).join('');
    for (var b = 0; b < first; b++) html += '<span class="d" aria-hidden="true"></span>';
    for (var dd = 1; dd <= dim; dd++) {
      html += dd === P.d ? '<span class="d ev" role="gridcell" aria-current="date" aria-label="' + dd + ' de ' + MESES[P.m - 1] + ', día de la fiesta">' + dd + '</span>' : '<span class="d" role="gridcell">' + dd + '</span>';
    }
    grid.innerHTML = html;
  } else {
    setText('calDow', 'Fecha por confirmar'); setText('calNum', ''); setText('calTime', '');
    setText('factFecha', 'Por confirmar'); setText('factHora', 'Por confirmar');
    $('#calGrid').innerHTML = '';
  }

  var cdGrid = $('#cdGrid'), cdPast = $('#cdPast'), eyebrow = $('.cd-eyebrow');
  function tick() {
    if (!targetOK) { cdGrid.hidden = true; eyebrow.hidden = true; cdPast.hidden = false; setText('cdPastT', 'Fecha por confirmar'); setText('cdPastS', ''); return false; }
    var diff = target.getTime() - Date.now();
    if (diff <= 0) {
      cdGrid.hidden = true; eyebrow.hidden = true; cdPast.hidden = false;
      var sameDay = Math.abs(diff) < 864e5;
      setText('cdPastT', sameDay ? '¡Hoy es el gran día!' : '¡El gran día ya llegó!');
      setText('cdPastS', sameDay ? '' : 'La celebración fue el ' + $('#factFecha').textContent + '.');
      return false;
    }
    cdGrid.hidden = false; eyebrow.hidden = false; cdPast.hidden = true;
    var s = Math.floor(diff / 1000);
    setText('cdD', pad(Math.floor(s / 86400)));
    setText('cdH', pad(Math.floor(s % 86400 / 3600)));
    setText('cdM', pad(Math.floor(s % 3600 / 60)));
    setText('cdS', pad(s % 60));
    return true;
  }
  if (tick()) { var timer = setInterval(function () { if (!tick()) clearInterval(timer); }, 1000); }

  /* ---------- Ubicación y regalos ---------- */
  (function maps() {
    var url = C.evento && C.evento.lugar && C.evento.lugar.mapsUrl, btn = $('#mapBtn');
    if (isHttp(url)) { btn.href = url; btn.target = '_blank'; btn.rel = 'noopener noreferrer'; }
    else { btn.setAttribute('aria-disabled', 'true'); btn.setAttribute('role', 'link'); $('#mapNote').hidden = false; }
  })();
  $$('[data-gift]').forEach(function (a) {
    var cfg = (C.regalos || {})[a.getAttribute('data-gift')] || {};
    $('b', a).textContent = cfg.etiqueta || '';
    $('small', a).textContent = cfg.detalle || '';
    if (isHttp(cfg.url)) { a.href = cfg.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    else {
      a.setAttribute('role', 'button'); a.setAttribute('tabindex', '0'); a.setAttribute('aria-disabled', 'true');
      var show = function (e) {
        if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        setText('giftNote', 'La información de «' + (cfg.etiqueta || 'este regalo') + '» estará disponible próximamente.');
      };
      a.addEventListener('click', show); a.addEventListener('keydown', show);
    }
  });
  var mapBtn = $('#mapBtn');
  mapBtn.addEventListener('click', function (e) { if (mapBtn.getAttribute('aria-disabled') === 'true') e.preventDefault(); });

  /* ---------- Música y corazón ---------- */
  var audio = null, audioOK = false;
  var musicSrc = C.musica && C.musica.archivo;
  var card = $('#playerCard'), seek = $('#seek'), prevB = $('#prevBtn'), nextB = $('#nextBtn'), heartB = $('#heartBtn'), pstatus = $('#pstatus');
  var wave = $('#wave');
  (function bars() {
    var h = '';
    for (var i = 0; i < 34; i++) { var v = 24 + Math.round(Math.abs(Math.sin(i * 1.7) * 38 + Math.sin(i * .6) * 30)); h += '<i style="--h:' + Math.min(v, 100) + ';--i:' + i + '"></i>'; }
    wave.innerHTML = h;
  })();
  function status(t) { pstatus.textContent = t || ''; }
  function setPlaying(on) { card.classList.toggle('playing', on); heartB.setAttribute('aria-pressed', on ? 'true' : 'false'); }

  if (musicSrc) {
    audio = new Audio(); audio.loop = true; audio.preload = 'none'; audio.src = musicSrc; audioOK = true;
    seek.disabled = prevB.disabled = nextB.disabled = false;
    audio.addEventListener('timeupdate', function () {
      if (audio.duration) { var p = audio.currentTime / audio.duration * 100; seek.value = p; seek.style.setProperty('--p', p + '%'); }
    });
    audio.addEventListener('error', function () { audioOK = false; setPlaying(false); seek.disabled = prevB.disabled = nextB.disabled = true; status('No se pudo cargar la música.'); });
    audio.addEventListener('pause', function () { setPlaying(false); });
    audio.addEventListener('play', function () { setPlaying(true); });
    seek.addEventListener('input', function () { if (audio.duration) audio.currentTime = seek.value / 100 * audio.duration; });
    prevB.addEventListener('click', function () { audio.currentTime = Math.max(0, audio.currentTime - 10); });
    nextB.addEventListener('click', function () { audio.currentTime = Math.min(audio.duration || 1e9, audio.currentTime + 10); });
  } else {
    status('La música aún no está configurada.');
  }

  function burst() {
    if (reduce) return;
    for (var i = 0; i < 9; i++) {
      (function (i) {
        var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        s.setAttribute('viewBox', '0 0 32 30'); s.setAttribute('class', 'fh'); s.setAttribute('aria-hidden', 'true');
        s.style.cssText = '--x:' + (36 + Math.random() * 28) + '%;--w:' + (12 + Math.random() * 16) + 'px;--dx:' + ((Math.random() - .5) * 90) + 'px;animation-delay:' + (i * 0.08) + 's';
        s.innerHTML = '<use href="#heart"/>';
        card.appendChild(s);
        setTimeout(function () { s.remove(); }, 2200);
      })(i);
    }
  }
  heartB.addEventListener('click', function () {
    heartB.classList.add('pressed');
    var hand = $('#hand'); if (hand) hand.remove();
    var m = $('#heartMsg'); m.hidden = false;
    burst();
    if (audioOK) {
      if (audio.paused) { var pr = audio.play(); if (pr && pr.catch) pr.catch(function () { status('Tu navegador no permitió reproducir la música.'); }); }
      else audio.pause();
    }
  });

  /* ---------- Apertura del sobre ---------- */
  var cover = $('#cover'), envBtn = $('#envBtn'), opened = false;
  function finish() {
    cover.hidden = true;
    root.classList.remove('locked');
    window.scrollTo(0, 0);
    $('#hero').classList.add('show');
    var m = $('#story'); if (m && m.focus) m.focus({ preventScroll: true });
  }
  envBtn.addEventListener('click', function () {
    if (opened) return; opened = true;
    cover.classList.add('is-opening');
    var hv = $('#heroVideo');
    if (hv && !reduce) { var pv = hv.play(); if (pv && pv.catch) pv.catch(function () { }); }
    envBtn.setAttribute('aria-disabled', 'true');
    if (audioOK && C.musica.iniciarAlAbrirSobre) { var p = audio.play(); if (p && p.catch) p.catch(function () { }); }
    setTimeout(finish, reduce ? 300 : 2450);
  });

  /* ---------- Revelado al desplazarse ---------- */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (el) { io.observe(el); });
    var po = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('pulse'); po.unobserve(e.target); } });
    }, { threshold: .7 });
    $$('.punch').forEach(function (el) { po.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- Paralaje suave del paisaje ---------- */
  var heroScene = $('#heroScene'), ticking = false;
  if (!reduce && heroScene) {
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900);
        heroScene.style.transform = 'translate3d(0,' + (y * .22).toFixed(1) + 'px,0)';
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Partículas (un canvas por escena, solo activas si se ven) ---------- */
  var KINDS = {
    soft: { n: 22, c: '255,236,170', s: [2, 5], v: [8, 20], a: .7 },
    gold: { n: 46, c: '255,226,140', s: [2, 6], v: [10, 34], a: .9 },
    warm: { n: 30, c: '255,200,120', s: [1.5, 4], v: [8, 24], a: .8 },
    night: { n: 54, c: '216,186,255', s: [1.5, 5], v: [8, 28], a: .95 }
  };
  var systems = [], sprites = {};
  function sprite(c) {
    if (sprites[c]) return sprites[c];
    var cv = document.createElement('canvas'); cv.width = cv.height = 32;
    var g = cv.getContext('2d'), gr = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, 'rgba(' + c + ',1)'); gr.addColorStop(.35, 'rgba(' + c + ',.45)'); gr.addColorStop(1, 'rgba(' + c + ',0)');
    g.fillStyle = gr; g.fillRect(0, 0, 32, 32);
    return (sprites[c] = cv);
  }
  function mk(canvas) {
    var cfg = KINDS[canvas.getAttribute('data-kind')] || KINDS.gold, ctx = canvas.getContext('2d');
    var sys = { cv: canvas, ctx: ctx, cfg: cfg, parts: [], w: 0, h: 0, on: false, img: sprite(cfg.c) };
    function size() {
      var r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      sys.w = r.width; sys.h = r.height; canvas.width = Math.max(1, r.width * dpr); canvas.height = Math.max(1, r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(cfg.n * Math.min(1, r.width / 420) * (r.height > 700 ? 1 : .75));
      sys.parts = [];
      for (var i = 0; i < n; i++) sys.parts.push({ x: Math.random() * sys.w, y: Math.random() * sys.h, s: cfg.s[0] + Math.random() * (cfg.s[1] - cfg.s[0]), v: cfg.v[0] + Math.random() * (cfg.v[1] - cfg.v[0]), ph: Math.random() * 6.28, tw: .8 + Math.random() * 1.6, dr: 6 + Math.random() * 14 });
      if (reduce) draw(sys, 0, 0);
    }
    if ('ResizeObserver' in window) new ResizeObserver(size).observe(canvas); else size();
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { sys.on = es[0].isIntersecting; }, { rootMargin: '80px' }).observe(canvas); else sys.on = true;
    systems.push(sys);
  }
  function draw(sys, t, dt) {
    var ctx = sys.ctx, cfg = sys.cfg;
    ctx.clearRect(0, 0, sys.w, sys.h);
    for (var i = 0; i < sys.parts.length; i++) {
      var p = sys.parts[i];
      p.y -= p.v * dt; p.x += Math.sin(t * .0008 * p.tw + p.ph) * p.dr * dt;
      if (p.y < -12) { p.y = sys.h + 12; p.x = Math.random() * sys.w; }
      var a = cfg.a * (.35 + .65 * Math.abs(Math.sin(t * .0011 * p.tw + p.ph)));
      ctx.globalAlpha = a;
      var d = p.s * 4;
      ctx.drawImage(sys.img, p.x - d / 2, p.y - d / 2, d, d);
    }
    ctx.globalAlpha = 1;
  }
  $$('canvas.motes').forEach(mk);
  if (!reduce) {
    var last = performance.now();
    (function loop(t) {
      var dt = Math.min(.05, (t - last) / 1000); last = t;
      if (!document.hidden) systems.forEach(function (s) { if (s.on) draw(s, t, dt); });
      requestAnimationFrame(loop);
    })(last);
  }

  /* ---------- Confirmación de asistencia ---------- */
  (function rsvp() {
    var cfg = C.confirmacion || {}, form = $('#rsvpForm'), st = $('#rsvpStatus'), btn = $('#rsvpBtn');
    var sel = $('#rsvpGuests'), gf = $('#guestsField');
    if (cfg.permitirAcompanantes) {
      var n = Math.max(1, +cfg.maxAsistentes || 1), o = '';
      for (var i = 1; i <= n; i++) o += '<option value="' + i + '">' + i + (i === 1 ? ' persona' : ' personas') + '</option>';
      sel.innerHTML = o;
    } else { gf.hidden = true; sel.innerHTML = '<option value="1">1</option>'; }

    function show(kind, html) { st.className = 'status ' + kind + ' status-box'; st.innerHTML = html; }
    function clear() { st.className = 'status'; st.innerHTML = ''; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('#rsvpHp').value) return;                       // trampa para bots
      var nombre = $('#rsvpName').value.trim();
      if (nombre.length < 2) { show('err', 'Escribe tu nombre para confirmar.'); $('#rsvpName').focus(); return; }
      var asistentes = cfg.permitirAcompanantes ? +sel.value : 1;
      clear();

      if (isHttp(cfg.endpoint)) {
        btn.disabled = true; btn.setAttribute('aria-busy', 'true');
        var ctl = new AbortController(), to = setTimeout(function () { ctl.abort(); }, 15000);
        fetch(cfg.endpoint, {
          method: 'POST', signal: ctl.signal,
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ nombre: nombre, asistentes: asistentes, evento: (C.titulo || '') + ' ' + (C.quinceanera || ''), enviado: new Date().toISOString() })
        }).then(function (r) {
          if (!r.ok) throw new Error('http ' + r.status);
          show('ok', '¡Gracias, ' + esc(nombre) + '! Tu confirmación fue enviada.');
          form.reset();
        }).catch(function (err) {
          show('err', err && err.name === 'AbortError' ? 'El envío tardó demasiado. Inténtalo de nuevo.' : 'No se pudo enviar tu confirmación. Revisa tu conexión e inténtalo de nuevo.');
        }).then(function () { clearTimeout(to); btn.disabled = false; btn.removeAttribute('aria-busy'); });
        return;
      }

      var num = String(cfg.whatsapp || '').replace(/\D/g, '');
      if (num.length >= 8) {
        var txt = 'Hola, confirmo mi asistencia a ' + (C.titulo || '') + ' de ' + (C.quinceanera || '') + '. Nombre: ' + nombre + '. Asistentes: ' + asistentes + '.';
        var url = 'https://wa.me/' + num + '?text=' + encodeURIComponent(txt);
        var w = window.open(url, '_blank', 'noopener');
        show('ok', 'Preparamos tu mensaje en WhatsApp. <strong>Envíalo</strong> para completar la confirmación.' + (w ? '' : ' <a href="' + url + '" target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a>'));
        return;
      }
      show('err', 'La confirmación en línea todavía no está disponible. Por favor avísale directamente a la familia.');
    });
  })();
})();
