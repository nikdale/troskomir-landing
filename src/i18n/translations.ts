// Matches the exact wording of the mobile app's own language picker
// (AppLanguage.nativeName in language_provider.dart) — always the
// endonym, regardless of the current page's language.
export const languages = {
  sr: "Српски (ћирилица)",
  "sr-Latn": "Srpski (latinica)",
  en: "English",
  ru: "Русский",
} as const;

export const defaultLang = "sr";

export type Lang = keyof typeof languages;

export const translations = {
  sr: {
    "site.title": "Трошкомир",
    "site.description":
      "Трошкомир: праћење трошкова, картица, рата, штедње и подсетника, све на једном месту.",

    "nav.features": "Функције",
    "nav.privacy": "Приватност",
    "nav.about": "О аутору",
    "nav.contact": "Контакт",
    "nav.deleteAccount": "Брисање налога",

    "hero.badge": "Ускоро",
    "hero.subtitle":
      "Трошкомир вам показује тачно где иде ваш новац: трошкови, картице, рате, штедња и подсетници, све прегледно, на једном месту.",
    "cta.playStore": "Преузми са Google Play-а",
    "cta.appStore": "Преузми са App Store-а",
    "cta.playStoreSoon": "Google Play, ускоро",
    "cta.appStoreSoon": "App Store, ускоро",
    "cta.storesComingSoon": "Ускоро на Google Play и App Store",
    "cta.comingSoonHint":
      "Линкови ће се појавити чим апликација буде објављена у продавницама.",

    "features.heading": "Шта Трошкомир уме",
    "features.subheading":
      "Кратак преглед свих функција, да знате шта добијате.",
    "features.joke": "свашта Трошко умије, у све се разумије..",

    "cat.tracking": "Праћење трошкова",
    "cat.cards": "Картице и рате",
    "cat.reminders": "Подсетници и обавештења",
    "cat.savings": "Штедња и лојалти",

    "feat.scan.title": "Скенирање фискалног рачуна",
    "feat.scan.body":
      "Скенирајте QR код са фискалног рачуна камером телефона. Апликација учитава податке директно са званичне странице Пореске управе (suf.purs.gov.rs) и сама уписује продавницу, износ и артикле.",

    "feat.expenses.title": "Једнократни и редовни трошкови",
    "feat.expenses.body":
      "Обичну куповину унесете за секунд. За трошкове који се понављају (кирију, претплате), изаберете једном да ли Трошкомир сам уписује трошак на дан доспећа, или само вас подсети да га потврдите.",

    "feat.pools.title": "Валутни базени за путовања",
    "feat.pools.body":
      "Купите девизе унапред (рецимо 700 евра за пут у Немачку) и Трошкомир закључа курс по којем сте их купили. Сваки трошак на путу се одбија по том закључаном курсу, а не по дневном, тако тачно знате колико вам је остало.",

    "feat.budgets.title": "Месечни буџети по категоријама",
    "feat.budgets.body":
      "Поставите месечни лимит за сваку категорију трошкова и добијете упозорење када га премашите, да знате где стварно прекорачујете.",

    "feat.debit.title": "Дебитне картице",
    "feat.debit.body":
      "Обична дебитна картица: сваки трошак се одмах рачуна у ваш буџет, исто као готовина.",

    "feat.credit.title": "Кредитне картице",
    "feat.credit.body":
      "Трошак се бележи одмах, али се не рачуна у буџет док не измирите рачун картице, тако видите шта дугујете, а буџет остаје тачан.",

    "feat.installments.title": "Куповина на рате",
    "feat.installments.body":
      "Рате се прате као засебан кредит, важи и за дебитне и за кредитне картице. Трошкомир зна колико рата је остало и, ако желите, сам уписује сваку доспелу рату.",

    "feat.household.title": "Дељено домаћинство",
    "feat.household.body":
      "Картице, трошкови, буџети, рате, штедња и валутни базени могу бити дељени са домаћинством. Сваки члан види исте податке.",

    "feat.warranty.title": "Гаранција на рачуну",
    "feat.warranty.body":
      "При чувању рачуна изаберете трајање гаранције: 12, 24 (подразумевано) или 36 месеци. Месец дана пре истека, Трошкомир вас сам подсети да гаранција ускоро истиче.",

    "feat.notifications.title": "Дневни и недељни преглед",
    "feat.notifications.body":
      "Сваког јутра у 8 добијате преглед свега што је аутоматски уписано тог дана: редовни трошкови, приходи и рате. Сваког понедељка стиже и недељни преглед укупне потрошње за протеклу недељу.",

    "feat.reminders.title": "Подсетници на дан доспећа",
    "feat.reminders.body":
      "Ако не желите аутоматски упис, Трошкомир вам пошаље подсетник тачно на дан када редован трошак доспева, унапред заказан за наредних неколико доспећа.",

    "feat.savings.title": "Циљеви штедње",
    "feat.savings.body":
      "Пратите уплате и подизања за сваки циљ штедње или инвестицију посебно, одвојено од свакодневних трошкова.",

    "feat.loyalty.title": "Лојалти и поклон картице",
    "feat.loyalty.body":
      "Све лојалти и поклон картице на једном месту, са стањем и историјом коришћења.",

    "cat.loans": "Зајмови и путовања",
    "cat.overview": "Приходи и финансијски преглед",

    "feat.loans.title": "Зајмови и дугови",
    "feat.loans.body":
      "Евидентирајте новац позајмљен пријатељу или кредит у банци. Додајте другу страну по имену, а ако је позовете по имејлу и она се региструје у Трошкомиру, зајам постаје видљив на оба налога.",

    "feat.trips.title": "Групна путовања",
    "feat.trips.body":
      "Направите путовање, додајте чланове и бележите заједничке трошкове. Трошкомир израчуна ко дугује коме и колико. Кад неко поврати свој удео, повраћај се аутоматски уписује у дневник трошкова.",

    "feat.incomes.title": "Плата и приходи",
    "feat.incomes.body":
      "Подесите своју плату (износ и дан исплате) и Трошкомир је сваког месеца сам уписује. Поред плате, пратите и остале приходе: хонораре, приходе од закупа, бонусе и шта год вам падне на памет.",

    "feat.statistics.title": "Месечна статистика",
    "feat.statistics.body":
      "Прегледајте финансије за сваки месец: трошкови по категоријама, приходи по врстама, активност на зајмовима и штедња. Брз и прегледан поглед на месец иза вас.",

    "feat.netposition.title": "Нето позиција",
    "feat.netposition.body":
      "Трошкомир у сваком тренутку покаже где стоји ваш новац: штедња, девизни базени и новац који вам дугују, умањено за дуг по картицама и зајмове које ви дугујете. Финансијски биланс без рачунања.",

    "feat.tags.title": "Ознаке (тагови)",
    "feat.tags.body":
      "Додајте произвољне ознаке на трошкове, приходе и зајмове да бисте их лако претражили и груписали. На пример: „посао“, „породица“, „летовање 2025“.",

    "privacy.title": "Приватност",
    "privacy.body":
      "Ваши подаци се чувају на серверу у мом кућном лабу. Подразумевано нису шифровани, што је сасвим у реду за већину корисника. Ако желите end-to-end шифровање (тј. да ни ја не могу да прочитам ваше описе трошкова или рачуне), укључите га у подешавањима апликације. Искрено: не занима ме шта купујете нити од кога... мада ценовник кирија у Београду би био забаван за знати.",

    "about.heading": "О аутору",
    "about.name": "Никола Дашић",
    "about.bio":
      "Ћао, ја сам Никола Дашић, програмер, отац, радио аматер, тип са превише хобија, узгајивач кокошака, поносни власник Дачије, редовни купац у ИКЕИ, поборник GNU/Linux-а, електротехничар електронике, православни хришћанин, посвећеник теретани, поштовалац говеѝе пршуте, обожавалац Yandex-а, бициклистички бади, и неко ко је годинама пратио своје трошкове у проклетом Excel-у... док нисам одлучио да направим нешто боље. Трошкомир ради на мом кућном сервер-лабу, не у неком великом облаку, зато основне функције остају бесплатне. Ако имате питања или предлоге, јавите се.",
    "about.linkedin": "Повежимо се на LinkedIn-у",

    "hosting.heading": "Где апликација ради",
    "hosting.body":
      "Трошкомир ради на мом кућном серверу (home lab), а не у некој великој комерцијалној облак услузи. То смањује трошкове и омогућава ми да апликацију понудим бесплатно, али значи и да је доступност сервиса онолико поуздана колико и мој кућни интернет и струја.",
    "hosting.caption1":
      "Брвнара у дворишту, ту живи цео home lab (и моја радио опрема).",
    "hosting.caption2": "Сервери, док сам их тек монтирао.",

    "footer.contact": "Питања? Идеје? Сарме?",
    "footer.contactBody":
      "Придружите се Telegram групи: питајте шта год желите, предложите нову функцију, пријавите грешку или само ћаскајте са другим корисницима. Или зовите на домаће сарме.",
    "footer.rights": "Сва права задржана.",

    "deleteAccount.title": "Брисање налога",
    "deleteAccount.intro":
      "Овде можете затражити трајно брисање свог Трошкомир налога и свих података везаних за њега. Унесите имејл адресу коју користите за пријаву, послаћемо вам шестоцифрени код за потврду.",
    "deleteAccount.emailLabel": "Имејл адреса",
    "deleteAccount.emailPlaceholder": "vasa@adresa.com",
    "deleteAccount.sendCodeButton": "Пошаљи код за потврду",
    "deleteAccount.sending": "Слање...",
    "deleteAccount.codeSentIntro": "Послали смо шестоцифрени код на:",
    "deleteAccount.codeLabel": "Код за потврду",
    "deleteAccount.warning":
      "Пажња: ова радња је трајна и не може се опозвати. Сви ваши подаци (трошкови, картице, штедња, рачуни и остало) биће неповратно обрисани.",
    "deleteAccount.confirmButton": "Трајно обриши налог",
    "deleteAccount.deleting": "Брисање...",
    "deleteAccount.confirmPrompt":
      "Да ли сте потпуно сигурни? Ова радња се не може опозвати.",
    "deleteAccount.backButton": "Промени имејл адресу",
    "deleteAccount.successTitle": "Налог је обрисан",
    "deleteAccount.successBody":
      "Ваш налог и сви подаци су трајно обрисани. Хвала што сте користили Трошкомир.",
    "deleteAccount.errorGeneric":
      "Дошло је до грешке. Покушајте поново за неколико тренутака.",
    "deleteAccount.errorRateLimited":
      "Превише покушаја. Сачекајте минут па покушајте поново.",
    "deleteAccount.errorInvalidCode":
      "Нетачан или истекао код. Проверите код или затражите нови.",
  },
  "sr-Latn": {
    "site.title": "Troskomir",
    "site.description":
      "Troskomir: praćenje troškova, kartica, rata, štednje i podsetnika, sve na jednom mestu.",

    "nav.features": "Funkcije",
    "nav.privacy": "Privatnost",
    "nav.about": "O autoru",
    "nav.contact": "Kontakt",
    "nav.deleteAccount": "Brisanje naloga",

    "hero.badge": "Uskoro",
    "hero.subtitle":
      "Troskomir vam pokazuje tačno gde ide vaš novac: troškovi, kartice, rate, štednja i podsetnici, sve pregledno, na jednom mestu.",
    "cta.playStore": "Preuzmi sa Google Play-a",
    "cta.appStore": "Preuzmi sa App Store-a",
    "cta.playStoreSoon": "Google Play, uskoro",
    "cta.appStoreSoon": "App Store, uskoro",
    "cta.storesComingSoon": "Uskoro na Google Play i App Store",
    "cta.comingSoonHint":
      "Linkovi će se pojaviti čim aplikacija bude objavljena u prodavnicama.",

    "features.heading": "Šta Troskomir ume",
    "features.subheading":
      "Kratak pregled svih funkcija, da znate šta dobijate.",
    "features.joke": "svašta Troško umije, u sve se razumije..",

    "cat.tracking": "Praćenje troškova",
    "cat.cards": "Kartice i rate",
    "cat.reminders": "Podsetnici i obaveštenja",
    "cat.savings": "Štednja i lojalti",

    "feat.scan.title": "Skeniranje fiskalnog računa",
    "feat.scan.body":
      "Skenirajte QR kod sa fiskalnog računa kamerom telefona. Aplikacija učitava podatke direktno sa zvanične stranice Poreske uprave (suf.purs.gov.rs) i sama upisuje prodavnicu, iznos i artikle.",

    "feat.expenses.title": "Jednokratni i redovni troškovi",
    "feat.expenses.body":
      "Običnu kupovinu unesete za sekund. Za troškove koji se ponavljaju (kiriju, pretplate), izaberete jednom da li Troskomir sam upisuje trošak na dan dospеća, ili samo vas podseti da ga potvrdite.",

    "feat.pools.title": "Valutni bazeni za putovanja",
    "feat.pools.body":
      "Kupite devize unapred (recimo 700 evra za put u Nemačku) i Troskomir zaključa kurs po kome ste ih kupili. Svaki trošak na putu se odbija po tom zaključanom kursu, a ne po dnevnom, tako tačno znate koliko vam je ostalo.",

    "feat.budgets.title": "Mesečni budžeti po kategorijama",
    "feat.budgets.body":
      "Postavite mesečni limit za svaku kategoriju troškova i dobijete upozorenje kada ga premašite, da znate gde stvarno prekoračujete.",

    "feat.debit.title": "Debitne kartice",
    "feat.debit.body":
      "Obična debitna kartica: svaki trošak se odmah računa u vaš budžet, isto kao gotovina.",

    "feat.credit.title": "Kreditne kartice",
    "feat.credit.body":
      "Trošak se beleži odmah, ali se ne računa u budžet dok ne izmirite račun kartice, tako vidite šta dugujete, a budžet ostaje tačan.",

    "feat.installments.title": "Kupovina na rate",
    "feat.installments.body":
      "Rate se prate kao zaseban kredit, važi i za debitne i za kreditne kartice. Troskomir zna koliko rata je ostalo i, ako želite, sam upisuje svaku dospelu ratu.",

    "feat.household.title": "Deljeno domaćinstvo",
    "feat.household.body":
      "Kartice, troškovi, budžeti, rate, štednja i valutni bazeni mogu biti deljeni sa domaćinstvom. Svaki član vidi iste podatke.",

    "feat.warranty.title": "Garancija na računu",
    "feat.warranty.body":
      "Pri čuvanju računa izaberete trajanje garancije: 12, 24 (podrazumevano) ili 36 meseci. Mesec dana pre isteka, Troskomir vas sam podseti da garancija uskoro ističe.",

    "feat.notifications.title": "Dnevni i nedeljni pregled",
    "feat.notifications.body":
      "Svakog jutra u 8 dobijate pregled svega što je automatski upisano tog dana: redovni troškovi, prihodi i rate. Svakog ponedeljka stiže i nedeljni pregled ukupne potrošnje za proteklu nedelju.",

    "feat.reminders.title": "Podsetnici na dan dospeća",
    "feat.reminders.body":
      "Ako ne želite automatski upis, Troskomir vam pošalje podsetnik tačno na dan kada redovan trošak dospeva, unapred zakazan za narednih nekoliko dospeća.",

    "feat.savings.title": "Ciljevi štednje",
    "feat.savings.body":
      "Pratite uplate i podizanja za svaki cilj štednje ili investiciju posebno, odvojeno od svakodnevnih troškova.",

    "feat.loyalty.title": "Lojalti i poklon kartice",
    "feat.loyalty.body":
      "Sve lojalti i poklon kartice na jednom mestu, sa stanjem i istorijom korišćenja.",

    "cat.loans": "Zajmovi i putovanja",
    "cat.overview": "Prihodi i finansijski pregled",

    "feat.loans.title": "Zajmovi i dugovi",
    "feat.loans.body":
      "Evidentirajte novac pozajmljen prijatelju ili kredit u banci. Dodajte drugu stranu po imenu, a ako je pozovete po imejlu i ona se registruje u Troškomiru, zajam postaje vidljiv na oba naloga.",

    "feat.trips.title": "Grupna putovanja",
    "feat.trips.body":
      "Napravite putovanje, dodajte članove i beležite zajedničke troškove. Troskomir izračuna ko duguje kome i koliko. Kad neko povrati svoj udeo, povraćaj se automatski upisuje u dnevnik troškova.",

    "feat.incomes.title": "Plata i prihodi",
    "feat.incomes.body":
      "Podesite svoju platu (iznos i dan isplate) i Troskomir je svakog meseca sam upisuje. Pored plate, pratite i ostale prihode: honorare, prihode od zakupa, bonuse i šta god vam padne na pamet.",

    "feat.statistics.title": "Mesečna statistika",
    "feat.statistics.body":
      "Pregledajte finansije za svaki mesec: troškovi po kategorijama, prihodi po vrstama, aktivnost na zajmovima i štednja. Brz i pregledan pogled na mesec iza vas.",

    "feat.netposition.title": "Neto pozicija",
    "feat.netposition.body":
      "Troskomir u svakom trenutku pokaže gde stoji vaš novac: štednja, devizni bazeni i novac koji vam duguju, umanjeno za dug po karticama i zajmove koje vi dugujete. Finansijski bilans bez računanja.",

    "feat.tags.title": "Oznake (tagovi)",
    "feat.tags.body":
      'Dodajte proizvoljne oznake na troškove, prihode i zajmove da biste ih lako pretražili i grupisali. Na primer: "posao", "porodica", "letovanje 2025".',

    "privacy.title": "Privatnost",
    "privacy.body":
      "Vaši podaci se čuvaju na serveru u mom kućnom labu. Podrazumevano nisu šifrovani, što je sasvim u redu za većinu korisnika. Ako želite end-to-end šifrovanje (tj. da ni ja ne mogu da pročitam vaše opise troškova ili račune), uključite ga u podešavanjima aplikacije. Iskreno: ne zanima me šta kupujete ni od koga... mada cenovnik kirija u Beogradu ne bi ni malo zaškodio.",

    "about.heading": "O autoru",
    "about.name": "Nikola Dašić",
    "about.bio":
      "Ćao, ja sam Nikola Dašić, programer, otac, radio amater, tip sa previše hobija, uzgajivač kokošaka, ponosni vlasnik Dačije, redovni kupac u IKEI, pobornik GNU/Linux-a, elektrotehničar elektronike, pravoslavni hrišćanin, posvećenik teretani, poštovalac goveđe pršute, obožavalac Yandex-a, biciklistički badi, i neko ko je godinama pratio svoje troškove u prokletom Excel-u... dok nisam odlučio da napravim nešto bolje. Troskomir radi na mom kućnom server-labu, ne u nekom velikom oblaku, zato osnovne funkcije ostaju besplatne. Ako imate pitanja ili predloge, javite se.",
    "about.linkedin": "Povežimo se na LinkedIn-u",

    "hosting.heading": "Gde aplikacija radi",
    "hosting.body":
      "Troskomir radi na mom kućnom serveru (home lab), a ne u nekoj velikoj komercijalnoj cloud usluzi. To smanjuje troškove i omogućava mi da aplikaciju ponudim besplatno, ali znači i da je dostupnost servisa onoliko pouzdana koliko i moj kućni internet i struja.",
    "hosting.caption1":
      "Brvnara u dvorištu, tu živi ceo home lab (i moja radio oprema).",
    "hosting.caption2": "Serveri, dok sam ih tek montirao.",

    "footer.contact": "Pitanja? Ideje? Sarme?",
    "footer.contactBody":
      "Pridružite se Telegram grupi: pitajte šta god želite, predložite novu funkciju, prijavite grešku ili samo ćaskajte sa drugim korisnicima. Ili zovite na domaće sarme.",
    "footer.rights": "Sva prava zadržana.",

    "deleteAccount.title": "Brisanje naloga",
    "deleteAccount.intro":
      "Ovde možete zatražiti trajno brisanje svog Troskomir naloga i svih podataka vezanih za njega. Unesite imejl adresu koju koristite za prijavu, poslaćemo vam šestocifreni kod za potvrdu.",
    "deleteAccount.emailLabel": "Imejl adresa",
    "deleteAccount.emailPlaceholder": "vasa@adresa.com",
    "deleteAccount.sendCodeButton": "Pošalji kod za potvrdu",
    "deleteAccount.sending": "Slanje...",
    "deleteAccount.codeSentIntro": "Poslali smo šestocifreni kod na:",
    "deleteAccount.codeLabel": "Kod za potvrdu",
    "deleteAccount.warning":
      "Pažnja: ova radnja je trajna i ne može se opozvati. Svi vaši podaci (troškovi, kartice, štednja, računi i ostalo) biće nepovratno obrisani.",
    "deleteAccount.confirmButton": "Trajno obriši nalog",
    "deleteAccount.deleting": "Brisanje...",
    "deleteAccount.confirmPrompt":
      "Da li ste potpuno sigurni? Ova radnja se ne može opozvati.",
    "deleteAccount.backButton": "Promeni imejl adresu",
    "deleteAccount.successTitle": "Nalog je obrisan",
    "deleteAccount.successBody":
      "Vaš nalog i svi podaci su trajno obrisani. Hvala što ste koristili Troskomir.",
    "deleteAccount.errorGeneric":
      "Došlo je do greške. Pokušajte ponovo za nekoliko trenutaka.",
    "deleteAccount.errorRateLimited":
      "Previše pokušaja. Sačekajte minut pa pokušajte ponovo.",
    "deleteAccount.errorInvalidCode":
      "Netačan ili istekao kod. Proverite kod ili zatražite novi.",
  },
  en: {
    "site.title": "Troskomir",
    "site.description":
      "Troskomir: track expenses, cards, installments, savings and reminders, all in one place.",

    "nav.features": "Features",
    "nav.privacy": "Privacy",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.deleteAccount": "Delete account",

    "hero.badge": "Coming soon",
    "hero.subtitle":
      "Troskomir shows you exactly where your money goes: expenses, cards, installments, savings and reminders, all in one place.",
    "cta.playStore": "Get it on Google Play",
    "cta.appStore": "Download on the App Store",
    "cta.playStoreSoon": "Google Play, coming soon",
    "cta.appStoreSoon": "App Store, coming soon",
    "cta.storesComingSoon": "Coming soon on Google Play and the App Store",
    "cta.comingSoonHint":
      "Links will appear once the app is published on the stores.",

    "features.heading": "What Troskomir does",
    "features.subheading":
      "A quick rundown of every feature, so you know what you're getting.",
    "features.joke": "",

    "cat.tracking": "Expense tracking",
    "cat.cards": "Cards & installments",
    "cat.reminders": "Reminders & notifications",
    "cat.savings": "Savings & loyalty",

    "feat.scan.title": "Fiscal receipt scanning",
    "feat.scan.body":
      "Scan the QR code on a Serbian fiscal receipt with your phone's camera. The app pulls the data straight from the Tax Administration's official page (suf.purs.gov.rs) and fills in the store, amount and items.",

    "feat.expenses.title": "One-time & recurring expenses",
    "feat.expenses.body":
      "Log a regular purchase in seconds. For expenses that repeat (rent, subscriptions), choose once whether Troskomir logs the expense automatically on the due date, or just reminds you to confirm it.",

    "feat.pools.title": "Currency pools for trips",
    "feat.pools.body":
      "Buy foreign currency upfront (say \u20ac700 for a trip to Germany) and Troskomir locks in the exchange rate you paid. Every expense on the trip is deducted at that locked rate, not the daily rate, so you always know exactly how much is left.",

    "feat.budgets.title": "Monthly category budgets",
    "feat.budgets.body":
      "Set a monthly limit for each expense category and get an alert when you go over it, so you know exactly where you're overspending.",

    "feat.debit.title": "Debit cards",
    "feat.debit.body":
      "A plain debit card: every purchase counts against your budget immediately, just like cash.",

    "feat.credit.title": "Credit cards",
    "feat.credit.body":
      "The purchase is logged right away, but it doesn't hit your budget until you settle the card statement, so you can see what you owe while your budget stays accurate.",

    "feat.installments.title": "Installment purchases",
    "feat.installments.body":
      "Installments are tracked as a separate loan, on either a debit or a credit card. Troskomir knows how many installments are left and, if you want, logs each due one automatically.",

    "feat.household.title": "Shared household",
    "feat.household.body":
      "Cards, expenses, budgets, installments, savings and currency pools can all be shared with your household. Every member sees the same data.",

    "feat.warranty.title": "Receipt warranty tracking",
    "feat.warranty.body":
      "When you save a receipt, pick a warranty length: 12, 24 (default) or 36 months. A month before it expires, Troskomir sends you a reminder.",

    "feat.notifications.title": "Daily & weekly summaries",
    "feat.notifications.body":
      "Every morning at 8, you get a summary of everything auto-logged that day: recurring expenses, income and installments. Every Monday a weekly digest of your total spending for the past week arrives too.",

    "feat.reminders.title": "Due-date reminders",
    "feat.reminders.body":
      "If you'd rather not auto-log it, Troskomir sends a reminder on the exact day a recurring expense is due, scheduled ahead for the next several occurrences.",

    "feat.savings.title": "Savings goals",
    "feat.savings.body":
      "Track deposits and withdrawals for each savings or investment goal separately, apart from everyday expenses.",

    "feat.loyalty.title": "Loyalty & gift cards",
    "feat.loyalty.body":
      "All your loyalty and gift cards in one place, with balance and usage history.",

    "cat.loans": "Loans & travel",
    "cat.overview": "Income & financial overview",

    "feat.loans.title": "Loans & debts",
    "feat.loans.body":
      "Log money you've lent to a friend or borrowed from a bank. Add the other party by name and if you invite them by e-mail and they sign up, the loan shows on both accounts.",

    "feat.trips.title": "Group travel",
    "feat.trips.body":
      "Create a trip, add members, log shared expenses. Troskomir figures out who owes whom and how much. When someone pays their share, the payback lands in their regular expense log.",

    "feat.incomes.title": "Salary & other income",
    "feat.incomes.body":
      "Set up your salary (amount and payday) and Troskomir logs it automatically every month. Track other income too: freelance fees, rental income, bonuses, anything you want.",

    "feat.statistics.title": "Monthly statistics",
    "feat.statistics.body":
      "Review your finances month by month: spending by category, income by type, loan activity and savings. A quick, clear snapshot of the month behind you.",

    "feat.netposition.title": "Net worth at a glance",
    "feat.netposition.body":
      "Troskomir always knows your bottom line: savings, currency pools and money others owe you, minus credit card debt and loans you took. Your financial snapshot, no spreadsheet required.",

    "feat.tags.title": "Custom tags",
    "feat.tags.body":
      'Tag expenses, income and loans with your own labels to group and search them however you like. For example: "work", "family", "summer 2025".',

    "privacy.title": "Privacy",
    "privacy.body":
      "Your data lives on a server I run myself at home. By default it's stored as-is, which is fine for most people. If you want end-to-end encryption (meaning not even I can read your expense descriptions or receipts), switch it on in the app settings. Honest disclaimer: I don't care what you buy or from whom... though real Belgrade rent prices would be fun to know.",

    "about.heading": "About the author",
    "about.name": "Nikola Dašić",
    "about.bio":
      "Hi, I'm Nikola Da\u0161i\u0107, a software engineer, father, HAM radio operator, a guy with way too many hobbies, chicken farmer, Dacia owner, IKEA regular, GNU/Linux supporter, electronics technician, Orthodox Christian, gym-goer, prosciutto connoisseur, Yandex admirer, cycling buddy, and someone who tracked expenses in cursed Excel spreadsheets for way too many years... until I decided to just build something better. Troskomir runs on my own home server lab, not some big commercial cloud, which is exactly why the core features stay free. Questions or suggestions? Just reach out.",
    "about.linkedin": "Connect on LinkedIn",

    "hosting.heading": "Where it runs",
    "hosting.body":
      "Troskomir runs on my own home server lab, not a big commercial cloud. That keeps costs low and lets me offer the app for free, though it also means the service is only as reliable as my home internet and power.",
    "hosting.caption1":
      "The wooden shed in my backyard, home to the whole lab (and my HAM radio gear).",
    "hosting.caption2": "The servers, mid-setup.",

    "footer.contact": "Questions? Ideas?",
    "footer.contactBody":
      "Join the Telegram community and ask anything, pitch a feature, report a bug, or just chat with other users.",
    "footer.rights": "All rights reserved.",

    "deleteAccount.title": "Delete account",
    "deleteAccount.intro":
      "Request permanent deletion of your Troskomir account and all data linked to it. Enter the e-mail address you use to sign in and we'll send you a six-digit confirmation code.",
    "deleteAccount.emailLabel": "E-mail address",
    "deleteAccount.emailPlaceholder": "you@example.com",
    "deleteAccount.sendCodeButton": "Send confirmation code",
    "deleteAccount.sending": "Sending...",
    "deleteAccount.codeSentIntro": "We sent a six-digit code to:",
    "deleteAccount.codeLabel": "Confirmation code",
    "deleteAccount.warning":
      "Warning: this action is permanent and cannot be undone. All your data (expenses, cards, savings, receipts and everything else) will be erased for good.",
    "deleteAccount.confirmButton": "Permanently delete my account",
    "deleteAccount.deleting": "Deleting...",
    "deleteAccount.confirmPrompt":
      "Are you absolutely sure? This cannot be undone.",
    "deleteAccount.backButton": "Change e-mail address",
    "deleteAccount.successTitle": "Account deleted",
    "deleteAccount.successBody":
      "Your account and all its data have been permanently deleted. Thanks for having used Troskomir.",
    "deleteAccount.errorGeneric":
      "Something went wrong. Please try again in a moment.",
    "deleteAccount.errorRateLimited":
      "Too many attempts. Please wait a minute and try again.",
    "deleteAccount.errorInvalidCode":
      "Incorrect or expired code. Check the code or request a new one.",
  },
  ru: {
    "site.title": "Трошкомир",
    "site.description":
      "Трошкомир: учёт расходов, карт, рассрочки, накоплений и напоминаний в одном месте.",

    "nav.features": "Функции",
    "nav.privacy": "Конфиденциальность",
    "nav.about": "Об авторе",
    "nav.contact": "Контакты",
    "nav.deleteAccount": "Удаление аккаунта",

    "hero.badge": "Скоро",
    "hero.subtitle":
      "Трошкомир точно показывает, куда уходят ваши деньги: расходы, карты, рассрочка, накопления и напоминания, всё в одном месте.",
    "cta.playStore": "Загрузите в Google Play",
    "cta.appStore": "Загрузите в App Store",
    "cta.playStoreSoon": "Google Play, скоро",
    "cta.appStoreSoon": "App Store, скоро",
    "cta.storesComingSoon": "Скоро в Google Play и App Store",
    "cta.comingSoonHint":
      "Ссылки появятся, когда приложение будет опубликовано в магазинах.",

    "features.heading": "Что умеет Трошкомир",
    "features.subheading":
      "Короткий обзор всех функций, чтобы вы знали, что получаете.",
    "features.joke": "",

    "cat.tracking": "Учёт расходов",
    "cat.cards": "Карты и рассрочка",
    "cat.reminders": "Напоминания и уведомления",
    "cat.savings": "Накопления и лояльность",

    "feat.scan.title": "Сканирование фискального чека",
    "feat.scan.body":
      "Отсканируйте QR-код на фискальном чеке камерой телефона. Приложение получает данные напрямую со страницы Налоговой администрации (suf.purs.gov.rs) и само заполняет магазин, сумму и товары.",

    "feat.expenses.title": "Разовые и регулярные расходы",
    "feat.expenses.body":
      "Обычную покупку вносите за секунду. Для повторяющихся расходов (аренда, подписки) один раз выбираете: пусть Трошкомир сам вносит расход в день платежа, либо просто напоминает подтвердить его.",

    "feat.pools.title": "Валютные пулы для поездок",
    "feat.pools.body":
      "Купите валюту заранее (например, 700 евро для поездки в Германию) и Трошкомир зафиксирует курс покупки. Каждый расход в поездке списывается по этому зафиксированному курсу, а не по текущему, так что вы всегда точно знаете, сколько осталось.",

    "feat.budgets.title": "Месячные бюджеты по категориям",
    "feat.budgets.body":
      "Установите месячный лимит для каждой категории расходов и получайте уведомление при его превышении, чтобы точно знать, где вы перерасходуете.",

    "feat.debit.title": "Дебетовые карты",
    "feat.debit.body":
      "Обычная дебетовая карта: каждая покупка сразу учитывается в бюджете, как наличные.",

    "feat.credit.title": "Кредитные карты",
    "feat.credit.body":
      "Покупка фиксируется сразу, но не учитывается в бюджете, пока вы не погасите выписку по карте, так вы видите, сколько должны, а бюджет остаётся точным.",

    "feat.installments.title": "Покупки в рассрочку",
    "feat.installments.body":
      "Рассрочка отслеживается как отдельный кредит, неважно дебетовая карта или кредитная. Трошкомир знает, сколько платежей осталось, и, если хотите, сам вносит каждый очередной платёж.",

    "feat.household.title": "Общее домохозяйство",
    "feat.household.body":
      "Карты, расходы, бюджеты, рассрочки, накопления и валютные пулы можно сделать общими для домохозяйства. Каждый участник видит одни и те же данные.",

    "feat.warranty.title": "Гарантия по чеку",
    "feat.warranty.body":
      "При сохранении чека вы выбираете срок гарантии: 12, 24 (по умолчанию) или 36 месяцев. За месяц до истечения Трошкомир сам напомнит вам об этом.",

    "feat.notifications.title": "Ежедневные и еженедельные сводки",
    "feat.notifications.body":
      "Каждое утро в 8 вы получаете сводку всего, что было автоматически внесено за день: регулярные расходы, доходы и платежи по рассрочке. Каждый понедельник приходит ещё и недельная сводка общих расходов за прошедшую неделю.",

    "feat.reminders.title": "Напоминания в день платежа",
    "feat.reminders.body":
      "Если не хотите автоматический учёт, Трошкомир пришлёт напоминание точно в день, когда наступает регулярный расход, заранее запланированное на несколько ближайших платежей.",

    "feat.savings.title": "Цели накоплений",
    "feat.savings.body":
      "Отслеживайте пополнения и снятия по каждой цели накопления или инвестиции отдельно от повседневных расходов.",

    "feat.loyalty.title": "Карты лояльности и подарочные карты",
    "feat.loyalty.body":
      "Все карты лояльности и подарочные карты в одном месте, с балансом и историей использования.",

    "cat.loans": "Займы и поездки",
    "cat.overview": "Доходы и финансовый обзор",

    "feat.loans.title": "Займы и долги",
    "feat.loans.body":
      "Записывайте деньги, одолженные другу, или кредиты в банке. Добавьте вторую сторону по имени, и если вы пригласите её по почте и она зарегистрируется, заём появится на обоих аккаунтах.",

    "feat.trips.title": "Групповые поездки",
    "feat.trips.body":
      "Создайте поездку, добавьте участников, фиксируйте общие расходы. Трошкомир подсчитает, кто кому и сколько должен. Когда кто-то погасил свою часть, выплата отображается в его обычном журнале расходов.",

    "feat.incomes.title": "Зарплата и доходы",
    "feat.incomes.body":
      "Настройте зарплату (сумму и день выплаты) и Трошкомир будет автоматически записывать её каждый месяц. Отслеживайте и другие доходы: гонорары, арендные поступления, бонусы и всё остальное.",

    "feat.statistics.title": "Ежемесячная статистика",
    "feat.statistics.body":
      "Просматривайте финансы за каждый месяц: расходы по категориям, доходы по типам, активность по займам и накопления. Быстрый и понятный срез прошедшего месяца.",

    "feat.netposition.title": "Чистый капитал",
    "feat.netposition.body":
      "Трошкомир в любой момент покажет, где стоят ваши деньги: накопления, валютные пулы и долги перед вами, за вычетом задолженностей по картам и займов. Финансовый баланс без единой формулы.",

    "feat.tags.title": "Теги",
    "feat.tags.body":
      "Добавляйте произвольные теги к расходам, доходам и займам для удобного поиска и группировки. Например: «работа», «семья», «отпуск 2025».",

    "privacy.title": "Конфиденциальность",
    "privacy.body":
      "Ваши данные хранятся на сервере, который я держу дома (home lab). По умолчанию они хранятся как есть, и для большинства этого достаточно. Если хотите end-to-end шифрование (то есть чтобы даже я не мог читать описания расходов и чеки), включите его в настройках приложения. Честно: мне не интересно, что вы покупаете и где... хотя реальные цены на аренду в Белграде было бы забавно узнать.",

    "about.heading": "Об авторе",
    "about.name": "Никола Дашич",
    "about.bio":
      "Привет, я Никола Дашич, инженер-программист, отец, радиолюбитель (HAM), человек со слишком большим количеством увлечений, птицевод, владелец Dacia, завсегдатай IKEA, сторонник GNU/Linux, специалист по электронике, православный христианин, любитель спортзала, ценитель прошутто, поклонник Яндекса, велосипедный товарищ и тот, кто годами вёл учёт расходов в проклятом Excel'е... пока не решил сделать что-то получше. Трошкомир работает на моём домашнем сервере, а не в большом коммерческом облаке, именно поэтому основные функции остаются бесплатными. Есть вопросы или предложения? Пишите.",
    "about.linkedin": "Давайте свяжемся в LinkedIn",

    "hosting.heading": "Где это работает",
    "hosting.body":
      "Трошкомир работает на моём домашнем сервере (home lab), а не в большом коммерческом облаке. Это снижает расходы и позволяет мне предлагать приложение бесплатно, но также означает, что доступность сервиса зависит от моего домашнего интернета и электричества.",
    "hosting.caption1":
      "Деревянный сарай на заднем дворе, здесь живёт вся домашняя лаборатория (и моё радиооборудование).",
    "hosting.caption2": "Серверы, во время установки.",

    "footer.contact": "Вопросы? Идеи?",
    "footer.contactBody":
      "Присоединяйтесь к Telegram-группе: задавайте вопросы, предлагайте новые функции, сообщайте об ошибках или просто общайтесь с другими пользователями.",
    "footer.rights": "Все права защищены.",

    "deleteAccount.title": "Удаление аккаунта",
    "deleteAccount.intro":
      "Здесь вы можете запросить полное удаление своего аккаунта Трошкомир и всех связанных с ним данных. Введите адрес электронной почты, который используете для входа, мы вышлем шестизначный код подтверждения.",
    "deleteAccount.emailLabel": "Адрес электронной почты",
    "deleteAccount.emailPlaceholder": "you@example.com",
    "deleteAccount.sendCodeButton": "Отправить код подтверждения",
    "deleteAccount.sending": "Отправка...",
    "deleteAccount.codeSentIntro": "Мы отправили шестизначный код на:",
    "deleteAccount.codeLabel": "Код подтверждения",
    "deleteAccount.warning":
      "Внимание: это действие необратимо. Все ваши данные (расходы, карты, накопления, чеки и остальное) будут удалены безвозвратно.",
    "deleteAccount.confirmButton": "Удалить аккаунт навсегда",
    "deleteAccount.deleting": "Удаление...",
    "deleteAccount.confirmPrompt":
      "Вы абсолютно уверены? Это действие нельзя отменить.",
    "deleteAccount.backButton": "Изменить адрес почты",
    "deleteAccount.successTitle": "Аккаунт удалён",
    "deleteAccount.successBody":
      "Ваш аккаунт и все данные удалены безвозвратно. Спасибо, что пользовались Трошкомир.",
    "deleteAccount.errorGeneric":
      "Что-то пошло не так. Попробуйте ещё раз через минуту.",
    "deleteAccount.errorRateLimited":
      "Слишком много попыток. Подождите минуту и попробуйте снова.",
    "deleteAccount.errorInvalidCode":
      "Неверный или истёкший код. Проверьте код или запросите новый.",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["sr"];
