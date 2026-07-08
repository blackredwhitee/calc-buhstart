/* ═══════════════════════════════════════════════════
   КАЛЬКУЛЯТОР БУХГАЛТЕРСКИХ УСЛУГ
   Прайс: лист «Единый»
═══════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════
   ЮРЛИЦА ИСПОЛНИТЕЛЯ
═══════════════════════════════════════════════════ */
const EXECUTORS = [
  {
    name:        'ООО «ПРОФИТ-М»',
    inn:         '7719819338',
    kpp:         '771901001',
    ogrn:        '1127746625104',
    address:     '105318, г. Москва, ул. Ткацкая, д. 5, стр. 3, этаж 5, офис 3-508',
    phone:       '+7 (495) 507-09-79',
    email:       'info@buhstart.ru',
    bank:        'ООО «Банк Точка»',
    rs:          '40702810001500001141',
    bik:         '044525104',
    ks:          '30101810745374525104',
    director:    'Горелкина Галина Викторовна',
    directorGen: 'Горелкиной Галины Викторовны',
    dirShort:    'Горелкина Г.В.',
  },
  {
    name:        'ООО «ПРОФИТ-КОНСАЛТ»',
    inn:         '7709792856',
    kpp:         '770401001',
    ogrn:        '1087746623095',
    address:     '119002, г. Москва, Денежный пер., д. 4, помещ. II подвал ком. 2',
    phone:       '+7 (495) 507-09-79',
    email:       'info@buhstart.ru',
    bank:        'ООО «Банк Точка»',
    rs:          '40702810301500001139',
    bik:         '044525104',
    ks:          '30101810745374525104',
    director:    'Горелкина Галина Викторовна',
    directorGen: 'Горелкиной Галины Викторовны',
    dirShort:    'Горелкина Г.В.',
  },
  {
    name:        'ООО «БИГАР»',
    inn:         '5001169577',
    kpp:         '500101001',
    ogrn:        '1265000042086',
    address:     '143954, Московская область, г. Балашиха, тер. ДНТ Южное, д. 70',
    phone:       '+7 (495) 507-09-79',
    email:       'info@buhstart.ru',
    bank:        'ООО «Банк Точка»',
    rs:          '40702810820000320202',
    bik:         '044525104',
    ks:          '30101810745374525104',
    director:    'Горелкина Галина Викторовна',
    directorGen: 'Горелкиной Галины Викторовны',
    dirShort:    'Горелкина Г.В.',
  },
  {
    name:        'ИП Горелкина Галина Викторовна',
    inn:         '771986811077',
    kpp:         '',
    ogrn:        '',
    address:     '',
    phone:       '+7 (495) 507-09-79',
    email:       'info@buhstart.ru',
    bank:        'ООО «Банк Точка»',
    rs:          '40802810201500000619',
    bik:         '044525104',
    ks:          '30101810745374525104',
    director:    'Горелкина Галина Викторовна',
    directorGen: 'Горелкиной Галины Викторовны',
    dirShort:    'Горелкина Г.В.',
  },
  {
    name:        'ООО «ПРОФИТ»',
    inn:         '7743351308',
    kpp:         '771901001',
    ogrn:        '1207700481581',
    address:     'г. Москва, Челябинская ул., д. 14, кв. 85',
    phone:       '+7 (495) 507-09-79',
    email:       'info@buhstart.ru',
    bank:        'Московский филиал АО КБ «МОДУЛЬБАНК»',
    rs:          '40702810970010251930',
    bik:         '044525092',
    ks:          '30101810645250000092',
    director:    'Самылова Ирина Сергеевна',
    directorGen: 'Самыловой Ирины Сергеевны',
    dirShort:    'Самылова И.С.',
  },
  {
    name:        'ИП Самылова Ирина Сергеевна',
    inn:         '290102468457',
    kpp:         '',
    ogrn:        '325774600453740',
    address:     '',
    phone:       '+7 (495) 507-09-79',
    email:       'info@buhstart.ru',
    bank:        'Московский филиал АО КБ «МОДУЛЬБАНК»',
    rs:          '40802810170010499751',
    bik:         '044525092',
    ks:          '30101810645250000092',
    director:    'Самылова Ирина Сергеевна',
    directorGen: 'Самыловой Ирины Сергеевны',
    dirShort:    'Самылова И.С.',
  },
  {
    name:        'ООО «ОПТИМА»',
    inn:         '2902092123',
    kpp:         '290201001',
    ogrn:        '1242900007173',
    address:     'Архангельская область, г. Северодвинск, Первомайская ул., д. 16',
    phone:       '+7 (495) 507-09-79',
    email:       'info@buhstart.ru',
    bank:        'ООО «Банк Точка»',
    rs:          '40702810720000170264',
    bik:         '044525104',
    ks:          '30101810745374525104',
    director:    'Горелкина Галина Викторовна',
    directorGen: 'Горелкиной Галины Викторовны',
    dirShort:    'Горелкина Г.В.',
  },
];

// ─── URL Google Apps Script (заменить после деплоя) ──
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1Vzwi4U1e46Egq9B6vqBNvkMvthiFvQZCppmMnePx5CAjtn3dwRSPYvyHDcNXWX_m/exec';

// ─── Глобальные переменные стоимостей (менять только здесь) ──────────────
const PREPAYMENT_AMOUNT = 20000;   // Счёт выставляется на эту сумму
const OPTIMA_BASE_PRICE = 60000;


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
  ved:false, reconcile:false,
  military:false, militaryCount:1,
  licenses:false, licenseCount:1,
  spot:false, spotCount:1,
  whInventory:false, rtInventory:false, addPatent:false,
  // Стандарт (новые шаги)
  priorityManager:false,
  taxMgmt:false,
  officeBuh:false, officeBuhDays:5,
  // Оптима (новые шаги)
  mgmtAcc:false,
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
  tax:   { patent:1000, ausn_d:5000, ausn_dr:20000, usn6:5000, usn15:20000, osno:30000 },
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
  const baseLines = [];
  let baseRaw = 0;

  if (A.isNull) {
    const price = A.entity === 'ИП' ? P.null_ip : P.null_ooo;
    baseLines.push({ name:'Нулевая отчётность', price });
    baseRaw = price;
  } else {
    const nicheNames = {
      marketplace:'Маркетплейс РВБ (любой первый)', wholesale:'Оптовая торговля',
      retail:'Розничная торговля', production:'Производство',
      construction:'Строительство', catering:'Общепит',
      medicine:'Медицина', services:'Услуги прочие'
    };
    A.niches.forEach(niche => {
      const pr = P.niche[niche] || 0;
      if (pr) { baseLines.push({ name: nicheNames[niche]||niche, price: pr }); baseRaw += pr; }
      // Товарный учёт идёт сразу под нишей — как в прайсе «в т.ч.»
      if (niche === 'wholesale' && A.whInventory) { baseLines.push({ name: 'в т.ч. товарный учёт', price: P.niche.wh_inventory }); baseRaw += P.niche.wh_inventory; }
      if (niche === 'retail'    && A.rtInventory) { baseLines.push({ name: 'в т.ч. товарный учёт', price: P.niche.rt_inventory }); baseRaw += P.niche.rt_inventory; }
    });

    if (A.niches.includes('marketplace')) {
      const mpNames = { wb:'Wildberries', ozon:'Ozon', ya:'Яндекс Маркет' };
      A.mp.forEach(m => {
        const pr = P.niche[m]||0;
        baseLines.push({ name: mpNames[m]||m, price: pr }); baseRaw += pr;
      });
      if (A.mpInventory) { baseLines.push({ name:'Товарный учёт', price: P.niche.mp_inventory }); baseRaw += P.niche.mp_inventory; }
    }

    if (A.entity === 'ООО') { baseLines.push({ name:'ООО', price: P.entity_ooo }); baseRaw += P.entity_ooo; }

    const taxNames = { patent:'Патент', ausn_d:'АУСН Доходы', ausn_dr:'АУСН Доходы-Расходы', usn6:'УСН 6%', usn15:'УСН 15%', osno:'ОСНО' };
    const taxPrice = P.tax[A.tax] || 0;
    if (taxPrice) { baseLines.push({ name: taxNames[A.tax]||A.tax, price: taxPrice }); baseRaw += taxPrice; }
    if (A.addPatent && A.tax !== 'patent') { baseLines.push({ name:'Патент (доп.)', price: P.tax.patent }); baseRaw += P.tax.patent; }

    const vatNames = { не_облагается:'НДС не облагается', освобождение:'Освобождение от НДС (ст.145)', nds0:'НДС 0%', nds5:'НДС 5%', nds7:'НДС 7%', nds10:'НДС 10%', nds22:'НДС 22%' };
    (A.vats||[]).forEach(v => {
      const pr = P.vat[v] || 0;
      if (pr) { baseLines.push({ name: vatNames[v]||v, price: pr }); baseRaw += pr; }
      else if (v === 'не_облагается' || v === 'nds0') { baseLines.push({ name: vatNames[v]||v, price: 0 }); }
    });

    if (A.staffRf === 'rf_1_3') { baseLines.push({ name:'Сотрудники РФ (1–3 чел.)', price: P.staff.rf_1_3 }); baseRaw += P.staff.rf_1_3; }
    else if (A.staffRf === 'rf_more') { const pr = P.staff.rf_per * A.rfCount; baseLines.push({ name:`Сотрудники РФ (${A.rfCount} чел. × 1 500 ₽)`, price: pr }); baseRaw += pr; }

    if (A.staffForeign === 'yes') { const pr = P.staff.foreign * A.foreignCount; baseLines.push({ name:`Иностранные сотрудники (${A.foreignCount} чел. × 20 000 ₽)`, price: pr }); baseRaw += pr; }

    if (A.cashKassa) { baseLines.push({ name:'Касса (ККМ)', price: P.cash.kassa }); baseRaw += P.cash.kassa; }
    if (A.cashAvans) { baseLines.push({ name:'Авансовые отчёты', price: P.cash.avans }); baseRaw += P.cash.avans; }

    if (A.ved)      { baseLines.push({ name:'ВЭД / Валютные расчёты', price: P.ved }); baseRaw += P.ved; }
    if (A.reconcile){ baseLines.push({ name:'Сверки с контрагентами', price: P.reconcile }); baseRaw += P.reconcile; }
    if (A.military) { const pr = P.military_per * A.militaryCount; baseLines.push({ name:`Воинский учёт (${A.militaryCount} чел. × 2 000 ₽)`, price: pr }); baseRaw += pr; }
    if (A.licenses) { const pr = P.licenses * (A.licenseCount||1); baseLines.push({ name:`Лицензионная отчётность (${A.licenseCount||1} лиц.)`, price: pr }); baseRaw += pr; }
    if (A.spot)     { const pr = (A.spotCount||1) * 1000; baseLines.push({ name:`СПОТ (${A.spotCount||1} док.)`, price: pr }); baseRaw += pr; }
  }

  // Скидка применяется к базе
  const disc = Number(A.discount) || 0;
  const baseTotal = disc > 0 ? Math.round(baseRaw * (1 - disc / 100)) : baseRaw;

  // Стандарт-надбавки
  const priorityPrice = A.priorityManager ? Math.round(baseTotal * 0.2) : 0;
  const taxMgmtPrice  = A.taxMgmt && ['ausn_dr','usn15','osno'].includes(A.tax) ? P.tax_mgmt : 0;
  const officeBuhPrice = A.officeBuh ? (A.officeBuhDays || 5) * 4 * 7500 : 0;
  const standardTotal = baseTotal + priorityPrice + taxMgmtPrice + officeBuhPrice;

  const standardLines = [
    { name:'Приоритетная скорость ответа менеджера', selected: A.priorityManager, price: priorityPrice,
      detail: A.priorityManager ? `+20% от базы` : '' },
    { name:'Налоговый менеджмент', selected: A.taxMgmt, price: taxMgmtPrice },
    { name: A.officeBuh ? `Бухгалтер в офисе (${(A.officeBuhDays||5)*4} смен/мес.)` : 'Бухгалтер в офисе',
      selected: A.officeBuh, price: officeBuhPrice },
  ];

  // Оптима
  const optimaLines = [];
  if (A.mgmtAcc) optimaLines.push({ name: 'Управленческий учёт', price: OPTIMA_BASE_PRICE, selected: true });
  const optimaTotal = baseTotal + (A.mgmtAcc ? OPTIMA_BASE_PRICE : 0);

  // Обратная совместимость (договор, счёт берут lines/total)
  return {
    total: baseTotal, lines: baseLines, hasIndividual: false,
    baseRaw,
    baseTotal, baseLines,
    standardLines, standardTotal,
    optimaLines, optimaTotal,
    disc,
  };
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
  showStep(next);
}

function goBack() {
  collectStep(step);
  back = true;
  const prev = prevStepNum(step);
  if (prev >= 1) showStep(prev);
}

function nextStepNum(n) {
  const taxMgmt = ['ausn_dr','usn15','osno'].includes(A.tax);
  if (n === 2 && A.isNull) return 11;
  if (n === 3) return taxMgmt ? 13 : 4;  // сразу после налогообложения
  if (n === 13) return 4;                 // → обратно в основной поток
  if (n === 4 && !A.niches.includes('marketplace')) return 6;
  if (n === 9)  return 10;
  if (n === 10) return 14;
  if (n === 14) return 15;
  if (n === 15) return 11;
  return n + 1;
}

function prevStepNum(n) {
  const taxMgmt = ['ausn_dr','usn15','osno'].includes(A.tax);
  if (n === 4  && taxMgmt) return 13;
  if (n === 4  && !A.niches.includes('marketplace')) return taxMgmt ? 13 : 3;
  if (n === 6  && !A.niches.includes('marketplace')) return 4;
  if (n === 13) return 3;
  if (n === 10) return 9;
  if (n === 14) return 10;
  if (n === 15) return 14;
  if (n === 11 && A.isNull)   return 2;
  if (n === 11)                return 15;
  return n - 1;
}

function computeStepPath() {
  if (A.isNull) return [1,2,11,12];
  const taxMgmt = ['ausn_dr','usn15','osno'].includes(A.tax);
  const path = [1,2,3];
  if (taxMgmt) path.push(13);
  path.push(4);
  if (A.niches.includes('marketplace')) path.push(5);
  path.push(6,7,8,9,10,14,15);
  path.push(11,12);
  return path;
}

function showStep(n) {
  document.querySelectorAll('.slide').forEach(el => { el.classList.remove('active','back'); el.style.display='none'; });
  const sl = document.querySelector(`.slide[data-step="${n}"]`);
  if (!sl) return;
  sl.style.display = 'block';
  sl.classList.add('active');
  if (back) sl.classList.add('back');

  // Прогресс — считаем по реальному пути
  const path = computeStepPath();
  const visual = path.indexOf(n) + 1;
  const totalVisual = path.length;
  document.getElementById('step-label').textContent = `Шаг ${visual} из ${totalVisual}`;
  document.getElementById('prog-fill').style.width = `${Math.min((visual / totalVisual) * 100, 100)}%`;

  document.getElementById('btn-back').style.display = n > 1 ? 'inline-flex' : 'none';
  const btnNext = document.getElementById('btn-next');
  btnNext.style.display = n === STEPS ? 'none' : 'inline-flex';
  btnNext.textContent = n === STEPS - 1 ? 'Посмотреть расчёт →' : 'Далее →';


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
    if (!['ausn_dr','usn15','osno'].includes(A.tax)) A.taxMgmt = false;
    const ap=document.getElementById('add-patent'); if(ap) A.addPatent=ap.checked;
  }
  if (n===4)  {
    A.niches = [...document.querySelectorAll('#g-niche .selected')].map(b=>b.dataset.val);
    A.whInventory = document.getElementById('add-wh-inventory') ? document.getElementById('add-wh-inventory').checked : false;
    A.rtInventory = document.getElementById('add-rt-inventory') ? document.getElementById('add-rt-inventory').checked : false;
  }
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
    A.ved         = document.getElementById('add-ved').checked;
    A.reconcile   = document.getElementById('add-reconcile').checked;
    A.military    = document.getElementById('add-military').checked;
    A.militaryCount = parseInt(document.getElementById('military-count').value)||1;
    A.licenses    = document.getElementById('add-licenses').checked;
    A.licenseCount = parseInt(document.getElementById('license-count').value)||1;
    A.spot        = document.getElementById('add-spot').checked;
    A.spotCount   = parseInt(document.getElementById('spot-count').value)||1;
  }
  if (n===10) {
    const s = document.querySelector('#g-priority .selected');
    if (s) A.priorityManager = s.dataset.val === 'yes';
  }
  if (n===13) {
    const s = document.querySelector('#g-taxmgmt .selected');
    if (s) A.taxMgmt = s.dataset.val === 'yes';
  }
  if (n===14) {
    const s = document.querySelector('#g-office-buh .selected');
    if (s) A.officeBuh = s.dataset.val === 'yes';
    A.officeBuhDays = parseInt(document.getElementById('office-buh-days').value)||5;
  }
  if (n===15) {
    const s = document.querySelector('#g-mgmt-acc .selected');
    if (s) A.mgmtAcc = s.dataset.val === 'yes';
  }
  if (n===11) {
    const nameEl = document.getElementById('f-name');
    if (nameEl && nameEl.value.trim()) A.name = nameEl.value.trim();
    const dirEl = document.getElementById('f-director');
    if (dirEl) A.director = (dirEl.value||'').trim();
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
  if (n===4)  {
    document.querySelectorAll('#g-niche .ncard').forEach(b => b.classList.toggle('selected', A.niches.includes(b.dataset.val)));
    updateNicheInventory();
    const whInv = document.getElementById('add-wh-inventory'); if (whInv) whInv.checked = A.whInventory;
    const rtInv = document.getElementById('add-rt-inventory'); if (rtInv) rtInv.checked = A.rtInventory;
  }
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
    document.getElementById('add-ved').checked        = A.ved;
    document.getElementById('add-reconcile').checked  = A.reconcile;
    document.getElementById('add-military').checked   = A.military;
    document.getElementById('military-count').value   = A.militaryCount;
    document.getElementById('military-count-row').style.display = A.military ? 'flex' : 'none';
    document.getElementById('add-licenses').checked   = A.licenses;
    document.getElementById('license-count').value    = A.licenseCount;
    document.getElementById('license-count-row').style.display  = A.licenses ? 'flex' : 'none';
    document.getElementById('add-spot').checked       = A.spot;
    document.getElementById('spot-count').value       = A.spotCount;
    document.getElementById('spot-count-row').style.display     = A.spot ? 'flex' : 'none';
  }
  if (n===10) {
    const restorePick10 = (val) => document.querySelectorAll('#g-priority .ccard').forEach(b => b.classList.toggle('selected', b.dataset.val === val));
    restorePick10(A.priorityManager ? 'yes' : 'no');
  }
  if (n===13) {
    const restorePick13 = (val) => document.querySelectorAll('#g-taxmgmt .ccard').forEach(b => b.classList.toggle('selected', b.dataset.val === val));
    restorePick13(A.taxMgmt ? 'yes' : 'no');
  }
  if (n===14) {
    const restorePick14 = (val) => document.querySelectorAll('#g-office-buh .ccard').forEach(b => b.classList.toggle('selected', b.dataset.val === val));
    restorePick14(A.officeBuh ? 'yes' : 'no');
    document.getElementById('office-buh-days').value = A.officeBuhDays;
    document.getElementById('office-buh-days-row').style.display = A.officeBuh ? 'flex' : 'none';
  }
  if (n===15) {
    const restorePick15 = (val) => document.querySelectorAll('#g-mgmt-acc .ccard').forEach(b => b.classList.toggle('selected', b.dataset.val === val));
    restorePick15(A.mgmtAcc ? 'yes' : 'no');
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
  if (n===12) {
    document.querySelectorAll('.ccard--sm').forEach(b => {
      const m = (b.getAttribute('onclick')||'').match(/setDiscount\((\d+)/);
      const pct = m ? parseInt(m[1]) : 0;
      b.classList.toggle('selected', pct === Number(A.discount));
    });
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
  if (n===10) { if (!document.querySelector('#g-priority .selected')) { setErr('err-priority','Выберите вариант'); return false; } }
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
  updateNicheInventory();
  updateTotal();
}

function updateNicheInventory() {
  const niches = [...document.querySelectorAll('#g-niche .selected')].map(b => b.dataset.val);
  const whBlock = document.getElementById('wh-inventory-block');
  const rtBlock = document.getElementById('rt-inventory-block');
  if (whBlock) {
    const show = niches.includes('wholesale');
    whBlock.style.display = show ? 'block' : 'none';
    if (!show) { const cb = document.getElementById('add-wh-inventory'); if (cb) { cb.checked = false; A.whInventory = false; } }
  }
  if (rtBlock) {
    const show = niches.includes('retail');
    rtBlock.style.display = show ? 'block' : 'none';
    if (!show) { const cb = document.getElementById('add-rt-inventory'); if (cb) { cb.checked = false; A.rtInventory = false; } }
  }
}

function cashNoneToggle() {
  const none = document.getElementById('cash-none');
  if (none.checked) {
    document.getElementById('cash-kassa').checked = false;
    document.getElementById('cash-avans').checked = false;
  }
  updateTotal();
}

function cashOptionToggle() {
  document.getElementById('cash-none').checked = false;
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

function licensesToggle() {
  const checked = document.getElementById('add-licenses').checked;
  const row = document.getElementById('license-count-row');
  if (row) row.style.display = checked ? 'flex' : 'none';
  updateTotal();
}

function pickOfficeBuh(btn) {
  document.querySelectorAll('#g-office-buh .ccard').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  collectCurrent();
  const daysRow = document.getElementById('office-buh-days-row');
  if (daysRow) daysRow.style.display = A.officeBuh ? 'flex' : 'none';
  updateTotal();
}


/* ─── Сводка (шаг 12) ────────────────────────── */
function buildSummary() {
  collectStep(11);
  const res = calcTotal();
  const disc = res.disc;

  const taxNames = { patent:'Патент', ausn_d:'АУСН Доходы', ausn_dr:'АУСН Доходы-Расходы', usn6:'УСН 6%', usn15:'УСН 15%', osno:'ОСНО' };
  document.getElementById('sum-params').innerHTML = `
    <div class="sum-param"><span class="sum-param-k">Клиент</span><span class="sum-param-v">${esc(A.name||'—')}</span></div>
    <div class="sum-param"><span class="sum-param-k">Форма</span><span class="sum-param-v">${esc(A.entity)}</span></div>
    ${!A.isNull ? `<div class="sum-param"><span class="sum-param-k">Налогообложение</span><span class="sum-param-v">${esc(taxNames[A.tax]||A.tax)}</span></div>` : ''}
  `;

  const indNote = document.getElementById('sum-individual-note');
  if (indNote) indNote.style.display = 'none';

  // Базовая
  const linesEl = document.getElementById('sum-lines');
  linesEl.innerHTML = res.baseLines.map(l =>
    `<div class="sum-line">
      <span class="sum-line-name">${esc(l.name)}</span>
      <span class="sum-line-price">${fmt(l.price)}</span>
    </div>`
  ).join('') + (disc > 0 ? `<div class="sum-modifier"><span>Скидка ${disc}%</span><span>−${fmt(res.baseRaw - res.baseTotal)}</span></div>` : '');
  const baseTotalEl = document.getElementById('sum-total-base');
  if (baseTotalEl) baseTotalEl.textContent = fmt(res.baseTotal) + '/мес';
  document.getElementById('sum-total').textContent = fmt(res.baseTotal);

  // Стандарт — только выбранные
  const stdSelected = res.standardLines.filter(l => l.selected);
  const stdBlock = document.getElementById('sum-block-standard');
  const stdEl = document.getElementById('sum-standard');
  if (stdBlock) stdBlock.style.display = stdSelected.length ? 'block' : 'none';
  if (stdEl) {
    stdEl.innerHTML = stdSelected.map(l =>
      `<div class="sum-line">
        <span class="sum-line-name">${esc(l.name)}</span>
        ${l.price ? `<span class="sum-line-price">+${fmt(l.price)}</span>` : ''}
      </div>`
    ).join('');
    const stdTotalEl = document.getElementById('sum-total-standard');
    if (stdTotalEl) stdTotalEl.textContent = fmt(res.standardTotal) + '/мес';
  }

  // Оптима — только выбранные
  const optSelected = res.optimaLines.filter(l => l.selected);
  const optBlock = document.getElementById('sum-block-optima');
  const optEl = document.getElementById('sum-optima');
  if (optBlock) optBlock.style.display = optSelected.length ? 'block' : 'none';
  if (optEl) {
    optEl.innerHTML = optSelected.map(l =>
      `<div class="sum-line">
        <span class="sum-line-name">${esc(l.name)}</span>
      </div>`
    ).join('');
    const optTotalEl = document.getElementById('sum-total-optima');
    if (optTotalEl) optTotalEl.textContent = fmt(res.optimaTotal) + '/мес';
  }
}

/* ─── Документы ──────────────────────────────── */
let lastKP = null, lastContract = null, lastInvoice = null;

function generateKP() {
  collectStep(11);
  clearErrs();
  const res = calcTotal();
  const { total, lines, hasIndividual, baseTotal, baseRaw, baseLines, standardTotal, standardLines, optimaTotal, optimaLines, disc } = res;
  if (!A.name) {
    setErr('err-final','Введите название клиента — вернитесь на шаг 11');
    return;
  }
  // Guard: не инкрементировать счётчик при повторном вызове
  const kpNum = lastKP ? lastKP.kpNum : nextNum('КП');
  const kpText = buildKPText(total, lines, hasIndividual, kpNum);
  lastKP = { text:kpText, kpNum, total, lines, hasIndividual, baseTotal, baseRaw, baseLines, standardTotal, standardLines, optimaTotal, optimaLines, disc };

  document.getElementById('kp-meta').textContent = `${kpNum} · ${todayLong()}`;
  const taxNames2 = { patent:'Патент', ausn_d:'АУСН Доходы', ausn_dr:'АУСН Доходы-Расходы', usn6:'УСН 6%', usn15:'УСН 15%', osno:'ОСНО' };
  document.getElementById('kp-price-base').textContent = new Intl.NumberFormat('ru-RU').format(baseTotal);
  document.getElementById('kp-price-std').textContent = new Intl.NumberFormat('ru-RU').format(standardTotal);
  document.getElementById('kp-price-opt').textContent = new Intl.NumberFormat('ru-RU').format(optimaTotal);
  document.getElementById('kp-summary-client').textContent = A.name + (A.entity ? ' · ' + A.entity : '') + (!A.isNull && A.tax ? ' · ' + (taxNames2[A.tax] || A.tax) : '');
  document.getElementById('kp-summary-valid').textContent = kpValidStr();

  // Breakdown
  const n = v => new Intl.NumberFormat('ru-RU').format(v) + ' ₽';
  const bdLine = (name, price, note) => {
    const notePart = note ? ' <span style="color:var(--gray-400);font-size:11px">(' + note + ')</span>' : '';
    return '<div class="kp-breakdown-line"><span class="bl-name">' + name + notePart + '</span><span class="bl-price">' + n(price) + '</span></div>';
  };
  const bdSep = () => '<div class="kp-breakdown-sep"></div>';
  const bdSec = label => `<div class="kp-breakdown-section">${label}</div>`;
  const discNum = Number(disc) || 0;
  const discAmt = discNum > 0 ? baseRaw - baseTotal : 0;
  let bdHtml = bdSec('Базовая');
  (baseLines || []).forEach(l => { bdHtml += bdLine(l.name, l.price); });
  if (discNum > 0) {
    bdHtml += '<div class="kp-breakdown-line" style="color:var(--accent)"><span class="bl-name">Скидка ' + discNum + '%</span><span class="bl-price" style="color:var(--accent)">−' + n(discAmt) + '</span></div>';
  }
  const hasStd = A.priorityManager || (A.taxMgmt && ['ausn_dr','usn15','osno'].includes(A.tax)) || A.officeBuh;
  if (hasStd) {
    bdHtml += bdSep() + bdSec('Доп. услуги Стандарт');
    if (A.priorityManager) bdHtml += bdLine('Приоритетный ответ менеджера', Math.round(baseTotal * 0.2), '20% от базовой');
    if (A.taxMgmt && ['ausn_dr','usn15','osno'].includes(A.tax)) bdHtml += bdLine('Налоговый менеджмент', P.tax_mgmt);
    if (A.officeBuh) bdHtml += bdLine(`Бухгалтер в офисе (${(A.officeBuhDays||5)*4} дн/мес)`, (A.officeBuhDays||5)*4*7500);
  }
  if (A.mgmtAcc) {
    bdHtml += bdSep() + bdSec('Доп. услуга Оптима');
    bdHtml += bdLine('Управленческий учёт', OPTIMA_BASE_PRICE);
  }
  const bdEl = document.getElementById('kp-breakdown');
  document.getElementById('kp-breakdown-lines').innerHTML = bdHtml;
  bdEl.style.display = 'block';

  const sec = document.getElementById('kp-sec');
  sec.style.display = 'block';
  document.getElementById('quiz-wrap').style.display = 'none';
  sec.scrollIntoView({ behavior:'smooth', block:'start' });

  showToast('КП сформировано');
}

function generateContract() {
  if (!lastKP) { showToast('Сначала сформируйте КП'); return; }
  if (!lastContract) lastContract = {};
  if (!lastContract.cNum) lastContract.cNum = nextNum('Д');
  const cNum = lastContract.cNum;
  const cText = buildContractText(lastKP.total, lastKP.lines, cNum);
  lastContract.text = cText;

  document.getElementById('contract-meta').textContent = `${cNum} · ${todayLong()}`;
  document.getElementById('contract-client').textContent = A.name || '—';
  document.getElementById('contract-num').textContent = cNum;
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
  buildKPDocx(EX, {name: A.name, inn: A.req.inn, director: A.director}, lastKP)
    .then(b => { downloadBlob(b, `КП_${safeF(A.name)}_${todayFile()}.docx`); showToast('КП скачивается'); saveToCloud(); })
    .catch(e => { console.error('KP docx error:', e); showToast('Ошибка формирования файла'); });
}
function downloadInvoice() {
  if (!lastKP) { showToast('КП не сформировано'); return; }
  // Фиксируем номер счёта при первом вызове, повторные — тот же номер
  if (!lastInvoice) lastInvoice = { invNum: nextNum('СЧ') };
  const invNum = lastInvoice.invNum;
  buildInvoiceDocx(EX, {name:A.name,inn:A.req.inn,kpp:A.req.kpp,address:A.req.address,phone:A.req.phone,email:A.req.email,rs:A.req.rs,bank:A.req.bank,bik:A.req.bik,ks:A.req.ks||''}, lastKP.lines, lastKP.optimaTotal, invNum)
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
  _cloudSaved = false;
  Object.assign(A, {
    entity:'', isNull:false, tax:'', niches:[],
    mp:[], mpInventory:false, vats:[],
    staffRf:'none', rfCount:4, staffForeign:'none', foreignCount:1,
    cashKassa:false, cashAvans:false,
    ved:false, reconcile:false,
    military:false, militaryCount:1, licenses:false, licenseCount:1, spot:false, spotCount:1,
    whInventory:false, rtInventory:false, addPatent:false,
    priorityManager:false,
    taxMgmt:false,
    officeBuh:false, officeBuhDays:5,
    mgmtAcc:false,
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
async function buildKPDocx(ex, client, kpData) {
  const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign, ImageRun,
  } = window.docx;

  const { kpNum, baseTotal, baseLines, standardTotal, optimaTotal, disc, baseRaw } = kpData;
  const fmtN = n => new Intl.NumberFormat('ru-RU').format(Math.round(n || 0));
  const validDate = new Date();
  validDate.setDate(validDate.getDate() + (Number(A.kpValidDays) || 5));
  const validDateStr = validDate.toLocaleDateString('ru-RU', { day:'2-digit', month:'long', year:'numeric' });
  const todayStr = new Date().toLocaleDateString('ru-RU', { day:'2-digit', month:'2-digit', year:'numeric' });

  const FONT = 'Arial';
  const ORANGE = 'E35611';
  const TOTAL_BG = 'FFF3EE';
  const TEXT = '222120';
  const GRAY = 'AAAAAA';
  const BORDER = 'E0E0E0';
  const WHITE = 'FFFFFF';
  const STRIPE = 'FAFAFA';

  // A4 margins 1134 → content 9638; table cols: 4819 + 3×1606
  const CONTENT = 9638;
  const COL1 = 4819;
  const COL_T = 1606;

  const bord = (c = BORDER) => {
    const s = { style: BorderStyle.SINGLE, size: 4, color: c };
    return { top: s, bottom: s, left: s, right: s };
  };
  const noBord = () => {
    const s = { style: BorderStyle.NONE, size: 0, color: WHITE };
    return { top: s, bottom: s, left: s, right: s };
  };

  const t = (text, opts = {}) => new TextRun({
    text, font: FONT,
    bold:    opts.bold    !== undefined ? opts.bold : false,
    size:    opts.size    || 20,
    color:   opts.color   || TEXT,
    italics: opts.italic  || false,
  });

  const p = (runs, align = AlignmentType.LEFT, spacing = { before: 0, after: 0 }) =>
    new Paragraph({ alignment: align, spacing, children: Array.isArray(runs) ? runs : [runs] });

  // Ячейка таблицы
  const cell = (para, w, bg, borders) => new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: bg ? { fill: bg, type: ShadingType.CLEAR } : undefined,
    borders: borders || bord(),
    margins: { top: 60, bottom: 60, left: 120, right: 60 },
    verticalAlign: VerticalAlign.CENTER,
    children: [para],
  });

  // Ячейка с галочкой/тире
  const chk = (yes, w = COL_T, bg) => new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: bg ? { fill: bg, type: ShadingType.CLEAR } : undefined,
    borders: bord(),
    margins: { top: 60, bottom: 60, left: 40, right: 40 },
    verticalAlign: VerticalAlign.CENTER,
    children: [p(t(yes ? '✓' : '—', { bold: yes, size: 22, color: yes ? '217346' : 'CCCCCC' }), AlignmentType.CENTER)],
  });

  // Строка таблицы с галочками
  const svcRow = (name, base, std, opt, stripe = false) => {
    const bg = stripe ? STRIPE : WHITE;
    return new TableRow({ children: [
      cell(p(t(name, { size: 19 })), COL1, bg),
      chk(base, COL_T, bg),
      chk(std,  COL_T, bg),
      chk(opt,  COL_T, bg),
    ]});
  };

  // Заголовок таблицы (оранжевый)
  const headRow = () => new TableRow({
    tableHeader: true,
    children: ['Наименование услуги', 'Базовая', 'Стандарт', 'Оптима'].map((label, i) =>
      new TableCell({
        width: { size: i === 0 ? COL1 : COL_T, type: WidthType.DXA },
        shading: { fill: ORANGE, type: ShadingType.CLEAR },
        borders: bord(ORANGE),
        margins: { top: 80, bottom: 80, left: i === 0 ? 120 : 40, right: 60 },
        verticalAlign: VerticalAlign.CENTER,
        children: [p(t(label, { bold: true, size: 20, color: WHITE }), i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER)],
      })
    ),
  });

  // Разделитель перед итогами
  const sepRow = () => new TableRow({
    children: [new TableCell({
      columnSpan: 4,
      width: { size: CONTENT, type: WidthType.DXA },
      shading: { fill: 'F5F5F5', type: ShadingType.CLEAR },
      borders: bord('E0E0E0'),
      margins: { top: 4, bottom: 4, left: 0, right: 0 },
      children: [p(t(''))],
    })],
  });

  // Строка с названиями тарифов (перед итогами)
  const tariffLabelRow = () => new TableRow({
    children: [
      cell(p(t('')), COL1, WHITE, noBord()),
      ...[['Базовая', COL_T], ['Стандарт', COL_T], ['Оптима', COL_T]].map(([label, w]) =>
        new TableCell({
          width: { size: w, type: WidthType.DXA },
          borders: noBord(),
          margins: { top: 40, bottom: 40, left: 40, right: 40 },
          children: [p(t(label, { bold: true, size: 18, color: ORANGE }), AlignmentType.CENTER)],
        })
      ),
    ],
  });

  // Строки итогов
  const totalCell = (text, w, isFirst = false, topLine = false) => {
    const b = topLine ? bord('D0A000') : {
      top: { style: BorderStyle.NONE, size: 0, color: WHITE },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: 'E8D080' },
      left:   { style: BorderStyle.SINGLE, size: 2, color: 'E8D080' },
      right:  { style: BorderStyle.SINGLE, size: 2, color: 'E8D080' },
    };
    return new TableCell({
      width: { size: w, type: WidthType.DXA },
      shading: { fill: TOTAL_BG, type: ShadingType.CLEAR },
      borders: b,
      margins: { top: 80, bottom: 80, left: isFirst ? 120 : 40, right: 60 },
      verticalAlign: VerticalAlign.CENTER,
      children: [p(t(text, { bold: true, size: 19, color: TEXT }), isFirst ? AlignmentType.LEFT : AlignmentType.CENTER)],
    });
  };

  const totalRow = (label, b, s, o, topLine = false) => new TableRow({ children: [
    totalCell(label, COL1, true, topLine),
    totalCell(b, COL_T, false, topLine),
    totalCell(s, COL_T, false, topLine),
    totalCell(o, COL_T, false, topLine),
  ]});

  // Блок итогов
  const discNum = Number(disc) || 0;
  // Восстанавливаем цены до скидки для каждого тарифа отдельно
  const baseRaw2 = discNum > 0 ? Math.round(baseTotal / (1 - discNum / 100)) : baseTotal;
  const stdRaw   = discNum > 0 ? Math.round(standardTotal / (1 - discNum / 100)) : standardTotal;
  const optRaw   = discNum > 0 ? Math.round(optimaTotal / (1 - discNum / 100)) : optimaTotal;
  const baseDiscAmt = baseRaw2 - baseTotal;
  const stdDiscAmt  = stdRaw - standardTotal;
  const optDiscAmt  = optRaw - optimaTotal;

  const totalRows = discNum > 0 ? [
    totalRow('Стоимость пакета',     `${fmtN(baseRaw2)} ₽/мес.`,  `${fmtN(stdRaw)} ₽/мес.`,       `${fmtN(optRaw)} ₽/мес.`,       true),
    totalRow(`Скидка ${discNum}%`,   `−${fmtN(baseDiscAmt)} ₽`,   `−${fmtN(stdDiscAmt)} ₽`,        `−${fmtN(optDiscAmt)} ₽`,        false),
    totalRow('Стоимость со скидкой', `${fmtN(baseTotal)} ₽/мес.`, `${fmtN(standardTotal)} ₽/мес.`, `${fmtN(optimaTotal)} ₽/мес.`,  false),
  ] : [
    totalRow('Стоимость пакета', `${fmtN(baseTotal)} ₽/мес.`, `${fmtN(standardTotal)} ₽/мес.`, `${fmtN(optimaTotal)} ₽/мес.`, true),
  ];

  // Загрузка логотипа (квадратный 512×512 → показываем 72×72)
  let logoBuf = null;
  try {
    const resp = await fetch('logo.png');
    if (resp.ok) logoBuf = await resp.arrayBuffer();
  } catch (_) {}

  // Шапка-таблица: лого слева + реквизиты справа (как в референсе)
  const noBordStyle = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  const noBordAll = { top: noBordStyle, bottom: noBordStyle, left: noBordStyle, right: noBordStyle };

  const headerTable = new Table({
    width: { size: CONTENT, type: WidthType.DXA },
    columnWidths: [2268, 7370],
    borders: { top: noBordStyle, bottom: noBordStyle, left: noBordStyle, right: noBordStyle, insideH: noBordStyle, insideV: noBordStyle },
    rows: [new TableRow({ children: [
      // Ячейка с логотипом
      new TableCell({
        width: { size: 2268, type: WidthType.DXA },
        borders: noBordAll,
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 0, bottom: 0, left: 0, right: 120 },
        children: [new Paragraph({
          spacing: { before: 0, after: 0 },
          children: logoBuf ? [new ImageRun({
            type: 'png', data: logoBuf,
            transformation: { width: 132, height: 42 },
            altText: { title: 'Логотип', description: 'Логотип', name: 'Логотип' },
          })] : [],
        })],
      }),
      // Ячейка с реквизитами (правое выравнивание)
      new TableCell({
        width: { size: 7370, type: WidthType.DXA },
        borders: noBordAll,
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 0, bottom: 0, left: 120, right: 0 },
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { before: 0, after: 0 },
          children: [
            t(ex.name || '', { bold: true, size: 24 }),
            ...(ex.address ? [t(ex.address, { size: 18, color: '444444' })] : []).flatMap(r => [new TextRun({ text: '', break: 1 }), r]),
            ...(ex.phone   ? [t(ex.phone,   { size: 18, color: '444444' })] : []).flatMap(r => [new TextRun({ text: '', break: 1, font: FONT }), r]),
            ...(ex.email   ? [t(ex.email,   { size: 18, color: '444444' })] : []).flatMap(r => [new TextRun({ text: '', break: 1, font: FONT }), r]),
            new TextRun({ text: 'buhstart.ru', font: FONT, size: 18, color: '444444', break: 1 }),
          ],
        })],
      }),
    ]})],
  });

  // Используем глобальный SERVICE_DESCS через getServiceDescription
  function kpDesc(name) { return getServiceDescription(name); }

  // Строки появляются только если выбраны, галочка — только в колонке своего тарифа
  const taxQualifies = ['ausn_dr','usn15','osno'].includes(A.tax);
  const baseCount = (baseLines || []).length;
  const svcRows = [
    ...(baseLines || []).map((l, i) => svcRow(kpDesc(l.name), true, true, true, i % 2 === 1)),
    svcRow('Гарантированный приоритетный ответ менеджера в течение рабочего дня', false, !!A.priorityManager, false, baseCount % 2 === 0),
    svcRow('Проведение консультаций по налогообложению, оптимизация налоговой нагрузки', false, !!(A.taxMgmt && taxQualifies), false, baseCount % 2 === 1),
    svcRow(A.officeBuh ? `Присутствие бухгалтера от компании (аутстаффинг) в офисе заказчика — ${(A.officeBuhDays||5)*4} рабочих дней в месяц` : 'Присутствие бухгалтера от компании (аутстаффинг) в офисе заказчика', false, !!A.officeBuh, false, baseCount % 2 === 0),
    svcRow('Построение ОДДС и ОПиУ, расчёт и анализ ключевых показателей прибыльности компании', false, false, !!A.mgmtAcc, baseCount % 2 === 1),
  ];

  // Параграф-разделитель
  const gap = (sz = 100) => new Paragraph({ spacing: { before: 0, after: sz }, children: [] });

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
        },
      },
      children: [
        // Шапка: лого + реквизиты
        headerTable,

        // Оранжевая линия-разделитель
        new Paragraph({
          spacing: { before: 140, after: 140 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: 'E57413', space: 1 } },
          children: [],
        }),

        // Заголовок КП — по центру
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 20 },
          children: [t(`Коммерческое предложение №${kpNum}`, { bold: true, size: 32 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 80 },
          children: [t(`от ${todayStr}`, { size: 20, color: GRAY })],
        }),
        new Paragraph({
          spacing: { before: 0, after: 20 },
          children: [t(`Кому: ${client.name || ''}`, { bold: false, size: 21 })],
        }),
        new Paragraph({
          spacing: { before: 0, after: 120 },
          children: [t(`Руководителю: ${client.director || ''}`, { bold: false, size: 21 })],
        }),

        // Вводный текст
        new Paragraph({
          spacing: { before: 0, after: 80 },
          children: [t(
            'В продолжение нашего разговора высылаем коммерческое предложение на бухгалтерское обслуживание вашей организации. ' +
            'Ниже представлены три варианта сотрудничества — от базового пакета до полного сопровождения с управленческим учётом.',
            { size: 21 }
          )],
        }),
        new Paragraph({
          spacing: { before: 0, after: 200 },
          children: [t(
            `${ex.name || 'Компания'} успешно работает с 2003 года и за более чем 20 лет показала высокий уровень профессионализма ` +
            'в налоговом и бухгалтерском сопровождении. В штате компании трудятся 17 бухгалтеров и аудиторов, юристы и программисты, ' +
            'а также 39 удалённых экономистов, что позволяет выполнять проекты любой сложности. ' +
            'Мы несём полную материальную ответственность за оказываемые услуги, что закреплено в договоре.',
            { size: 21 }
          )],
        }),

        // Таблица сравнения
        new Table({
          width: { size: CONTENT, type: WidthType.DXA },
          columnWidths: [COL1, COL_T, COL_T, COL_T],
          rows: [
            headRow(),
            ...svcRows,
            sepRow(),
            tariffLabelRow(),
            ...totalRows,
          ],
        }),

        gap(80),

        // Сноска и срок действия
        new Paragraph({
          spacing: { before: 0, after: 60 },
          children: [t(
            '* Окончательная стоимость услуг определяется после двух месяцев обслуживания, исходя из фактического объёма операций.',
            { size: 18, italic: true, color: '555555' }
          )],
        }),
        new Paragraph({
          spacing: { before: 0, after: 200 },
          children: [t(`Предложение действует до ${validDateStr}`, { bold: true, size: 22 })],
        }),

        // О компании
        new Paragraph({
          spacing: { before: 0, after: 60 },
          children: [t('О компании', { bold: true, size: 28 })],
        }),
        new Paragraph({
          spacing: { before: 0, after: 180 },
          children: [t(
            `${ex.name || 'Компания'} успешно работает с 2003 года и за более чем 20 лет показала высокий уровень профессионализма ` +
            'в налоговом и бухгалтерском сопровождении. В штате компании трудятся 17 бухгалтеров и аудиторов, юристы и программисты, ' +
            'а также 39 удалённых экономистов, что позволяет выполнять проекты любой сложности. ' +
            'Мы несём полную материальную ответственность за оказываемые услуги, что закреплено в договоре.',
            { size: 20 }
          )],
        }),

        // Условия сотрудничества
        new Paragraph({
          spacing: { before: 0, after: 60 },
          children: [t('Условия сотрудничества', { bold: true, size: 28 })],
        }),
        new Paragraph({
          spacing: { before: 0, after: 60 },
          children: [t(
            'При заключении договора вносится предоплата в размере 50% от стоимости (не менее 20 000 рублей). ' +
            'Первые два месяца обслуживания стоимость рассчитывается по факту выполненных работ. ' +
            'По прошествии двух месяцев стороны согласуют фиксированную ежемесячную стоимость.',
            { size: 20 }
          )],
        }),
        new Paragraph({
          spacing: { before: 0, after: 200 },
          children: [t('Подробнее на сайте: buhstart.ru', { size: 20 })],
        }),

        // Подпись
        new Paragraph({
          spacing: { before: 0, after: 20 },
          children: [
            t('Руководитель  ___________ ', { size: 22 }),
            t(ex.director || ex.name || '', { size: 22 }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 0 },
          children: [t(ex.name || '', { bold: true, size: 22 })],
        }),
      ],
    }],
  });

  return Packer.toBlob(doc);
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
  // Счёт выставляется на максимальный тариф (Оптима), переданный как total
  // Предоплата: 50%, но не менее 20 000 ₽
  const finalTotal = Math.max(Math.round(total * 0.5), PREPAYMENT_AMOUNT);
  const fmtN = function(n){ return new Intl.NumberFormat('ru-RU',{minimumFractionDigits:0,maximumFractionDigits:0}).format(n||0); };
  const fmtI = function(n){ return new Intl.NumberFormat('ru-RU').format(Math.round(n||0)); };

  const data = {
    invoice_number: String(invNum),
    invoice_date: today_s,
    client_name: client.name || '',
    client_inn: client.inn || '',
    client_address: client.address || '',
    client_phone: client.phone || '',
    services: [{ index: '1', service_name: 'Предоплата за бухгалтерское обслуживание', quantity: '1', unit: 'усл.', price: fmtN(finalTotal), sum: fmtN(finalTotal) }],
    subtotal_amount:  fmtN(finalTotal),
    show_discount:    false,
    discount_percent: '',
    discount_amount:  '',
    total_amount:     fmtN(finalTotal),
    total_amount_words: _rubles2words(finalTotal).replace(/ \d{2} коп\.$/, ''),
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
const SERVICE_DESCS = {
  'Нулевая отчётность (ИП)': 'Подготовка и сдача отчётности ИП без оборотов, контроль оплаты фиксированных взносов ИП на социальное страхование',
  'Нулевая отчётность (ООО)': 'Подготовка и сдача отчётности юридического лица без оборотов, бухгалтерского баланса с отчётом о финансовых результатах, включая отчётность по физлицам, контроль оплаты взносов с МРОТ за руководителя',
  'Нулевая отчётность': 'Подготовка и сдача отчётности без оборотов, контроль оплаты фиксированных взносов',
  'Маркетплейс РВБ (любой первый)': 'Загрузка документов из личного кабинета маркетплейсов, учёт продаж и комиссий',
  'Wildberries': 'Загрузка документов из личного кабинета Wildberries, учёт продаж и комиссий',
  'Ozon': 'Загрузка документов из личного кабинета Ozon, учёт продаж и комиссий',
  'Яндекс Маркет': 'Загрузка документов из личного кабинета Яндекс Маркет, учёт продаж и комиссий',
  'Товарный учёт': 'Учёт номенклатуры товаров, приходов и списаний, ведение складского учёта',
  'в т.ч. товарный учёт': 'Учёт номенклатуры товаров, приходов и списаний, ведение складского учёта',
  'Оптовая торговля': 'Товарно-складской учёт, ЭДО, сверки, контроль дебиторской задолженности',
  'Розничная торговля': 'Товарно-складской учёт, ежедневная выручка по кассе, учёт розничных товаров',
  'Производство': 'Учёт затрат и калькулирование себестоимости, учёт сырья и материалов',
  'Строительство': 'Оформление первичных документов, пообъектный учёт затрат, учёт НЗП и взаиморасчётов с заказчиками и субподрядчиками',
  'Общепит': 'Работа с технологическими картами и расчёт себестоимости, товарно-складской учёт',
  'Медицина': 'Учёт материально-производственных запасов, медицинского оборудования, учёт расчётов с фондами ДМС, ОМС и пациентами',
  'Услуги прочие': 'Создание и сбор счётов, договоров, актов выполненных услуг, УПД',
  'ООО': 'Подготовка и сдача бухгалтерского баланса с отчётом о финансовых результатах, ведение учёта в соответствии с требованиями для юридических лиц',
  'Патент': 'Учёт списаний и поступлений, подготовка книги по патенту, контроль оплаты налогов и взносов ИП на социальное страхование',
  'Патент (доп.)': 'Подготовка книги учёта доходов по патенту, контроль сроков действия и своевременной оплаты патента',
  'АУСН Доходы': 'Учёт списаний и поступлений, контроль правильности отображения в личном кабинете АУСН',
  'АУСН Доходы-Расходы': 'Учёт списаний и поступлений, контроль правильности отображения в личном кабинете АУСН',
  'УСН 6%': 'Учёт списаний и поступлений, подготовка и сдача уведомлений по УСН и декларации при УСН',
  'УСН 15%': 'Учёт списаний и поступлений, ввод первичной бухгалтерской документации по доходам и расходам, подготовка и сдача деклараций при УСН',
  'ОСНО': 'Подготовка и сдача бухгалтерского баланса с отчётом о финансовых результатах, учёт основных средств, НМА, учёт расчётов с контрагентами',
  'НДС не облагается': 'Подтверждение отсутствия обязанности по уплате НДС',
  'Освобождение от НДС (ст.145)': 'Подготовка уведомления об освобождении от НДС по статье 145 НК РФ',
  'НДС 0%': 'Подготовка и сдача декларации по НДС по ставке 0%',
  'НДС 5%': 'Подготовка и сдача декларации по НДС по ставке 5%',
  'НДС 7%': 'Подготовка и сдача декларации по НДС по ставке 7%',
  'НДС 10%': 'Подготовка и сдача декларации по НДС по ставке 10%',
  'НДС 22%': 'Подготовка и сдача декларации по НДС по ставке 22%',
  'Сотрудники РФ (1–3 чел.)': 'Оформление приёмов, кадровых перемещений, отпусков, больничных листов, увольнений сотрудников, начисление и выплата заработной платы 1–3 сотрудникам, налогов с заработной платы, подготовка и сдача отчётности по физлицам',
  'Касса (ККМ)': 'Сверка поступлений с ОФД, учёт наличных денежных средств, контроль кассового остатка',
  'Авансовые отчёты': 'Подготовка и загрузка авансовых отчётов от подотчётных лиц',
  'ВЭД / Валютные расчёты': 'Учёт экспортных и импортных операций, подача таможенных деклараций',
  'Сверки с контрагентами': 'Подготовка и подписание актов сверки с поставщиками, подрядчиками, покупателями и заказчиками',
  'Налоговый менеджмент': 'Проведение консультаций по налогообложению, оптимизация налоговой нагрузки',
  'Воинский учёт': 'Постановка на воинский учёт, ведение документации и сдача отчётности',
  'Лицензионная отчётность': 'Подготовка и сдача отчётности по лицензируемым видам деятельности',
  'Управленческий учёт': 'Построение ОДДС и ОПиУ, расчёт и анализ ключевых показателей прибыльности компании, построение управленческого баланса и финансовой модели компании',
  'Бухгалтер в офисе': 'Присутствие бухгалтера от компании (аутстаффинг) в офисе заказчика в течение рабочего дня',
  'Приоритетная скорость ответа менеджера': 'Гарантированный приоритетный ответ менеджера в течение рабочего дня',
  'СПОТ': 'Разовая обработка первичных документов вне рамок абонентского обслуживания',
};

function getServiceDescription(name) {
  // Нулёвка зависит от типа организации
  if (name === 'Нулевая отчётность') {
    return A.entity === 'ООО' ? SERVICE_DESCS['Нулевая отчётность (ООО)'] : SERVICE_DESCS['Нулевая отчётность (ИП)'];
  }
  if (SERVICE_DESCS[name]) return SERVICE_DESCS[name];
  // Динамические названия с числами
  if (name.startsWith('Сотрудники РФ')) {
    const m = name.match(/(\d+) чел/);
    const n = m ? `${m[1]} сотрудникам` : '1–3 сотрудникам';
    return `Оформление приёмов, кадровых перемещений, отпусков, больничных листов, увольнений сотрудников, начисление и выплата заработной платы ${n}, налогов с заработной платы, подготовка и сдача отчётности по физлицам`;
  }
  if (name.startsWith('Иностранные сотрудники')) {
    const m = name.match(/(\d+) чел/);
    return `Подача уведомлений в МВД о заключении трудовых договоров с иностранными гражданами, начисление и выплата заработной платы ${m ? m[1] : 'N'} сотрудникам`;
  }
  if (name.startsWith('Воинский учёт')) {
    const m = name.match(/(\d+) чел/);
    return `Постановка на воинский учёт, ведение документации и сдача отчётности по ${m ? m[1] : 'N'} сотрудникам`;
  }
  if (name.startsWith('Лицензионная отчётность')) {
    const m = name.match(/(\d+) лиц/);
    return `Подготовка и сдача отчётности по лицензируемым видам деятельности (${m ? m[1] : 1} лиц.)`;
  }
  if (name.startsWith('СПОТ')) {
    const m = name.match(/(\d+) док/);
    return `Разовая обработка первичных документов вне рамок абонентского обслуживания (${m ? m[1] : 1} документов)`;
  }
  if (name.startsWith('Бухгалтер в офисе')) {
    const m = name.match(/(\d+) смен/);
    return `Присутствие бухгалтера от компании (аутстаффинг) в офисе заказчика — ${m ? m[1] : 20} рабочих дней в месяц`;
  }
  return name;
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
    // Предоплата 50%, но не менее 20 000 ₽
    amount:       _fmt(Math.max(Math.round(total * 0.5), PREPAYMENT_AMOUNT)),
    amount_words: _rubles2words(Math.max(Math.round(total * 0.5), PREPAYMENT_AMOUNT)).replace(/ \d{2} коп\.$/, ''),
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

var _cloudSaved = false;
async function saveToCloud() {
  if (!APPS_SCRIPT_URL || !lastKP) return;
  if (_cloudSaved) return;
  _cloudSaved = true;

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

    var kpBlob = await buildKPDocx(EX, {name:A.name, inn:A.req.inn, director:A.director}, lastKP);
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
  // Генерируем список юрлиц из массива EXECUTORS
  var execList = document.getElementById('exec-list');
  if (execList) {
    execList.innerHTML = EXECUTORS.map(function(e, i) {
      return '<label class="exec-opt">' +
        '<input type="radio" name="exec" value="' + i + '"' + (i === 0 ? ' checked' : '') + ' onchange="pickExec(' + i + ')"/>' +
        '<div class="exec-info">' +
          '<span class="exec-name">' + e.name + '</span>' +
          '<span class="exec-inn">ИНН ' + e.inn + '</span>' +
        '</div></label>';
    }).join('');
  }
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
