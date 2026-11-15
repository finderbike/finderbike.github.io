/* Калькулятор цены как у проката-партнёра: ступени по сроку, сезон по дням, потолки и округление.
   Сетка: [1+ день, 3+ дня, 7+ дней, 1+ мес, 2+ мес, 3+ мес]; h = высокий сезон 15.10-31.03, l = низкий с 01.04 */
(function (root) {
  'use strict';
  var DAY = 864e5;
  function tierOf(n) { return n < 3 ? 0 : n < 7 ? 1 : n < 30 ? 2 : n < 60 ? 3 : n < 90 ? 4 : 5; }
  function parse(iso) { var p = iso.split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); }
  function isHigh(ms) {
    var d = new Date(ms), m = d.getUTCMonth() + 1, dd = d.getUTCDate();
    return m >= 11 || m <= 3 || (m === 10 && dd >= 15);
  }
  function seasonOf(iso) { return isHigh(parse(iso)) ? 'h' : 'l'; }
  // Сколько из n дней идут по высокой ставке: только с начала аренды и до ближайшего 31 марта
  function highDays(startMs, n) {
    if (!isHigh(startMs)) return 0;
    var d = new Date(startMs), y = d.getUTCFullYear();
    if (d.getUTCMonth() + 1 >= 10) y += 1;
    var end = Date.UTC(y, 3, 1); // 1 апреля
    return Math.min(n, Math.round((end - startMs) / DAY));
  }
  function rawTotal(b, n, startMs) {
    var ti = tierOf(n), nh = highDays(startMs, n), nl = n - nh, r = 0;
    if (ti <= 2) return nh * b.h[ti] + nl * b.l[ti];
    if (nh) r += nh * b.h[ti] / 30;
    if (nl) r += nl * Math.ceil(b.l[ti] / 30);
    return r;
  }
  function round(n, v) {
    var step = (n === 30 || n === 60 || n === 90) ? 100 : 10;
    return Math.floor(v / step + 0.5 + 1e-9) * step;
  }
  function base(b, n, s) { return round(n, rawTotal(b, n, s)); }
  function total(b, n, startIso) {
    var s = parse(startIso), ti = tierOf(n), v = base(b, n, s);
    if (ti === 2) v = Math.min(v, base(b, 30, s));
    else if (ti === 3) v = Math.min(v, base(b, 60, s));
    else if (ti === 4) v = Math.min(v, base(b, 90, s));
    return v;
  }
  function quote(b, n, startIso) {
    var s = parse(startIso), t = total(b, n, startIso), nh = highDays(s, n);
    // Цена, если бы каждый день платить по суточной ставке
    var daily = nh * b.h[0] + (n - nh) * b.l[0];
    var capped = false, cap = 0, ti = tierOf(n);
    if (ti >= 2 && ti <= 4) {
      var c = ti === 2 ? 30 : ti === 3 ? 60 : 90;
      if (base(b, n, s) > base(b, c, s) - 1e-9 && n !== c) { capped = true; cap = c; }
    }
    return { total: t, perDay: Math.round(t / n), tier: ti, save: Math.round((1 - t / daily) * 100), cap: capped ? cap : 0, high: nh, low: n - nh };
  }
  var api = { tierOf: tierOf, seasonOf: seasonOf, total: total, quote: quote, MAX: 365 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.FB_PRICE = api;
})(this);
