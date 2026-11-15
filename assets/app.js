(function () {
  'use strict';

  var L = window.FB_I18N, LANGS = window.FB_LANGS;
  var CODES = LANGS.map(function (x) { return x.code; });
  var TG_USER = 'finderbike';
  var WA_PHONE = '79936256756';

  // Цены высокого сезона до 31.03.2027, бриф: specs/2026-11-14-brif-sajt-vitrina.md
  // p = [день, неделя, месяц, в месяц от 3 месяцев], dep = залог, cc = объём
  var BIKES = [
    { id: 'scoopy-110cc-standard', name: 'Scoopy 110', cls: '125', cc: 110, p: [400, 1610, 4000, 3500], dep: 3000 },
    { id: 'click-125cc-standard', name: 'Click 125', cls: '125', cc: 125, p: [450, 1820, 4500, 4000], dep: 3000 },
    { id: 'click-160cc-standard', name: 'Click 160 Standard', cls: '160', cc: 160, p: [500, 2030, 5000, 4500], dep: 3000, two: 1 },
    { id: 'click-160cc-abs', name: 'Click 160 ABS', cls: '160', cc: 160, p: [550, 2240, 5500, 5000], dep: 3000, two: 1, abs: 1 },
    { id: 'click-160cc-abs-new-gen', name: 'Click 160 ABS New Gen', cls: '160', cc: 160, p: [600, 2450, 6000, 5500], dep: 3000, two: 1, abs: 1 },
    { id: 'giorno-125cc-abs', name: 'Giorno 125 ABS', cls: '125', cc: 125, p: [600, 2450, 6000, 5500], dep: 3000, abs: 1 },
    { id: 'pcx-160cc-standard', name: 'PCX 160 Standard', cls: '160', cc: 160, p: [650, 2590, 6500, 6000], dep: 3000, two: 1 },
    { id: 'pcx-160cc-abs', name: 'PCX 160 ABS', cls: '160', cc: 160, p: [700, 2800, 7000, 6500], dep: 3000, two: 1, abs: 1 },
    { id: 'adv-160cc-abs', name: 'ADV 160 ABS', cls: '160', cc: 160, p: [750, 3010, 7500, 7000], dep: 3000, two: 1, abs: 1 },
    { id: 'pcx-160cc-roadsync', name: 'PCX 160 RoadSync', cls: '160', cc: 160, p: [800, 3220, 8000, 7500], dep: 3000, two: 1, rs: 1 },
    { id: 'adv-160cc-roadsync', name: 'ADV 160 RoadSync', cls: '160', cc: 160, p: [850, 3430, 8500, 8000], dep: 3000, two: 1, rs: 1 },
    { id: 'forza-350cc-abs', name: 'Forza 350 ABS', cls: '350', cc: 350, p: [1500, 6020, 15000, 12000], dep: 7000, two: 1, abs: 1 },
    { id: 'adv-350cc-abs', name: 'ADV 350 ABS', cls: '350', cc: 350, p: [1500, 6020, 15000, 12000], dep: 7000, two: 1, abs: 1, studio: 1 },
    { id: 'adv-350cc-roadsync', name: 'ADV 350 RoadSync', cls: '350', cc: 350, p: [1800, 7000, 18000, 15000], dep: 7000, two: 1, rs: 1 },
    { id: 'forza-350cc-roadsync', name: 'Forza 350 RoadSync', cls: '350', cc: 350, p: [1800, 7000, 18000, 15000], dep: 7000, two: 1, rs: 1 }
  ];
  // Размеры фото галерей img/g/<id>/<n>.webp (ширина, высота)
  var G = {"scoopy-110cc-standard":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"click-125cc-standard":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"click-160cc-standard":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"click-160cc-abs":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"click-160cc-abs-new-gen":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"giorno-125cc-abs":[[1100,825],[1100,825],[1100,825],[1100,825],[1100,825],[1100,825]],"pcx-160cc-standard":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"pcx-160cc-abs":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"adv-160cc-abs":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"pcx-160cc-roadsync":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"adv-160cc-roadsync":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"forza-350cc-abs":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"adv-350cc-abs":[[640,480],[640,480],[1100,778],[1100,778],[800,600]],"adv-350cc-roadsync":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]],"forza-350cc-roadsync":[[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100],[825,1100]]};
  var CLS = [['125', '110-125 cc'], ['160', '160 cc'], ['350', '350 cc']];
  var FREE_AREAS = [0, 1, 4, 5]; // Карон, Ката, Сурин, Бангтао
  var LOCALE = { ru: 'ru-RU', en: 'en-GB', de: 'de-DE', fr: 'fr-FR', zh: 'zh-CN' };

  var lang = document.documentElement.getAttribute('data-lang');
  if (CODES.indexOf(lang) < 0) lang = 'en';

  var S = {
    period: 2, from: '', to: '', area: '', sort: 'asc',
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
    return n > 0 ? n : null;
  }
  function tierFor(d) { return d < 7 ? 0 : d < 30 ? 1 : d < 90 ? 2 : 3; }
  function tier() { var d = days(); return d ? tierFor(d) : S.period; }
  function perDay(b, ti) { return ti === 0 ? null : Math.round(b.p[ti] / (ti === 1 ? 7 : 30)); }
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
    var ti = tier();
    var list = BIKES.filter(function (b) {
      if (anyCc && !S.cc[b.cls]) return false;
      if (S.two && !b.two) return false;
      if (S.abs && !b.abs) return false;
      if (S.rs && !b.rs) return false;
      return true;
    });
    list = list.map(function (b, i) { return { b: b, i: BIKES.indexOf(b) }; });
    list.sort(function (x, y) {
      var d = x.b.p[ti] - y.b.p[ti];
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
  function priceLabel(ti) { return t('suf.' + ti); }
  function cardHTML(b, ti) {
    var n = (G[b.id] || []).length;
    var tags = '<span class="tag">' + b.cc + ' cc</span>' + (b.two ? '<span class="tag tag--two">' + esc(t('flt.two')) + '</span>' : '');
    var pd = perDay(b, ti);
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
        '<div class="card__price"><b class="js-price">' + money(b.p[ti]) + '</b><span>' + esc(priceLabel(ti)) + '</span></div>' +
        (pd ? '<p class="card__sub">' + esc(f('card.perDay', { p: money(pd) })) + '</p>' : '') +
        '<p class="card__sub">' + esc(f('card.dep', { p: money(b.dep) })) + '</p>' +
        '<button type="button" class="btn btn--accent card__pick" data-pick>' + esc(t('card.pick')) + '</button>' +
      '</div></li>';
  }
  var lastTier = null;
  function renderAll() {
    var ti = tier(), d = days();
    // period / dates bar
    $('barPeriod').hidden = !!d;
    $('barDates').hidden = !d;
    $('bar').classList.toggle('is-dates', !!d);
    if (d) {
      $('barDatesTxt').textContent = f('res.dates', { from: fmtShort(S.from), to: fmtShort(S.to), days: daysText(d) });
      $('barTier').textContent = f('res.tier', { tier: t('tier.' + ti) });
    }
    var seg = $('period');
    seg.innerHTML = [0, 1, 2, 3].map(function (i) {
      return '<button type="button" role="radio" data-per="' + i + '" aria-checked="' + (i === S.period) + '">' + esc(t('per.' + i)) + '</button>';
    }).join('');
    // filters
    renderFilters($('fltSide'));
    renderFilters($('fltSheet'));
    var nf = activeFilters();
    $('fltBadge').hidden = !nf; $('fltBadge').textContent = nf;
    // list
    var list = visible();
    $('cards').innerHTML = list.map(function (b) { return cardHTML(b, ti); }).join('');
    $('empty').hidden = list.length > 0;
    $('count').textContent = f('res.count', { n: list.length, total: BIKES.length });
    $('fltShow').textContent = f('flt.show', { n: list.length });
    if (lastTier !== null && lastTier !== ti) {
      document.querySelectorAll('#cards .js-price').forEach(function (el) { el.classList.add('price-swap'); });
    }
    lastTier = ti;
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
    var b = galBike, ti = tier();
    $('galName').textContent = b.name;
    $('galTags').innerHTML = '<span class="tag">' + b.cc + ' cc</span>' + (b.two ? '<span class="tag tag--two">' + esc(t('flt.two')) + '</span>' : '') +
      (b.abs ? '<span class="tag">ABS</span>' : '') + (b.rs ? '<span class="tag">RoadSync</span>' : '');
    var notes = [];
    if (b.rs) notes.push(t('d.rs'));
    if (b.studio) notes.push(t('d.studio'));
    $('galNote').hidden = !notes.length;
    $('galNote').textContent = notes.join('. ');
    $('galPrices').innerHTML = [0, 1, 2, 3].map(function (i) {
      var cur = i === ti ? ' class="is-cur"' : '';
      var pd = perDay(b, i);
      return '<dt' + cur + '>' + esc(t('per.' + i)) + '</dt><dd' + cur + '>' + money(b.p[i]) +
        (i === 3 ? '<small>' + esc(t('suf.2')) + '</small>' : pd ? '<small>' + esc(f('card.perDay', { p: money(pd) })) + '</small>' : '') + '</dd>';
    }).join('');
    $('galDep').innerHTML = '<b>' + esc(t('d.dep')) + ':</b> ' + money(b.dep);
    $('galChecks').innerHTML = checksFor(b, false).map(function (c) { return '<li>' + icon('i-check') + '<span>' + esc(c) + '</span></li>'; }).join('');
    $('galCtaPrice').innerHTML = '<b>' + money(b.p[ti]) + '</b><span>' + esc(priceLabel(ti)) + '</span>';
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
    var b = R.bike, ti = tier();
    $('reqT').textContent = b ? f('r.tBike', { name: b.name }) : t('r.tAny');
    var bk = $('reqBike');
    bk.hidden = !b;
    if (b) {
      var pd = perDay(b, ti);
      bk.innerHTML = '<img src="img/' + b.id + '.webp" width="800" height="800" alt="">' +
        '<div><b>Honda ' + esc(b.name) + '</b><span>' + money(b.p[ti]) + ' ' + esc(priceLabel(ti)) +
        (pd ? ' · ' + esc(f('card.perDay', { p: money(pd) })) : '') + ' · ' + esc(f('card.dep', { p: money(b.dep) })) + '</span></div>';
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
      var b = e.target.closest('[data-per]'); if (!b) return;
      S.period = +b.dataset.per; renderAll();
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
