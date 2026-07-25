// Matches the exact wording of the mobile app's own language picker
// (AppLanguage.nativeName in language_provider.dart) — always the
// endonym, regardless of the current page's language.
export const languages = {
  sr: 'Српски (ћирилица)',
  'sr-Latn': 'Srpski (latinica)',
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
    'nav.about': 'О аутору',
    'nav.contact': 'Контакт',

    'hero.badge': 'Ускоро',
    'hero.subtitle':
      'Трошкомир вам показује тачно где иде ваш новац: трошкови, картице, рате, штедња и подсетници — све прегледно, на једном месту.',
    'cta.playStore': 'Преузми са Google Play-а',
    'cta.appStore': 'Преузми са App Store-а',

    'features.heading': 'Шта Трошкомир уме',
    'features.subheading': 'Кратак преглед свих функција, да знате шта добијате.',

    'cat.tracking': 'Праћење трошкова',
    'cat.cards': 'Картице и рате',
    'cat.reminders': 'Подсетници и обавештења',
    'cat.savings': 'Штедња и лојалти',

    'feat.scan.title': 'Скенирање фискалног рачуна',
    'feat.scan.body':
      'Скенирајте QR код са фискалног рачуна камером телефона — апликација учитава податке директно са званичне странице Пореске управе (suf.purs.gov.rs) и сама уписује продавницу, износ и артикле.',

    'feat.expenses.title': 'Једнократни и редовни трошкови',
    'feat.expenses.body':
      'Обичну куповину унесете за секунд. За трошкове који се понављају — кирију, претплате — изаберете једном да ли Трошкомир сам уписује трошак на дан доспећа, или само вас подсети да га потврдите.',

    'feat.pools.title': 'Валутни базени за путовања',
    'feat.pools.body':
      'Купите девизе унапред — рецимо 700 евра за пут у Немачку — и Трошкомир закључа курс по којем сте их купили. Сваки трошак на путу се одбија по том закљученом курсу, а не по дневном, тако тачно знате колико вам је остало.',

    'feat.budgets.title': 'Месечни буџети по категоријама',
    'feat.budgets.body':
      'Поставите месечни лимит за сваку категорију трошкова и добијете упозорење када га премашите — да знате где стварно прекорачујете.',

    'feat.debit.title': 'Дебитне картице',
    'feat.debit.body':
      'Обична дебитна картица — сваки трошак се одмах рачуна у ваш буџет, исто као готовина.',

    'feat.credit.title': 'Кредитне картице',
    'feat.credit.body':
      'Трошак се бележи одмах, али се не рачуна у буџет док не измирите рачун картице — тако видите шта дугујете, а буџет остаје тачан.',

    'feat.installments.title': 'Куповина на рате',
    'feat.installments.body':
      'Рате се прате као засебан кредит — важи и за дебитне и за кредитне картице. Трошкомир зна колико рата је остало и, ако желите, сам уписује сваку доспелу рату.',

    'feat.household.title': 'Дељено домаћинство',
    'feat.household.body':
      'Картице, трошкови, буџети, рате, штедња и валутни базени могу бити дељени са домаћинством — сваки члан види исте податке.',

    'feat.warranty.title': 'Гаранција на рачуну',
    'feat.warranty.body':
      'При чувању рачуна изаберете трајање гаранције — 12, 24 (подразумевано) или 36 месеци. Месец дана пре истека, Трошкомир вас сам подсети да гаранција ускоро истиче.',

    'feat.notifications.title': 'Дневни и недељни преглед',
    'feat.notifications.body':
      'Сваког јутра у 8 добијате преглед свега што је аутоматски уписано тог дана — редовни трошкови, приходи и рате. Сваког понедељка стиже и недељни преглед укупне потрошње за протеклу недељу.',

    'feat.reminders.title': 'Подсетници на дан доспећа',
    'feat.reminders.body':
      'Ако не желите аутоматски упис, Трошкомир вам пошаље подсетник тачно на дан када редован трошак доспева, унапред заказан за наредних неколико доспећа.',

    'feat.savings.title': 'Циљеви штедње',
    'feat.savings.body':
      'Пратите уплате и подизања за сваки циљ штедње или инвестицију посебно, одвојено од свакодневних трошкова.',

    'feat.loyalty.title': 'Лојалти и поклон картице',
    'feat.loyalty.body':
      'Све лојалти и поклон картице на једном месту, са стањем и историјом коришћења.',

    'privacy.title': 'Приватност',
    'privacy.body':
      'Осетљиви подаци — описи трошкова, рачуни и слично — енкриптовани су од уређаја до уређаја (end-to-end), тако да их ни ја не могу прочитати из базе. Искрено, не треба ми нити желим да знам шта купујете и од кога... мада признајем, праве цене кирија у Београду би биле забавне за знати.',

    'about.heading': 'О аутору',
    'about.name': 'Никола Дашић',
    'about.bio':
      'Ћао, ја сам Никола Дашић — софтверски инжењер. Трошкомир сам направио јер сам предуго водио своје трошкове у проклетим Excel табелама, па сам одлучио да направим нешто боље. Ради на мом кућном сервер-лабу, не у неком великом облаку — зато основне функције остају бесплатне. Ако имате питања или предлоге, јавите се.',
    'about.linkedin': 'Повежимо се на LinkedIn-у',

    'footer.contact': 'Питања?',
    'footer.rights': 'Сва права задржана.',
  },
  'sr-Latn': {
    'site.title': 'Troskomir',
    'site.description':
      'Troskomir — praćenje troškova, kartica, rata, štednje i podsetnika, sve na jednom mestu.',

    'nav.features': 'Funkcije',
    'nav.privacy': 'Privatnost',
    'nav.about': 'O autoru',
    'nav.contact': 'Kontakt',

    'hero.badge': 'Uskoro',
    'hero.subtitle':
      'Troskomir vam pokazuje tačno gde ide vaš novac: troškovi, kartice, rate, štednja i podsetnici — sve pregledno, na jednom mestu.',
    'cta.playStore': 'Preuzmi sa Google Play-a',
    'cta.appStore': 'Preuzmi sa App Store-a',

    'features.heading': 'Šta Troskomir ume',
    'features.subheading': 'Kratak pregled svih funkcija, da znate šta dobijate.',

    'cat.tracking': 'Praćenje troškova',
    'cat.cards': 'Kartice i rate',
    'cat.reminders': 'Podsetnici i obaveštenja',
    'cat.savings': 'Štednja i lojalti',

    'feat.scan.title': 'Skeniranje fiskalnog računa',
    'feat.scan.body':
      'Skenirajte QR kod sa fiskalnog računa kamerom telefona — aplikacija učitava podatke direktno sa zvanične stranice Poreske uprave (suf.purs.gov.rs) i sama upisuje prodavnicu, iznos i artikle.',

    'feat.expenses.title': 'Jednokratni i redovni troškovi',
    'feat.expenses.body':
      'Običnu kupovinu unesete za sekund. Za troškove koji se ponavljaju — kiriju, pretplate — izaberete jednom da li Troskomir sam upisuje trošak na dan dospeća, ili samo vas podseti da ga potvrdite.',

    'feat.pools.title': 'Valutni bazeni za putovanja',
    'feat.pools.body':
      'Kupite devize unapred — recimo 700 evra za put u Nemačku — i Troskomir zaključa kurs po kome ste ih kupili. Svaki trošak na putu se odbija po tom zaključanom kursu, a ne po dnevnom, tako tačno znate koliko vam je ostalo.',

    'feat.budgets.title': 'Mesečni budžeti po kategorijama',
    'feat.budgets.body':
      'Postavite mesečni limit za svaku kategoriju troškova i dobijete upozorenje kada ga premašite — da znate gde stvarno prekoračujete.',

    'feat.debit.title': 'Debitne kartice',
    'feat.debit.body':
      'Obična debitna kartica — svaki trošak se odmah računa u vaš budžet, isto kao gotovina.',

    'feat.credit.title': 'Kreditne kartice',
    'feat.credit.body':
      'Trošak se beleži odmah, ali se ne računa u budžet dok ne izmirite račun kartice — tako vidite šta dugujete, a budžet ostaje tačan.',

    'feat.installments.title': 'Kupovina na rate',
    'feat.installments.body':
      'Rate se prate kao zaseban kredit — važi i za debitne i za kreditne kartice. Troskomir zna koliko rata je ostalo i, ako želite, sam upisuje svaku dospelu ratu.',

    'feat.household.title': 'Deljeno domaćinstvo',
    'feat.household.body':
      'Kartice, troškovi, budžeti, rate, štednja i valutni bazeni mogu biti deljeni sa domaćinstvom — svaki član vidi iste podatke.',

    'feat.warranty.title': 'Garancija na računu',
    'feat.warranty.body':
      'Pri čuvanju računa izaberete trajanje garancije — 12, 24 (podrazumevano) ili 36 meseci. Mesec dana pre isteka, Troskomir vas sam podseti da garancija uskoro ističe.',

    'feat.notifications.title': 'Dnevni i nedeljni pregled',
    'feat.notifications.body':
      'Svakog jutra u 8 dobijate pregled svega što je automatski upisano tog dana — redovni troškovi, prihodi i rate. Svakog ponedeljka stiže i nedeljni pregled ukupne potrošnje za proteklu nedelju.',

    'feat.reminders.title': 'Podsetnici na dan dospeća',
    'feat.reminders.body':
      'Ako ne želite automatski upis, Troskomir vam pošalje podsetnik tačno na dan kada redovan trošak dospeva, unapred zakazan za narednih nekoliko dospeća.',

    'feat.savings.title': 'Ciljevi štednje',
    'feat.savings.body':
      'Pratite uplate i podizanja za svaki cilj štednje ili investiciju posebno, odvojeno od svakodnevnih troškova.',

    'feat.loyalty.title': 'Lojalti i poklon kartice',
    'feat.loyalty.body':
      'Sve lojalti i poklon kartice na jednom mestu, sa stanjem i istorijom korišćenja.',

    'privacy.title': 'Privatnost',
    'privacy.body':
      'Osetljivi podaci — opisi troškova, računi i slično — enkriptovani su od uređaja do uređaja (end-to-end), tako da ih ni ja ne mogu pročitati iz baze. Iskreno, ne treba mi niti želim da znam šta kupujete i od koga... mada priznajem, prave cene kirija u Beogradu bi bile zabavne za znati.',

    'about.heading': 'O autoru',
    'about.name': 'Nikola Dašić',
    'about.bio':
      'Ćao, ja sam Nikola Dašić — softverski inženjer. Troskomir sam napravio jer sam predugo vodio svoje troškove u prokletim Excel tabelama, pa sam odlučio da napravim nešto bolje. Radi na mom kućnom server-labu, ne u nekom velikom oblaku — zato osnovne funkcije ostaju besplatne. Ako imate pitanja ili predloge, javite se.',
    'about.linkedin': 'Povežimo se na LinkedIn-u',

    'footer.contact': 'Pitanja?',
    'footer.rights': 'Sva prava zadržana.',
  },
  en: {
    'site.title': 'Troskomir',
    'site.description':
      'Troskomir — track expenses, cards, installments, savings and reminders, all in one place.',

    'nav.features': 'Features',
    'nav.privacy': 'Privacy',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    'hero.badge': 'Coming soon',
    'hero.subtitle':
      'Troskomir shows you exactly where your money goes: expenses, cards, installments, savings and reminders — all in one place.',
    'cta.playStore': 'Get it on Google Play',
    'cta.appStore': 'Download on the App Store',

    'features.heading': 'What Troskomir does',
    'features.subheading': "A quick rundown of every feature, so you know what you're getting.",

    'cat.tracking': 'Expense tracking',
    'cat.cards': 'Cards & installments',
    'cat.reminders': 'Reminders & notifications',
    'cat.savings': 'Savings & loyalty',

    'feat.scan.title': 'Fiscal receipt scanning',
    'feat.scan.body':
      "Scan the QR code on a Serbian fiscal receipt with your phone's camera — the app pulls the data straight from the Tax Administration's official page (suf.purs.gov.rs) and fills in the store, amount and items.",

    'feat.expenses.title': 'One-time & recurring expenses',
    'feat.expenses.body':
      'Log a regular purchase in seconds. For expenses that repeat — rent, subscriptions — choose once whether Troskomir logs the expense automatically on the due date, or just reminds you to confirm it.',

    'feat.pools.title': 'Currency pools for trips',
    'feat.pools.body':
      "Buy foreign currency upfront — say €700 for a trip to Germany — and Troskomir locks in the exchange rate you paid. Every expense on the trip is deducted at that locked rate, not the daily rate, so you always know exactly how much is left.",

    'feat.budgets.title': 'Monthly category budgets',
    'feat.budgets.body':
      "Set a monthly limit for each expense category and get an alert when you go over it — so you know exactly where you're overspending.",

    'feat.debit.title': 'Debit cards',
    'feat.debit.body':
      'A plain debit card — every purchase counts against your budget immediately, just like cash.',

    'feat.credit.title': 'Credit cards',
    'feat.credit.body':
      "The purchase is logged right away, but it doesn't hit your budget until you settle the card statement — so you can see what you owe while your budget stays accurate.",

    'feat.installments.title': 'Installment purchases',
    'feat.installments.body':
      'Installments are tracked as a separate loan — on either a debit or a credit card. Troskomir knows how many installments are left and, if you want, logs each due one automatically.',

    'feat.household.title': 'Shared household',
    'feat.household.body':
      'Cards, expenses, budgets, installments, savings and currency pools can all be shared with your household — every member sees the same data.',

    'feat.warranty.title': 'Receipt warranty tracking',
    'feat.warranty.body':
      'When you save a receipt, pick a warranty length — 12, 24 (default) or 36 months. A month before it expires, Troskomir reminds you on its own.',

    'feat.notifications.title': 'Daily & weekly summaries',
    'feat.notifications.body':
      'Every morning at 8, you get a summary of everything auto-logged that day — recurring expenses, income and installments. Every Monday, a weekly digest of your total spending for the past week arrives too.',

    'feat.reminders.title': 'Due-date reminders',
    'feat.reminders.body':
      "If you'd rather not auto-log it, Troskomir sends a reminder on the exact day a recurring expense is due, scheduled ahead for the next several occurrences.",

    'feat.savings.title': 'Savings goals',
    'feat.savings.body':
      'Track deposits and withdrawals for each savings or investment goal separately, apart from everyday expenses.',

    'feat.loyalty.title': 'Loyalty & gift cards',
    'feat.loyalty.body':
      'All your loyalty and gift cards in one place, with balance and usage history.',

    'privacy.title': 'Privacy',
    'privacy.body':
      "Sensitive data — expense descriptions, receipts and the like — is encrypted end-to-end, so not even I can read it from the database. Honestly, I don't need or want to know what you're buying and from whom... though I'll admit real Belgrade rent prices would be fun to know.",

    'about.heading': 'About the author',
    'about.name': 'Nikola Dašić',
    'about.bio':
      "Hi, I'm Nikola Dašić — a software engineer. I built Troskomir because I spent way too many years tracking my own expenses in cursed Excel spreadsheets and finally decided to build something better. It runs on my own home server lab, not some big commercial cloud — which is exactly why the core features stay free. If you have questions or suggestions, feel free to reach out.",
    'about.linkedin': 'Connect on LinkedIn',

    'footer.contact': 'Questions?',
    'footer.rights': 'All rights reserved.',
  },
  ru: {
    'site.title': 'Трошкомир',
    'site.description':
      'Трошкомир — учёт расходов, карт, рассрочки, накоплений и напоминаний в одном месте.',

    'nav.features': 'Функции',
    'nav.privacy': 'Конфиденциальность',
    'nav.about': 'Об авторе',
    'nav.contact': 'Контакты',

    'hero.badge': 'Скоро',
    'hero.subtitle':
      'Трошкомир точно показывает, куда уходят ваши деньги: расходы, карты, рассрочка, накопления и напоминания — всё в одном месте.',
    'cta.playStore': 'Загрузите в Google Play',
    'cta.appStore': 'Загрузите в App Store',

    'features.heading': 'Что умеет Трошкомир',
    'features.subheading': 'Короткий обзор всех функций, чтобы вы знали, что получаете.',

    'cat.tracking': 'Учёт расходов',
    'cat.cards': 'Карты и рассрочка',
    'cat.reminders': 'Напоминания и уведомления',
    'cat.savings': 'Накопления и лояльность',

    'feat.scan.title': 'Сканирование фискального чека',
    'feat.scan.body':
      'Отсканируйте QR-код на фискальном чеке камерой телефона — приложение получает данные напрямую со страницы Налоговой администрации (suf.purs.gov.rs) и само заполняет магазин, сумму и товары.',

    'feat.expenses.title': 'Разовые и регулярные расходы',
    'feat.expenses.body':
      'Обычную покупку вносите за секунду. Для повторяющихся расходов — аренда, подписки — один раз выбираете: пусть Трошкомир сам вносит расход в день платежа, либо просто напоминает подтвердить его.',

    'feat.pools.title': 'Валютные пулы для поездок',
    'feat.pools.body':
      'Купите валюту заранее — например, 700 евро для поездки в Германию — и Трошкомир зафиксирует курс покупки. Каждый расход в поездке списывается по этому зафиксированному курсу, а не по текущему, так что вы всегда точно знаете, сколько осталось.',

    'feat.budgets.title': 'Месячные бюджеты по категориям',
    'feat.budgets.body':
      'Установите месячный лимит для каждой категории расходов и получайте уведомление при его превышении — чтобы точно знать, где вы перерасходуете.',

    'feat.debit.title': 'Дебетовые карты',
    'feat.debit.body':
      'Обычная дебетовая карта — каждая покупка сразу учитывается в бюджете, как наличные.',

    'feat.credit.title': 'Кредитные карты',
    'feat.credit.body':
      'Покупка фиксируется сразу, но не учитывается в бюджете, пока вы не погасите выписку по карте — так вы видите, сколько должны, а бюджет остаётся точным.',

    'feat.installments.title': 'Покупки в рассрочку',
    'feat.installments.body':
      'Рассрочка отслеживается как отдельный кредит — неважно, дебетовая карта или кредитная. Трошкомир знает, сколько платежей осталось, и, если хотите, сам вносит каждый очередной платёж.',

    'feat.household.title': 'Общее домохозяйство',
    'feat.household.body':
      'Карты, расходы, бюджеты, рассрочки, накопления и валютные пулы можно сделать общими для домохозяйства — каждый участник видит одни и те же данные.',

    'feat.warranty.title': 'Гарантия по чеку',
    'feat.warranty.body':
      'При сохранении чека вы выбираете срок гарантии — 12, 24 (по умолчанию) или 36 месяцев. За месяц до истечения Трошкомир сам напомнит вам об этом.',

    'feat.notifications.title': 'Ежедневные и еженедельные сводки',
    'feat.notifications.body':
      'Каждое утро в 8 вы получаете сводку всего, что было автоматически внесено за день — регулярные расходы, доходы и платежи по рассрочке. Каждый понедельник приходит ещё и недельная сводка общих расходов за прошедшую неделю.',

    'feat.reminders.title': 'Напоминания в день платежа',
    'feat.reminders.body':
      'Если не хотите автоматический учёт, Трошкомир пришлёт напоминание точно в день, когда наступает регулярный расход — заранее запланировано на несколько ближайших платежей.',

    'feat.savings.title': 'Цели накоплений',
    'feat.savings.body':
      'Отслеживайте пополнения и снятия по каждой цели накопления или инвестиции отдельно от повседневных расходов.',

    'feat.loyalty.title': 'Карты лояльности и подарочные карты',
    'feat.loyalty.body':
      'Все карты лояльности и подарочные карты в одном месте, с балансом и историей использования.',

    'privacy.title': 'Конфиденциальность',
    'privacy.body':
      'Чувствительные данные — описания расходов, чеки и подобное — зашифрованы end-to-end, так что даже я не могу прочитать их из базы. Честно говоря, мне не нужно и не хочется знать, что вы покупаете и у кого... хотя было бы забавно узнать реальные цены на аренду в Белграде.',

    'about.heading': 'Об авторе',
    'about.name': 'Никола Дашич',
    'about.bio':
      'Привет, я Никола Дашич — инженер-программист. Я сделал Трошкомир, потому что слишком долго вёл учёт своих расходов в проклятых Excel-таблицах и наконец решил сделать что-то лучше. Он работает на моём домашнем сервере, а не в большом коммерческом облаке — именно поэтому основные функции остаются бесплатными. Если у вас есть вопросы или предложения, пишите.',
    'about.linkedin': 'Давайте свяжемся в LinkedIn',

    'footer.contact': 'Вопросы?',
    'footer.rights': 'Все права защищены.',
  },
} as const;

export type TranslationKey = keyof (typeof translations)['sr'];
