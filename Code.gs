// ═══════════════════════════════════════════════════
//  BuhStart — Google Apps Script
//  Вставить в: Google Sheets → Расширения → Apps Script
// ═══════════════════════════════════════════════════

// ─── НАСТРОЙКИ (заменить на свои) ───────────────────
const SHEET_ID   = 'СЮДА_ID_ТАБЛИЦЫ';   // из URL таблицы
const FOLDER_ID  = 'СЮДА_ID_ПАПКИ';     // из URL папки на Drive
// ────────────────────────────────────────────────────

function doGet() {
  return ContentService.createTextOutput('BuhStart API OK');
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const result = saveApplication(data);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, folder: result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    console.error(err);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveApplication(data) {
  // 1. Таблица ──────────────────────────────────────
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  let sheet   = ss.getSheetByName('Заявки');
  if (!sheet) {
    sheet = ss.insertSheet('Заявки');
    const headers = [
      'Дата', 'Клиент', 'Форма', 'Налог', 'Услуги',
      'Итог ₽', 'Скидка %', '№ КП', '№ Счёта', '№ Договора',
      'Папка', 'Статус'
    ];
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length)
         .setFontWeight('bold')
         .setBackground('#E35611')
         .setFontColor('#ffffff');
    sheet.setColumnWidths(1, headers.length, 140);
  }

  // 2. Папка клиента на Drive ────────────────────────
  const root         = DriveApp.getFolderById(FOLDER_ID);
  const folderName   = data.date + '_' + sanitize(data.clientName);
  const clientFolder = root.createFolder(folderName);

  // 3. Загрузка файлов ──────────────────────────────
  if (data.kpBase64)       uploadDocx(clientFolder, data.kpBase64,       data.kpName);
  if (data.invoiceBase64)  uploadDocx(clientFolder, data.invoiceBase64,  data.invoiceName);
  if (data.contractBase64) uploadDocx(clientFolder, data.contractBase64, data.contractName);

  // 4. Строка в таблицу ─────────────────────────────
  sheet.appendRow([
    data.date,
    data.clientName,
    data.entity,
    data.tax        || '',
    data.services   || '',
    data.total      || 0,
    data.discount   || 0,
    data.kpNum      || '',
    data.invoiceNum || '',
    data.contractNum || '',
    clientFolder.getUrl(),
    'Оформлена',
  ]);

  // Подсветить строку если нет счёта или договора
  if (!data.invoiceNum && !data.contractNum) {
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 12).setBackground('#FFF3E0');
  }

  return clientFolder.getUrl();
}

function uploadDocx(folder, base64, name) {
  const bytes = Utilities.base64Decode(base64);
  const blob  = Utilities.newBlob(
    bytes,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    name
  );
  folder.createFile(blob);
}

function sanitize(str) {
  return String(str || '').replace(/[\\/:*?"<>|]/g, '').slice(0, 50);
}
