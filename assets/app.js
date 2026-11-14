(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var TG_USER = 'finderbike';
  var WA_PHONE = '79936256756';

  // Цены высокого сезона до 31.03.2027, бриф: specs/2026-11-14-brif-sajt-vitrina.md
  // p = [день, неделя, месяц, в месяц от 3 месяцев], dep = залог
  var BIKES = [
    { id: 'scoopy-110cc-standard', name: 'Scoopy 110', cls: '125', p: [400, 1610, 4000, 3500], dep: 3000 },
    { id: 'click-125cc-standard', name: 'Click 125', cls: '125', p: [450, 1820, 4500, 4000], dep: 3000 },
    { id: 'click-160cc-standard', name: 'Click 160 Standard', cls: '160', p: [500, 2030, 5000, 4500], dep: 3000, two: 1 },
    { id: 'click-160cc-abs', name: 'Click 160 ABS', cls: '160', p: [550, 2240, 5500, 5000], dep: 3000, two: 1, abs: 1 },
    { id: 'click-160cc-abs-new-gen', name: 'Click 160 ABS New Gen', cls: '160', p: [600, 2450, 6000, 5500], dep: 3000, two: 1, abs: 1 },
    { id: 'giorno-125cc-abs', name: 'Giorno 125 ABS', cls: '125', p: [600, 2450, 6000, 5500], dep: 3000, abs: 1 },
    { id: 'pcx-160cc-standard', name: 'PCX 160 Standard', cls: '160', p: [650, 2590, 6500, 6000], dep: 3000, two: 1 },
    { id: 'pcx-160cc-abs', name: 'PCX 160 ABS', cls: '160', p: [700, 2800, 7000, 6500], dep: 3000, two: 1, abs: 1 },
    { id: 'adv-160cc-abs', name: 'ADV 160 ABS', cls: '160', p: [750, 3010, 7500, 7000], dep: 3000, two: 1, abs: 1 },
    { id: 'pcx-160cc-roadsync', name: 'PCX 160 RoadSync', cls: '160', p: [800, 3220, 8000, 7500], dep: 3000, two: 1, rs: 1 },
    { id: 'adv-160cc-roadsync', name: 'ADV 160 RoadSync', cls: '160', p: [850, 3430, 8500, 8000], dep: 3000, two: 1, rs: 1 },
    { id: 'forza-350cc-abs', name: 'Forza 350 ABS', cls: '350', p: [1500, 6020, 15000, 12000], dep: 7000, two: 1, abs: 1 },
    { id: 'adv-350cc-abs', name: 'ADV 350 ABS', cls: '350', p: [1500, 6020, 15000, 12000], dep: 7000, two: 1, abs: 1, img: 'adv-350cc-roadsync', photoNote: 1 },
    { id: 'adv-350cc-roadsync', name: 'ADV 350 RoadSync', cls: '350', p: [1800, 7000, 18000, 15000], dep: 7000, two: 1, rs: 1 },
    { id: 'forza-350cc-roadsync', name: 'Forza 350 RoadSync', cls: '350', p: [1800, 7000, 18000, 15000], dep: 7000, two: 1, rs: 1 }
  ];
  var CC = { '125': null, '160': '160 cc', '350': '350 cc' };

  var T = {
    ru: {
      title: 'FinderBike - аренда байков на Пхукете через подбор',
      skip: 'Перейти к заявке',
      'nav.bikes': 'Байки и цены', 'nav.how': 'Как это работает', 'nav.terms': 'Условия', 'nav.faq': 'Вопросы',
      'cta.header': 'Заявка',
      'hero.h1': 'Байк на Пхукете без 30 сообщений в прокаты',
      'hero.lead': 'Напишите даты и район. В течение часа пришлю 3 лучших варианта у\u00a0проверенных прокатов, с видео конкретного байка. Цена как в самом прокате, для вас бесплатно',
      'hero.cta1': 'Подобрать байк', 'hero.cta2': 'Смотреть цены',
      'fact.1': '3 варианта за час', 'fact.2': 'Видео байка до брони', 'fact.3': 'Цена и залог письменно',
      'chat.label': 'Пример ответа на заявку', 'chat.name': 'Дмитрий | FinderBike', 'chat.status': 'подбор байков на Пхукете',
      'chat.q': 'Привет! Нужен скутер на декабрь, живу в Кароне, будем ездить вдвоём. Опыт 2 года',
      'chat.a': 'Вот 3 варианта на 1-31 декабря, Карон:<br>1. Click 160 ABS - 5 500 ฿ в месяц<br>2. PCX 160 ABS - 7 000 ฿ в месяц<br>3. ADV 160 ABS - 7 500 ฿ в месяц<br>Залог 3 000 ฿, доставка в Карон бесплатно<br><br>Я бы взял PCX: вдвоём на подъёмах тянет уверенно',
      'chat.video': 'Видео PCX 160 ABS: со всех сторон, пробег, запуск',
      'honest.t': 'FinderBike - это сервис подбора, а не прокат',
      'honest.p': 'Байк выдаёт проверенный прокат-партнёр, договор аренды заключается с ним, цена такая же, как у него. Для вас услуга бесплатна: прокат платит мне процент со своей цены',
      'how.t': 'Как это работает',
      'how.1t': 'Вы пишете заявку', 'how.1p': 'Даты, район, что нужно, опыт и бюджет. Через форму ниже или сразу в мессенджер',
      'how.2t': 'Я сравниваю прокаты', 'how.2p': 'В течение часа присылаю 3 лучших варианта: цена и залог письменно, видео конкретного байка',
      'how.3t': 'Вы забираете байк', 'how.3p': 'Бронирую у проката и присылаю номер брони. Забираете байк в прокате или вам его привозят',
      'how.note': 'Отвечаю с 8:00 до 23:00. Заявку после 20:00 подтверждаю у проката утром',
      'bikes.t': 'Байки и цены',
      'bikes.sub': '15 моделей Honda у основного проката-партнёра. Видео выбранного байка пришлю до брони. Нет нужного у него - найду у других',
      'bikes.caption': 'Цены высокого сезона, до 31 марта 2027. Точную цену на ваши даты подтвержу в течение часа. RoadSync - версия, где смартфон подключается к приборной панели. Машины и мотоциклы - по запросу',
      'per.0': 'День', 'per.1': 'Неделя', 'per.2': 'Месяц', 'per.3': 'От 3 мес',
      'suf.0': 'в день', 'suf.1': 'за неделю', 'suf.2': 'в месяц', 'suf.3': 'в месяц при аренде от 3 месяцев',
      'cls.all': 'Все', 'cls.125': '110-125 cc', 'cls.160': '160 cc', 'cls.350': '350 cc',
      'card.dep': 'Залог', 'card.btn': 'Хочу этот', 'card.two': 'Для двоих и подъёмов', 'card.photoNote': 'На фото версия RoadSync',
      'card.alt': 'Honda {name}, фото проката-партнёра',
      'why.t': 'Почему через меня',
      'why.story': 'Я сам искал байк на полтора месяца и написал в 30 прокатов. Цены на один и тот же байк отличались сильно, условия тоже. Теперь у меня таблица цен и условий прокатов по всему острову, и я подбираю байк за вас',
      'why.sign': 'Дмитрий, FinderBike',
      'why.1t': 'Лучший прокат из 30, которые я проверил сам', 'why.1p': 'Нет байка у него - найду у других. Прокаты по всему острову, так что найду, даже если рядом всё разобрали',
      'why.2t': 'Видео конкретного байка до брони', 'why.2p': 'Видите именно тот байк, который получите: со всех сторон, пробег, запуск двигателя',
      'why.3t': 'Цена и залог письменно', 'why.3p': 'Всё оговорено до брони, никаких сюрпризов при получении',
      'why.4t': 'Проблема с прокатом - решаю я', 'why.4p': 'Пишете мне, я разбираюсь с прокатом. Прокат подвёл клиента - убираю его из своего списка',
      'terms.t': 'Условия аренды',
      'terms.sub': 'Так у основного проката-партнёра. Если подберу байк у другого проката, его условия пришлю письменно до брони',
      'terms.1t': 'Паспорт остаётся у вас', 'terms.1p': 'Прокат делает копию паспорта. Залог только деньгами: 3 000 ฿ за байк до 160 cc, 7 000 ฿ за 350 cc. Можно долларами, евро, USDT или рублями наличными',
      'terms.2t': 'Что входит в цену', 'terms.2p': 'Два шлема и медицинская страховка до 50 000 ฿ при ДТП. Сам байк не застрахован: повреждения и угон оплачивает арендатор',
      'terms.3t': 'Доставка', 'terms.3p': 'При аренде от 5 дней бесплатно в одну сторону в Карон, Кату, Бангтао и Сурин. В другие районы платно, цена зависит от расстояния',
      'terms.4t': 'Оплата и продление', 'terms.4p': 'Оплата сразу за весь срок, при досрочном возврате деньги не возвращают. Продлить можно удалённо, ставка при этом не растёт',
      'terms.5t': 'Способы оплаты', 'terms.5p': 'Наличные баты, перевод на счёт проката, рубли по СБП, USDT. Картой можно, но с наценкой 7%',
      'terms.6t': 'Опыт и права', 'terms.6p': 'Нужен опыт вождения: новичкам без опыта байк не дают. За езду без прав категории A полиция штрафует на 1 000 ฿',
      'req.t': 'Заявка на подбор',
      'req.sub': 'Заполните, что знаете, и отправьте в удобный мессенджер. Откроется чат со мной, где заявка уже набрана, останется нажать «Отправить»',
      'req.direct': 'Или напишите сразу:',
      'f.dates': 'Даты', 'f.from': 'С', 'f.to': 'По', 'f.area': 'Район', 'f.areaOther': 'Напишите район или отель',
      'f.what': 'Что нужно', 'f.whatHint': 'Машины и мотоциклы подбираю по запросу: напишу, что есть на ваши даты',
      'f.model': 'Модель', 'f.modelAny': 'На ваш выбор',
      'f.exp': 'Опыт вождения', 'f.expHint': 'Честно: новичкам без опыта прокаты байк не дают. Лучше начать с нескольких занятий с инструктором',
      'f.budget': 'Бюджет', 'f.budgetPh': 'Например, до 6 000 ฿ в месяц',
      'f.comment': 'Комментарий', 'f.commentPh': 'Например: ездим вдвоём, нужен багажник',
      'f.sendTg': 'Отправить в Telegram', 'f.sendWa': 'Отправить в WhatsApp',
      'f.privacy': 'Сайт ничего не сохраняет: заявка уходит только в ваш чат со мной',
      areas: ['Карон', 'Ката', 'Патонг', 'Камала', 'Сурин', 'Бангтао', 'Най Янг (аэропорт)', 'Раваи', 'Най Харн', 'Чалонг', 'Пхукет-таун', 'Другой'],
      what: ['Скутер', 'Мотоцикл', 'Машина'],
      exp: ['Нет опыта', 'До года', '1-3 года', 'Больше 3 лет'],
      'msg.hello': 'Здравствуйте! Заявка с сайта FinderBike',
      'msg.dates': 'Даты', 'msg.noDates': 'пока не знаю точно', 'msg.area': 'Район', 'msg.what': 'Нужно',
      'msg.model': 'Модель', 'msg.exp': 'Опыт вождения', 'msg.budget': 'Бюджет', 'msg.comment': 'Комментарий',
      'msg.bike': 'Здравствуйте! Хочу арендовать {name}. Даты: ',
      'faq.t': 'Частые вопросы',
      'faq.1q': 'Почему для меня бесплатно?', 'faq.1a': 'Прокат платит мне комиссию из своей цены. Для вас цена такая же, как если прийти в прокат самому',
      'faq.2q': 'Зачем мне вы, если можно написать в прокат самому?', 'faq.2a': 'Можно. Я экономлю ваше время: сравниваю цены и условия по всему острову, присылаю видео конкретного байка и фиксирую цену и залог письменно. Цена для вас та же',
      'faq.3q': 'Нужны ли права?', 'faq.3a': 'Нужны права с открытой категорией на мотоцикл: международные или тайские. Без них штраф на полицейских проверках, и страховка может не покрыть ДТП',
      'faq.4q': 'Я раньше не ездил, можно взять байк?', 'faq.4a': 'Честно: новичкам без опыта прокаты байк не дают, и правильно делают. На Пхукете левостороннее движение, крутые серпантины между Патонгом, Кароном и Катой, в дождь асфальт скользкий. Лучше начать с нескольких занятий с инструктором',
      'faq.5q': 'Если уеду раньше, вернут деньги?', 'faq.5a': 'У основного проката нет: оплата за весь срок договора, за неиспользованные дни деньги не возвращают. Не уверены в сроке - берите месяц и продлевайте удалённо, ставка при продлении не вырастет',
      'faq.6q': 'Можно заплатить рублями?', 'faq.6a': 'Да, у части прокатов можно перевести рубли по СБП, не нужно искать обменник. Подберу такие варианты',
      'faq.7q': 'Что если с байком или прокатом проблема?', 'faq.7a': 'Пишите мне, решу с прокатом. Совет: при получении снимите байк на видео со всех сторон. Если при возврате прокат увидит царапину, у вас будет доказательство, что она была раньше',
      'foot.p': 'Подбор байков в аренду на Пхукете. FinderBike не прокат: договор аренды вы заключаете с прокатом-партнёром'
    },
    en: {
      title: 'FinderBike - scooter rental in Phuket, matched for you',
      skip: 'Skip to the request form',
      'nav.bikes': 'Bikes & prices', 'nav.how': 'How it works', 'nav.terms': 'Rental terms', 'nav.faq': 'FAQ',
      'cta.header': 'Request',
      'hero.h1': 'A bike in Phuket without messaging 30 rental shops',
      'hero.lead': 'Send me your dates and area. Within an hour I’ll send you the 3 best options from trusted rental shops, with a video of the actual bike. Same price as at the shop, free for you',
      'hero.cta1': 'Find me a bike', 'hero.cta2': 'See prices',
      'fact.1': '3 options within an hour', 'fact.2': 'Bike video before you book', 'fact.3': 'Price and deposit in writing',
      'chat.label': 'Example reply to a request', 'chat.name': 'Dmitriy | FinderBike', 'chat.status': 'bike matching in Phuket',
      'chat.q': 'Hi! I need a scooter for December, staying in Karon, two of us riding. 2 years of experience',
      'chat.a': 'Here are 3 options for Dec 1-31, Karon:<br>1. Click 160 ABS - ฿5,500 a month<br>2. PCX 160 ABS - ฿7,000 a month<br>3. ADV 160 ABS - ฿7,500 a month<br>Deposit ฿3,000, free delivery to Karon<br><br>I’d take the PCX: it climbs hills easily with two people',
      'chat.video': 'PCX 160 ABS video: all sides, mileage, engine start',
      'honest.t': 'FinderBike is a matching service, not a rental shop',
      'honest.p': 'Your bike comes from a trusted partner rental shop. You sign the rental agreement with them, and the price is the same as theirs. My service is free for you: the shop pays me a commission out of its price',
      'how.t': 'How it works',
      'how.1t': 'You send a request', 'how.1p': 'Dates, area, what you need, experience and budget. Use the form below or message me directly',
      'how.2t': 'I compare rental shops', 'how.2p': 'Within an hour I send you the 3 best options: price and deposit in writing, plus a video of the actual bike',
      'how.3t': 'You get your bike', 'how.3p': 'I book it with the shop and send you a booking number. Pick the bike up at the shop or have it delivered',
      'how.note': 'I reply from 8 am to 11 pm. Requests after 8 pm are confirmed with the shop the next morning',
      'bikes.t': 'Bikes and prices',
      'bikes.sub': '15 Honda models at my main partner shop. I’ll send you a video of your bike before you book. If the bike you want isn’t there, I’ll find it at another shop',
      'bikes.caption': 'High season prices, valid until March 31, 2027. I’ll confirm the exact price for your dates within an hour. RoadSync means your phone connects to the dashboard. Cars and motorcycles on request',
      'per.0': 'Day', 'per.1': 'Week', 'per.2': 'Month', 'per.3': '3+ months',
      'suf.0': 'per day', 'suf.1': 'per week', 'suf.2': 'per month', 'suf.3': 'per month, renting 3+ months',
      'cls.all': 'All', 'cls.125': '110-125 cc', 'cls.160': '160 cc', 'cls.350': '350 cc',
      'card.dep': 'Deposit', 'card.btn': 'I want this one', 'card.two': 'Good for two and hills', 'card.photoNote': 'Photo: RoadSync version',
      'card.alt': 'Honda {name}, photo by the partner shop',
      'why.t': 'Why book through me',
      'why.story': 'I looked for a bike for 6 weeks myself and messaged 30 rental shops. Prices for the same bike were very different, and so were the terms. Now I keep a table of prices and terms of rental shops across the island, and I find the bike for you',
      'why.sign': 'Dmitriy, FinderBike',
      'why.1t': 'The best shop out of 30 I checked myself', 'why.1p': 'If it doesn’t have your bike, I’ll find one elsewhere. I work with shops across the island, so I’ll find a bike even when everything nearby is taken',
      'why.2t': 'A video of the actual bike before you book', 'why.2p': 'You see the exact bike you’ll get: all sides, mileage, engine start',
      'why.3t': 'Price and deposit in writing', 'why.3p': 'Everything is agreed before you book, no surprises at pickup',
      'why.4t': 'A problem with the shop? I handle it', 'why.4p': 'Message me and I’ll sort it out with the shop. A shop that lets a customer down is off my list',
      'terms.t': 'Rental terms',
      'terms.sub': 'These are my main partner shop’s terms. If I find you a bike at another shop, I’ll send you its terms in writing before you book',
      'terms.1t': 'Your passport stays with you', 'terms.1p': 'The shop makes a copy of your passport. The deposit is cash only: ฿3,000 for bikes up to 160 cc, ฿7,000 for 350 cc. You can pay it in dollars, euros, USDT or rubles in cash',
      'terms.2t': 'Included in the price', 'terms.2p': 'Two helmets and medical insurance up to ฿50,000 in case of an accident. The bike itself is not insured: you pay for damage or theft',
      'terms.3t': 'Delivery', 'terms.3p': 'For rentals of 5+ days, one-way delivery is free to Karon, Kata, Bang Tao and Surin. Other areas are paid, the price depends on distance',
      'terms.4t': 'Payment and extension', 'terms.4p': 'You pay for the whole period upfront, no refund for an early return. You can extend remotely, and the rate doesn’t go up',
      'terms.5t': 'Payment methods', 'terms.5p': 'Cash in baht, bank transfer to the shop, rubles via SBP, USDT. Cards are accepted with a 7% surcharge',
      'terms.6t': 'Experience and license', 'terms.6p': 'You need riding experience: shops don’t rent to complete beginners. Riding without a category A license means a ฿1,000 police fine',
      'req.t': 'Request a bike',
      'req.sub': 'Fill in what you know and send it via your messenger. A chat with me opens with your request already typed in, just tap Send',
      'req.direct': 'Or message me directly:',
      'f.dates': 'Dates', 'f.from': 'From', 'f.to': 'To', 'f.area': 'Area', 'f.areaOther': 'Type your area or hotel',
      'f.what': 'What you need', 'f.whatHint': 'Cars and motorcycles on request: I’ll tell you what’s available for your dates',
      'f.model': 'Model', 'f.modelAny': 'Your recommendation',
      'f.exp': 'Riding experience', 'f.expHint': 'Honestly: shops don’t rent bikes to complete beginners. Better start with a few lessons with an instructor',
      'f.budget': 'Budget', 'f.budgetPh': 'E.g. up to ฿6,000 a month',
      'f.comment': 'Comment', 'f.commentPh': 'E.g. two of us riding, need a rear rack',
      'f.sendTg': 'Send via Telegram', 'f.sendWa': 'Send via WhatsApp',
      'f.privacy': 'This site stores nothing: your request goes only to your chat with me',
      areas: ['Karon', 'Kata', 'Patong', 'Kamala', 'Surin', 'Bang Tao', 'Nai Yang (airport)', 'Rawai', 'Nai Harn', 'Chalong', 'Phuket Town', 'Other'],
      what: ['Scooter', 'Motorcycle', 'Car'],
      exp: ['None', 'Under 1 year', '1-3 years', '3+ years'],
      'msg.hello': 'Hi! Request from the FinderBike website',
      'msg.dates': 'Dates', 'msg.noDates': 'not sure yet', 'msg.area': 'Area', 'msg.what': 'Need',
      'msg.model': 'Model', 'msg.exp': 'Riding experience', 'msg.budget': 'Budget', 'msg.comment': 'Comment',
      'msg.bike': 'Hi! I’d like to rent a {name}. Dates: ',
      'faq.t': 'FAQ',
      'faq.1q': 'Why is it free for me?', 'faq.1a': 'The shop pays me a commission out of its own price. You pay the same as if you walked into the shop yourself',
      'faq.2q': 'Why not just message the shop myself?', 'faq.2a': 'You can. I save you time: I compare prices and terms across the island, send you a video of the actual bike and get the price and deposit in writing. Your price stays the same',
      'faq.3q': 'Do I need a license?', 'faq.3a': 'You need a license with a motorcycle category: international or Thai. Without it you get fined at police checkpoints, and insurance may not cover an accident',
      'faq.4q': 'I’ve never ridden before. Can I rent a bike?', 'faq.4a': 'Honestly: shops don’t rent bikes to complete beginners, and they’re right. Phuket drives on the left, the roads between Patong, Karon and Kata are steep and winding, and asphalt gets slippery in the rain. Better start with a few lessons with an instructor',
      'faq.5q': 'If I leave early, do I get a refund?', 'faq.5a': 'Not at my main partner shop: you pay for the whole rental period, unused days are not refunded. Not sure how long you’ll stay? Take a month and extend remotely, the rate won’t go up',
      'faq.6q': 'Can I pay in rubles?', 'faq.6a': 'Yes, some shops accept rubles via SBP transfer, so you don’t need an exchange office. I’ll find those options for you',
      'faq.7q': 'What if there’s a problem with the bike or the shop?', 'faq.7a': 'Message me and I’ll sort it out with the shop. Tip: film the bike from all sides when you pick it up. If the shop finds a scratch on return, you’ll have proof it was already there',
      'foot.p': 'Bike rental matching in Phuket. FinderBike is not a rental shop: you sign the rental agreement with the partner shop'
    }
  };

  // ---------- language ----------
  function detectLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'ru' || q === 'en') return q;
    try { var s = localStorage.getItem('fb-lang'); if (s === 'ru' || s === 'en') return s; } catch (e) {}
    var langs = navigator.languages || [navigator.language || 'ru'];
    for (var i = 0; i < langs.length; i++) {
      var l = String(langs[i]).toLowerCase().slice(0, 2);
      if (['ru', 'uk', 'be', 'kk'].indexOf(l) > -1) return 'ru';
      if (l === 'en') return 'en';
    }
    return 'en';
  }
  var lang = detectLang();
  var period = 2;
  var cls = 'all';
  var state = { area: null, what: 0, exp: null };

  function t(k) { return (T[lang] && T[lang][k] != null) ? T[lang][k] : (T.ru[k] || ''); }
  function money(n) {
    return lang === 'ru'
      ? n.toLocaleString('ru-RU').replace(/\s/g, ' ') + ' ฿'
      : '฿' + n.toLocaleString('en-US');
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.title = t('title');
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var p = el.getAttribute('data-i18n-attr').split(':'); el.setAttribute(p[0], t(p[1]));
    });
    document.querySelectorAll('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    // RU: главная кнопка Telegram, EN: главная WhatsApp
    var send = document.getElementById('sendBtns');
    var tg = document.getElementById('sendTg'), wa = document.getElementById('sendWa');
    if (lang === 'en') send.insertBefore(wa, tg); else send.insertBefore(tg, wa);
    var dock = document.getElementById('dock');
    var dTg = document.getElementById('dockTg'), dWa = document.getElementById('dockWa');
    if (lang === 'en') dock.insertBefore(dWa, dTg); else dock.insertBefore(dTg, dWa);
    renderControls(); renderGrid(); renderForm(); updateLinks();
  }

  // ---------- catalog ----------
  function renderControls() {
    var seg = document.getElementById('period');
    seg.innerHTML = '';
    [0, 1, 2, 3].forEach(function (i) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'radio'); b.textContent = t('per.' + i);
      b.setAttribute('aria-checked', String(i === period));
      b.addEventListener('click', function () { period = i; renderControls(); updatePrices(true); });
      seg.appendChild(b);
    });
    var ch = document.getElementById('cls');
    ch.innerHTML = '';
    ['all', '125', '160', '350'].forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.setAttribute('role', 'radio'); b.textContent = t('cls.' + c);
      b.setAttribute('aria-checked', String(c === cls));
      b.addEventListener('click', function () { cls = c; renderControls(); filterGrid(); });
      ch.appendChild(b);
    });
  }

  function renderGrid() {
    var grid = document.getElementById('grid');
    grid.innerHTML = '';
    BIKES.forEach(function (b) {
      var li = document.createElement('li');
      li.className = 'card'; li.dataset.cls = b.cls; li.dataset.id = b.id;
      var tags = [];
      if (CC[b.cls]) tags.push('<span class="tag">' + CC[b.cls] + '</span>');
      if (b.two) tags.push('<span class="tag tag--two">' + t('card.two') + '</span>');
      li.innerHTML =
        '<div class="card__img"><img loading="lazy" decoding="async" width="800" height="800" src="img/' + (b.img || b.id) + '.webp" alt="' + t('card.alt').replace('{name}', b.name) + '">' +
        (b.photoNote ? '<span class="card__note">' + t('card.photoNote') + '</span>' : '') + '</div>' +
        '<div class="card__body"><span class="card__brand">Honda</span><h3 class="card__name">' + b.name + '</h3>' +
        (tags.length ? '<div class="card__tags">' + tags.join('') + '</div>' : '') +
        '<div class="card__price"><span class="price"></span><span class="per"></span><span class="dep">' + t('card.dep') + ' ' + money(b.dep) + '</span></div>' +
        '<button type="button" class="btn btn--soft card__btn">' + t('card.btn') + '</button></div>';
      li.querySelector('.card__btn').addEventListener('click', function () { chooseBike(b); });
      grid.appendChild(li);
    });
    updatePrices(false); filterGrid();
  }
  function updatePrices(anim) {
    document.querySelectorAll('#grid .card').forEach(function (li) {
      var b = BIKES.filter(function (x) { return x.id === li.dataset.id; })[0];
      var p = li.querySelector('.price');
      p.textContent = money(b.p[period]);
      li.querySelector('.per').textContent = t('suf.' + period);
      if (anim) { p.classList.remove('is-swap'); void p.offsetWidth; p.classList.add('is-swap'); }
    });
  }
  function filterGrid() {
    document.querySelectorAll('#grid .card').forEach(function (li) { li.hidden = !(cls === 'all' || li.dataset.cls === cls); });
  }

  // ---------- form ----------
  function pickGroup(id, items, key) {
    var box = document.getElementById(id);
    box.innerHTML = '';
    box.setAttribute('role', 'radiogroup');
    items.forEach(function (label, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'radio'); b.textContent = label;
      b.setAttribute('aria-checked', String(state[key] === i));
      b.addEventListener('click', function () {
        state[key] = state[key] === i && key !== 'what' ? null : i;
        renderForm(); updateLinks();
      });
      box.appendChild(b);
    });
  }
  function renderForm() {
    var areas = t('areas');
    pickGroup('fArea', areas, 'area');
    pickGroup('fWhat', t('what'), 'what');
    pickGroup('fExp', t('exp'), 'exp');
    var other = document.getElementById('fAreaOther');
    other.hidden = state.area !== areas.length - 1;
    document.getElementById('hintWhat').hidden = !(state.what === 1 || state.what === 2);
    document.getElementById('hintExp').hidden = state.exp !== 0;
    var sel = document.getElementById('fModel');
    var cur = sel.value;
    sel.innerHTML = '<option value="">' + t('f.modelAny') + '</option>' +
      BIKES.map(function (b) { return '<option value="' + b.id + '">Honda ' + b.name + '</option>'; }).join('');
    sel.value = cur;
    sel.disabled = state.what !== 0;
  }
  function fmtDate(v) {
    if (!v) return '';
    var d = new Date(v + 'T12:00:00');
    return lang === 'ru'
      ? d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function buildMessage() {
    var lines = [t('msg.hello')];
    var from = document.getElementById('fFrom').value, to = document.getElementById('fTo').value;
    var dates = from || to ? (fmtDate(from) || '?') + ' - ' + (fmtDate(to) || '?') : t('msg.noDates');
    lines.push(t('msg.dates') + ': ' + dates);
    var areas = t('areas');
    if (state.area != null) {
      var a = state.area === areas.length - 1 ? (document.getElementById('fAreaOther').value.trim() || areas[state.area]) : areas[state.area];
      lines.push(t('msg.area') + ': ' + a);
    }
    lines.push(t('msg.what') + ': ' + t('what')[state.what]);
    if (state.what === 0) {
      var m = document.getElementById('fModel').value;
      var bike = BIKES.filter(function (b) { return b.id === m; })[0];
      lines.push(t('msg.model') + ': ' + (bike ? 'Honda ' + bike.name : t('f.modelAny').toLowerCase()));
    }
    if (state.exp != null) lines.push(t('msg.exp') + ': ' + t('exp')[state.exp]);
    var budget = document.getElementById('fBudget').value.trim();
    if (budget) lines.push(t('msg.budget') + ': ' + budget);
    var c = document.getElementById('fComment').value.trim();
    if (c) lines.push(t('msg.comment') + ': ' + c);
    return lines.join('\n');
  }
  function tgLink(text) { return 'https://t.me/' + TG_USER + '?text=' + encodeURIComponent(text); }
  function waLink(text) { return 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(text); }
  function updateLinks() {
    var msg = buildMessage();
    document.getElementById('sendTg').href = tgLink(msg);
    document.getElementById('sendWa').href = waLink(msg);
  }
  function chooseBike(b) {
    state.what = 0;
    renderForm();
    document.getElementById('fModel').value = b.id;
    updateLinks();
    var form = document.getElementById('form');
    document.getElementById('request').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    form.classList.remove('is-flash'); void form.offsetWidth; form.classList.add('is-flash');
    setTimeout(function () { try { document.getElementById('fFrom').focus({ preventScroll: true }); } catch (e) {} }, 600);
  }

  // ---------- init ----------
  document.addEventListener('DOMContentLoaded', function () {
    var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    var iso = today.toISOString().slice(0, 10);
    var fFrom = document.getElementById('fFrom'), fTo = document.getElementById('fTo');
    fFrom.min = iso; fTo.min = iso;
    fFrom.addEventListener('change', function () { if (fFrom.value) { fTo.min = fFrom.value; if (fTo.value && fTo.value < fFrom.value) fTo.value = ''; } updateLinks(); });
    ['fTo', 'fAreaOther', 'fModel', 'fBudget', 'fComment'].forEach(function (id) {
      var el = document.getElementById(id);
      el.addEventListener('input', updateLinks); el.addEventListener('change', updateLinks);
    });
    ['sendTg', 'sendWa'].forEach(function (id) {
      document.getElementById(id).addEventListener('click', function () { updateLinks(); });
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        lang = b.dataset.lang;
        try { localStorage.setItem('fb-lang', lang); } catch (e) {}
        var u = new URL(location.href); u.searchParams.set('lang', lang); history.replaceState(null, '', u);
        applyLang();
      });
    });
    applyLang();

    // header border + mobile dock
    var top = document.getElementById('top'), dock = document.getElementById('dock');
    var heroCta = document.getElementById('heroCta'), req = document.getElementById('request');
    var heroGone = false, reqIn = false;
    function syncDock() {
      var on = heroGone && !reqIn;
      dock.classList.toggle('is-on', on);
      dock.setAttribute('aria-hidden', String(!on));
      dock.querySelectorAll('a').forEach(function (a) { a.tabIndex = on ? 0 : -1; });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { heroGone = !e[0].isIntersecting && e[0].boundingClientRect.top < 0; syncDock(); }).observe(heroCta);
      new IntersectionObserver(function (e) { reqIn = e[0].isIntersecting; syncDock(); }, { rootMargin: '0px 0px -30% 0px' }).observe(req);
    }
    window.addEventListener('scroll', function () { top.classList.toggle('is-scrolled', window.scrollY > 4); }, { passive: true });
  });
})();
