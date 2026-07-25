export const languages = {
  sr: 'Српски',
  'sr-Latn': 'Srpski',
  en: 'English',
  ru: 'Русский',
} as const;

export const defaultLang = 'sr';

export type Lang = keyof typeof languages;

export const translations = {
  sr: {
    'site.title': 'Трошкомир',
    'site.description':
      'Трошкомир — праћење трошкова, картица, рата, штедње и подсетника, све на једном месту.',

    'nav.features': 'Функције',
    'nav.privacy': 'Приватност',
    'nav.contact': 'Контакт',

    'hero.badge': 'Ускоро',
    'hero.title1': 'Трош',
    'hero.title2': 'комир',
    'hero.subtitle':
      'Трошкомир вам показује тачно где иде ваш новац: трошкови, картице, рате, штедња и подсетници — све прегледно, на једном месту.',

    'features.heading': 'Шта Трошкомир уме',
    'features.subheading': 'Кратак преглед свих функција, да знате шта добијате.',

    'cat.tracking': 'Праћење трошкова',
    'cat.cards': 'Картице и рате',
    'cat.reminders': 'Подсетници и обавештења',
    'cat.savings': 'Штедња и лојалти',

    'feat.scan.title': 'Скенирање рачуна',
    'feat.scan.body':
      'Усликајте или скенирајте фискални рачун — апликација сама препознаје износ, продавницу и артикле, а ви само потврдите пре чувања.',

    'feat.expenses.title': 'Једнократни и редовни трошкови',
    'feat.expenses.body':
      'Обичну куповину унесете за секунд. За кирију, претплате и рачуне који се понављају, поставите их једном — Трошкомир их сам уноси или вас подсећа да их потврдите.',

    'feat.pools.title': 'Валутни буџетски базени',
    'feat.pools.body':
      'Групишите трошкове у буџете који могу да мешају динаре, евре и друге валуте у исти базен, и укључујете их или искључујете по потреби.',

    'feat.debit.title': 'Дебитне картице',
    'feat.debit.body':
      'Обична дебитна картица — сваки трошак се одмах рачуна у ваш буџет, исто као готовина.',

    'feat.credit.title': 'Кредитне картице',
    'feat.credit.body':
      'Трошак се бележи одмах, али се не рачуна у буџет док не измирите рачун картице — тако видите шта дугујете, а буџет остаје тачан.',

    'feat.installments.title': 'Куповина на рате',
    'feat.installments.body':
      'И дебитне и кредитне картице подржавају куповину на рате. Трошкомир прати колико рата је остало и сам уписује сваку доспелу рату.',

    'feat.household.title': 'Дељене картице домаћинства',
    'feat.household.body':
      'Заједничка картица домаћинства видљива је свим члановима — свако зна на шта је новац отишао.',

    'feat.warranty.title': 'Гаранција на рачуну',
    'feat.warranty.body':
      'Означите рачун као „под гаранцијом" и поставите датум истека — Трошкомир вас подсети пре него што гаранција прође.',

    'feat.notifications.title': 'Обавештења о аутоматским ратама',
    'feat.notifications.body':
      'Свака аутоматски уписана рата или редован трошак стиже уз обавештење — дневно, недељно или месечно, путем и-мејла, push нотификације или директно у апликацији, како вам одговара.',

    'feat.reminders.title': 'Подсетници за редовне трошкове',
    'feat.reminders.body':
      'Пре него што доспе рачун за кирију или претплату, добијате подсетник да га прегледате и потврдите.',

    'feat.savings.title': 'Циљеви штедње',
    'feat.savings.body':
      'Пратите уплате и подизања за сваки циљ штедње или инвестицију посебно, одвојено од свакодневних трошкова.',

    'feat.loyalty.title': 'Лојалти и поклон картице',
    'feat.loyalty.body':
      'Све лојалти и поклон картице на једном месту, са стањем и историјом коришћења.',

    'privacy.title': 'Приватност',
    'privacy.body':
      'Осетљиви подаци — описи трошкова, рачуни и слично — енкриптовани су од уређаја до уређаја (end-to-end). Сервер чува само шифровани садржај и никада не види шта је унутра.',

    'footer.contact': 'Питања?',
    'footer.rights': 'Сва права задржана.',
  },
  'sr-Latn': {
    'site.title': 'Troskomir',
    'site.description':
      'Troskomir — praćenje troškova, kartica, rata, štednje i podsetnika, sve na jednom mestu.',

    'nav.features': 'Funkcije',
    'nav.privacy': 'Privatnost',
    'nav.contact': 'Kontakt',

    'hero.badge': 'Uskoro',
    'hero.title1': 'Troš',
    'hero.title2': 'komir',
    'hero.subtitle':
      'Troskomir vam pokazuje tačno gde ide vaš novac: troškovi, kartice, rate, štednja i podsetnici — sve pregledno, na jednom mestu.',

    'features.heading': 'Šta Troskomir ume',
    'features.subheading': 'Kratak pregled svih funkcija, da znate šta dobijate.',

    'cat.tracking': 'Praćenje troškova',
    'cat.cards': 'Kartice i rate',
    'cat.reminders': 'Podsetnici i obaveštenja',
    'cat.savings': 'Štednja i lojalti',

    'feat.scan.title': 'Skeniranje računa',
    'feat.scan.body':
      'Uslikajte ili skenirajte fiskalni račun — aplikacija sama prepoznaje iznos, prodavnicu i artikle, a vi samo potvrdite pre čuvanja.',

    'feat.expenses.title': 'Jednokratni i redovni troškovi',
    'feat.expenses.body':
      'Običnu kupovinu unesete za sekund. Za kiriju, pretplate i račune koji se ponavljaju, postavite ih jednom — Troskomir ih sam unosi ili vas podseća da ih potvrdite.',

    'feat.pools.title': 'Valutni budžetski bazeni',
    'feat.pools.body':
      'Grupišite troškove u budžete koji mogu da mešaju dinare, evre i druge valute u isti bazen, i uključujete ih ili isključujete po potrebi.',

    'feat.debit.title': 'Debitne kartice',
    'feat.debit.body':
      'Obična debitna kartica — svaki trošak se odmah računa u vaš budžet, isto kao gotovina.',

    'feat.credit.title': 'Kreditne kartice',
    'feat.credit.body':
      'Trošak se beleži odmah, ali se ne računa u budžet dok ne izmirite račun kartice — tako vidite šta dugujete, a budžet ostaje tačan.',

    'feat.installments.title': 'Kupovina na rate',
    'feat.installments.body':
      'I debitne i kreditne kartice podržavaju kupovinu na rate. Troskomir prati koliko rata je ostalo i sam upisuje svaku dospelu ratu.',

    'feat.household.title': 'Deljene kartice domaćinstva',
    'feat.household.body':
      'Zajednička kartica domaćinstva vidljiva je svim članovima — svako zna na šta je novac otišao.',

    'feat.warranty.title': 'Garancija na računu',
    'feat.warranty.body':
      'Označite račun kao „pod garancijom" i postavite datum isteka — Troskomir vas podseti pre nego što garancija prođe.',

    'feat.notifications.title': 'Obaveštenja o automatskim ratama',
    'feat.notifications.body':
      'Svaka automatski upisana rata ili redovan trošak stiže uz obaveštenje — dnevno, nedeljno ili mesečno, putem imejla, push notifikacije ili direktno u aplikaciji, kako vam odgovara.',

    'feat.reminders.title': 'Podsetnici za redovne troškove',
    'feat.reminders.body':
      'Pre nego što dospe račun za kiriju ili pretplatu, dobijate podsetnik da ga pregledate i potvrdite.',

    'feat.savings.title': 'Ciljevi štednje',
    'feat.savings.body':
      'Pratite uplate i podizanja za svaki cilj štednje ili investiciju posebno, odvojeno od svakodnevnih troškova.',

    'feat.loyalty.title': 'Lojalti i poklon kartice',
    'feat.loyalty.body':
      'Sve lojalti i poklon kartice na jednom mestu, sa stanjem i istorijom korišćenja.',

    'privacy.title': 'Privatnost',
    'privacy.body':
      'Osetljivi podaci — opisi troškova, računi i slično — enkriptovani su od uređaja do uređaja (end-to-end). Server čuva samo šifrovani sadržaj i nikada ne vidi šta je unutra.',

    'footer.contact': 'Pitanja?',
    'footer.rights': 'Sva prava zadržana.',
  },
  en: {
    'site.title': 'Troskomir',
    'site.description':
      'Troskomir — track expenses, cards, installments, savings and reminders, all in one place.',

    'nav.features': 'Features',
    'nav.privacy': 'Privacy',
    'nav.contact': 'Contact',

    'hero.badge': 'Coming soon',
    'hero.title1': 'Tros',
    'hero.title2': 'komir',
    'hero.subtitle':
      'Troskomir shows you exactly where your money goes: expenses, cards, installments, savings and reminders — all in one place.',

    'features.heading': 'What Troskomir does',
    'features.subheading': "A quick rundown of every feature, so you know what you're getting.",

    'cat.tracking': 'Expense tracking',
    'cat.cards': 'Cards & installments',
    'cat.reminders': 'Reminders & notifications',
    'cat.savings': 'Savings & loyalty',

    'feat.scan.title': 'Receipt scanning',
    'feat.scan.body':
      'Snap a photo or scan a fiscal receipt — the app reads the amount, store and items automatically, and you just confirm before saving.',

    'feat.expenses.title': 'One-time & recurring expenses',
    'feat.expenses.body':
      'Log a regular purchase in seconds. For rent, subscriptions and bills that repeat, set them up once — Troskomir logs them automatically or reminds you to confirm.',

    'feat.pools.title': 'Multi-currency budget pools',
    'feat.pools.body':
      'Group expenses into budgets that can mix dinars, euros and other currencies in the same pool, and turn them on or off whenever you need.',

    'feat.debit.title': 'Debit cards',
    'feat.debit.body':
      'A plain debit card — every purchase counts against your budget immediately, just like cash.',

    'feat.credit.title': 'Credit cards',
    'feat.credit.body':
      "The purchase is logged right away, but it doesn't hit your budget until you settle the card statement — so you can see what you owe while your budget stays accurate.",

    'feat.installments.title': 'Installment purchases',
    'feat.installments.body':
      "Both debit and credit cards support installment purchases. Troskomir tracks how many installments are left and logs each one automatically as it's due.",

    'feat.household.title': 'Shared household cards',
    'feat.household.body':
      'A shared household card is visible to every member — everyone can see where the money went.',

    'feat.warranty.title': 'Receipt warranty tracking',
    'feat.warranty.body':
      'Mark a receipt as "under warranty" and set an expiry date — Troskomir reminds you before the warranty runs out.',

    'feat.notifications.title': 'Automatic installment notifications',
    'feat.notifications.body':
      'Every automatically logged installment or recurring expense comes with a notification — daily, weekly or monthly, by email, push, or right inside the app, whichever you prefer.',

    'feat.reminders.title': 'Recurring expense reminders',
    'feat.reminders.body':
      'Before a rent payment or subscription is due, you get a reminder to review and confirm it.',

    'feat.savings.title': 'Savings goals',
    'feat.savings.body':
      'Track deposits and withdrawals for each savings or investment goal separately, apart from everyday expenses.',

    'feat.loyalty.title': 'Loyalty & gift cards',
    'feat.loyalty.body':
      'All your loyalty and gift cards in one place, with balance and usage history.',

    'privacy.title': 'Privacy',
    'privacy.body':
      "Sensitive data — expense descriptions, receipts and the like — is encrypted end-to-end. The server only ever stores ciphertext and never sees what's inside.",

    'footer.contact': 'Questions?',
    'footer.rights': 'All rights reserved.',
  },
  ru: {
    'site.title': 'Трошкомир',
    'site.description':
      'Трошкомир — учёт расходов, карт, рассрочки, накоплений и напоминаний в одном месте.',

    'nav.features': 'Функции',
    'nav.privacy': 'Конфиденциальность',
    'nav.contact': 'Контакты',

    'hero.badge': 'Скоро',
    'hero.title1': 'Трош',
    'hero.title2': 'комир',
    'hero.subtitle':
      'Трошкомир точно показывает, куда уходят ваши деньги: расходы, карты, рассрочка, накопления и напоминания — всё в одном месте.',

    'features.heading': 'Что умеет Трошкомир',
    'features.subheading': 'Короткий обзор всех функций, чтобы вы знали, что получаете.',

    'cat.tracking': 'Учёт расходов',
    'cat.cards': 'Карты и рассрочка',
    'cat.reminders': 'Напоминания и уведомления',
    'cat.savings': 'Накопления и лояльность',

    'feat.scan.title': 'Сканирование чеков',
    'feat.scan.body':
      'Сфотографируйте или отсканируйте фискальный чек — приложение само распознаёт сумму, магазин и товары, вам остаётся только подтвердить перед сохранением.',

    'feat.expenses.title': 'Разовые и регулярные расходы',
    'feat.expenses.body':
      'Обычную покупку вносите за секунду. Для аренды, подписок и повторяющихся счетов настройте их один раз — Трошкомир сам их вносит или напоминает подтвердить.',

    'feat.pools.title': 'Валютные бюджетные пулы',
    'feat.pools.body':
      'Группируйте расходы в бюджеты, которые могут объединять динары, евро и другие валюты в одном пуле, и включайте или отключайте их по мере необходимости.',

    'feat.debit.title': 'Дебетовые карты',
    'feat.debit.body':
      'Обычная дебетовая карта — каждая покупка сразу учитывается в бюджете, как наличные.',

    'feat.credit.title': 'Кредитные карты',
    'feat.credit.body':
      'Покупка фиксируется сразу, но не учитывается в бюджете, пока вы не погасите выписку по карте — так вы видите, сколько должны, а бюджет остаётся точным.',

    'feat.installments.title': 'Покупки в рассрочку',
    'feat.installments.body':
      'И дебетовые, и кредитные карты поддерживают покупки в рассрочку. Трошкомир отслеживает, сколько платежей осталось, и сам вносит каждый очередной платёж.',

    'feat.household.title': 'Общие карты домохозяйства',
    'feat.household.body':
      'Общая карта домохозяйства видна всем членам семьи — каждый видит, куда ушли деньги.',

    'feat.warranty.title': 'Гарантия по чеку',
    'feat.warranty.body':
      'Отметьте чек как «на гарантии» и укажите дату окончания — Трошкомир напомнит вам до истечения гарантии.',

    'feat.notifications.title': 'Уведомления об автоматических платежах',
    'feat.notifications.body':
      'Каждый автоматически внесённый платёж по рассрочке или регулярный расход сопровождается уведомлением — ежедневно, еженедельно или ежемесячно, по email, push-уведомлением или прямо в приложении — как вам удобно.',

    'feat.reminders.title': 'Напоминания о регулярных расходах',
    'feat.reminders.body':
      'Перед тем как наступит срок оплаты аренды или подписки, вы получаете напоминание проверить и подтвердить его.',

    'feat.savings.title': 'Цели накоплений',
    'feat.savings.body':
      'Отслеживайте пополнения и снятия по каждой цели накопления или инвестиции отдельно от повседневных расходов.',

    'feat.loyalty.title': 'Карты лояльности и подарочные карты',
    'feat.loyalty.body':
      'Все карты лояльности и подарочные карты в одном месте, с балансом и историей использования.',

    'privacy.title': 'Конфиденциальность',
    'privacy.body':
      'Чувствительные данные — описания расходов, чеки и подобное — зашифрованы end-to-end. Сервер хранит только зашифрованное содержимое и никогда не видит, что внутри.',

    'footer.contact': 'Вопросы?',
    'footer.rights': 'Все права защищены.',
  },
} as const;

export type TranslationKey = keyof (typeof translations)['sr'];
