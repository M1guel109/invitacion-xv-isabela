/* ==========================================================================
   Ilustraciones originales en SVG (sin imágenes externas).
   Expone window.Art = { scene(nombre), torn(lado, semilla) }.
   ========================================================================== */
(function () {
  'use strict';

  var seed = 11;
  function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  function f(n) { return (+n).toFixed(1); }
  function starPts(n, r1, r2) {
    var p = [];
    for (var i = 0; i < n * 2; i++) {
      var a = (Math.PI * i) / n - Math.PI / 2, r = i % 2 ? r2 : r1;
      p.push(f(Math.cos(a) * r) + ',' + f(Math.sin(a) * r));
    }
    return p.join(' ');
  }

  /* ---------- Gradientes compartidos ---------- */
  var DEFS = '<defs>' +
    '<linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3b8"/><stop offset=".35" stop-color="#e6c25a"/><stop offset=".65" stop-color="#b98a2a"/><stop offset="1" stop-color="#f3d777"/></linearGradient>' +
    '<linearGradient id="gGoldV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".45" stop-color="#e0b64f"/><stop offset=".6" stop-color="#a97d26"/><stop offset="1" stop-color="#e9c660"/></linearGradient>' +
    '<linearGradient id="gViolet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8d5cc4"/><stop offset="1" stop-color="#43226f"/></linearGradient>' +
    '<linearGradient id="gVioletL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7a8e6"/><stop offset="1" stop-color="#8b5cbd"/></linearGradient>' +
    '<radialGradient id="gRose1" cx=".5" cy=".6" r=".65"><stop offset="0" stop-color="#d9c2f2"/><stop offset="1" stop-color="#8d5cc0"/></radialGradient>' +
    '<radialGradient id="gRose2" cx=".5" cy=".6" r=".65"><stop offset="0" stop-color="#ecdffa"/><stop offset="1" stop-color="#a77dd2"/></radialGradient>' +
    '<radialGradient id="gRose3" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#f6eefc"/><stop offset="1" stop-color="#c4a2e6"/></radialGradient>' +
    '<linearGradient id="gLeaf" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4f7d3f"/><stop offset="1" stop-color="#8db565"/></linearGradient>' +
    '<linearGradient id="gLantern" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe98a"/><stop offset=".6" stop-color="#f6b94a"/><stop offset="1" stop-color="#e58a2f"/></linearGradient>' +
    '<radialGradient id="gSeal" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff0a8"/><stop offset=".5" stop-color="#d4a844"/><stop offset="1" stop-color="#8a6420"/></radialGradient>' +
    '<radialGradient id="gGem" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#efdfff"/><stop offset=".5" stop-color="#9a62d4"/><stop offset="1" stop-color="#4a2380"/></radialGradient>' +
    '<linearGradient id="gHair" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9a05a"/><stop offset="1" stop-color="#8a5628"/></linearGradient>' +
    '<linearGradient id="gSkin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe6d3"/><stop offset="1" stop-color="#f2bf9f"/></linearGradient>' +
    '<linearGradient id="gGown" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a77bd8"/><stop offset=".55" stop-color="#7b49b3"/><stop offset="1" stop-color="#4b2680"/></linearGradient>' +
    '<linearGradient id="gSleeve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8c0f0"/><stop offset="1" stop-color="#a77dd2"/></linearGradient>' +
    '<linearGradient id="gLotus" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7d4fb4"/><stop offset=".55" stop-color="#c9a6ec"/><stop offset="1" stop-color="#f8f1fd"/></linearGradient>' +
    '<linearGradient id="gCastle" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b18ad8"/><stop offset="1" stop-color="#6c3fa3"/></linearGradient>' +
    '</defs>';

  /* ---------- Rosa y hoja (grupos internos) ---------- */
  function roseG() {
    var L = [
      { n: 7, r: 27, rx: 17, ry: 21, fill: 'url(#gRose1)' },
      { n: 6, r: 19, rx: 14, ry: 17, fill: 'url(#gRose2)' },
      { n: 5, r: 12, rx: 10, ry: 13, fill: 'url(#gRose2)' },
      { n: 4, r: 6, rx: 7, ry: 9, fill: 'url(#gRose3)' }
    ];
    var s = '<g id="roseg">';
    L.forEach(function (l, k) {
      for (var i = 0; i < l.n; i++) {
        s += '<ellipse cx="0" cy="' + (-l.r) + '" rx="' + l.rx + '" ry="' + l.ry + '" transform="rotate(' + f(i * 360 / l.n + k * 23) +
          ')" fill="' + l.fill + '" stroke="#5a3485" stroke-opacity=".45" stroke-width=".9"/>';
      }
    });
    s += '<path d="M-3 -2 C0 -6 6 -3 3 2 C0 5 -5 3 -4 -1" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1"/></g>';
    return s;
  }
  var LEAF = '<g id="leafg"><path d="M0 0 C10 -15 30 -15 44 0 C30 15 10 15 0 0Z" fill="url(#gLeaf)" stroke="#3b6130" stroke-width=".8"/><path d="M2 0 H40" stroke="#3b6130" stroke-opacity=".6" stroke-width=".8"/></g>';

  /* ---------- Esquina de rosas ---------- */
  function corner() {
    return '<symbol id="rosecorner" viewBox="0 0 230 230">' +
      '<image href="assets/esquineros.png" width="230" height="230" transform="scale(-1,1) translate(-230,0)" preserveAspectRatio="xMidYMid slice"/></symbol>';
  }

  /* ---------- Corona ---------- */
  var CROWN = '<symbol id="crown" viewBox="0 0 220 120">' +
    '<path d="M14 98 L22 48 L52 72 L78 28 L98 66 L110 14 L122 66 L142 28 L168 72 L198 48 L206 98 Z" fill="url(#gGold)" stroke="#8a6a22" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M30 90 Q50 70 70 90 M150 90 Q170 70 190 90 M90 88 Q110 62 130 88" fill="none" stroke="#8a6a22" stroke-width="1.2" stroke-opacity=".8"/>' +
    '<rect x="12" y="92" width="196" height="18" rx="7" fill="url(#gGold)" stroke="#8a6a22" stroke-width="1.6"/>' +
    [[22, 44], [78, 24], [110, 9], [142, 24], [198, 44]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5.5" fill="#fffbe9" stroke="#b58a2c" stroke-width="1.4"/>'; }).join('') +
    [[34, 101, 6], [62, 101, 6], [88, 101, 6], [132, 101, 6], [158, 101, 6], [186, 101, 6]].map(function (g) { return '<ellipse cx="' + g[0] + '" cy="' + g[1] + '" rx="' + g[2] + '" ry="5.4" fill="url(#gGem)" stroke="#6b4a14" stroke-width="1"/>'; }).join('') +
    '<ellipse cx="110" cy="100" rx="9" ry="8" fill="url(#gGem)" stroke="#6b4a14" stroke-width="1.2"/><ellipse cx="107.5" cy="97" rx="2.6" ry="2" fill="#fff" opacity=".8"/>' +
    '<path d="M110 38 l7 10 -7 10 -7 -10Z M80 56 l5 7 -5 7 -5 -7Z M140 56 l5 7 -5 7 -5 -7Z" fill="url(#gGem)" stroke="#6b4a14" stroke-width="1"/>' +
    '</symbol>';

  /* ---------- Linterna, mariposa, destello, sol ---------- */
  var LANTERN = '<symbol id="lantern" viewBox="0 0 60 90">' +
    '<image href="assets/linterna.png" x="0" y="0" width="60" height="90" preserveAspectRatio="xMidYMid slice"/></symbol>';
  var BUTTERFLY = '<symbol id="butterfly" viewBox="0 0 60 50">' +
    '<g fill="url(#gGold)" stroke="#9a7424" stroke-width="1">' +
    '<path class="bf-wing bf-wing-l" d="M30 24 C12 -4 -4 8 10 22 C-2 30 8 46 30 28Z"/>' +
    '<path class="bf-wing bf-wing-r" d="M30 24 C48 -4 64 8 50 22 C62 30 52 46 30 28Z"/></g>' +
    '<path d="M30 24 C16 12 10 14 12 20 M30 24 C44 12 50 14 48 20" stroke="#9a7424" stroke-width=".8" fill="none"/>' +
    '<ellipse cx="30" cy="27" rx="1.8" ry="9" fill="#7a5a1c"/></symbol>';
  var SPARKLE = '<symbol id="sparkle" viewBox="-12 -12 24 24"><path d="M0 -11 Q1 -1 11 0 Q1 1 0 11 Q-1 1 -11 0 Q-1 -1 0 -11Z" fill="#fff6c8"/></symbol>';
  var SUNSTAR = '<symbol id="sunstar" viewBox="-50 -50 100 100"><image href="assets/sol.png" x="-50" y="-50" width="100" height="100" preserveAspectRatio="xMidYMid slice"/></symbol>';
  var SEAL = '<symbol id="seal" viewBox="-40 -40 80 80"><polygon points="' + starPts(22, 38, 33) + '" fill="#9c7424"/><circle r="31" fill="url(#gSeal)" stroke="#6b4a14" stroke-width="1.5"/><circle r="25" fill="none" stroke="#7a5818" stroke-width="1.4"/>' +
    '<g fill="none" stroke="#7a5818" stroke-width="1.5" stroke-linejoin="round"><polygon points="' + starPts(8, 21, 9) + '" fill="#e9c860" fill-opacity=".7"/></g><circle r="5" fill="#fff4b8" stroke="#7a5818" stroke-width="1.2"/></symbol>';
  var HEART = '<symbol id="heart" viewBox="0 0 32 30"><path d="M16 28C4 18 1 12 1 8 1 3.5 4.5 1 8.5 1 12 1 15 3 16 6 17 3 20 1 23.5 1 27.5 1 31 3.5 31 8 31 12 28 18 16 28Z"/></symbol>';
  var FLOURISH = '<symbol id="flourish" viewBox="0 0 200 28" fill="none">' +
    '<path d="M6 16 C 28 6, 48 24, 72 13 C 78 10, 80 15, 76 17" stroke="url(#gGold)" stroke-width="1.3" stroke-linecap="round"/>' +
    '<path d="M76 17 C 73 20, 68 18, 70 14 C 71 12, 74 13, 73 15" stroke="url(#gGold)" stroke-width="1.1" stroke-linecap="round"/>' +
    '<g transform="translate(46 11) rotate(-18) scale(.26)"><path d="M0 0 C10 -15 30 -15 44 0 C30 15 10 15 0 0Z" fill="url(#gLeaf)" stroke="#3b6130" stroke-width="2"/></g>' +
    '<path d="M194 16 C 172 6, 152 24, 128 13 C 122 10, 120 15, 124 17" stroke="url(#gGold)" stroke-width="1.3" stroke-linecap="round"/>' +
    '<path d="M124 17 C 127 20, 132 18, 130 14 C 129 12, 126 13, 127 15" stroke="url(#gGold)" stroke-width="1.1" stroke-linecap="round"/>' +
    '<g transform="translate(154 11) scale(-.26,.26) rotate(-18)"><path d="M0 0 C10 -15 30 -15 44 0 C30 15 10 15 0 0Z" fill="url(#gLeaf)" stroke="#3b6130" stroke-width="2"/></g>' +
    '<path d="M100 4 Q101 13 110 14 Q101 15 100 24 Q99 15 90 14 Q99 13 100 4Z" fill="url(#gGold)" stroke="#9c7424" stroke-width=".6"/>' +
    '<circle cx="82" cy="14" r="1.8" fill="#c8a04a"/><circle cx="118" cy="14" r="1.8" fill="#c8a04a"/></symbol>';
  var HAND = '<symbol id="hand" viewBox="0 0 40 48"><path d="M17 4C13.5 4 12 7 12 9.5V27L8 23.5C5.5 21.5 2.5 23.5 4.5 26.5L13 41C15 44.5 18.5 46 22 46H28C34 46 38 41.5 38 35.5V23C38 20 34.5 20 34.5 23V21C34.5 18 30.5 18 30.5 21V19C30.5 16 26.5 16 26.5 19V9.5C26.5 6.5 22 5.5 22 9.5C22 6 19.5 4 17 4Z" fill="#fff" stroke="#3d1f66" stroke-width="2" stroke-linejoin="round"/></symbol>';

  /* ---------- Lotos ---------- */
  var LOTUS = (function () {
    var s = '<symbol id="lotus" viewBox="-60 -50 120 100"><circle r="42" cy="-6" fill="#f3e6ff" opacity=".18"/>';
    var petal = 'M0 0C-14 -14 -12 -34 0 -48C12 -34 14 -14 0 0Z';
    [-72, -48, 48, 72].forEach(function (a) { s += '<path d="' + petal + '" transform="translate(0 38) rotate(' + a + ') scale(.95)" fill="url(#gLotus)" stroke="#7d4fb4" stroke-opacity=".5" stroke-width=".8"/>'; });
    [-30, 30].forEach(function (a) { s += '<path d="' + petal + '" transform="translate(0 38) rotate(' + a + ') scale(1.02)" fill="url(#gLotus)" stroke="#7d4fb4" stroke-opacity=".5" stroke-width=".8"/>'; });
    s += '<path d="' + petal + '" transform="translate(0 38) scale(1.1)" fill="url(#gLotus)" stroke="#7d4fb4" stroke-opacity=".5" stroke-width=".8"/>';
    s += '<ellipse cx="0" cy="22" rx="5" ry="3" fill="#ffe9a0" opacity=".9"/></symbol>';
    return s;
  })();

  /* ---------- Iconos dorados (64x64) ---------- */
  var ST = ' stroke="#8a6a22" stroke-width="1.5" stroke-linejoin="round"';
  var ICONS =
    '<symbol id="i-gift" viewBox="0 0 64 64"><rect x="9" y="28" width="46" height="28" rx="2" fill="url(#gGoldV)"' + ST + '/><rect x="5" y="19" width="54" height="11" rx="2" fill="url(#gGoldV)"' + ST + '/><rect x="28" y="19" width="8" height="37" fill="#f8e293"' + ST + '/><path d="M32 19C24 8 14 12 18 18 22 22 30 19 32 19ZM32 19C40 8 50 12 46 18 42 22 34 19 32 19Z" fill="url(#gGoldV)"' + ST + '/></symbol>' +
    '<symbol id="i-money" viewBox="0 0 64 64"><rect x="6" y="14" width="52" height="36" rx="3" fill="none" stroke="#c39a38" stroke-width="3"/><path d="M6 16L32 36 58 16" fill="none" stroke="#c39a38" stroke-width="3" stroke-linejoin="round"/><circle cx="32" cy="38" r="9" fill="#f8f1e1" stroke="#c39a38" stroke-width="2.4"/><path d="M32 31v14M36 34.5c-1-1.6-8-2-8 1.2 0 3.4 8 1.6 8 5.2 0 3-7 3-8 .6" fill="none" stroke="#b58a2c" stroke-width="2" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-suit" viewBox="0 0 64 64"><path d="M22 5L32 20 42 5 57 13 53 59H38L32 32 26 59H11L7 13Z" fill="url(#gGoldV)"' + ST + '/><path d="M32 20L26 34M32 20L38 34" stroke="#8a6a22" stroke-width="1.4" fill="none"/></symbol>' +
    '<symbol id="i-dress" viewBox="0 0 64 64"><path d="M25 5H39L41 24 35 29 52 59H12L29 29 23 24Z" fill="url(#gGoldV)"' + ST + '/><path d="M26 28H38" stroke="#8a6a22" stroke-width="2"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 64 64"><path d="M32 3C20 3 12 12 12 23 12 38 32 61 32 61S52 38 52 23C52 12 44 3 32 3Z" fill="url(#gGoldV)"' + ST + '/><circle cx="32" cy="23" r="8" fill="#f8f1e1"' + ST + '/></symbol>' +
    '<symbol id="i-cal" viewBox="0 0 64 64"><rect x="8" y="12" width="48" height="46" rx="4" fill="none" stroke="#c39a38" stroke-width="3.2"/><path d="M8 26H56" stroke="#c39a38" stroke-width="3.2"/><path d="M20 6V18M44 6V18" stroke="#c39a38" stroke-width="3.6" stroke-linecap="round"/><path d="M18 36h6M29 36h6M40 36h6M18 46h6M29 46h6" stroke="#c39a38" stroke-width="3.2" stroke-linecap="round"/></symbol>' +
    '<symbol id="i-clock" viewBox="0 0 64 64"><circle cx="32" cy="34" r="22" fill="none" stroke="#c39a38" stroke-width="3.2"/><path d="M32 20V34L42 40" fill="none" stroke="#c39a38" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 18L16 8M56 18L48 8" stroke="#c39a38" stroke-width="3.6" stroke-linecap="round"/></symbol>';

  /* ---------- Castillo morado (icono) ---------- */
  var CASTLE = '<symbol id="castle" viewBox="0 0 120 110"><g fill="url(#gCastle)" stroke="#5a3485" stroke-width="1.2" stroke-linejoin="round">' +
    '<rect x="48" y="40" width="24" height="62"/><polygon points="44,40 60,8 76,40"/>' +
    '<rect x="20" y="56" width="18" height="46"/><polygon points="16,56 29,28 42,56"/>' +
    '<rect x="82" y="56" width="18" height="46"/><polygon points="78,56 91,28 104,56"/>' +
    '<rect x="4" y="72" width="14" height="30"/><polygon points="2,72 11,52 20,72"/>' +
    '<rect x="102" y="72" width="14" height="30"/><polygon points="100,72 109,52 118,72"/>' +
    '<rect x="2" y="92" width="116" height="14"/></g>' +
    '<path d="M52 104V86Q60 72 68 86V104Z" fill="#f4ead2"/><g fill="#f4ead2"><rect x="57" y="50" width="6" height="12" rx="3"/><rect x="26" y="68" width="6" height="10" rx="3"/><rect x="88" y="68" width="6" height="10" rx="3"/></g>' +
    '<g stroke="#c8a04a" stroke-width="1.4"><path d="M60 8V-2M29 28V20M91 28V20"/></g><g fill="#c8a04a"><path d="M60 -2l9 3-9 3z"/><path d="M29 20l8 3-8 3z"/><path d="M91 20l8 3-8 3z"/></g></symbol>';

  /* ---------- Princesas (estilo plano, diseño propio) ---------- */
  function folds(list, stroke) {
    return list.map(function (d) { return '<path d="' + d + '" fill="none" stroke="' + stroke + '" stroke-width="1.4" stroke-linecap="round"/>'; }).join('');
  }
  var PRINCESS_F = '<symbol id="princessF" viewBox="0 0 200 380">' +
    '<path d="M60 56C38 84 36 154 50 216 58 232 70 226 72 206L128 206C130 226 142 232 150 216 164 154 162 84 140 56Z" fill="url(#gHair)"/>' +
    '<path d="M70 192C60 252 22 322 6 372L194 372C178 322 140 252 130 192Z" fill="url(#gGown)"/>' +
    folds(['M100 202C96 262 82 332 62 372', 'M84 206C74 262 52 332 30 372', 'M116 206C124 262 142 332 166 372', 'M130 210C146 262 172 332 186 372'], 'rgba(255,255,255,.22)') +
    '<path d="M6 372H194" stroke="url(#gGold)" stroke-width="5"/>' +
    '<path d="M72 118C70 150 72 176 76 196H124C128 176 130 150 128 118Z" fill="url(#gGown)"/>' +
    '<rect x="74" y="186" width="52" height="9" rx="2" fill="url(#gGold)" stroke="#8a6a22" stroke-width="1"/>' +
    '<rect x="90" y="94" width="20" height="20" fill="url(#gSkin)"/>' +
    '<path d="M72 120C82 106 118 106 128 120C118 130 82 130 72 120Z" fill="url(#gSkin)"/>' +
    '<path d="M76 120C86 112 114 112 124 120" fill="none" stroke="url(#gGold)" stroke-width="3"/>' +
    '<ellipse cx="62" cy="132" rx="17" ry="19" fill="url(#gSleeve)" stroke="#8d5cc0" stroke-width="1"/><ellipse cx="138" cy="132" rx="17" ry="19" fill="url(#gSleeve)" stroke="#8d5cc0" stroke-width="1"/>' +
    '<path d="M54 142C44 168 62 190 90 196M146 142C156 168 138 190 110 196" fill="none" stroke="#b996e0" stroke-width="13" stroke-linecap="round"/>' +
    '<ellipse cx="100" cy="196" rx="11" ry="7" fill="url(#gSkin)"/>' +
    '<ellipse cx="100" cy="70" rx="25" ry="29" fill="url(#gSkin)"/>' +
    '<path d="M74 68C72 34 128 34 126 68 118 54 106 50 100 46 92 52 80 56 74 68Z" fill="url(#gHair)"/>' +
    '<path d="M82 46L90 36 100 43 110 36 118 46" fill="none" stroke="url(#gGold)" stroke-width="3.4" stroke-linejoin="round"/><circle cx="100" cy="40" r="3" fill="url(#gGem)" stroke="#6b4a14" stroke-width=".8"/>' +
    '<ellipse cx="91" cy="72" rx="2.6" ry="3" fill="#3a2250"/><ellipse cx="109" cy="72" rx="2.6" ry="3" fill="#3a2250"/>' +
    '<path d="M86 65Q91 62 96 65M104 65Q109 62 114 65" fill="none" stroke="#7a4a22" stroke-width="1.4" stroke-linecap="round"/>' +
    '<path d="M94 85Q100 90 106 85" fill="none" stroke="#c0506a" stroke-width="2" stroke-linecap="round"/>' +
    '<circle cx="84" cy="80" r="4.5" fill="#f19a9a" opacity=".35"/><circle cx="116" cy="80" r="4.5" fill="#f19a9a" opacity=".35"/>' +
    '</symbol>';
  var PRINCESS_B = '<symbol id="princessB" viewBox="-40 0 280 380">' +
    '<path d="M72 190C50 252 -12 322 -34 372L234 372C212 322 150 252 128 190Z" fill="url(#gGown)"/>' +
    folds(['M100 196C98 262 84 332 56 372', 'M86 200C70 262 36 332 0 372', 'M114 200C128 262 164 332 200 372', 'M72 200C50 262 10 322 -20 372'], 'rgba(255,255,255,.22)') +
    '<path d="M-34 372H234" stroke="url(#gGold)" stroke-width="5"/>' +
    '<path d="M72 118C68 150 70 176 76 196H124C130 176 132 150 128 118Z" fill="url(#gGown)"/>' +
    '<path d="M100 120V192M88 130L112 150M112 130L88 150M88 154L112 174M112 154L88 174" stroke="#e9d8fa" stroke-opacity=".55" stroke-width="1.2" fill="none"/>' +
    '<rect x="74" y="186" width="52" height="9" rx="2" fill="url(#gGold)" stroke="#8a6a22" stroke-width="1"/>' +
    '<path d="M70 44C58 74 60 172 80 216 92 228 108 228 120 216 140 172 142 74 130 44 120 20 80 20 70 44Z" fill="url(#gHair)"/>' +
    '<path d="M86 64C92 130 90 190 86 214M114 64C108 130 110 190 114 214M100 60V220" stroke="#8a5628" stroke-opacity=".5" stroke-width="1.2" fill="none"/>' +
    '<ellipse cx="62" cy="130" rx="17" ry="19" fill="url(#gSleeve)" stroke="#8d5cc0" stroke-width="1"/><ellipse cx="138" cy="130" rx="17" ry="19" fill="url(#gSleeve)" stroke="#8d5cc0" stroke-width="1"/>' +
    '<path d="M56 140C30 164 20 202 28 242M144 140C170 164 180 202 172 242" fill="none" stroke="#b996e0" stroke-width="13" stroke-linecap="round"/>' +
    '<circle cx="28" cy="246" r="7" fill="url(#gSkin)"/><circle cx="172" cy="246" r="7" fill="url(#gSkin)"/>' +
    '<path d="M82 40L90 30 100 37 110 30 118 40" fill="none" stroke="url(#gGold)" stroke-width="3.4" stroke-linejoin="round"/>' +
    '</symbol>';

  /* ---------- Sprite ---------- */
  function sprite() {
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false">' +
      DEFS + '<defs>' + roseG() + LEAF + '</defs>' +
      corner() + CROWN + LANTERN + BUTTERFLY + SPARKLE + SUNSTAR + SEAL + HEART + FLOURISH + HAND + LOTUS + ICONS + CASTLE + PRINCESS_F + PRINCESS_B + '</svg>';
    var d = document.createElement('div');
    d.innerHTML = s;
    document.body.insertBefore(d.firstChild, document.body.firstChild);
  }

  /* ---------- Escenas ---------- */
  function castleSil(x, y, s, fill, lit) {
    var g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="' + fill + '">';
    [[-40, 0, 16, 60], [-20, -20, 18, 80], [0, -50, 22, 110], [22, -25, 18, 85], [42, 0, 16, 60]].forEach(function (t) {
      g += '<rect x="' + t[0] + '" y="' + t[1] + '" width="' + t[2] + '" height="' + t[3] + '"/><polygon points="' + (t[0] - 3) + ',' + t[1] + ' ' + (t[0] + t[2] / 2) + ',' + (t[1] - t[2] * 1.6) + ' ' + (t[0] + t[2] + 3) + ',' + t[1] + '"/>';
    });
    g += '<rect x="-46" y="42" width="110" height="30"/>';
    if (lit) {
      g += '<g fill="#ffe08a">';
      [[4, -30], [-14, -4], [26, -6], [-34, 24], [46, 24], [6, 10]].forEach(function (w) { g += '<rect x="' + w[0] + '" y="' + w[1] + '" width="4" height="7" rx="2"/>'; });
      g += '</g>';
    }
    return g + '</g>';
  }
  function stars(n, w, h, seedOff) {
    var s = '';
    for (var i = 0; i < n; i++) {
      s += '<circle class="tw" style="animation-delay:' + f(rnd() * 4) + 's" cx="' + f(rnd() * w) + '" cy="' + f(rnd() * h) + '" r="' + f(.5 + rnd() * 1.1) + '" fill="#fff" opacity="' + f(.35 + rnd() * .6) + '"/>';
    }
    return s;
  }
  function svgOpen(vb) { return '<svg class="scene-svg" viewBox="' + vb + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">'; }

  function dusk() {
    return svgOpen('0 0 400 800') +
      '<defs><linearGradient id="dSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a58a8"/><stop offset=".3" stop-color="#bf97c6"/><stop offset=".52" stop-color="#f5c7a2"/><stop offset=".66" stop-color="#ffe3a8"/></linearGradient>' +
      '<radialGradient id="dSun"><stop offset="0" stop-color="#fff6c8" stop-opacity=".95"/><stop offset=".4" stop-color="#ffe19a" stop-opacity=".45"/><stop offset="1" stop-color="#ffe19a" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="dHill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9bb865"/><stop offset="1" stop-color="#3f6a36"/></linearGradient>' +
      '<linearGradient id="dPath" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c4"/><stop offset="1" stop-color="#e7c67e"/></linearGradient>' +
      '<filter id="dBlur"><feGaussianBlur stdDeviation="2.4"/></filter></defs>' +
      '<rect width="400" height="800" fill="url(#dSky)"/><circle cx="200" cy="150" r="200" fill="url(#dSun)"/>' + stars(26, 400, 150) + '<g transform="translate(0 -190)">' +
      '<path d="M0 330L58 282 112 322 172 262 232 322 292 276 342 316 400 286V470H0Z" fill="#a98ccb" opacity=".55"/>' +
      '<path d="M0 372L70 326 130 366 210 318 290 368 350 334 400 360V500H0Z" fill="#8268b4" opacity=".6"/>' +
      '<path d="M92 372Q200 282 308 372V430H92Z" fill="#6d9150"/>' + castleSil(200, 322, .85, '#6a5aa0', true) +
      '<path d="M0 420Q100 366 200 410T400 396V1100H0Z" fill="url(#dHill)"/>' +
      '<path d="M196 352C150 410 252 440 186 494 120 548 252 580 172 640 132 684 80 800 10 1000L330 1000C270 730 250 690 256 650 264 600 192 576 238 514 284 452 192 420 216 352Z" fill="url(#dPath)" opacity=".95"/>' +
      '<g fill="#4c7a3d"><ellipse cx="30" cy="500" rx="40" ry="62"/><ellipse cx="372" cy="520" rx="44" ry="70"/><ellipse cx="62" cy="586" rx="34" ry="46"/><ellipse cx="350" cy="610" rx="30" ry="42"/></g>' +
      '<g fill="#2f5a2c" opacity=".9"><ellipse cx="-10" cy="760" rx="90" ry="150"/><ellipse cx="410" cy="780" rx="96" ry="150"/></g>' +
      '<use href="#princessB" x="64" y="452" width="274" height="372"/>' +
      '<path class="swirl" d="M52 650C130 600 270 708 352 640" stroke="#fff0b0" stroke-width="3.2" fill="none" stroke-linecap="round" filter="url(#dBlur)"/>' +
      '<path class="swirl s2" d="M60 676C150 636 262 726 346 668" stroke="#ffe08a" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '</g></svg>';
  }

  function night() {
    var refl = '';
    for (var i = 0; i < 12; i++) { refl += '<rect x="' + f(120 + rnd() * 160) + '" y="' + f(340 + rnd() * 120) + '" width="' + f(14 + rnd() * 50) + '" height="2" fill="#ffd486" opacity="' + f(.15 + rnd() * .3) + '"/>'; }
    return svgOpen('0 0 400 520') +
      '<defs><linearGradient id="nSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#180d34"/><stop offset=".55" stop-color="#46286f"/><stop offset=".8" stop-color="#b0558a"/></linearGradient>' +
      '<linearGradient id="nWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2a73"/><stop offset="1" stop-color="#150b2b"/></linearGradient>' +
      '<radialGradient id="nMoon"><stop offset="0" stop-color="#fff7d6"/><stop offset=".3" stop-color="#ffe9a8" stop-opacity=".5"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="nLamp"><stop offset="0" stop-color="#ffd27a"/><stop offset="1" stop-color="#ff9a3a" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="400" height="520" fill="url(#nSky)"/>' + stars(60, 400, 280) +
      '<circle cx="86" cy="86" r="70" fill="url(#nMoon)"/><circle cx="86" cy="86" r="22" fill="#fff4cc"/>' +
      '<path d="M0 300L60 262 120 296 190 250 260 298 330 258 400 292V360H0Z" fill="#2b1750"/>' +
      '<path d="M230 360V296Q290 250 400 270V360Z" fill="#20113d"/>' + castleSil(330, 270, .7, '#1c0f33', true) +
      '<rect y="338" width="400" height="182" fill="url(#nWater)"/>' + refl +
      '<ellipse cx="330" cy="372" rx="70" ry="10" fill="#ffd486" opacity=".18"/>' +
      '<circle cx="176" cy="404" r="60" fill="url(#nLamp)" opacity=".9"/>' +
      '<use href="#princessB" x="137" y="334" width="78" height="106" opacity=".95"/>' +
      '<path d="M96 414Q176 452 262 414L250 402H108Z" fill="#1a0d2c"/><path d="M96 414Q176 452 262 414" fill="none" stroke="#c8a04a" stroke-width="1.6" opacity=".8"/>' +
      '<g fill="#ffc86a"><circle cx="124" cy="398" r="4"/><circle cx="232" cy="396" r="4"/><circle cx="256" cy="472" r="3"/><circle cx="82" cy="462" r="3"/></g>' +
      '</svg>';
  }

  function dawn() {
    var bal = '';
    for (var i = 0; i < 11; i++) {
      var x = 8 + i * 38;
      bal += '<path d="M' + x + ' 452h16l-2 10c6 6 6 14 0 20-2 4-2 10 0 14h-12c2-4 2-10 0-14-6-6-6-14 0-20z" fill="#7d55a8" stroke="#e7d2ff" stroke-opacity=".35" stroke-width="1"/>';
    }
    return svgOpen('0 0 400 540') +
      '<defs><linearGradient id="wSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2c82"/><stop offset=".35" stop-color="#9a4fa8"/><stop offset=".6" stop-color="#f08f9c"/><stop offset=".74" stop-color="#ffd08a"/></linearGradient>' +
      '<radialGradient id="wSun"><stop offset="0" stop-color="#fff8d6"/><stop offset=".35" stop-color="#ffe6a0" stop-opacity=".6"/><stop offset="1" stop-color="#ffd08a" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="wVal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b8a86"/><stop offset="1" stop-color="#1d4f5e"/></linearGradient>' +
      '<linearGradient id="wRail" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a77bd2"/><stop offset="1" stop-color="#5b3590"/></linearGradient></defs>' +
      '<rect width="400" height="540" fill="url(#wSky)"/>' + stars(40, 400, 190) +
      '<circle cx="200" cy="300" r="190" fill="url(#wSun)"/><circle cx="200" cy="296" r="30" fill="#fff6d2"/>' +
      '<path d="M0 310L50 270 110 304 170 252 230 300 290 262 350 302 400 280V420H0Z" fill="#7a58a8" opacity=".75"/>' +
      '<path d="M0 350L80 316 150 350 230 306 310 346 400 318V440H0Z" fill="#5a3c8e" opacity=".8"/>' + castleSil(200, 318, .8, '#6f55a6', true) +
      '<path d="M0 372Q100 338 200 372T400 360V470H0Z" fill="url(#wVal)"/>' +
      '<path d="M120 420Q200 366 280 420" fill="none" stroke="#9ff0d8" stroke-opacity=".5" stroke-width="3"/>' +
      '<rect y="360" width="400" height="60" fill="#fff" opacity=".07"/>' +
      '<use href="#princessB" x="77" y="236" width="246" height="334"/>' +
      '<rect y="440" width="400" height="100" fill="#4a2a78"/><rect y="436" width="400" height="16" rx="4" fill="url(#wRail)"/>' + bal +
      '<rect y="500" width="400" height="40" fill="#3a1d63"/>' +
      '<g transform="translate(34 500) scale(1)"><use href="#roseg"/></g><g transform="translate(366 506) scale(1.05)"><use href="#roseg"/></g><g transform="translate(88 520) scale(.7)"><use href="#roseg"/></g><g transform="translate(320 524) scale(.7)"><use href="#roseg"/></g>' +
      '<g transform="translate(6 470) rotate(-30)"><use href="#leafg"/></g><g transform="translate(394 470) rotate(210)"><use href="#leafg"/></g>' +
      '</svg>';
  }

  function dome() {
    var pts = [], pts2 = [];
    for (var t = 0; t <= 1.0001; t += 0.015) {
      var y = 690 - 330 * t, amp = 70 * (1 - t * .45);
      pts.push(f(200 + amp * Math.sin(t * Math.PI * 6)) + ' ' + f(y));
      pts2.push(f(200 + amp * Math.sin(t * Math.PI * 6 + Math.PI)) + ' ' + f(y));
    }
    var helix = 'M' + pts.join(' L'), helix2 = 'M' + pts2.join(' L');
    var bokeh = '';
    for (var i = 0; i < 18; i++) { bokeh += '<circle cx="' + f(rnd() * 400) + '" cy="' + f(rnd() * 800) + '" r="' + f(4 + rnd() * 16) + '" fill="#ffd486" opacity="' + f(.04 + rnd() * .1) + '"/>'; }
    return svgOpen('0 0 400 800') +
      '<defs><radialGradient id="mBg" cx=".5" cy=".55" r=".75"><stop offset="0" stop-color="#3a2a40"/><stop offset=".6" stop-color="#1a1226"/><stop offset="1" stop-color="#0d0818"/></radialGradient>' +
      '<radialGradient id="mGlow"><stop offset="0" stop-color="#e9d2ff" stop-opacity=".9"/><stop offset=".4" stop-color="#b58ae6" stop-opacity=".35"/><stop offset="1" stop-color="#b58ae6" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="mWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b4630"/><stop offset="1" stop-color="#2c1a14"/></linearGradient>' +
      '<linearGradient id="mGlass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".25" stop-color="#fff" stop-opacity=".03"/><stop offset=".8" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity=".2"/></linearGradient>' +
      '<filter id="mBlur"><feGaussianBlur stdDeviation="3"/></filter></defs>' +
      '<rect width="400" height="800" fill="url(#mBg)"/>' + bokeh +
      '<rect y="700" width="400" height="100" fill="url(#mWood)"/>' +
      '<circle class="glow" cx="200" cy="372" r="130" fill="url(#mGlow)"/>' +
      '<path d="M110 704V330C110 188 290 188 290 330V704Z" fill="url(#mGlass)" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>' +
      '<path d="M128 330C128 214 180 198 200 198" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/><path d="M262 360V610" stroke="#fff" stroke-opacity=".18" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M130 704Q200 650 270 704Z" fill="#3f5c33"/><path d="M150 700Q170 670 190 690M210 690Q232 668 252 698" stroke="#87b25f" stroke-width="2" fill="none"/>' +
      '<path d="M200 690C206 600 192 520 200 416" fill="none" stroke="#5f8a4c" stroke-width="6" stroke-linecap="round"/>' +
      '<g transform="translate(200 640) rotate(-48) scale(1.5)"><use href="#leafg"/></g><g transform="translate(200 600) rotate(-140) scale(1.3)"><use href="#leafg"/></g><g transform="translate(200 560) rotate(-34) scale(1)"><use href="#leafg"/></g>' +
      '<use href="#lotus" x="108" y="290" width="184" height="153"/>' +
      '<path class="helix h2" d="' + helix2 + '" fill="none" stroke="#c9a6ff" stroke-width="3" stroke-linecap="round" opacity=".55"/>' +
      '<path class="helix glowh" d="' + helix + '" fill="none" stroke="#b58aff" stroke-width="9" stroke-linecap="round" filter="url(#mBlur)"/>' +
      '<path class="helix" d="' + helix + '" fill="none" stroke="#f3e6ff" stroke-width="3" stroke-linecap="round"/>' +
      '<ellipse cx="200" cy="706" rx="104" ry="16" fill="url(#mWood)" stroke="#a37a52" stroke-width="2"/><ellipse cx="200" cy="700" rx="100" ry="13" fill="none" stroke="#fff" stroke-opacity=".25"/>' +
      '</svg>';
  }

  function scene(name) {
    seed = 11 + name.length * 3;
    return ({ dusk: dusk, night: night, dawn: dawn, dome: dome }[name] || function () { return ''; })();
  }

  /* ---------- Bordes de papel rasgado ---------- */
  function torn(side, sd) {
    seed = 31 + (sd || 0) * 7;
    var top = [], bottom = [], i, x;
    for (i = 0; i <= 40; i++) {
      x = (i * 2.5).toFixed(1) + '%';
      top.push(x + ' ' + f(3 + rnd() * 13) + 'px');
      bottom.push((100 - i * 2.5).toFixed(1) + '% calc(100% - ' + f(3 + rnd() * 13) + 'px)');
    }
    var t = side.indexOf('t') > -1, b = side.indexOf('b') > -1;
    var topPts = t ? top.join(',') : '0% 0%,100% 0%';
    var botPts = b ? bottom.join(',') : '100% 100%,0% 100%';
    return 'polygon(' + topPts + ',' + botPts + ')';
  }

  window.Art = { scene: scene, torn: torn, sprite: sprite };
  if (document.body) sprite(); else document.addEventListener('DOMContentLoaded', sprite);
})();
