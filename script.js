/* ═══════════════════════════════════════════════════
   КАЛЬКУЛЯТОР БУХГАЛТЕРСКИХ УСЛУГ
   Прайс: лист «Единый»
═══════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════
   ЮРЛИЦА ИСПОЛНИТЕЛЯ
═══════════════════════════════════════════════════ */
const EXECUTORS = [
  {
    name:     'ООО «ОПТИМА»',
    inn:      '2902092123',
    kpp:      '290201001',
    ogrn:     '1242900007173',
    address:  'Архангельская область, г. Северодвинск, Первомайская ул., д. 16',
    phone:    '+7 (495) 507-09-79',
    email:    'info@buhstart.ru',
    bank:     'ООО «Банк Точка»',
    rs:       '40702810720000170264',
    bik:      '044525104',
    ks:       '30101810745374525104',
    director:    'Горелкина Галина Викторовна',
    directorGen: 'Горелкиной Галины Викторовны',
    dirShort:    'Горелкина Г.В.',
  },
  {
    name:     'ООО «Бета Финанс»',
    inn:      '7702345678',
    kpp:      '770201001',
    ogrn:     '1187746234567',
    address:  '115035, г. Москва, ул. Пятницкая, д. 12, офис 5',
    phone:    '+7 (495) 222-33-44',
    email:    'office@beta-finance.ru',
    bank:     'АО «Альфа-Банк»',
    rs:       '40702810623000023456',
    bik:      '044525593',
    ks:       '30101810200000000593',
    director: 'Морозов Дмитрий Александрович',
    dirShort: 'Морозов Д.А.',
  },
  {
    name:     'ИП Смирнова Елена Владимировна',
    inn:      '770312345678',
    kpp:      '',
    ogrn:     '319774600034567',
    address:  '119019, г. Москва, ул. Арбат, д. 24, кв. 15',
    phone:    '+7 (916) 333-44-55',
    email:    'smirnova.buh@gmail.com',
    bank:     'АО «Тинькофф Банк»',
    rs:       '40802810500000034567',
    bik:      '044525974',
    ks:       '30101810145250000974',
    director: 'Смирнова Елена Владимировна',
    dirShort: 'Смирнова Е.В.',
  },
  {
    name:     'ООО «Гамма Консалт»',
    inn:      '7704567890',
    kpp:      '770401001',
    ogrn:     '1157746345678',
    address:  '107078, г. Москва, ул. Маши Порываевой, д. 34, офис 412',
    phone:    '+7 (495) 444-55-66',
    email:    'mail@gamma-consult.ru',
    bank:     'Банк ВТБ (ПАО)',
    rs:       '40702810943000045678',
    bik:      '044525187',
    ks:       '30101810700000000187',
    director: 'Новиков Павел Игоревич',
    dirShort: 'Новиков П.И.',
  },
  {
    name:     'ООО «Дельта Бухгалтерия»',
    inn:      '7705678901',
    kpp:      '770501001',
    ogrn:     '1137746456789',
    address:  '129090, г. Москва, Олимпийский просп., д. 16, стр. 1',
    phone:    '+7 (495) 555-66-77',
    email:    'delta@delta-buh.ru',
    bank:     'АО «Газпромбанк»',
    rs:       '40702810861000056789',
    bik:      '044525823',
    ks:       '30101810200000000823',
    director: 'Волкова Марина Петровна',
    dirShort: 'Волкова М.П.',
  },
];

// ─── URL Google Apps Script (заменить после деплоя) ──
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1Vzwi4U1e46Egq9B6vqBNvkMvthiFvQZCppmMnePx5CAjtn3dwRSPYvyHDcNXWX_m/exec';

// Текущее юрлицо — по умолчанию первое
let EX = Object.assign({}, EXECUTORS[0]);

function pickExec(idx) {
  EX = Object.assign({}, EXECUTORS[idx]);
}

let modalTarget = ''; // 'contract' | 'invoice'
/* ─── Состояние квиза ─────────────────────────────── */
const STEPS = 12;
let step = 1;
let back = false;

const A = {
  entity:'', isNull:false, tax:'', niches:[],
  mp:[], mpInventory:false,
  vats:[],
  staffRf:'none', rfCount:4,
  staffForeign:'none', foreignCount:1,
  cashKassa:false, cashAvans:false,
  ved:false, reconcile:false, taxMgmt:false,
  military:false, militaryCount:1,
  licenses:false, mgmtAcc:false, officeBuh:false,
  inventory:false, addPatent:false,
  spot:false, spotCount:1,
  discount:0, kpValidDays:5,
  name:'', director:'',
  req:{ inn:'', kpp:'', address:'', phone:'', email:'', rs:'', bank:'', bik:'', ks:'', ogrn:'', director:'' }
};


/* ─── Утилиты ─────────────────────────────────── */
const fmt = n => new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽';
const today = () => new Date().toLocaleDateString('ru-RU',{day:'2-digit',month:'2-digit',year:'numeric'});
const todayLong = () => new Date().toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'});
const todayFile = () => { const d=new Date(); return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`; };
const todayShort = () => new Date().toLocaleDateString('ru-RU',{day:'2-digit',month:'2-digit',year:'numeric'});
const todayStr = todayLong;
const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const safeF = s => String(s||'').replace(/[\\/:*?"<>|«»]/g,'').replace(/\s+/g,'_').slice(0,40);

/* ─── Прайс (лист «Единый») ───────────────────────── */
const P = {
  null_ip:  2000,
  null_ooo: 3000,
  entity_ooo: 10000,
  tax:   { patent:1000, ausn_d:3000, ausn_dr:3000, usn6:5000, usn15:20000, osno:30000 },
  vat:   { не_облагается:0, освобождение:5000, nds0:0, nds5:5000, nds7:5000, nds10:5000, nds22:10000 },
  niche: {
    marketplace:20000, wb:20000, ozon:5000, ya:10000, mp_inventory:15000,
    wholesale:20000, wh_inventory:10000,
    retail:20000, rt_inventory:15000,
    production:60000, construction:40000, catering:30000,
    medicine:50000, services:20000,
  },
  staff: { none:0, rf_1_3:5000, rf_per:1500, foreign:20000 },
  cash:  { none:0, kassa:15000, avans:10000 },
  ved:8000, reconcile:15000, tax_mgmt:20000,
  military_per:2000, licenses:10000,
};

function nextNum(pfx){ const y=new Date().getFullYear(),k=`ctr_${pfx}_${y}`,n=parseInt(localStorage.getItem(k)||'0',10)+1; localStorage.setItem(k,String(n)); return `${pfx}-${y}-${String(n).padStart(4,'0')}`; }

/* ─── Расчёт ──────────────────────────────────── */
function calcTotal() {
  const lines = [];
  let total = 0;
  let hasIndividual = false;

  if (A.isNull) {
    const price = A.entity === 'ИП' ? P.null_ip : P.null_ooo;
    lines.push({ name:'Нулевая отчётность', price });
    total += price;
    return { total, lines, hasIndividual, urgent: A.urgent === 'yes' };
  }

  // База по нишам (можно выбрать несколько)
  const nicheNames = {
    marketplace:'Маркетплейс РВБ (любой первый)', wholesale:'Оптовая торговля',
    retail:'Розничная торговля', production:'Производство',
    construction:'Строительство', catering:'Общепит',
    medicine:'Медицина', services:'Услуги прочие'
  };
  A.niches.forEach(niche => {
    const nichePrice = P.niche[niche] || 0;
    if (nichePrice) {
      lines.push({ name: nicheNames[niche]||niche, price: nichePrice });
      total += nichePrice;
    }
  });

  // Маркетплейсы
  if (A.niches.includes('marketplace')) {
    const mpNames = { wb:'Wildberries', ozon:'Ozon', ya:'Яндекс Маркет' };
    A.mp.forEach(m => {
      const pr = P.niche[m]||0;
      lines.push({ name: mpNames[m]||m, price: pr });
      total += pr;
    });
    if (A.mpInventory) {
      lines.push({ name:'Товарный учёт', price: P.niche.mp_inventory });
      total += P.niche.mp_inventory;
    }
  }

  // Товарный учёт для торговли
  if (A.inventory) {
    const invPrice = A.niches.includes('wholesale') ? P.niche.wh_inventory : P.niche.rt_inventory;
    lines.push({ name:'Товарный учёт', price: invPrice });
    total += invPrice;
  }

  // Надбавка за ООО
  if (A.entity === 'ООО' && !A.isNull) {
    lines.push({ name:'Надбавка за ООО', price: P.entity_ooo });
    total += P.entity_ooo;
  }

  // Система налогообложения
  const taxNames = { patent:'Патент', ausn_d:'АУСН Доходы', ausn_dr:'АУСН Доходы-Расходы', usn6:'УСН 6%', usn15:'УСН 15%', osno:'ОСНО' };
  const taxPrice = P.tax[A.tax] || 0;
  if (taxPrice) {
    lines.push({ name: taxNames[A.tax]||A.tax, price: taxPrice });
    total += taxPrice;
  }
  // Патент дополнительно к УСН
  if (A.addPatent && A.tax !== 'patent') {
    lines.push({ name:'Патент (доп.)', price: P.tax.patent });
    total += P.tax.patent;
  }

  // СПОТ
  if (A.spot) {
    const spotPrice = (Number(A.spotCount)||1) * 1000;
    lines.push({ name:`СПОТ (${A.spotCount||1} док.)`, price: spotPrice });
    total += spotPrice;
  }

  // НДС (мульти-выбор)
  const vatNames = { не_облагается:'НДС не облагается', освобождение:'Освобождение от НДС (ст.145)', nds0:'НДС 0%', nds5:'НДС 5%', nds7:'НДС 7%', nds10:'НДС 10%', nds22:'НДС 22%' };
  (A.vats||[]).forEach(v => {
    const pr = P.vat[v] || 0;
    if (pr) { lines.push({ name: vatNames[v]||v, price: pr }); total += pr; }
    else if (v === 'не_облагается' || v === 'nds0') {
      lines.push({ name: vatNames[v]||v, price: 0 });
    }
  });

  // Сотрудники РФ
  if (A.staffRf === 'rf_1_3') {
    lines.push({ name:'Сотрудники РФ (1–3 чел.)', price: P.staff.rf_1_3 });
    total += P.staff.rf_1_3;
  } else if (A.staffRf === 'rf_more') {
    const pr = P.staff.rf_per * A.rfCount;
    lines.push({ name:`Сотрудники РФ (${A.rfCount} чел. × 1 500 ₽)`, price: pr });
    total += pr;
  }

  // Иностранцы
  if (A.staffForeign === 'yes') {
    const pr = P.staff.foreign * A.foreignCount;
    lines.push({ name:`Иностранные сотрудники (${A.foreignCount} чел. × 20 000 ₽)`, price: pr });
    total += pr;
  }

  // Наличные
  if (A.cashKassa) { lines.push({ name:'Касса (ККМ)', price: P.cash.kassa }); total += P.cash.kassa; }
  if (A.cashAvans) { lines.push({ name:'Авансовые отчёты', price: P.cash.avans }); total += P.cash.avans; }

  // Доп. услуги
  if (A.ved)       { lines.push({ name:'ВЭД / Валютные расчёты', price: P.ved }); total += P.ved; }
  if (A.reconcile) { lines.push({ name:'Сверки с контрагентами', price: P.reconcile }); total += P.reconcile; }
  if (A.taxMgmt)   { lines.push({ name:'Налоговый менеджмент', price: P.tax_mgmt }); total += P.tax_mgmt; }
  if (A.military)  {
    const pr = P.military_per * A.militaryCount;
    lines.push({ name:`Воинский учёт (${A.militaryCount} чел. × 2 000 ₽)`, price: pr });
    total += pr;
  }
  if (A.licenses)  { lines.push({ name:'Лицензионная отчётность', price: P.licenses }); total += P.licenses; }
  if (A.mgmtAcc)   { lines.push({ name:'Управленческий учёт', price:0, individual:true }); hasIndividual = true; }
  if (A.officeBuh) { lines.push({ name:'Выделенный бухгалтер в офис', price:0, individual:true }); hasIndividual = true; }

  // Скидка
  const disc = Number(A.discount) || 0;
  if (disc > 0) total = Math.round(total * (1 - disc / 100));

  return { total, lines, hasIndividual };
}

/* ─── Обновление итога в реальном времени ─────── */
function updateTotal() {
  collectCurrent();
  const { total } = calcTotal();
  // Нет отдельного сайдбара — обновляем только если на шаге 12
  if (step === STEPS) buildSummary();
}

/* ─── Старт квиза ─────────────────────────────── */
function startQuiz() {
  document.getElementById('hero').style.display = 'none';
  document.getElementById('kp-sec').style.display = 'none';
  document.getElementById('contract-sec').style.display = 'none';
  document.getElementById('final-sec').style.display = 'none';
  document.getElementById('quiz-wrap').style.display = 'block';
  showStep(1);
  document.getElementById('quiz-start').scrollIntoView({ behavior:'smooth', block:'start' });
}

/* ─── Навигация ───────────────────────────────── */
function goNext() {
  if (!validateStep(step)) return;
  collectStep(step);
  back = false;
  const next = nextStepNum(step);
  if (next <= STEPS) showStep(next);
}

function goBack() {
  collectStep(step);
  back = true;
  const prev = prevStepNum(step);
  if (prev >= 1) showStep(prev);
}

// Логика пропуска шагов (шаг 10 удалён)
function nextStepNum(n) {
  if (n === 2 && A.isNull) return 11; // нулёвка → пропустить 3-9
  if (n === 4 && !A.niches.includes('marketplace')) return 6; // не маркетплейс → пропустить шаг 5
  if (n === 9) return 11; // шаг 10 убран
  return n + 1;
}

function prevStepNum(n) {
  if (n === 6 && !A.niches.includes('marketplace')) return 4;
  if (n === 11 && A.isNull) return 2;
  if (n === 11) return 9;
  return n - 1;
}

function showStep(n) {
  document.querySelectorAll('.slide').forEach(el => { el.classList.remove('active','back'); el.style.display='none'; });
  const sl = document.querySelector(`.slide[data-step="${n}"]`);
  if (!sl) return;
  sl.style.display = 'block';
  sl.classList.add('active');
  if (back) sl.classList.add('back');

  // Прогресс — считаем визуально линейно
  const visual = visualStep(n);
  const totalVisual = A.isNull ? 4 : (A.niches.includes('marketplace') ? 11 : 10);
  document.getElementById('step-label').textContent = `Шаг ${visual} из ${totalVisual}`;
  document.getElementById('prog-fill').style.width = `${Math.min((visual / totalVisual) * 100, 100)}%`;

  document.getElementById('btn-back').style.display = n > 1 ? 'inline-flex' : 'none';
  const btnNext = document.getElementById('btn-next');
  btnNext.style.display = n === STEPS ? 'none' : 'inline-flex';
  btnNext.textContent = n === STEPS - 1 ? 'Посмотреть расчёт →' : 'Далее →';

  // Товарный учёт — показываем только для wholesale/retail
  if (n === 9) {
    const invBlock = document.getElementById('inventory-block');
    if (A.niches.includes('wholesale') || A.niches.includes('retail')) {
      invBlock.style.display = 'block';
      const pr = A.niches.includes('wholesale') ? P.niche.wh_inventory : P.niche.rt_inventory;
      document.getElementById('inventory-label').innerHTML = `Товарный учёт <strong>+${fmt(pr)}</strong>`;
    } else {
      invBlock.style.display = 'none';
    }
  }

  if (n === STEPS) buildSummary();
  restoreStep(n);
  step = n;
  back = false;
}

function visualStep(n) {
  // Маппинг реального шага в визуальный (шаг 10 удалён)
  if (A.isNull) {
    const map = {1:1, 2:2, 11:3, 12:4};
    return map[n] || n;
  }
  // Без маркетплейса: пропускаем шаг 5 → начиная с 6 сдвигаем -1; плюс шаг 10 удалён → с 11 ещё -1
  const skipMp = !A.niches.includes('marketplace');
  let v = n;
  if (skipMp && n >= 6) v -= 1;
  if (n >= 11) v -= 1;
  return v;
}

/* ─── Сбор данных ─────────────────────────────── */
function collectStep(n) {
  if (n===1)  { const s=document.querySelector('#g-entity .selected'); if(s) A.entity=s.dataset.val; }
  if (n===2)  { const s=document.querySelector('#g-null .selected'); if(s) A.isNull=s.dataset.val==='yes'; }
  if (n===3)  {
    const s=document.querySelector('#g-tax .selected'); if(s) A.tax=s.dataset.val;
    const ap=document.getElementById('add-patent'); if(ap) A.addPatent=ap.checked;
  }
  if (n===4)  { A.niches = [...document.querySelectorAll('#g-niche .selected')].map(b=>b.dataset.val); }
  if (n===5)  {
    A.mp = [...document.querySelectorAll('#g-mp .selected')].map(b=>b.dataset.val);
    A.mpInventory = document.getElementById('mp-inventory').checked;
  }
  if (n===6)  { A.vats = [...document.querySelectorAll('#g-vat .selected')].map(b=>b.dataset.val); }
  if (n===7)  {
    const sr=document.querySelector('#g-staff-rf .selected'); if(sr) A.staffRf=sr.dataset.val;
    A.rfCount = parseInt(document.getElementById('rf-count').value)||4;
    const sf=document.querySelector('#g-staff-foreign .selected'); if(sf) A.staffForeign=sf.dataset.val;
    A.foreignCount = parseInt(document.getElementById('foreign-count').value)||1;
  }
  if (n===8)  {
    A.cashKassa = document.getElementById('cash-kassa').checked;
    A.cashAvans = document.getElementById('cash-avans').checked;
  }
  if (n===9)  {
    A.ved       = document.getElementById('add-ved').checked;
    A.reconcile = document.getElementById('add-reconcile').checked;
    A.taxMgmt   = document.getElementById('add-taxmgmt').checked;
    A.military  = document.getElementById('add-military').checked;
    A.militaryCount = parseInt(document.getElementById('military-count').value)||1;
    A.licenses  = document.getElementById('add-licenses').checked;
    A.spot      = document.getElementById('add-spot').checked;
    A.spotCount = parseInt(document.getElementById('spot-count').value)||1;
    A.mgmtAcc   = document.getElementById('add-mgmt-acc').checked;
    A.officeBuh = document.getElementById('add-office-buh').checked;
    A.inventory = document.getElementById('add-inventory') ? document.getElementById('add-inventory').checked : false;
  }
  if (n===11) {
    A.name     = (document.getElementById('f-name').value||'').trim();
    A.director = (document.getElementById('f-director').value||'').trim();
  }
}

function collectCurrent() { collectStep(step); }

/* ─── Восстановление ─────────────────────────── */
function restoreStep(n) {
  const restorePick = (gid, val) => {
    document.querySelectorAll(`#${gid} .ccard`).forEach(b => b.classList.toggle('selected', b.dataset.val===val));
  };
  if (n===1)  restorePick('g-entity', A.entity);
  if (n===2)  restorePick('g-null', A.isNull?'yes':'no');
  if (n===3)  restorePick('g-tax', A.tax);
  if (n===4)  document.querySelectorAll('#g-niche .ncard').forEach(b => b.classList.toggle('selected', A.niches.includes(b.dataset.val)));
  if (n===5)  {
    document.querySelectorAll('#g-mp .ccard').forEach(b => b.classList.toggle('selected', A.mp.includes(b.dataset.val)));
    document.getElementById('mp-inventory').checked = A.mpInventory;
  }
  if (n===6)  document.querySelectorAll('#g-vat .ncard').forEach(b => b.classList.toggle('selected', (A.vats||[]).includes(b.dataset.val)));
  if (n===7)  {
    restorePick('g-staff-rf', A.staffRf);
    restorePick('g-staff-foreign', A.staffForeign);
    document.getElementById('rf-count').value = A.rfCount;
    document.getElementById('foreign-count').value = A.foreignCount;
    document.getElementById('rf-count-row').style.display = A.staffRf==='rf_more'?'flex':'none';
    document.getElementById('foreign-count-row').style.display = A.staffForeign==='yes'?'flex':'none';
  }
  if (n===8)  {
    document.getElementById('cash-kassa').checked = A.cashKassa;
    document.getElementById('cash-avans').checked = A.cashAvans;
  }
  if (n===9)  {
    document.getElementById('add-ved').checked       = A.ved;
    document.getElementById('add-reconcile').checked = A.reconcile;
    document.getElementById('add-taxmgmt').checked   = A.taxMgmt;
    document.getElementById('add-military').checked  = A.military;
    document.getElementById('military-count').value  = A.militaryCount;
    document.getElementById('military-count-row').style.display = A.military?'flex':'none';
    document.getElementById('add-licenses').checked  = A.licenses;
    document.getElementById('add-spot').checked       = A.spot;
    document.getElementById('spot-count').value       = A.spotCount;
    document.getElementById('spot-count-row').style.display = A.spot?'flex':'none';
    document.getElementById('add-mgmt-acc').checked  = A.mgmtAcc;
    document.getElementById('add-office-buh').checked = A.officeBuh;
    const inv = document.getElementById('add-inventory');
    if (inv) inv.checked = A.inventory;
  }
  if (n===3)  {
    const patentRow = document.getElementById('add-patent-row');
    if (patentRow) {
      const showPatent = A.tax === 'usn6' || A.tax === 'usn15' || A.tax === 'osno';
      patentRow.style.display = showPatent ? 'flex' : 'none';
      document.getElementById('add-patent').checked = A.addPatent;
    }
  }
  if (n===11) {
    document.getElementById('f-name').value     = A.name;
    document.getElementById('f-director').value = A.director;
  }
}

/* ─── Валидация ───────────────────────────────── */
function clearErrs() { document.querySelectorAll('.q-err').forEach(e=>e.textContent=''); document.querySelectorAll('.q-input').forEach(e=>e.classList.remove('input-err')); }
function setErr(id, msg) { const e=document.getElementById(id); if(e) e.textContent=msg; }

function validateStep(n) {
  clearErrs();
  if (n===1)  { if (!document.querySelector('#g-entity .selected')) { setErr('err-entity','Выберите вариант'); return false; } }
  if (n===2)  { if (!document.querySelector('#g-null .selected'))   { setErr('err-null','Выберите вариант'); return false; } }
  if (n===3)  { if (!document.querySelector('#g-tax .selected'))    { setErr('err-tax','Выберите систему налогообложения'); return false; } }
  if (n===4)  { if (!document.querySelector('#g-niche .selected')) { setErr('err-niche','Выберите вид деятельности'); return false; } }
  if (n===5)  { if (A.mp.length===0 && !document.querySelectorAll('#g-mp .selected').length) { setErr('err-mp','Выберите хотя бы один маркетплейс'); return false; } }
  // шаг 6 — выбор НДС необязателен
  if (n===7)  {
    if (!document.querySelector('#g-staff-rf .selected'))      { setErr('err-staff','Укажите сотрудников РФ'); return false; }
    if (!document.querySelector('#g-staff-foreign .selected')) { setErr('err-staff','Укажите иностранных сотрудников'); return false; }
  }
  if (n===11) {
    const name=document.getElementById('f-name').value.trim();
    if (!name) { setErr('err-name','Введите название компании или ФИО'); document.getElementById('f-name').classList.add('input-err'); return false; }
  }
  return true;
}

/* ─── UI-хелперы ─────────────────────────────── */
function pick(btn, gid) {
  document.querySelectorAll(`#${gid} .ccard`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  collectCurrent();
  updateTotal();

  // Показать/скрыть +Патент при выборе налогообложения
  if (gid === 'g-tax') {
    const patentRow = document.getElementById('add-patent-row');
    if (patentRow) {
      const showPatent = ['usn6','usn15','osno'].includes(btn.dataset.val);
      patentRow.style.display = showPatent ? 'flex' : 'none';
      if (!showPatent) { document.getElementById('add-patent').checked = false; A.addPatent = false; }
    }
  }

  // Показать/скрыть количество сотрудников
  if (gid === 'g-staff-rf') {
    document.getElementById('rf-count-row').style.display = btn.dataset.val==='rf_more'?'flex':'none';
  }
  if (gid === 'g-staff-foreign') {
    document.getElementById('foreign-count-row').style.display = btn.dataset.val==='yes'?'flex':'none';
  }
}

function setDiscount(pct, btn) {
  A.discount = pct;
  document.querySelectorAll('.ccard--sm').forEach(b => b.classList.remove('selected'));
  if (btn) btn.classList.add('selected');
  buildSummary();
}

function toggleMulti(btn) {
  btn.classList.toggle('selected');
  collectCurrent();
  updateTotal();
}

function cashNoneToggle() {
  const none = document.getElementById('cash-none');
  if (none.checked) {
    document.getElementById('cash-kassa').checked = false;
    document.getElementById('cash-avans').checked = false;
  }
  updateTotal();
}

function militaryToggle() {
  const checked = document.getElementById('add-military').checked;
  document.getElementById('military-count-row').style.display = checked ? 'flex' : 'none';
  updateTotal();
}

function toggleMultiVat(btn) {
  btn.classList.toggle('selected');
  collectStep(6);
  updateTotal();
}

function spotToggle() {
  const checked = document.getElementById('add-spot').checked;
  document.getElementById('spot-count-row').style.display = checked ? 'flex' : 'none';
  updateTotal();
}

/* ─── Сводка (шаг 12) ────────────────────────── */
function buildSummary() {
  collectStep(11);
  const { total, lines, hasIndividual } = calcTotal();

  document.getElementById('sum-total').textContent = fmt(total) + (hasIndividual ? '+' : '');
  document.getElementById('sum-individual-note').style.display = hasIndividual ? 'block' : 'none';

  const disc = Number(A.discount) || 0;
  const linesEl = document.getElementById('sum-lines');
  linesEl.innerHTML = lines.map(l =>
    `<div class="sum-line">
      <span class="sum-line-name">${esc(l.name)}</span>
      <span class="sum-line-price ${l.individual?'individual':''}">${l.individual ? 'индивидуально' : fmt(l.price)}</span>
    </div>`
  ).join('') + (disc > 0 ? `<div class="sum-modifier"><span>Скидка ${disc}%</span><span>−${disc}%</span></div>` : '');

  const taxNames = { patent:'Патент', ausn_d:'АУСН Доходы', ausn_dr:'АУСН Доходы-Расходы', usn6:'УСН 6%', usn15:'УСН 15%', osno:'ОСНО' };
  document.getElementById('sum-params').innerHTML = `
    <div class="sum-param"><span class="sum-param-k">Клиент</span><span class="sum-param-v">${esc(A.name||'—')}</span></div>
    <div class="sum-param"><span class="sum-param-k">Форма</span><span class="sum-param-v">${esc(A.entity)}</span></div>
    ${!A.isNull ? `<div class="sum-param"><span class="sum-param-k">Налогообложение</span><span class="sum-param-v">${esc(taxNames[A.tax]||A.tax)}</span></div>` : ''}
  `;
}

/* ─── Документы ──────────────────────────────── */
let lastKP = null, lastContract = null, lastInvoice = null;

function generateKP() {
  collectStep(11);
  clearErrs();
  const { total, lines, hasIndividual } = calcTotal();
  if (!A.name) {
    setErr('err-final','Введите название клиента — вернитесь на шаг 11');
    return;
  }
  // Guard: не инкрементировать счётчик при повторном вызове
  const kpNum = lastKP ? lastKP.kpNum : nextNum('КП');
  const kpText = buildKPText(total, lines, hasIndividual, kpNum);
  lastKP = { text:kpText, kpNum, total, lines, hasIndividual };

  document.getElementById('kp-meta').textContent = `${kpNum} · ${todayLong()}`;
  document.getElementById('kp-preview').textContent = kpText;
  const sec = document.getElementById('kp-sec');
  sec.style.display = 'block';
  document.getElementById('quiz-wrap').style.display = 'none';
  sec.scrollIntoView({ behavior:'smooth', block:'start' });

  showToast('КП сформировано');
}

function generateContract() {
  if (!lastKP) { showToast('Сначала сформируйте КП'); return; }
  const cNum = nextNum('Д');
  const cText = buildContractText(lastKP.total, lastKP.lines, cNum);
  lastContract = { text:cText, cNum };

  document.getElementById('contract-meta').textContent = `${cNum} · ${todayLong()}`;
  document.getElementById('contract-preview').textContent = cText;
  const sec = document.getElementById('contract-sec');
  sec.style.display = 'block';
  sec.scrollIntoView({ behavior:'smooth', block:'start' });

  const fname = `Договор_${safeF(A.name)}_${todayFile()}.docx`;
  buildContractDocx(EX, {name:A.name,inn:A.req.inn,kpp:A.req.kpp,address:A.req.address,phone:A.req.phone,email:A.req.email,rs:A.req.rs,bank:A.req.bank,bik:A.req.bik,ks:A.req.ks||'',ogrn:A.req.ogrn||'',ogrnip:A.req.ogrn||'',director:A.req.director||''}, lastKP.lines, lastKP.total, cNum)
    .then(b => { downloadBlob(b, fname); showToast('Договор скачивается'); })
    .catch(e => { console.error('Contract docx error:', e); showToast('Ошибка формирования файла'); });
}

function downloadKP() {
  if (!lastKP) { showToast('КП не сформировано'); return; }
  showToast('Формируем файл...');
  buildKPDocx(EX, {name: A.name, inn: A.req.inn, director: A.director}, lastKP.lines, lastKP.total, lastKP.kpNum)
    .then(b => { downloadBlob(b, `КП_${safeF(A.name)}_${todayFile()}.docx`); showToast('КП скачивается'); saveToCloud(); })
    .catch(e => { console.error('KP docx error:', e); showToast('Ошибка формирования файла'); });
}
function downloadInvoice() {
  if (!lastKP) { showToast('КП не сформировано'); return; }
  // Фиксируем номер счёта при первом вызове, повторные — тот же номер
  if (!lastInvoice) lastInvoice = { invNum: nextNum('СЧ') };
  const invNum = lastInvoice.invNum;
  buildInvoiceDocx(EX, {name:A.name,inn:A.req.inn,kpp:A.req.kpp,address:A.req.address,phone:A.req.phone,email:A.req.email,rs:A.req.rs,bank:A.req.bank,bik:A.req.bik,ks:A.req.ks||''}, lastKP.lines, lastKP.total, invNum)
    .then(b => { downloadBlob(b, `Счёт_${safeF(A.name)}_${todayFile()}.docx`); showToast('Счёт скачивается'); saveToCloud(); })
    .catch(e => { console.error('Invoice docx error:', e); showToast('Ошибка формирования файла'); });
}
function downloadContract() {
  if (!lastContract) { showToast('Договор не сформирован'); return; }
  buildContractDocx(EX, {name:A.name,inn:A.req.inn,kpp:A.req.kpp,address:A.req.address,phone:A.req.phone,email:A.req.email,rs:A.req.rs,bank:A.req.bank,bik:A.req.bik,ks:A.req.ks||'',ogrn:A.req.ogrn||'',ogrnip:A.req.ogrn||'',director:A.req.director||''}, lastKP.lines, lastKP.total, lastContract.cNum)
    .then(b => { downloadBlob(b, `Договор_${safeF(A.name)}_${todayFile()}.docx`); showToast('Договор скачивается'); saveToCloud(); })
    .catch(e => { console.error('Contract docx error:', e); showToast('Ошибка формирования файла'); });
}

function showFinal() {
  saveToCloud();
  document.getElementById('final-sec').style.display = 'block';
  document.getElementById('final-sec').scrollIntoView({ behavior:'smooth', block:'start' });
}

function newQuiz() {
  saveToCloud();
  Object.assign(A, {
    entity:'', isNull:false, tax:'', niches:[],
    mp:[], mpInventory:false, vats:[],
    staffRf:'none', rfCount:4, staffForeign:'none', foreignCount:1,
    cashKassa:false, cashAvans:false,
    ved:false, reconcile:false, taxMgmt:false,
    military:false, militaryCount:1, licenses:false, spot:false, spotCount:1,
    mgmtAcc:false, officeBuh:false,
    inventory:false, addPatent:false,
    discount:0, kpValidDays:5,
    name:'', director:'',
    req:{ inn:'', kpp:'', address:'', phone:'', email:'', rs:'', bank:'', bik:'', ks:'', ogrn:'', director:'' }
  });
  EX = Object.assign({}, EXECUTORS[0]);
  lastKP = null; lastContract = null; lastInvoice = null;
  document.getElementById('kp-sec').style.display      = 'none';
  document.getElementById('contract-sec').style.display = 'none';
  document.getElementById('final-sec').style.display   = 'none';
  document.getElementById('quiz-wrap').style.display   = 'block';
  document.getElementById('hero').style.display        = 'none';
  showStep(1);
  document.getElementById('quiz-start').scrollIntoView({ behavior:'smooth', block:'start' });
}

/* ─── Тексты документов (предпросмотр) ────────── */
function kpValidStr() {
  const d = new Date();
  d.setDate(d.getDate() + (Number(A.kpValidDays) || 5));
  return d.toLocaleDateString('ru-RU', { day:'2-digit', month:'long', year:'numeric' });
}

function buildKPText(total, lines, hasIndividual, kpNum) {
  const taxNames = { patent:'Патент', ausn_d:'АУСН Доходы', ausn_dr:'АУСН Доходы-Расходы', usn6:'УСН 6%', usn15:'УСН 15%', osno:'ОСНО' };
  const svcLines = lines.map(l => `  • ${l.name}${l.individual?' — рассчитывается индивидуально':' — '+fmt(l.price)}`).join('\n');
  return `${EX.name}
ИНН ${EX.inn} | ${EX.address}
${EX.phone} | ${EX.email}

КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ № ${kpNum}
Дата: ${today()}

Для: ${A.name}${A.director?'\nРуководитель: '+A.director:''}

Уважаемый клиент!

Подготовили для вас расчёт стоимости бухгалтерских услуг.

Состав услуг:
${svcLines}${Number(A.discount)>0?'\n  Скидка '+A.discount+'%: −'+fmt(Math.round(total/(1-Number(A.discount)/100)*Number(A.discount)/100)):''}

ИТОГО: ${fmt(total)}${hasIndividual?' + индивидуальные позиции':''}

КП действует до: ${kpValidStr()}

Параметры:
  Клиент: ${A.entity}${!A.isNull?' | '+(taxNames[A.tax]||A.tax):''}
  ${A.isNull?'Нулевая отчётность':'Вид деятельности: см. состав'}

Условия оплаты:
50% — предоплата до начала работы.
50% — после завершения / по итогам периода.

Срок начала работ:
1–3 рабочих дня после подписания договора.

С уважением,
${EX.name}
${EX.phone} | ${EX.email}`;
}

function buildContractText(total, lines, cNum) {
  const svcLines = lines.map((l,i) => `${i+1}. ${l.name}${l.individual?' — индивидуально':' — '+fmt(l.price)}`).join('\n');
  return `ДОГОВОР ОКАЗАНИЯ УСЛУГ № ${cNum}
г. Москва                    ${today()}

${EX.name} (Исполнитель) и ${A.name} (Заказчик) заключили настоящий договор.

1. ПРЕДМЕТ ДОГОВОРА
1.1. Перечень услуг:
${svcLines}

2. СТОИМОСТЬ И ОПЛАТА
2.1. Стоимость: ${fmt(total)}${lines.some(l=>l.individual)?' + индивидуальные позиции (согласуются отдельно)':''}
2.2. 50% предоплата, 50% по завершении.

3. СРОКИ
3.1. 1–3 рабочих дня с момента поступления предоплаты.

6. РЕКВИЗИТЫ
Исполнитель: ${EX.name}
ИНН: ${EX.inn} | КПП: ${EX.kpp} | ОГРН: ${EX.ogrn}
${EX.address}
Р/с: ${EX.rs} | Банк: ${EX.bank} | БИК: ${EX.bik} | К/с: ${EX.ks}

Заказчик: ${A.name}${A.req.inn?'\nИНН: '+A.req.inn:''}${A.req.kpp?'\nКПП: '+A.req.kpp:''}${A.req.address?'\n'+A.req.address:''}${A.req.phone?'\n'+A.req.phone:''}${A.req.email?'\n'+A.req.email:''}

Исполнитель: _______________ / ${EX.dirShort} /
Заказчик:    _______________ / ${A.req.director||A.name} /`;
}


/* ─── Модальное окно реквизитов ──────────────── */
function openReqModal(target) {
  modalTarget = target;
  const titles = { contract:'Реквизиты для договора', invoice:'Реквизиты для счёта' };
  document.getElementById('modal-title').textContent = titles[target] || 'Реквизиты';
  document.getElementById('modal-confirm-btn').textContent = target==='contract' ? 'Сформировать договор →' : 'Сформировать счёт →';

  // Показываем инфо о выбранном юрлице
  const info = document.getElementById('modal-exec-info');
  if (info) {
    info.innerHTML = '<div class="exec-opt" style="cursor:default;background:var(--blue-50);border-color:var(--blue-600)">'
      +'<div class="exec-info">'
      +'<span class="exec-name">'+EX.name+'</span>'
      +'<span class="exec-inn">ИНН '+EX.inn+(EX.kpp?' · КПП '+EX.kpp:'')+'</span>'
      +'</div></div>';
  }

  // Метки и подсказки ОГРН/ОГРНИП в зависимости от типа клиента
  const isOOO = (A.entity === 'ООО');
  const ogrnLabel = document.getElementById('r-ogrn-label');
  const ogrnInput = document.getElementById('r-ogrn');
  const directorLabel = document.getElementById('r-director-label');
  if (ogrnLabel) ogrnLabel.textContent = isOOO ? 'ОГРН' : 'ОГРНИП';
  if (ogrnInput) { ogrnInput.placeholder = isOOO ? '1234567890123' : '123456789012345'; ogrnInput.maxLength = isOOO ? 13 : 15; }
  if (directorLabel) directorLabel.textContent = isOOO ? 'ФИО директора' : 'ФИО предпринимателя';

  // Восстановить реквизиты клиента
  document.getElementById('r-inn').value     = A.req.inn;
  document.getElementById('r-kpp').value     = A.req.kpp;
  document.getElementById('r-address').value = A.req.address;
  document.getElementById('r-phone').value   = A.req.phone;
  document.getElementById('r-email').value   = A.req.email;
  document.getElementById('r-rs').value      = A.req.rs;
  document.getElementById('r-bank').value    = A.req.bank;
  document.getElementById('r-bik').value     = A.req.bik;
  if (ogrnInput) ogrnInput.value = A.req.ogrn || '';
  document.getElementById('r-director').value = A.req.director || '';

  document.getElementById('req-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeReqModal(e) {
  if (e && e.target !== document.getElementById('req-modal')) return;
  document.getElementById('req-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function confirmReqModal() {
  // Валидация клиента — ИНН обязателен
  const rInn = document.getElementById('r-inn').value.trim();
  if (!rInn) { document.getElementById('err-r-inn').textContent = 'Введите ИНН клиента'; return; }
  document.getElementById('err-r-inn').textContent = '';

  // Сохранить реквизиты клиента
  A.req = {
    inn:      rInn,
    kpp:      document.getElementById('r-kpp').value.trim(),
    address:  document.getElementById('r-address').value.trim(),
    phone:    document.getElementById('r-phone').value.trim(),
    email:    document.getElementById('r-email').value.trim(),
    rs:       document.getElementById('r-rs').value.trim(),
    bank:     document.getElementById('r-bank').value.trim(),
    bik:      document.getElementById('r-bik').value.trim(),
    ogrn:     document.getElementById('r-ogrn').value.trim(),
    director: document.getElementById('r-director').value.trim(),
  };

  // Закрыть модал и выполнить действие
  document.getElementById('req-modal').style.display = 'none';
  document.body.style.overflow = '';

  if (modalTarget === 'contract') generateContract();
  else if (modalTarget === 'invoice') downloadInvoice();
}



/* ═══════════════════════════════════════════════════
   ГЕНЕРАТОРЫ ДОКУМЕНТОВ
   Все три функции самодостаточны — берут классы
   из window.docx напрямую без обёрток.
═══════════════════════════════════════════════════ */

/* ─── Общие хелперы для docx ────────────────────── */
function _d() { return window.docx; }

function _r(text, o) {
  o = o || {};
  return new (_d().TextRun)({
    text: String(text == null ? '' : text),
    font: 'Times New Roman',
    size: o.size || 22,
    bold: !!o.bold,
    italics: !!o.italics,
    color: o.color || '000000',
  });
}

function _p(children, o) {
  o = o || {};
  const d = _d();
  const runs = typeof children === 'string' ? [_r(children, o)] : children;
  return new d.Paragraph({
    children: runs,
    alignment: o.align || d.AlignmentType.LEFT,
    spacing: { before: o.before || 0, after: o.after !== undefined ? o.after : 60 },
    indent: o.indent ? { left: o.indent } : undefined,
  });
}

function _pC(ch, o) { return _p(ch, Object.assign({}, o, { align: _d().AlignmentType.CENTER })); }
function _pJ(ch, o) { return _p(ch, Object.assign({}, o, { align: _d().AlignmentType.BOTH })); }
function _pR(ch, o) { return _p(ch, Object.assign({}, o, { align: _d().AlignmentType.RIGHT })); }
function _E(n)      { return new (_d().Paragraph)({ children:[new (_d().TextRun)('')], spacing:{before:0,after:n||80} }); }

function _cell(content, o) {
  o = o || {};
  const d = _d();
  const THIN = { style: d.BorderStyle.SINGLE, size: 4, color: 'AAAAAA' };
  const NONE = { style: d.BorderStyle.NONE,   size: 0, color: 'FFFFFF' };
  const defBorders = o.noBorder
    ? { top:NONE, bottom:NONE, left:NONE, right:NONE }
    : (o.borders || { top:THIN, bottom:THIN, left:THIN, right:THIN });

  const children = Array.isArray(content) ? content : [
    new d.Paragraph({
      children: typeof content === 'string'
        ? [_r(content, { bold: o.bold, size: o.size || 22, color: o.color })]
        : [content],
      alignment: o.align || d.AlignmentType.LEFT,
      spacing: { before: 40, after: 40 },
    })
  ];
  return new d.TableCell({
    children,
    borders: defBorders,
    width: o.w ? { size: o.w, type: d.WidthType.DXA } : undefined,
    shading: o.bg ? { fill: o.bg, type: d.ShadingType.CLEAR } : undefined,
    verticalAlign: o.va || d.VerticalAlign.CENTER,
    margins: o.m || { top: 60, bottom: 60, left: 100, right: 100 },
    columnSpan: o.span,
  });
}

function _row(cells) { return new (_d().TableRow)({ children: cells }); }

function _tbl(colWidths, rows) {
  const d = _d();
  return new d.Table({
    width: { size: colWidths.reduce(function(a,b){return a+b;}, 0), type: d.WidthType.DXA },
    columnWidths: colWidths,
    rows: rows,
  });
}

function _fmt(n) { return new Intl.NumberFormat('ru-RU').format(Math.round(n||0)); }

/* ─── КП ────────────────────────────────────────── */
async function buildKPDocx(ex, client, services, total, kpNum) {
  const disc = Number(A.discount) || 0;
  const validDate = new Date();
  validDate.setDate(validDate.getDate() + (Number(A.kpValidDays) || 5));

  const fmtN = function(n) {
    return new Intl.NumberFormat('ru-RU').format(Math.round(n || 0));
  };

  const data = {
    kp_number:        String(kpNum),
    kp_date:          new Date().toLocaleDateString('ru-RU', {day:'2-digit', month:'2-digit', year:'numeric'}),
    client_name:      client.name || '',
    client_director:  client.director || '',
    services:         services.map(function(s, i) {
      return {
        index: String(i + 1),
        name:  s.name || '',
        price: s.individual ? 'индивидуально' : fmtN(s.price || 0) + ' ₽',
      };
    }),
    show_discount:    disc > 0,
    discount_percent: disc > 0 ? String(disc) : '',
    discount_amount:  disc > 0 ? fmtN(Math.round(total / (1 - disc / 100) * disc / 100)) : '',
    total_amount:     fmtN(total),
    valid_until:      validDate.toLocaleDateString('ru-RU', {day:'2-digit', month:'long', year:'numeric'}),
    // Исполнитель
    ex_name:      ex.name || '',
    ex_short:     (ex.name || '').replace(/^ООО\s*[«"'](.+)[»"']$/, '$1').trim(),
    ex_fullname:  ex.name || '',
    ex_inn:       ex.inn || '',
    ex_kpp:       ex.kpp || '',
    ex_ogrn:      ex.ogrn || '',
    ex_address:   ex.address || '',
    ex_phone:     ex.phone || '',
    ex_email:     ex.email || '',
    ex_bank:      ex.bank || '',
    ex_rs:        ex.rs || '',
    ex_bik:       ex.bik || '',
    ex_ks:        ex.ks || '',
    ex_director:  ex.director || '',
    ex_dir_short: ex.dirShort || '',
    ex_director_gen: ex.directorGen || ex.director || '',
  };

  return _fillDocxTemplate('KP_template.docx', data);
}

/* ─── Хелпер docxtemplater ───────────────────────── */
async function _fillDocxTemplate(templatePath, data) {
  const PizZip = window.PizZip;
  const Docxtemplater = window.docxtemplater.default || window.docxtemplater;
  const resp = await fetch(templatePath);
  if (!resp.ok) throw new Error('Шаблон не найден: ' + templatePath);
  const buf = await resp.arrayBuffer();
  const zip = new PizZip(buf);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true, delimiters: { start: '{{', end: '}}' } });
  doc.render(data);
  return doc.getZip().generate({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
}

function _ruMonth(d) {
  return ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'][d.getMonth()];
}

function _rubles2words(sum) {
  const ones  = ['','один','два','три','четыре','пять','шесть','семь','восемь','девять',
                 'десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать',
                 'шестнадцать','семнадцать','восемнадцать','девятнадцать'];
  const onesF = ['','одна','две','три','четыре','пять','шесть','семь','восемь','девять',
                 'десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать',
                 'шестнадцать','семнадцать','восемнадцать','девятнадцать'];
  const tens  = ['','','двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'];
  const hundreds = ['','сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот','восемьсот','девятьсот'];

  function plural(n, f1, f2, f5) {
    const n10 = n % 10, n100 = n % 100;
    if (n100 >= 11 && n100 <= 19) return f5;
    if (n10 === 1) return f1;
    if (n10 >= 2 && n10 <= 4) return f2;
    return f5;
  }

  function chunk(n, fem) {
    if (n === 0) return '';
    const h = Math.floor(n / 100);
    const t = n % 100;
    const ten = t >= 20 ? Math.floor(t / 10) : 0;
    const one = t >= 20 ? t % 10 : t;
    const o = fem ? onesF[one] : ones[one];
    return [hundreds[h], ten ? tens[ten] : '', o].filter(Boolean).join(' ');
  }

  const n = Math.round(sum);
  const kop = Math.round((sum - Math.floor(sum)) * 100);
  const mln = Math.floor(n / 1000000);
  const tho = Math.floor((n % 1000000) / 1000);
  const rub = n % 1000;

  const parts = [];
  if (mln > 0) {
    parts.push(chunk(mln, false));
    parts.push(plural(mln, 'миллион', 'миллиона', 'миллионов'));
  }
  if (tho > 0) {
    parts.push(chunk(tho, true));
    parts.push(plural(tho % 10 === 1 && tho % 100 !== 11 ? 1 : tho % 10 >= 2 && tho % 10 <= 4 && (tho % 100 < 10 || tho % 100 >= 20) ? 2 : 5,
      'тысяча', 'тысячи', 'тысяч'));
  }
  if (rub > 0) {
    parts.push(chunk(rub, false));
  }
  parts.push(plural(rub, 'рубль', 'рубля', 'рублей'));

  const result = parts.filter(Boolean).join(' ');
  const kopStr = String(kop).padStart(2, '0');
  return result.charAt(0).toUpperCase() + result.slice(1) + ' ' + kopStr + ' коп.';
}

/* ─── СЧЁТ (docxtemplater) ──────────────────────── */
async function buildInvoiceDocx(ex, client, services, total, invNum) {
  const today = new Date();
  const today_s = today.toLocaleDateString('ru-RU',{day:'2-digit',month:'2-digit',year:'numeric'});
  const filt = services.filter(function(s){ return !s.individual; });
  const subtotal = filt.reduce(function(s,x){ return s+(x.price||0); }, 0);
  const disc = Number(A.discount) || 0;
  const discAmount = disc > 0 ? Math.round(subtotal * disc / 100) : 0;
  const finalTotal = disc > 0 ? Math.round(subtotal * (1 - disc / 100)) : subtotal;
  const fmtN = function(n){ return new Intl.NumberFormat('ru-RU',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n||0); };
  const fmtI = function(n){ return new Intl.NumberFormat('ru-RU').format(Math.round(n||0)); };

  const data = {
    invoice_number: String(invNum),
    invoice_date: today_s,
    client_name: client.name || '',
    client_inn: client.inn || '',
    client_address: client.address || '',
    client_phone: client.phone || '',
    services: filt.map(function(s,i){ return {
      index: String(i+1),
      service_name: s.name || '',
      quantity: '1',
      unit: 'усл.',
      price: fmtN(s.price||0),
      sum: fmtN(s.price||0),
    }; }),
    subtotal_amount:  fmtN(subtotal),
    show_discount:    disc > 0,
    discount_percent: disc > 0 ? String(disc) : '',
    discount_amount:  disc > 0 ? fmtI(discAmount) : '',
    total_amount:     fmtN(finalTotal),
    total_amount_words: _rubles2words(finalTotal),
    // Исполнитель
    ex_name:      ex.name || '',
    ex_short:     (ex.name || '').replace(/^ООО\s*[«"'](.+)[»"']$/, '$1').trim(),
    ex_inn:       ex.inn || '',
    ex_kpp:       ex.kpp || '',
    ex_address:   ex.address || '',
    ex_bank:      ex.bank || '',
    ex_rs:        ex.rs || '',
    ex_bik:       ex.bik || '',
    ex_ks:        ex.ks || '',
    ex_dir_short: ex.dirShort || '',
  };
  return _fillDocxTemplate('invoice_template.docx', data);
}


/* ─── Юридические формулировки услуг для Приложения №1 ── */
const serviceDescriptions = {
  // Ниши
  'Маркетплейс РВБ (любой первый)': 'Осуществляет ведение бухгалтерского и налогового учёта операций на маркетплейсах (Wildberries, Ozon, Яндекс Маркет и иных электронных торговых площадках), включая учёт реализации товаров, возвратов, комиссий и взаиморасчётов с платформами.',
  'Wildberries': 'Осуществляет ведение бухгалтерского учёта операций на торговой площадке Wildberries, включая учёт реализации, возвратов, штрафов и комиссионных вознаграждений.',
  'Ozon': 'Осуществляет ведение бухгалтерского учёта операций на торговой площадке Ozon, включая учёт реализации, возвратов и комиссий.',
  'Яндекс Маркет': 'Осуществляет ведение бухгалтерского учёта операций на торговой площадке Яндекс Маркет, включая учёт реализации и взаиморасчётов с платформой.',
  'Товарный учёт': 'Осуществляет учёт движения товарно-материальных ценностей: поступления, перемещения, списания и инвентаризации товаров на складах Заказчика.',
  'Оптовая торговля': 'Осуществляет ведение бухгалтерского учёта операций оптовой торговли, включая учёт закупок, реализации товаров, дебиторской и кредиторской задолженности.',
  'Розничная торговля': 'Осуществляет ведение бухгалтерского учёта операций розничной торговли, включая учёт розничной выручки, товарных остатков и расчётов с поставщиками.',
  'Производство': 'Осуществляет ведение бухгалтерского учёта производственной деятельности, включая калькуляцию себестоимости продукции, учёт материалов и незавершённого производства.',
  'Строительство': 'Осуществляет ведение бухгалтерского учёта строительной деятельности, включая учёт подрядных работ, сметной документации, давальческих материалов и объектов незавершённого строительства.',
  'Общепит': 'Осуществляет ведение бухгалтерского учёта деятельности предприятия общественного питания, включая учёт продуктов, списания, технологических карт и кассовых операций.',
  'Медицина': 'Осуществляет ведение бухгалтерского учёта медицинской деятельности с учётом отраслевых особенностей налогообложения и лицензионных требований.',
  'Услуги прочие': 'Осуществляет ведение бухгалтерского учёта деятельности по оказанию услуг, включая учёт выручки, актов выполненных работ и расчётов с контрагентами.',
  // Налоги
  'УСН 6%': 'Обеспечивает ведение налогового учёта в рамках упрощённой системы налогообложения (объект «Доходы», ставка 6%), включая формирование книги учёта доходов и расходов и расчёт авансовых платежей.',
  'УСН 15%': 'Обеспечивает ведение налогового учёта в рамках упрощённой системы налогообложения (объект «Доходы минус расходы», ставка 15%), включая формирование КУДиР и расчёт авансовых платежей.',
  'ОСНО': 'Обеспечивает ведение налогового учёта в рамках общей системы налогообложения, включая расчёт налога на прибыль, НДС, налога на имущество и формирование соответствующей отчётности.',
  'АУСН Доходы': 'Обеспечивает ведение учёта в рамках автоматизированной упрощённой системы налогообложения (объект «Доходы»), включая передачу данных об операциях в ФНС через уполномоченный банк.',
  'АУСН Доходы-Расходы': 'Обеспечивает ведение учёта в рамках автоматизированной упрощённой системы налогообложения (объект «Доходы минус расходы»), включая передачу данных об операциях в ФНС через уполномоченный банк.',
  'Патент': 'Обеспечивает ведение учёта доходов в книге учёта доходов в рамках патентной системы налогообложения, контроль соответствия лимиту доходов и своевременную оплату патента.',
  'Патент (доп.)': 'Обеспечивает ведение раздельного учёта доходов по деятельности, переведённой на патентную систему налогообложения, в дополнение к основной системе налогообложения.',
  // НДС
  'НДС 5%': 'Осуществляет ведение налогового учёта по НДС по ставке 5%, включая формирование книги покупок, книги продаж и декларации по НДС.',
  'НДС 7%': 'Осуществляет ведение налогового учёта по НДС по ставке 7%, включая формирование книги покупок, книги продаж и декларации по НДС.',
  'НДС 10%': 'Осуществляет ведение налогового учёта по НДС по ставке 10%, включая формирование книги покупок, книги продаж и декларации по НДС.',
  'НДС 22%': 'Осуществляет ведение налогового учёта по НДС по ставке 22%, включая формирование книги покупок, книги продаж и декларации по НДС.',
  'НДС 0%': 'Осуществляет ведение налогового учёта по НДС по ставке 0%, включая подтверждение права на нулевую ставку и формирование соответствующей декларации.',
  'НДС не облагается': 'Обеспечивает учёт операций, не подлежащих налогообложению НДС, включая раздельный учёт при наличии облагаемых и необлагаемых операций.',
  'Освобождение от НДС (ст.145)': 'Обеспечивает учёт условий применения освобождения от НДС по ст. 145 НК РФ, мониторинг соответствия лимиту выручки и своевременное уведомление налоговых органов.',
  // Сотрудники
  'Сотрудники РФ (1–3 чел.)': 'Осуществляет расчёт заработной платы, отпускных, больничных и иных выплат сотрудникам (до 3 человек), начисление страховых взносов, формирование расчётных листков и платёжных ведомостей.',
  // Остальные
  'Касса (ККМ)': 'Осуществляет учёт кассовых операций, включая ведение кассовой книги, контроль кассовой дисциплины и учёт операций с применением контрольно-кассовой техники.',
  'Авансовые отчёты': 'Осуществляет проверку и учёт авансовых отчётов подотчётных лиц, включая контроль документального подтверждения расходов и отражение в учёте.',
  'ВЭД / Валютные расчёты': 'Осуществляет ведение учёта внешнеэкономической деятельности, включая учёт валютных операций, паспортов сделок, курсовых разниц и взаиморасчётов с иностранными контрагентами.',
  'Сверки с контрагентами': 'Осуществляет проведение сверок взаиморасчётов с контрагентами Заказчика, формирование актов сверки и отражение выявленных расхождений в учёте.',
  'Налоговый менеджмент': 'Осуществляет налоговое планирование и оптимизацию налоговой нагрузки Заказчика в рамках действующего законодательства, включая анализ налоговых рисков и подготовку рекомендаций.',
  'Воинский учёт': 'Осуществляет ведение воинского учёта работников Заказчика в соответствии с требованиями законодательства РФ, включая ведение учётных карточек и взаимодействие с военными комиссариатами.',
  'Лицензионная отчётность': 'Обеспечивает подготовку и представление специализированной отчётности, связанной с лицензируемыми видами деятельности Заказчика.',
  'Управленческий учёт': 'Осуществляет формирование управленческой отчётности для нужд руководства Заказчика, включая бюджетирование, план-фактный анализ и подготовку аналитических материалов.',
  'Нулевая отчётность': 'Обеспечивает подготовку и сдачу нулевой налоговой и бухгалтерской отчётности в установленные законодательством сроки при отсутствии хозяйственной деятельности.',
};

function getServiceDescription(name) {
  if (serviceDescriptions[name]) return serviceDescriptions[name];
  // Частичное совпадение для динамических названий (сотрудники N чел., СПОТ N doc. и т.д.)
  for (var key in serviceDescriptions) {
    if (name.startsWith(key) || name.includes(key.split(' ')[0])) return serviceDescriptions[key];
  }
  return 'Оказывает услугу «' + name + '» в соответствии с требованиями действующего законодательства РФ.';
}

/* ─── ДОГОВОР (docxtemplater) ───────────────────── */
async function buildContractDocx(ex, client, services, total, conNum) {
  const today = new Date();
  const MONTHS_GEN = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  const isOOO = (A.entity === 'ООО');
  const templateFile = isOOO ? 'contract_ooo_template.docx' : 'contract_ip_template.docx';

  const disc = Number(A.discount) || 0;
  const originalTotal = disc > 0 ? Math.round(total / (1 - disc / 100)) : total;

  // Извлечь название компании без "ООО «»"
  const companyName = (client.name||'').replace(/^ООО\s*[«"'](.+)[»"']$/, '$1').trim() || client.name || '';

  const data = {
    contract_number: String(conNum),
    contract_day:   String(today.getDate()).padStart(2,'0'),
    contract_month: MONTHS_GEN[today.getMonth()],
    contract_year:  String(today.getFullYear()),
    contract_date_day:   String(today.getDate()).padStart(2,'0'),
    contract_date_month: MONTHS_GEN[today.getMonth()],
    contract_date_year:  String(today.getFullYear()),
    // Поля клиента (ООО)
    client_company_name:   companyName,
    client_signatory_role: client.signatoryRole || 'Генерального директора',
    client_signatory:      client.director || '',
    client_basis:          client.basis || 'Устава',
    // Поля клиента (ИП)
    client_name:     client.name || '',
    // Общие реквизиты
    client_inn:          client.inn || '',
    client_kpp:          client.kpp || '',
    client_ogrn:         client.ogrn || '',
    client_ogrnip:       client.ogrnip || '',
    client_account:      client.rs || '',
    client_bank:         client.bank || '',
    client_bik:          client.bik || '',
    client_corr_account: client.ks || '',
    client_address:      client.address || '',
    // Стоимость и скидка
    total_amount:       _fmt(total),
    total_amount_words: _rubles2words(total).replace(/ \d{2} коп\.$/, ''),
    show_discount:      disc > 0,
    discount_percent:   disc > 0 ? String(disc) : '',
    original_amount:    disc > 0 ? _fmt(originalTotal) : '',
    // Предоплата 50%
    amount:       _fmt(Math.round(total * 0.5)),
    amount_words: _rubles2words(Math.round(total * 0.5)).replace(/ \d{2} коп\.$/, ''),
    // Приложение №1 — перечень обязанностей
    contract_services: services.map(function(s, i) {
      return {
        service_index:       String(i + 1),
        service_description: getServiceDescription(s.name || ''),
      };
    }),
    // Исполнитель
    ex_name:         ex.name || '',
    ex_short:        (ex.name || '').replace(/^ООО\s*[«"'](.+)[»"']$/, '$1').trim(),
    ex_fullname:     ex.name || '',
    ex_inn:          ex.inn || '',
    ex_kpp:          ex.kpp || '',
    ex_ogrn:         ex.ogrn || '',
    ex_address:      ex.address || '',
    ex_phone:        ex.phone || '',
    ex_email:        ex.email || '',
    ex_bank:         ex.bank || '',
    ex_rs:           ex.rs || '',
    ex_bik:          ex.bik || '',
    ex_ks:           ex.ks || '',
    ex_director:     ex.director || '',
    ex_dir_short:    ex.dirShort || '',
    ex_director_gen: ex.directorGen || ex.director || '',
  };
  return _fillDocxTemplate(templateFile, data);
}

/* ─── Сохранение заявки в Google Sheets + Drive ─────── */
async function _blobToBase64(blob) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload  = function() { resolve(reader.result.split(',')[1]); };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function saveToCloud() {
  if (!APPS_SCRIPT_URL || !lastKP) return;

  var taxNames = { patent:'Патент', ausn_d:'АУСН Доходы', ausn_dr:'АУСН Доходы-Расходы', usn6:'УСН 6%', usn15:'УСН 15%', osno:'ОСНО' };
  var payload = {
    date:        todayFile(),
    clientName:  A.name || '—',
    entity:      A.entity || '',
    tax:         A.isNull ? 'Нулевая' : (taxNames[A.tax] || A.tax || ''),
    services:    lastKP.lines.map(function(l){ return l.name; }).join(', '),
    total:       lastKP.total,
    discount:    Number(A.discount) || 0,
    kpNum:       lastKP.kpNum,
    invoiceNum:  lastInvoice  ? lastInvoice.invNum  : '',
    contractNum: lastContract ? lastContract.cNum   : '',
  };

  try {
    console.log('[saveToCloud] старт, payload:', JSON.stringify(payload).slice(0, 200));

    var kpBlob = await buildKPDocx(EX, {name:A.name, inn:A.req.inn, director:A.director}, lastKP.lines, lastKP.total, lastKP.kpNum);
    payload.kpBase64 = await _blobToBase64(kpBlob);
    payload.kpName   = 'КП_' + safeF(A.name) + '_' + todayFile() + '.docx';
    console.log('[saveToCloud] КП готов, размер base64:', payload.kpBase64.length);

    if (lastInvoice) {
      var invBlob = await buildInvoiceDocx(EX, {name:A.name,inn:A.req.inn,kpp:A.req.kpp,address:A.req.address,phone:A.req.phone,email:A.req.email,rs:A.req.rs,bank:A.req.bank,bik:A.req.bik,ks:A.req.ks||''}, lastKP.lines, lastKP.total, lastInvoice.invNum);
      payload.invoiceBase64 = await _blobToBase64(invBlob);
      payload.invoiceName   = 'Счёт_' + safeF(A.name) + '_' + todayFile() + '.docx';
    }

    if (lastContract) {
      var conBlob = await buildContractDocx(EX, {name:A.name,inn:A.req.inn,kpp:A.req.kpp,address:A.req.address,phone:A.req.phone,email:A.req.email,rs:A.req.rs,bank:A.req.bank,bik:A.req.bik,ks:A.req.ks||'',ogrn:A.req.ogrn||'',ogrnip:A.req.ogrn||'',director:A.req.director||''}, lastKP.lines, lastKP.total, lastContract.cNum);
      payload.contractBase64 = await _blobToBase64(conBlob);
      payload.contractName   = 'Договор_' + safeF(A.name) + '_' + todayFile() + '.docx';
    }

    console.log('[saveToCloud] отправка fetch на', APPS_SCRIPT_URL);
    fetch(APPS_SCRIPT_URL, { method:'POST', mode:'no-cors', body: JSON.stringify(payload) });
    console.log('[saveToCloud] fetch отправлен');
  } catch(err) {
    console.error('saveToCloud error:', err);
  }
}

/* ─── Скачивание и утилиты ──────────────────────── */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 2000);
}

function copyEl(id) {
  const txt = (document.getElementById(id)||{}).textContent||'';
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(txt).then(function(){ showToast('Скопировано'); }).catch(function(){ fbCopy(txt); });
  } else { fbCopy(txt); }
}
function fbCopy(txt) {
  const ta = document.createElement('textarea'); ta.value = txt;
  Object.assign(ta.style,{position:'fixed',opacity:'0',pointerEvents:'none'});
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); showToast('Скопировано'); }catch(e){ showToast('Не удалось скопировать'); }
  document.body.removeChild(ta);
}

function showToast(msg) {
  const old = document.querySelector('.toast-el'); if (old) old.remove();
  const t = document.createElement('div'); t.className='toast-el'; t.textContent=msg;
  Object.assign(t.style,{position:'fixed',bottom:'28px',left:'50%',transform:'translateX(-50%)',
    background:'#111827',color:'#fff',padding:'10px 22px',borderRadius:'100px',
    fontFamily:'Inter,sans-serif',fontSize:'13px',fontWeight:'500',zIndex:'9999',
    boxShadow:'0 8px 30px rgba(0,0,0,.22)',opacity:'0',transition:'opacity .2s ease',
    pointerEvents:'none',whiteSpace:'nowrap'});
  document.body.appendChild(t);
  requestAnimationFrame(function(){ t.style.opacity='1'; });
  setTimeout(function(){ t.style.opacity='0'; setTimeout(function(){ t.remove(); },300); },2200);
}

/* ─── Init ──────────────────────────────────────── */
function applyPhoneMask(el) {
  if (!el) return;
  el.addEventListener('input', function() {
    var v = this.value.replace(/\D/g,'');
    if (v.startsWith('8')) v = '7'+v.slice(1);
    if (v.startsWith('7') && v.length > 1)
      v = '+7 ('+v.slice(1,4)+') '+v.slice(4,7)+'-'+v.slice(7,9)+'-'+v.slice(9,11);
    else if (v.length) v = '+'+v;
    this.value = v;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Маска телефона и ИНН в модале реквизитов
  applyPhoneMask(document.getElementById('r-phone'));
  var rInnEl = document.getElementById('r-inn');
  if (rInnEl) rInnEl.addEventListener('input', function(){ this.value=this.value.replace(/\D/g,'').slice(0,12); });
  // Enter
  document.addEventListener('keydown', function(e) {
    if (e.key==='Enter' && step < STEPS) goNext();
    else if (e.key==='Enter' && step === STEPS) generateKP();
  });
  // Показываем первый шаг
  showStep(1);
});
