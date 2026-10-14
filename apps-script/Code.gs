// Dónde empieza la tabla: fila 3, columna B (deja aire arriba y a la izquierda).
var FILA0 = 3;
var COL0 = 2;

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var nombre = String(d.nombre || '').trim().slice(0, 80);
    var asistentes = Math.max(1, Math.min(50, parseInt(d.asistentes, 10) || 1));
    if (nombre.length < 2) return salida({ ok: false, error: 'nombre' });

    var sh = obtenerHoja();
    var fila = sh.getLastRow() + 1;
    sh.getRange(fila, COL0, 1, 3).setValues([[new Date(), nombre, asistentes]]);
    colorearFila(sh, fila);

    return salida({ ok: true });
  } catch (err) {
    return salida({ ok: false, error: String(err) });
  }
}

function obtenerHoja() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Confirmaciones');
  if (!sh) {
    sh = ss.insertSheet('Confirmaciones');
  }
  if (sh.getLastRow() < FILA0) {
    crearEncabezado(sh);
  }
  return sh;
}

function crearEncabezado(sh) {
  sh.getRange(FILA0, COL0, 1, 3).setValues([['Fecha', 'Nombre', 'Asistentes']]);

  var header = sh.getRange(FILA0, COL0, 1, 3);
  header.setBackground('#6b3fa0');
  header.setFontColor('#ffffff');
  header.setFontWeight('bold');
  header.setFontSize(11);
  header.setHorizontalAlignment('center');
  header.setVerticalAlignment('middle');
  sh.setRowHeight(FILA0, 30);
  sh.setFrozenRows(FILA0);

  sh.setColumnWidth(COL0, 170);
  sh.setColumnWidth(COL0 + 1, 220);
  sh.setColumnWidth(COL0 + 2, 100);
}

function colorearFila(sh, fila) {
  var rango = sh.getRange(fila, COL0, 1, 3);
  rango.setBackground((fila - FILA0) % 2 === 0 ? '#f3e9fb' : '#ffffff');
  sh.getRange(fila, COL0).setNumberFormat('dd/mm/yyyy hh:mm');
}

// Ejecuta esta función UNA VEZ manualmente (▶ Ejecutar, eligiendo
// "formatearHojaExistente") si ya tienes filas con datos (en la posición
// nueva, fila 3 / columna B) y quieres repasarles el formato.
function formatearHojaExistente() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Confirmaciones');
  if (!sh || sh.getLastRow() < FILA0) { return; }

  crearEncabezado(sh);
  for (var fila = FILA0 + 1; fila <= sh.getLastRow(); fila++) {
    colorearFila(sh, fila);
  }
}

function salida(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
