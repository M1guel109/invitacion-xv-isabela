function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var nombre = String(d.nombre || '').trim().slice(0, 80);
    var asistentes = Math.max(1, Math.min(50, parseInt(d.asistentes, 10) || 1));
    if (nombre.length < 2) return salida({ ok: false, error: 'nombre' });
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName('Confirmaciones') || ss.insertSheet('Confirmaciones');
    if (sh.getLastRow() === 0) sh.appendRow(['Fecha', 'Nombre', 'Asistentes']);
    sh.appendRow([new Date(), nombre, asistentes]);
    return salida({ ok: true });
  } catch (err) {
    return salida({ ok: false, error: String(err) });
  }
}

function salida(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
