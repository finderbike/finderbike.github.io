(function () {
  'use strict';

  var L = window.FB_I18N, LANGS = window.FB_LANGS;
  var CODES = LANGS.map(function (x) { return x.code; });
  var TG_USER = 'finderbike';
  var WA_PHONE = '79936256756';

  // Прайс основного проката-партнёра, бриф: specs/2026-11-14-brif-sajt-vitrina.md
  // h = высокий сезон (15.10-31.03), l = низкий (с 01.04): [1+ день, 3+ дня, 7+ дней, 1+ мес, 2+ мес, 3+ мес] (дни: за день, месяцы: за месяц)
  // dep = залог, cc = объём. Сумма на срок считается в assets/price.js так же, как калькулятор на сайте проката
  var BIKES = [
    { id: 'scoopy-110cc-standard', name: 'Scoopy 110', cls: '125', cc: 110, h: [400, 270, 230, 4000, 3800, 3500], l: [350, 230, 200, 3500, 3200, 3000], dep: 3000 },
    { id: 'click-125cc-standard', name: 'Click 125', cls: '125', cc: 125, h: [450, 300, 260, 4500, 4300, 4000], l: [400, 270, 230, 4000, 3700, 3500], dep: 3000 },
    { id: 'click-160cc-standard', name: 'Click 160 Standard', cls: '160', cc: 160, h: [500, 340, 290, 5000, 4800, 4500], l: [400, 270, 230, 4000, 3700, 3500], dep: 3000, two: 1 },
    { id: 'click-160cc-abs', name: 'Click 160 ABS', cls: '160', cc: 160, h: [550, 370, 320, 5500, 5300, 5000], l: [450, 300, 260, 4500, 4200, 4000], dep: 3000, two: 1, abs: 1 },
    { id: 'click-160cc-abs-new-gen', name: 'Click 160 ABS New Gen', cls: '160', cc: 160, h: [600, 400, 350, 6000, 5800, 5500], l: [500, 340, 290, 5000, 4700, 4500], dep: 3000, two: 1, abs: 1 },
    { id: 'giorno-125cc-abs', name: 'Giorno 125 ABS', cls: '125', cc: 125, h: [600, 400, 350, 6000, 5800, 5500], l: [500, 340, 290, 5000, 4700, 4500], dep: 3000, abs: 1 },
    { id: 'pcx-160cc-standard', name: 'PCX 160 Standard', cls: '160', cc: 160, h: [650, 440, 370, 6500, 6300, 6000], l: [550, 370, 320, 5500, 5200, 5000], dep: 3000, two: 1 },
    { id: 'pcx-160cc-abs', name: 'PCX 160 ABS', cls: '160', cc: 160, h: [700, 470, 400, 7000, 6800, 6500], l: [600, 400, 350, 6000, 5700, 5500], dep: 3000, two: 1, abs: 1 },
    { id: 'adv-160cc-abs', name: 'ADV 160 ABS', cls: '160', cc: 160, h: [750, 500, 430, 7500, 7300, 7000], l: [650, 440, 370, 6500, 6200, 6000], dep: 3000, two: 1, abs: 1 },
    { id: 'pcx-160cc-roadsync', name: 'PCX 160 RoadSync', cls: '160', cc: 160, h: [800, 540, 460, 8000, 7800, 7500], l: [700, 470, 400, 7000, 6700, 6500], dep: 3000, two: 1, rs: 1 },
    { id: 'adv-160cc-roadsync', name: 'ADV 160 RoadSync', cls: '160', cc: 160, h: [850, 570, 490, 8500, 8300, 8000], l: [750, 500, 430, 7500, 7200, 7000], dep: 3000, two: 1, rs: 1 },
    { id: 'forza-350cc-abs', name: 'Forza 350 ABS', cls: '350', cc: 350, h: [1500, 1000, 860, 15000, 13500, 12000], l: [1200, 800, 690, 12000, 11000, 10000], dep: 7000, two: 1, abs: 1 },
    { id: 'adv-350cc-abs', name: 'ADV 350 ABS', cls: '350', cc: 350, h: [1500, 1000, 860, 15000, 13500, 12000], l: [1200, 800, 690, 12000, 11000, 10000], dep: 7000, two: 1, abs: 1, studio: 1 },
    { id: 'adv-350cc-roadsync', name: 'ADV 350 RoadSync', cls: '350', cc: 350, h: [1800, 1200, 1000, 18000, 16500, 15000], l: [1500, 1000, 860, 15000, 13500, 12000], dep: 7000, two: 1, rs: 1 },
    { id: 'forza-350cc-roadsync', name: 'Forza 350 RoadSync', cls: '350', cc: 350, h: [1800, 1200, 1000, 18000, 16500, 15000], l: [1500, 1000, 860, 15000, 13500, 12000], dep: 7000, two: 1, rs: 1 }
  ];
  // Размеры фото галерей img/g/<id>/<n>.webp (ширина, высота)
  var G = {"scoopy-110cc-standard":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"click-125cc-standard":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"click-160cc-standard":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"click-160cc-abs":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"click-160cc-abs-new-gen":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"giorno-125cc-abs":[[1100,825],[1100,825],[1100,825],[1100,825],[1100,825],[1100,825]],"pcx-160cc-standard":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"pcx-160cc-abs":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"adv-160cc-abs":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"pcx-160cc-roadsync":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"adv-160cc-roadsync":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"forza-350cc-abs":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"adv-350cc-abs":[[640,480],[640,480],[1100,778],[1100,778],[800,600]],"adv-350cc-roadsync":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"forza-350cc-roadsync":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]]};
  var CLS = [['125', '110-125 cc'], ['160', '160 cc'], ['350', '350 cc']];
  var FREE_AREAS = [0, 1, 4, 5]; // Карон, Ката, Сурин, Бангтао
  var LOCALE = { ru: 'ru-RU', en: 'en-GB', de: 'de-DE', fr: 'fr-FR', zh: 'zh-CN' };

  var lang = document.documentElement.getAttribute('data-lang');
  if (CODES.indexOf(lang) < 0) lang = 'en';

  var PR = window.FB_PRICE;
  var DURS = [3, 7, 14, 30, 60, 90];
  var S = {
    dur: null, from: '', to: '', area: '', sort: 'asc', point: '',
    cc: {}, two: false, abs: false, rs: false
  };
  var R = { bike: null, what: 0, exp: null };

  function $(id) { return document.getElementById(id); }
  function byId(id) { return BIKES.filter(function (b) { return b.id === id; })[0]; }
  function t(k, lg) {
    lg = lg || lang;
    var v = L[lg] && L[lg][k];
    if (v == null || v === '') v = (L.en[k] != null && lg !== 'ru') ? L.en[k] : L.ru[k];
    return v == null ? '' : v;
  }
  function f(k, vars, lg) {
    var s = t(k, lg);
    for (var x in vars) s = s.split('{' + x + '}').join(vars[x]);
    return s;
  }
  function money(n, lg) {
    lg = lg || lang;
    if (lg === 'en' || lg === 'zh') return '฿' + n.toLocaleString('en-US');
    if (lg === 'de') return n.toLocaleString('de-DE') + '\u00a0฿';
    return n.toLocaleString('ru-RU').replace(/[\s\u202f]/g, '\u00a0') + '\u00a0฿';
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function icon(id) { return '<svg aria-hidden="true"><use href="#' + id + '"/></svg>'; }
  function isoToday() {
    var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  // ---------- dates / tariff ----------
  function days() {
    if (!S.from || !S.to) return null;
    var n = Math.round((new Date(S.to + 'T12:00:00') - new Date(S.from + 'T12:00:00')) / 864e5);
    return n > 0 ? Math.min(n, PR.MAX) : null;
  }
  // Срок для расчёта: даты важнее выбранного чипа
  function term() { return days() || S.dur || null; }
  function startIso() { return S.from && days() ? S.from : isoToday(); }
  function season() { return PR.seasonOf(startIso()); }
  // Что показать по байку: без срока - «от» по ставке 3+ месяцев текущего сезона, со сроком - сумма как в калькуляторе проката
  function price(b) {
    var n = term();
    if (!n) {
      // Ставка 3+ месяцев за сутки: в высокий сезон m/30, в низкий прокат округляет вверх
      var m = b[season()][5], sd = season() === 'h' ? Math.round(m / 30) : Math.ceil(m / 30);
      return { from: true, total: m, perDay: sd, n: 0 };
    }
    var q = PR.quote(b, n, startIso()); q.n = n; return q;
  }
  function durLabel(n, lg) {
    var k = { 7: 'dur.w1', 14: 'dur.w2', 30: 'dur.m1', 60: 'dur.m2', 90: 'dur.m3' }[n];
    return k ? t(k, lg) : daysText(n, lg);
  }
  function priceMain(q) {
    return q.from
      ? { b: f('price.from', { p: money(q.perDay) }), s: t('suf.3') }
      : { b: money(q.perDay), s: t('suf.0') };
  }
  function priceSubs(q) {
    var out = [];
    if (q.from) return out;
    if (q.n > 1) out.push('<p class="card__sub">' + esc(f('calc.total', { p: money(q.total), d: daysText(q.n) })) + '</p>');
    if (q.save >= 5) out.push('<p class="save">' + esc(f('calc.save', { n: q.save })) + '</p>');
    if (q.cap) out.push('<p class="card__sub card__cap">' + esc(t('calc.cap' + q.cap)) + '</p>');
    return out;
  }
  function daysText(n, lg) {
    lg = lg || lang;
    var cat = 'many';
    try { cat = new Intl.PluralRules(LOCALE[lg]).select(n); } catch (e) {}
    var k = cat === 'one' ? 'days.one' : cat === 'few' ? 'days.few' : 'days.many';
    return f(k, { n: n }, lg);
  }
  function fmtShort(v) {
    var d = new Date(v + 'T12:00:00');
    return d.toLocaleDateString(LOCALE[lang], { day: 'numeric', month: 'short' });
  }
  function fmtMsgDate(v, ml) {
    if (!v) return '?';
    var d = new Date(v + 'T12:00:00');
    return ml === 'ru'
      ? d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  // ---------- flags ----------
  function star(cx, cy, r, rot) {
    var pts = [];
    for (var i = 0; i < 10; i++) {
      var a = (rot || 0) + Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * 0.382 : r;
      pts.push((cx + rr * Math.cos(a)).toFixed(2) + ',' + (cy + rr * Math.sin(a)).toFixed(2));
    }
    return '<polygon fill="#ffde00" points="' + pts.join(' ') + '"/>';
  }
  function flag(code) {
    var b = '<svg viewBox="0 0 30 20" preserveAspectRatio="none" aria-hidden="true">';
    if (code === 'ru') b += '<rect width="30" height="20" fill="#fff"/><rect y="6.67" width="30" height="6.67" fill="#0039a6"/><rect y="13.33" width="30" height="6.67" fill="#d52b1e"/>';
    else if (code === 'de') b += '<rect width="30" height="20" fill="#000"/><rect y="6.67" width="30" height="6.67" fill="#dd0000"/><rect y="13.33" width="30" height="6.67" fill="#ffce00"/>';
    else if (code === 'fr') b += '<rect width="30" height="20" fill="#fff"/><rect width="10" height="20" fill="#0055a4"/><rect x="20" width="10" height="20" fill="#ef4135"/>';
    else if (code === 'zh') b += '<rect width="30" height="20" fill="#de2910"/>' + star(5, 5, 3) + star(10, 2, 1, .4) + star(12, 4, 1, .9) + star(12, 7, 1, 0) + star(10, 9, 1, .4);
    else b += '<rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.6"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#c8102e" stroke-width="3.4"/>';
    return b + '</svg>';
  }

  // ---------- language ----------
  function renderLangMenu() {
    $('langFlag').innerHTML = flag(lang);
    $('langCode').textContent = lang.toUpperCase();
    $('langMenu').innerHTML = LANGS.map(function (x) {
      return '<li><button type="button" data-lang="' + x.code + '" lang="' + x.code + '" aria-current="' + (x.code === lang) + '">' +
        '<span class="flag">' + flag(x.code) + '</span><span>' + x.name + '</span><span class="lang__mc">' + x.code.toUpperCase() + '</span></button></li>';
    }).join('');
  }
  function toggleLang(open) {
    var btn = $('langBtn'), menu = $('langMenu');
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    if (open) {
      var cur = menu.querySelector('[aria-current="true"]') || menu.querySelector('button');
      cur.focus();
    }
  }
  function setLang(code) {
    lang = code;
    try { localStorage.setItem('fb-lang', code); } catch (e) {}
    try { var u = new URL(location.href); u.searchParams.set('lang', code); history.replaceState(null, '', u); } catch (e) {}
    applyLang();
  }
  function applyLang() {
    var html = document.documentElement;
    html.lang = lang === 'zh' ? 'zh-Hans' : lang;
    html.setAttribute('data-lang', lang);
    document.title = t('meta.title');
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.desc'));
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var p = pair.split(':'); el.setAttribute(p[0], t(p[1]));
      });
    });
    $('ftReply').hidden = !L[lang]['foot.reply'];
    // RU: главная кнопка Telegram, остальные языки: WhatsApp
    var send = $('reqSend'), tg = $('sendTg'), wa = $('sendWa');
    if (lang === 'ru') send.insertBefore(tg, wa); else send.insertBefore(wa, tg);
    renderLangMenu();
    renderAreaSelect($('sArea'), S.area);
    renderSort();
    renderAll();
    if ($('gal').open && galBike) renderGalPanel();
    if ($('req').open) renderReq();
    applyMapLang();
    html.className = html.className.replace(' i18n-wait', '');
  }

  // ---------- search ----------
  function renderAreaSelect(sel, val) {
    var areas = t('areas');
    sel.innerHTML = '<option value="">' + esc(t('s.areaAny')) + '</option>' +
      areas.map(function (a, i) { return '<option value="' + i + '">' + esc(a) + '</option>'; }).join('');
    sel.value = val;
  }
  function syncDateMins(fromEl, toEl) {
    var today = isoToday();
    fromEl.min = today;
    toEl.min = fromEl.value || today;
    if (toEl.value && fromEl.value && toEl.value <= fromEl.value) toEl.value = '';
  }

  // ---------- results ----------
  function renderSort() {
    var sel = $('sort');
    sel.innerHTML = '<option value="asc">' + esc(t('sort.asc')) + '</option><option value="desc">' + esc(t('sort.desc')) + '</option>';
    sel.value = S.sort;
  }
  function activeFilters() {
    var n = Object.keys(S.cc).filter(function (k) { return S.cc[k]; }).length;
    return n + (S.two ? 1 : 0) + (S.abs ? 1 : 0) + (S.rs ? 1 : 0);
  }
  function visible() {
    var anyCc = Object.keys(S.cc).some(function (k) { return S.cc[k]; });
    var list = BIKES.filter(function (b) {
      if (anyCc && !S.cc[b.cls]) return false;
      if (S.two && !b.two) return false;
      if (S.abs && !b.abs) return false;
      if (S.rs && !b.rs) return false;
      return true;
    });
    list = list.map(function (b, i) { return { b: b, i: BIKES.indexOf(b) }; });
    list.sort(function (x, y) {
      var d = price(x.b).total - price(y.b).total;
      if (S.sort === 'desc') d = -d;
      return d || x.i - y.i;
    });
    return list.map(function (x) { return x.b; });
  }
  function renderFilters(box) {
    var cnt = function (fn) { return BIKES.filter(fn).length; };
    var ck = function (attr, val, label, n, on, hint) {
      return '<label class="ck"><input type="checkbox" data-f="' + attr + '"' + (val ? ' value="' + val + '"' : '') + (on ? ' checked' : '') + '>' +
        '<span class="ck__box">' + icon('i-check') + '</span><span class="ck__l">' + esc(label) + '</span><span class="ck__n">' + n + '</span></label>' +
        (hint ? '<span class="ck__hint">' + esc(hint) + '</span>' : '');
    };
    var h = '<div class="flt__g"><h3 class="flt__t">' + esc(t('flt.cc')) + '</h3>' +
      CLS.map(function (c) { return ck('cc', c[0], c[1], cnt(function (b) { return b.cls === c[0]; }), !!S.cc[c[0]]); }).join('') + '</div>' +
      '<div class="flt__g"><h3 class="flt__t">' + esc(t('flt.opt')) + '</h3>' +
      ck('two', '', t('flt.two'), cnt(function (b) { return b.two; }), S.two) +
      ck('abs', '', t('flt.abs'), cnt(function (b) { return b.abs; }), S.abs) +
      ck('rs', '', t('flt.rs'), cnt(function (b) { return b.rs; }), S.rs, t('d.rs')) + '</div>';
    if (activeFilters()) h += '<button type="button" class="link flt__reset" data-reset>' + esc(t('flt.reset')) + '</button>';
    box.innerHTML = h;
  }
  function checksFor(b, short) {
    var out = [t('ft.helmets'), t('ft.passport')];
    var d = days();
    if (S.area === '' || +S.area === t('areas').length - 1) out.push(t('ft.delFree5'));
    else {
      var ai = +S.area, area = t('areas')[ai];
      if (FREE_AREAS.indexOf(ai) > -1) out.push(d && d >= 5 ? f('ft.delFree', { area: area }) : t('ft.delFree5'));
      else out.push(f('ft.delPaid', { area: area }));
    }
    if (!short) out.push(t('ft.video'));
    return out;
  }
  function cardHTML(b) {
    var n = (G[b.id] || []).length;
    var tags = '<span class="tag">' + b.cc + ' cc</span>' + (b.two ? '<span class="tag tag--two">' + esc(t('flt.two')) + '</span>' : '');
    var q = price(b), pm = priceMain(q);
    var name = 'Honda ' + b.name;
    return '<li class="card" data-id="' + b.id + '">' +
      '<button type="button" class="card__ph" data-gal aria-label="' + esc(t('card.more') + ': ' + name) + '">' +
        '<img src="img/' + b.id + '.webp" width="800" height="800" loading="lazy" decoding="async" alt="' + esc(f('card.alt', { name: b.name })) + '">' +
        (n ? '<span class="card__phn">' + icon('i-cam') + n + '</span>' : '') +
      '</button>' +
      '<div class="card__main"><span class="brand">Honda</span>' +
        '<h3 class="card__name"><button type="button" data-gal>' + esc(b.name) + '</button></h3>' +
        '<div class="tags">' + tags + '</div>' +
        '<button type="button" class="link card__more" data-gal>' + esc(t('card.more')) + icon('i-arrow') + '</button>' +
      '</div>' +
      '<ul class="checks">' + checksFor(b, true).map(function (c) { return '<li>' + icon('i-check') + '<span>' + esc(c) + '</span></li>'; }).join('') + '</ul>' +
      '<div class="card__buy">' +
        '<div class="card__price"><b class="js-price">' + esc(pm.b) + '</b><span>' + esc(pm.s) + '</span></div>' +
        priceSubs(q).join('') +
        '<p class="card__sub">' + esc(f('card.dep', { p: money(b.dep) })) + '</p>' +
        '<button type="button" class="btn btn--accent card__pick" data-pick>' + esc(t('card.pick')) + '</button>' +
      '</div></li>';
  }
  var lastKey = null;
  function renderAll() {
    var d = days(), n = term();
    $('barPeriod').hidden = !!d;
    $('barDates').hidden = !d;
    $('bar').classList.toggle('is-dates', !!d);
    if (d) {
      $('barDatesTxt').textContent = f('res.dates', { from: fmtShort(S.from), to: fmtShort(S.to), days: daysText(d) });
      $('barTier').textContent = t('res.tier');
      var q0 = PR.quote(BIKES[0], d, S.from);
      $('barLow').hidden = !(q0.high > 0 && q0.low > 0);
    }
    $('period').innerHTML = DURS.map(function (x) {
      return '<button type="button" role="radio" data-dur="' + x + '" aria-checked="' + (x === S.dur) + '">' + esc(durLabel(x)) + '</button>';
    }).join('');
    $('barNote').textContent = n ? t('res.exact') : t('res.fromNote');
    renderFilters($('fltSide'));
    renderFilters($('fltSheet'));
    var nf = activeFilters();
    $('fltBadge').hidden = !nf; $('fltBadge').textContent = nf;
    var list = visible();
    $('cards').innerHTML = list.map(function (b) { return cardHTML(b); }).join('');
    $('empty').hidden = list.length > 0;
    $('count').textContent = f('res.count', { n: list.length, total: BIKES.length });
    $('fltShow').textContent = f('flt.show', { n: list.length });
    var key = n + '|' + startIso();
    if (lastKey !== null && lastKey !== key) {
      document.querySelectorAll('#cards .js-price').forEach(function (el) { el.classList.add('price-swap'); });
    }
    lastKey = key;
    if (mapReady) renderMarkers();
    if ($('mapPanel') && !$('mapPanel').hidden && mapSel) renderPanel(mapSel);
  }

  // ---------- gallery ----------
  var galBike = null, galIdx = 0, galRaf = 0;
  function openGal(b, start) {
    galBike = b; galIdx = start || 0;
    var sizes = G[b.id] || [];
    var name = 'Honda ' + b.name;
    $('galTrack').innerHTML = sizes.map(function (wh, i) {
      return '<div class="gal__slide" role="group" aria-roledescription="slide"><img src="img/g/' + b.id + '/' + (i + 1) + '.webp" width="' + wh[0] + '" height="' + wh[1] + '"' +
        (i < 2 ? '' : ' loading="lazy"') + ' decoding="async" alt="' + esc(name + ', ' + f('d.counter', { i: i + 1, n: sizes.length })) + '"></div>';
    }).join('');
    $('galThumbs').innerHTML = sizes.map(function (wh, i) {
      return '<button type="button" data-i="' + i + '" aria-label="' + esc(f('d.counter', { i: i + 1, n: sizes.length })) + '"><img src="img/g/' + b.id + '/' + (i + 1) + 't.webp" width="200" height="200" loading="lazy" alt=""></button>';
    }).join('');
    renderGalPanel();
    showDlg($('gal'));
    $('galTrack').scrollLeft = 0;
    $('gal').querySelector('.gal__in').scrollTop = 0;
    if (galIdx) goGal(galIdx, true);
    galSync();
  }
  function renderGalPanel() {
    var b = galBike, n = term(), sea = season();
    $('galName').textContent = b.name;
    $('galTags').innerHTML = '<span class="tag">' + b.cc + ' cc</span>' + (b.two ? '<span class="tag tag--two">' + esc(t('flt.two')) + '</span>' : '') +
      (b.abs ? '<span class="tag">ABS</span>' : '') + (b.rs ? '<span class="tag">RoadSync</span>' : '');
    var notes = [];
    if (b.rs) notes.push(t('d.rs'));
    if (b.studio) notes.push(t('d.studio'));
    $('galNote').hidden = !notes.length;
    $('galNote').textContent = notes.join('. ');
    var q = price(b), pm = priceMain(q);
    $('galCalc').innerHTML = n
      ? '<p class="gcalc__l">' + esc(t('d.calc')) + ': ' + esc(daysText(n)) + '</p><p class="gcalc__v"><b>' + esc(money(q.perDay)) + '</b> ' + esc(t('suf.0')) + '</p>' + priceSubs(q).join('')
      : '<p class="gcalc__l">' + esc(t('d.pickDur')) + '</p>';
    var cur = n ? PR.tierOf(n) : 5, g = b[sea];
    $('galPrices').innerHTML = [0, 1, 2, 3, 4, 5].map(function (i) {
      var c = i === cur ? ' class="is-cur"' : '';
      return '<dt' + c + '>' + esc(t('g.' + i)) + '</dt><dd' + c + '>' + esc(f('g.day', { p: money(i < 3 ? g[i] : sea === 'h' ? Math.round(g[i] / 30) : Math.ceil(g[i] / 30)) })) + '</dd>';
    }).join('');
    $('galDep').innerHTML = '<b>' + esc(t('d.dep')) + ':</b> ' + money(b.dep);
    $('galChecks').innerHTML = checksFor(b, false).map(function (c) { return '<li>' + icon('i-check') + '<span>' + esc(c) + '</span></li>'; }).join('');
    $('galCtaPrice').innerHTML = '<b>' + esc(pm.b) + '</b><span>' + esc(pm.s) + '</span>';
    galSync();
  }
  function goGal(i, instant) {
    var tr = $('galTrack'), n = tr.children.length;
    galIdx = Math.max(0, Math.min(n - 1, i));
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    tr.scrollTo({ left: galIdx * tr.clientWidth, behavior: instant || reduce ? 'auto' : 'smooth' });
    galSync();
  }
  function galSync() {
    var tr = $('galTrack'), n = tr.children.length;
    if (!n) return;
    $('galCount').textContent = f('d.counter', { i: galIdx + 1, n: n });
    $('galPrev').disabled = galIdx === 0;
    $('galNext').disabled = galIdx === n - 1;
    var th = $('galThumbs').children;
    for (var i = 0; i < th.length; i++) {
      var on = i === galIdx;
      th[i].setAttribute('aria-current', String(on));
      if (on && th[i].scrollIntoView && $('gal').open) {
        var box = $('galThumbs'), l = th[i].offsetLeft - box.clientWidth / 2 + th[i].clientWidth / 2;
        box.scrollTo({ left: l, behavior: 'auto' });
      }
    }
  }

  // ---------- request ----------
  function openReq(b) {
    R.bike = b || null;
    if (b) R.what = 0;
    renderReq();
    if ($('gal').open) closeDlg($('gal'));
    showDlg($('req'));
    $('req').querySelector('.req__in').scrollTop = 0;
  }
  function pickGroup(box, items, key) {
    box.innerHTML = items.map(function (label, i) {
      return '<button type="button" role="radio" data-k="' + key + '" data-i="' + i + '" aria-checked="' + (R[key] === i) + '">' + esc(label) + '</button>';
    }).join('');
  }
  function renderReq() {
    var b = R.bike;
    $('reqT').textContent = b ? f('r.tBike', { name: b.name }) : t('r.tAny');
    var bk = $('reqBike');
    bk.hidden = !b;
    if (b) {
      var q = price(b), pm = priceMain(q);
      bk.innerHTML = '<img src="img/' + b.id + '.webp" width="800" height="800" alt="">' +
        '<div><b>Honda ' + esc(b.name) + '</b><span>' + esc(pm.b + ' ' + pm.s) +
        (q.n > 1 ? ' · ' + esc(f('calc.total', { p: money(q.total), d: daysText(q.n) })) : '') + ' · ' + esc(f('card.dep', { p: money(b.dep) })) + '</span></div>';
    }
    $('rFrom').value = S.from; $('rTo').value = S.to;
    syncDateMins($('rFrom'), $('rTo'));
    renderAreaSelect($('rArea'), S.area);
    var other = $('rAreaOther');
    other.hidden = S.area === '' || +S.area !== t('areas').length - 1;
    $('rWhatWrap').hidden = !!b;
    pickGroup($('rWhat'), t('what'), 'what');
    $('rWhatHint').hidden = !(R.what === 1 || R.what === 2);
    pickGroup($('rExp'), t('exp'), 'exp');
    $('rExpHint').hidden = R.exp !== 0;
    updateLinks();
  }
  function buildMessage() {
    var ml = lang === 'ru' ? 'ru' : 'en';
    var M = function (k) { return t(k, ml); };
    var lines = [M('msg.hello')];
    var d = days();
    var dates = S.from || S.to ? fmtMsgDate(S.from, ml) + ' - ' + fmtMsgDate(S.to, ml) + (d ? ' (' + daysText(d, ml) + ')' : '') : M('msg.noDates');
    lines.push(M('msg.dates') + ': ' + dates);
    if (S.area !== '') {
      var areas = t('areas', ml), ai = +S.area;
      var a = ai === areas.length - 1 ? ($('rAreaOther').value.trim() || areas[ai]) : areas[ai];
      lines.push(M('msg.area') + ': ' + a);
    }
    var what = R.bike ? 0 : R.what;
    lines.push(M('msg.what') + ': ' + t('what', ml)[what]);
    if (what === 0) lines.push(M('msg.model') + ': ' + (R.bike ? 'Honda ' + R.bike.name : M('msg.any')));
    if (R.bike) {
      var q = price(R.bike);
      lines.push(M('msg.price') + ': ' + (q.from
        ? f('price.from', { p: money(q.perDay, ml) }, ml) + ' ' + t('suf.3', ml)
        : money(q.perDay, ml) + ' ' + t('suf.0', ml) + ', ' + f('calc.total', { p: money(q.total, ml), d: daysText(q.n, ml) }, ml)));
    }
    if (S.point) lines.push(M('msg.point') + ': ' + S.point);
    if (R.exp != null) lines.push(M('msg.exp') + ': ' + t('exp', ml)[R.exp]);
    var budget = $('rBudget').value.trim();
    if (budget) lines.push(M('msg.budget') + ': ' + budget);
    var c = $('rComment').value.trim();
    if (c) lines.push(M('msg.comment') + ': ' + c);
    return lines.join('\n');
  }
  function updateLinks() {
    var msg = encodeURIComponent(buildMessage());
    $('sendTg').href = 'https://t.me/' + TG_USER + '?text=' + msg;
    $('sendWa').href = 'https://wa.me/' + WA_PHONE + '?text=' + msg;
  }

  // ---------- map ----------
  // Метки: P = прокат-партнёр (цены на сайте), S = прокаты из OpenStreetMap на проверке. Место сдвинуто, названий и контактов нет
  var HOURS = { P1: '08:00-20:00', P2: '08:00-18:00' };
  var map = null, mapReady = false, mapLoading = false, mapPts = [], mapMarkers = [], mapSel = null;
  function loadScript(src) {
    return new Promise(function (ok, fail) {
      var el = document.createElement('script'); el.src = src; el.onload = ok; el.onerror = fail; document.head.appendChild(el);
    });
  }
  function loadCss(href) {
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; document.head.appendChild(l);
  }
  function abs(u) { return new URL(u, location.href).href; }
  function mapLangKey() { return lang === 'zh' ? 'name:zh-Hans' : 'name:' + lang; }
  function applyMapLang() {
    if (!map || !mapReady) return;
    var k = mapLangKey();
    map.getStyle().layers.forEach(function (l) {
      var kind = l.metadata && l.metadata['fb:lbl'];
      if (!kind) return;
      map.setLayoutProperty(l.id, 'text-field', kind === 'road'
        ? ['coalesce', ['get', k], ['get', 'name:en']]
        : ['coalesce', ['get', k], ['get', 'name:en'], ['get', 'name']]);
    });
  }
  function openMap() {
    showDlg($('mapd'));
    if (mapReady) { map.resize(); return; }
    if (mapLoading) return;
    mapLoading = true;
    $('mapState').hidden = false; $('mapState').textContent = t('map.load');
    loadCss('assets/map/maplibre-gl.css');
    Promise.all([
      loadScript('assets/map/maplibre-gl.js'),
      loadScript('assets/map/pmtiles.js'),
      fetch('assets/map/style.json').then(function (r) { return r.json(); }),
      fetch('assets/map/points.json').then(function (r) { return r.json(); })
    ]).then(function (res) {
      var style = res[2]; mapPts = res[3];
      var proto = new pmtiles.Protocol();
      maplibregl.addProtocol('pmtiles', proto.tile);
      style.glyphs = abs('assets/map/fonts/') + '{fontstack}/{range}.pbf';
      style.sources.pm.url = 'pmtiles://' + abs('assets/map/phuket.pmtiles');
      map = new maplibregl.Map({
        container: 'mapBox', style: style, center: [98.33, 7.9], zoom: 10.4, minZoom: 9, maxZoom: 17,
        maxBounds: [[97.9, 7.45], [98.8, 8.45]], attributionControl: { compact: true }, dragRotate: false, pitchWithRotate: false
      });
      map.touchZoomRotate.disableRotation();
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
      map.on('load', function () {
        mapReady = true; $('mapState').hidden = true;
        applyMapLang(); renderMarkers();
        var b = new maplibregl.LngLatBounds();
        mapPts.forEach(function (p) { b.extend([p.lng, p.lat]); });
        map.fitBounds(b, { padding: { top: 40, bottom: 40, left: 40, right: 40 }, duration: 0 });
      });
      map.on('click', function (e) { if (!e.originalEvent.target.closest('.mk')) closePanel(); });
    }).catch(function () {
      mapLoading = false; $('mapState').hidden = false; $('mapState').textContent = t('map.err');
    });
  }
  function partnerFrom() {
    // Самая низкая цена среди байков: без срока «от» по ставке 3+ мес, со сроком - сумма на срок
    var min = Infinity; BIKES.forEach(function (b) { min = Math.min(min, price(b).perDay); });
    return term() ? money(min) : f('price.from', { p: money(min) });
  }
  function renderMarkers() {
    mapMarkers.forEach(function (m) { m.remove(); }); mapMarkers = [];
    var lbl = partnerFrom();
    // Сначала серые, потом партнёры, чтобы ценники были сверху
    mapPts.slice().sort(function (a, b) { return a.k === b.k ? 0 : a.k === 'p' ? 1 : -1; }).forEach(function (p) {
      var el = document.createElement('button');
      el.type = 'button';
      el.className = 'mk mk--' + p.k + (mapSel && mapSel.id === p.id ? ' is-on' : '');
      el.setAttribute('aria-label', (p.k === 'p' ? t('map.pT') : t('map.sT')) + ', ' + t('areas')[p.a]);
      el.innerHTML = p.k === 'p' ? '<span>' + esc(lbl) + '</span>' : '';
      el.addEventListener('click', function (e) { e.stopPropagation(); selectPoint(p); });
      mapMarkers.push(new maplibregl.Marker({ element: el, anchor: p.k === 'p' ? 'bottom' : 'center' }).setLngLat([p.lng, p.lat]).addTo(map));
    });
  }
  function selectPoint(p) {
    mapSel = p;
    renderMarkers();
    renderPanel(p);
    var mob = innerWidth < 900;
    map.easeTo({ center: [p.lng, p.lat], zoom: Math.max(map.getZoom(), 12.5), offset: mob ? [0, -innerHeight * 0.22] : [180, 0], duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500 });
  }
  function closePanel() {
    if (!mapSel) return;
    mapSel = null; $('mapPanel').hidden = true; $('mapHint').hidden = false; renderMarkers();
  }
  function renderPanel(p) {
    var box = $('mapPanel'), area = t('areas')[p.a], h;
    var head = '<div class="mp__top"><button type="button" class="mp__back" data-mclose>' + icon('i-chev-l') + '<span>' + esc(t('map.back')) + '</span></button></div>';
    if (p.k === 'p') {
      var list = BIKES.slice().sort(function (a, b) { return price(a).total - price(b).total; });
      h = head + '<p class="mp__kick">' + esc(t('map.pT')) + ' · ' + esc(area) + '</p>' +
        '<h3 class="mp__t">' + esc(partnerFrom()) + '</h3>' +
        '<p class="mp__s">' + esc(term() ? t('suf.0') + ' · ' + f('calc.for', { d: daysText(term()) }) : t('suf.3')) + '</p>' +
        '<ul class="mp__facts">' +
          '<li>' + icon('i-clock') + '<span>' + esc(f('map.hours', { h: HOURS[p.id] || '' })) + '</span></li>' +
          '<li>' + icon('i-shield') + '<span>' + esc(t('map.checked')) + '</span></li>' +
          '<li>' + icon('i-pin') + '<span>' + esc(t('map.approx')) + '</span></li>' +
        '</ul>' +
        '<div class="mp__strip">' + list.slice(0, 8).map(function (b) {
          return '<button type="button" data-mgal="' + b.id + '"><img src="img/' + b.id + '.webp" width="800" height="800" loading="lazy" alt="' + esc('Honda ' + b.name) + '"></button>';
        }).join('') + '</div>' +
        '<h4 class="mp__h">' + esc(t('map.bikes')) + '</h4>' +
        '<ul class="mp__list">' + list.map(function (b) {
          var q = price(b), pm = priceMain(q);
          return '<li><button type="button" class="mp__bike" data-mgal="' + b.id + '"><img src="img/' + b.id + '.webp" width="800" height="800" loading="lazy" alt="">' +
            '<span class="mp__bn"><b>' + esc(b.name) + '</b><small>' + b.cc + ' cc</small></span>' +
            '<span class="mp__bp"><b>' + esc(pm.b) + '</b><small>' + esc(t('suf.0')) + '</small></span></button>' +
            '<button type="button" class="btn btn--accent mp__pick" data-mpick="' + b.id + '">' + esc(t('card.pick')) + '</button></li>';
        }).join('') + '</ul>' +
        '<button type="button" class="btn btn--line btn--block mp__all" data-mall>' + esc(t('map.all')) + '</button>';
    } else {
      h = head + '<p class="mp__kick mp__kick--soon">' + esc(t('map.legSoon')) + ' · ' + esc(area) + '</p>' +
        '<h3 class="mp__t">' + esc(t('map.sT')) + '</h3>' +
        '<p class="mp__p">' + esc(t('map.sP')) + '</p>' +
        '<ul class="mp__facts"><li>' + icon('i-pin') + '<span>' + esc(t('map.approx')) + '</span></li></ul>' +
        '<button type="button" class="btn btn--accent btn--block" data-mask>' + esc(t('map.sBtn')) + '</button>' +
        '<button type="button" class="btn btn--line btn--block mp__all" data-mall>' + esc(t('map.all')) + '</button>';
    }
    box.innerHTML = h; box.hidden = false; box.scrollTop = 0;
    $('mapHint').hidden = true;
  }
  function useArea(p) {
    S.area = String(p.a); $('sArea').value = S.area; S.point = p.id;
  }

  // ---------- dialogs ----------
  function lockCount() { return document.querySelectorAll('dialog[open]').length; }
  function showDlg(d) {
    if (d.open) return;
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
    document.documentElement.classList.add('is-locked');
  }
  function closeDlg(d) {
    if (!d.open) return;
    if (typeof d.close === 'function') d.close(); else d.removeAttribute('open');
  }
  function onDlgClose() {
    if (!lockCount()) document.documentElement.classList.remove('is-locked');
  }

  // ---------- init ----------
  function init() {
    var sFrom = $('sFrom'), sTo = $('sTo');
    syncDateMins(sFrom, sTo);

    // language menu
    $('langBtn').addEventListener('click', function (e) { e.stopPropagation(); toggleLang($('langMenu').hidden); });
    $('langMenu').addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      toggleLang(false); $('langBtn').focus();
      if (btn.dataset.lang !== lang) setLang(btn.dataset.lang);
    });
    $('langMenu').addEventListener('keydown', function (e) {
      var items = Array.prototype.slice.call(this.querySelectorAll('button'));
      var i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
      else if (e.key === 'Escape') { toggleLang(false); $('langBtn').focus(); }
      else if (e.key === 'Tab') toggleLang(false);
    });
    document.addEventListener('click', function (e) { if (!$('langMenu').hidden && !e.target.closest('#lang')) toggleLang(false); });

    // search
    $('sArea').addEventListener('change', function () { S.area = this.value; renderAll(); });
    sFrom.addEventListener('change', function () { syncDateMins(sFrom, sTo); S.from = sFrom.value; S.to = sTo.value; renderAll(); });
    sTo.addEventListener('change', function () { S.to = sTo.value; renderAll(); });
    $('search').addEventListener('submit', function (e) {
      e.preventDefault();
      S.area = $('sArea').value; S.from = sFrom.value; S.to = sTo.value;
      renderAll();
      $('results').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    });
    $('barChange').addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      setTimeout(function () { try { sFrom.focus({ preventScroll: true }); } catch (e) {} }, 400);
    });

    // period / sort / filters
    $('period').addEventListener('click', function (e) {
      var b = e.target.closest('[data-dur]'); if (!b) return;
      var v = +b.dataset.dur;
      S.dur = S.dur === v ? null : v; renderAll();
      var again = $('period').querySelector('[data-dur="' + v + '"]'); if (again) again.focus();
    });
    $('sort').addEventListener('change', function () { S.sort = this.value; renderAll(); });
    function onFilter(e) {
      var el = e.target;
      if (!el.matches('input[data-f]')) return;
      var k = el.dataset.f;
      if (k === 'cc') S.cc[el.value] = el.checked; else S[k] = el.checked;
      renderAll();
    }
    $('fltSide').addEventListener('change', onFilter);
    $('fltSheet').addEventListener('change', onFilter);
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-reset]')) { S.cc = {}; S.two = S.abs = S.rs = false; renderAll(); }
    });
    $('fltBtn').addEventListener('click', function () { showDlg($('fsheet')); });

    // cards
    $('cards').addEventListener('click', function (e) {
      var card = e.target.closest('.card'); if (!card) return;
      var b = byId(card.dataset.id);
      if (e.target.closest('[data-pick]')) openReq(b);
      else if (e.target.closest('[data-gal]')) openGal(b, 0);
    });
    $('ctaBtn').addEventListener('click', function () { openReq(null); });

    // gallery
    var tr = $('galTrack');
    tr.addEventListener('scroll', function () {
      cancelAnimationFrame(galRaf);
      galRaf = requestAnimationFrame(function () {
        var i = Math.round(tr.scrollLeft / Math.max(1, tr.clientWidth));
        if (i !== galIdx) { galIdx = i; galSync(); }
      });
    }, { passive: true });
    $('galPrev').addEventListener('click', function () { goGal(galIdx - 1); });
    $('galNext').addEventListener('click', function () { goGal(galIdx + 1); });
    $('galThumbs').addEventListener('click', function (e) { var b = e.target.closest('[data-i]'); if (b) goGal(+b.dataset.i); });
    $('gal').addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goGal(galIdx - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); goGal(galIdx + 1); }
    });
    window.addEventListener('resize', function () { if ($('gal').open) goGal(galIdx, true); });
    $('galPick').addEventListener('click', function () { openReq(galBike); });

    // request
    var rFrom = $('rFrom'), rTo = $('rTo');
    rFrom.addEventListener('change', function () { syncDateMins(rFrom, rTo); S.from = rFrom.value; S.to = rTo.value; sFrom.value = S.from; sTo.value = S.to; syncDateMins(sFrom, sTo); renderAll(); renderReq(); });
    rTo.addEventListener('change', function () { S.to = rTo.value; sTo.value = S.to; renderAll(); renderReq(); });
    $('rArea').addEventListener('change', function () { S.area = this.value; $('sArea').value = S.area; renderAll(); renderReq(); if (!$('rAreaOther').hidden) $('rAreaOther').focus(); });
    ['rAreaOther', 'rBudget', 'rComment'].forEach(function (id) { $(id).addEventListener('input', updateLinks); });
    $('req').addEventListener('click', function (e) {
      var b = e.target.closest('.pick [data-k]'); if (!b) return;
      var k = b.dataset.k, i = +b.dataset.i;
      R[k] = (R[k] === i && k !== 'what') ? null : i;
      renderReq();
      var again = $('req').querySelector('.pick [data-k="' + k + '"][data-i="' + i + '"]');
      if (again) again.focus();
    });
    ['sendTg', 'sendWa'].forEach(function (id) { $(id).addEventListener('click', updateLinks); });

    // map
    document.querySelectorAll('[data-map]').forEach(function (b) { b.addEventListener('click', openMap); });
    $('mapPanel').addEventListener('click', function (e) {
      var el;
      if (e.target.closest('[data-mclose]')) { closePanel(); return; }
      if ((el = e.target.closest('[data-mpick]'))) { useArea(mapSel); renderAll(); openReq(byId(el.dataset.mpick)); return; }
      if ((el = e.target.closest('[data-mgal]'))) { openGal(byId(el.dataset.mgal), 0); return; }
      if (e.target.closest('[data-mask]')) { useArea(mapSel); renderAll(); openReq(null); return; }
      if (e.target.closest('[data-mall]')) {
        closeDlg($('mapd'));
        $('results').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      }
    });
    $('mapd').addEventListener('close', function () { S.point = ''; });

    // dialogs: close buttons, backdrop, scroll lock
    document.querySelectorAll('dialog').forEach(function (d) {
      d.addEventListener('close', onDlgClose);
      d.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) { closeDlg(d); return; }
        if (e.target === d) closeDlg(d);
      });
    });

    applyLang();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
