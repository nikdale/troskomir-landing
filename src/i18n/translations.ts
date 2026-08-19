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
    "open.title": "Отварање Трошкомира",
    "open.body": "Ако се апликација не отвори сама, додирните дугме испод.",
    "open.button": "Отвори апликацију",
    "open.fallback": "Немате апликацију? Преузмите је са Google Play-а и покушајте поново.",

    "hero.badge": "Доступно на Google Play",
    "hero.subtitle":
      "Трошкомир вам показује тачно где иде ваш новац: трошкови, картице, рате, штедња и подсетници, све прегледно, на једном месту.",
    "cta.playStore": "Преузми са Google Play-а",
    "cta.appStore": "Преузми са App Store-а",
    "cta.playStoreSoon": "Google Play, ускоро",
    "cta.appStoreSoon": "App Store, ускоро",
    "cta.storesComingSoon": "Ускоро на Google Play и App Store",
    "cta.comingSoonHint":
      "Линк за App Store ће се појавити чим Apple одобри апликацију.",

    "features.heading": "Шта Трошкомир уме",
    "features.subheading":
      "Кратак преглед свих функција, да знате шта добијате.",
    "features.joke": "свашта Трошко умије, у све се разумије..",

    "cat.works": "Како ради",
    "feat.offline.title": "Ради без интернета",
    "feat.offline.body":
      "Трошкови, приходи, зајмови, штедња, буџети, валутни базени и лојалти картице раде потпуно офлајн. Све се чува на телефону и само се синхронизује кад се веза врати, било да је пао ваш интернет или мој кућни сервер. Дељено домаћинство и групна путовања су до тада само за преглед, јер измена мора да стигне и до друге стране.",
    "feat.devices.title": "Исти налог на више уређаја",
    "feat.devices.body":
      "Пријавите се истим налогом на телефону и таблету. Измене се усклађују кад оба уређаја буду на мрежи. Ако се иста ставка измени на два места док сте офлајн, конфликт се покаже уместо да се подаци препишу. У подешавањима видите све активне сесије и можете било коју опозвати.",
    "feat.backup.title": "Резервне копије и извоз",
    "feat.backup.body":
      "Извезите пуну JSON копију коју касније вратите, спајањем или заменом постојећих података, или TXT извештај и CSV за Excel. Ако укључите заштиту података, копија је шифрована истим кључем.",
    "feat.statements.title": "Увоз банковног извода",
    "feat.statements.body":
      "Учитајте PDF извод и Трошкомир упише трошкове и приходе одједном, уз проверу да се салдо слаже. Тренутно: Banca Intesa, OTP банка Србија и Yettel банка. Дупликати се препознају, па исто не уносите двапут.",
    "feat.widgets.title": "Виџет на почетном екрану",
    "feat.widgets.body":
      "На почетни екран ставите виџет са бројем скенираних рачуна овог месеца и онима који чекају преглед, или лојалти картице за брз приступ на каси. Скенирање рачуна креће директно са виџета.",
    "feat.flags.title": "Управљање функцијама",
    "feat.flags.body":
      "Путовања, зајмови, штедња, буџети, рачуни, лојалти картице, валутни базени, увоз извода и локални AI могу да се искључе. Искључен модул нестаје из менија и престаје да шаље подсетнике. Подаци се не бришу, вратите га кад год пожелите. Трошкови, приходи и статистика увек остају укључени.",

    "cat.tracking": "Праћење трошкова",
    "cat.cards": "Картице и рате",
    "cat.reminders": "Подсетници и обавештења",
    "cat.savings": "Штедња и лојалти",

    "feat.scan.title": "Скенирање фискалног рачуна",
    "feat.scan.body":
      "Скенирајте QR код са фискалног рачуна камером телефона. Тренутно подржано: 🇷🇸 Србија (suf.purs.gov.rs), 🇧🇦 Република Српска (suf.poreskaupravars.org), 🇲🇪 Црна Гора (mapr.tax.gov.me) и 🇬🇷 Грчка (mydatapi.aade.gr). Апликација учитава податке директно са званичне пореске странице и уписује продавницу, износ и артикле. Грчки називи се, где је могуће, преводе или транслитерују. Ускоро и Македонија.",
    "feat.localAi.title": "Локална AI обрада рачуна",
    "feat.localAi.body":
      "Снимите или изаберите слику рачуна. ML Kit OCR и мали Qwen2.5 језички модел раде на вашем уређају. Модел се једном преузима са Hugging Face-а (око 547 MB), а OCR текст се не шаље cloud AI сервису. Све предложене податке прегледате пре чувања.",

    "feat.expenses.title": "Једнократни и редовни трошкови",
    "feat.expenses.body":
      "Обичну куповину унесете за секунд. За трошкове који се понављају (кирију, претплате), изаберете једном да ли Трошкомир сам уписује трошак на дан доспећа, или само вас подсети да га потврдите.",

    "feat.pools.title": "Валутни базени за путовања",
    "feat.pools.body":
      "Купите девизе унапред (рецимо 700 евра за пут у Немачку) и Трошкомир закључа курс по коме сте их купили. Сваки трошак на путу се одбија по том закључаном курсу, а не по дневном, тако тачно знате колико вам је остало.",

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
      "Ваши подаци се чувају на серверу у мом кућном лабу. Подразумевано нису шифровани, што је сасвим у реду за већину корисника. Ако желите end-to-end шифровање (тј. да ни ја не могу да прочитам ваше описе трошкова или рачуне), укључите га у подешавањима апликације. Искрено: не занима ме шта купујете ни од кога... мада ценовник кирија у Београду не би ни мало зашкодио.",
    "privacy.localAi.title": "Рачуни и локални AI",
    "privacy.localAi.body":
      "Обрада слике рачуна остаје на вашем телефону: ML Kit издваја текст, а Qwen2.5 локално предлаже продавницу, износ, датум, валуту, начин плаћања, категорију и ознаке. Први пут се преузима само датотека модела са Hugging Face-а; рачун и OCR текст се не шаљу cloud AI сервису. Трошак се шаље Трошкомиру тек када га прегледате и сачувате.",

    "about.heading": "О аутору",
    "about.name": "Никола Дашић",
    "about.bio":
      "Помаже Бог, ја сам Никола Дашић, отац, {age}-годишњи програмер, радио аматер, тип са превише хобија, нередовни испијач креатина, заљубљеник у Пролом воду, узгајивач кокошака, поносни власник Дачије, редовни купац у ИКЕИ, поборник GNU/Linux-а, електротехничар електронике, православни хришћанин, посвећеник теретани који је 17. августа 2026. први пут истрчао круг око Аде Циганлије, поштовалац говеђе пршуте, обожавалац Yandex-а, бициклистички бади, и неко ко је годинама пратио своје трошкове у проклетом Excel-у... док нисам одлучио да направим нешто боље. Трошкомир ради на мом кућном сервер-лабу, не у неком великом облаку, зато основне функције остају бесплатне. Ако имате питања или предлоге, јавите се.",
    "about.linkedin": "Повежимо се на LinkedIn-у",

    "hosting.heading": "Где апликација ради",
    "hosting.body":
      "Трошкомир ради на мом кућном серверу (home lab), а не у некој великој комерцијалној cloud услузи. То смањује трошкове и омогућава ми да апликацију понудим бесплатно, али значи и да је доступност сервиса онолико поуздана колико и мој кућни интернет и струја. Ако сервер падне, апликација и даље ради на вашем телефону: подаци се чувају локално и синхронизују се кад се веза врати. Исти налог можете користити на више уређаја.",
    "hosting.caption1":
      "Брвнара у дворишту, ту живи цео home lab (и моја радио опрема).",
    "hosting.caption2": "Сервери, док сам их тек монтирао.",

    "footer.contact": "Питања? Идеје? Сарме?",
    "footer.contactBody":
      "Придружите се Telegram групи: питајте шта год желите, предложите нову функцију, пријавите грешку или само ћаскајте са другим корисницима. Или зовите на домаће сарме.",
    "footer.rights": "Сва права задржана.",
    "nav.privacyPolicy": "Политика приватности",
    "nav.terms": "Услови коришћења",
    "footer.email": "Е-пошта",
    "footer.legal": "Правни документи",
    "privacy.readFullPolicy": "Прочитајте целу политику приватности",
    "privacy.marketingNote": "Текст изнад је сажетак. Обавезујућа верзија је политика приватности.",

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
    "open.title": "Otvaranje Troskomira",
    "open.body": "Ako se aplikacija ne otvori sama, dodirnite dugme ispod.",
    "open.button": "Otvori aplikaciju",
    "open.fallback": "Nemate aplikaciju? Preuzmite je sa Google Play-a i pokušajte ponovo.",

    "hero.badge": "Dostupno na Google Play",
    "hero.subtitle":
      "Troskomir vam pokazuje tačno gde ide vaš novac: troškovi, kartice, rate, štednja i podsetnici, sve pregledno, na jednom mestu.",
    "cta.playStore": "Preuzmi sa Google Play-a",
    "cta.appStore": "Preuzmi sa App Store-a",
    "cta.playStoreSoon": "Google Play, uskoro",
    "cta.appStoreSoon": "App Store, uskoro",
    "cta.storesComingSoon": "Uskoro na Google Play i App Store",
    "cta.comingSoonHint":
      "Link za App Store će se pojaviti čim Apple odobri aplikaciju.",

    "features.heading": "Šta Troskomir ume",
    "features.subheading":
      "Kratak pregled svih funkcija, da znate šta dobijate.",
    "features.joke": "svašta Troško umije, u sve se razumije..",

    "cat.works": "Kako radi",
    "feat.offline.title": "Radi bez interneta",
    "feat.offline.body":
      "Troškovi, prihodi, zajmovi, štednja, budžeti, valutni bazeni i lojalti kartice rade potpuno oflajn. Sve se čuva na telefonu i samo se sinhronizuje kad se veza vrati, bilo da je pao vaš internet ili moj kućni server. Deljeno domaćinstvo i grupna putovanja su do tada samo za pregled, jer izmena mora da stigne i do druge strane.",
    "feat.devices.title": "Isti nalog na više uređaja",
    "feat.devices.body":
      "Prijavite se istim nalogom na telefonu i tabletu. Izmene se usklađuju kad oba uređaja budu na mreži. Ako se ista stavka izmeni na dva mesta dok ste oflajn, konflikt se pokaže umesto da se podaci prepišu. U podešavanjima vidite sve aktivne sesije i možete bilo koju opozvati.",
    "feat.backup.title": "Rezervne kopije i izvoz",
    "feat.backup.body":
      "Izvezite punu JSON kopiju koju kasnije vratite, spajanjem ili zamenom postojećih podataka, ili TXT izveštaj i CSV za Excel. Ako uključite zaštitu podataka, kopija je šifrovana istim ključem.",
    "feat.statements.title": "Uvoz bankovnog izvoda",
    "feat.statements.body":
      "Učitajte PDF izvod i Troskomir upiše troškove i prihode odjednom, uz proveru da se saldo slaže. Trenutno: Banca Intesa, OTP banka Srbija i Yettel banka. Duplikati se prepoznaju, pa isto ne unosite dvaput.",
    "feat.widgets.title": "Vidžet na početnom ekranu",
    "feat.widgets.body":
      "Na početni ekran stavite vidžet sa brojem skeniranih računa ovog meseca i onima koji čekaju pregled, ili lojalti kartice za brz pristup na kasi. Skeniranje računa kreće direktno sa vidžeta.",
    "feat.flags.title": "Upravljanje funkcijama",
    "feat.flags.body":
      "Putovanja, zajmovi, štednja, budžeti, računi, lojalti kartice, valutni bazeni, uvoz izvoda i lokalni AI mogu da se isključe. Isključen modul nestaje iz menija i prestaje da šalje podsetnike. Podaci se ne brišu, vratite ga kad god poželite. Troškovi, prihodi i statistika uvek ostaju uključeni.",

    "cat.tracking": "Praćenje troškova",
    "cat.cards": "Kartice i rate",
    "cat.reminders": "Podsetnici i obaveštenja",
    "cat.savings": "Štednja i lojalti",

    "feat.scan.title": "Skeniranje fiskalnog računa",
    "feat.scan.body":
      "Skenirajte QR kod sa fiskalnog računa kamerom telefona. Trenutno podržano: 🇷🇸 Srbija (suf.purs.gov.rs), 🇧🇦 Republika Srpska (suf.poreskaupravars.org), 🇲🇪 Crna Gora (mapr.tax.gov.me) i 🇬🇷 Grčka (mydatapi.aade.gr). Aplikacija učitava podatke direktno sa zvanične poreske stranice i upisuje prodavnicu, iznos i artikle. Grčki nazivi se, gde je moguće, prevode ili transliteruju. Uskoro i Makedonija.",
    "feat.localAi.title": "Lokalna AI obrada računa",
    "feat.localAi.body":
      "Snimite ili izaberite sliku računa. ML Kit OCR i mali Qwen2.5 jezički model rade na vašem uređaju. Model se jednom preuzima sa Hugging Face-a (oko 547 MB), a OCR tekst se ne šalje cloud AI servisu. Sve predložene podatke pregledate pre čuvanja.",

    "feat.expenses.title": "Jednokratni i redovni troškovi",
    "feat.expenses.body":
      "Običnu kupovinu unesete za sekund. Za troškove koji se ponavljaju (kiriju, pretplate), izaberete jednom da li Troskomir sam upisuje trošak na dan dospeća, ili samo vas podseti da ga potvrdite.",

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
    "privacy.localAi.title": "Računi i lokalni AI",
    "privacy.localAi.body":
      "Obrada slike računa ostaje na vašem telefonu: ML Kit izdvaja tekst, a Qwen2.5 lokalno predlaže prodavnicu, iznos, datum, valutu, način plaćanja, kategoriju i oznake. Prvi put se preuzima samo datoteka modela sa Hugging Face-a; račun i OCR tekst se ne šalju cloud AI servisu. Trošak se šalje Troskomiru tek kada ga pregledate i sačuvate.",

    "about.heading": "O autoru",
    "about.name": "Nikola Dašić",
    "about.bio":
      "Pomaže Bog, ja sam Nikola Dašić, otac, {age}-godišnji programer, radio amater, tip sa previše hobija, neredovni ispijač kreatina, zaljubljenik u Prolom vodu, uzgajivač kokošaka, ponosni vlasnik Dačije, redovni kupac u IKEI, pobornik GNU/Linux-a, elektrotehničar elektronike, pravoslavni hrišćanin, posvećenik teretani koji je 17. avgusta 2026. prvi put istrčao krug oko Ade Ciganlije, poštovalac goveđe pršute, obožavalac Yandex-a, biciklistički badi, i neko ko je godinama pratio svoje troškove u prokletom Excel-u... dok nisam odlučio da napravim nešto bolje. Troskomir radi na mom kućnom server-labu, ne u nekom velikom oblaku, zato osnovne funkcije ostaju besplatne. Ako imate pitanja ili predloge, javite se.",
    "about.linkedin": "Povežimo se na LinkedIn-u",

    "hosting.heading": "Gde aplikacija radi",
    "hosting.body":
      "Troskomir radi na mom kućnom serveru (home lab), a ne u nekoj velikoj komercijalnoj cloud usluzi. To smanjuje troškove i omogućava mi da aplikaciju ponudim besplatno, ali znači i da je dostupnost servisa onoliko pouzdana koliko i moj kućni internet i struja. Ako server padne, aplikacija i dalje radi na vašem telefonu: podaci se čuvaju lokalno i sinhronizuju se kad se veza vrati. Isti nalog možete koristiti na više uređaja.",
    "hosting.caption1":
      "Brvnara u dvorištu, tu živi ceo home lab (i moja radio oprema).",
    "hosting.caption2": "Serveri, dok sam ih tek montirao.",

    "footer.contact": "Pitanja? Ideje? Sarme?",
    "footer.contactBody":
      "Pridružite se Telegram grupi: pitajte šta god želite, predložite novu funkciju, prijavite grešku ili samo ćaskajte sa drugim korisnicima. Ili zovite na domaće sarme.",
    "footer.rights": "Sva prava zadržana.",
    "nav.privacyPolicy": "Politika privatnosti",
    "nav.terms": "Uslovi korišćenja",
    "footer.email": "E-pošta",
    "footer.legal": "Pravni dokumenti",
    "privacy.readFullPolicy": "Pročitajte celu politiku privatnosti",
    "privacy.marketingNote": "Tekst iznad je sažetak. Obavezujuća verzija je politika privatnosti.",

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
    "open.title": "Opening Troškomir",
    "open.body": "If the app doesn't open on its own, tap the button below.",
    "open.button": "Open the app",
    "open.fallback": "Don't have the app? Get it on Google Play and try again.",

    "hero.badge": "Now on Google Play",
    "hero.subtitle":
      "Troskomir shows you exactly where your money goes: expenses, cards, installments, savings and reminders, all in one place.",
    "cta.playStore": "Get it on Google Play",
    "cta.appStore": "Download on the App Store",
    "cta.playStoreSoon": "Google Play, coming soon",
    "cta.appStoreSoon": "App Store, coming soon",
    "cta.storesComingSoon": "Coming soon on Google Play and the App Store",
    "cta.comingSoonHint":
      "The App Store link will appear once Apple approves the app.",

    "features.heading": "What Troskomir does",
    "features.subheading":
      "A quick rundown of every feature, so you know what you're getting.",
    "features.joke": "",

    "cat.works": "How it works",
    "feat.offline.title": "Works without internet",
    "feat.offline.body":
      "Expenses, incomes, loans, savings, budgets, currency pools and loyalty cards all work fully offline. Everything is saved on your phone and syncs when the connection comes back, whether that's your internet or my home server. Shared household and group trips stay view-only until then, because an edit has to reach the other person too.",
    "feat.devices.title": "Same account on several devices",
    "feat.devices.body":
      "Sign in with the same account on your phone and tablet. Changes catch up once both devices are online. If the same record is edited in two places while offline, the conflict is shown instead of silently overwriting. Settings lists every active session so you can revoke any of them.",
    "feat.backup.title": "Backups and export",
    "feat.backup.body":
      "Export a full JSON copy you can restore later, merging or replacing what you have, or a TXT report and a CSV for Excel. Turn on data protection and the backup is encrypted with the same key.",
    "feat.statements.title": "Bank statement import",
    "feat.statements.body":
      "Load a PDF statement and Troskomir books the expenses and incomes in one go, checking that the running balance adds up. Currently: Banca Intesa, OTP banka Srbija and Yettel banka. Duplicates are detected, so you don't enter the same row twice.",
    "feat.widgets.title": "Home-screen widget",
    "feat.widgets.body":
      "Put a widget on your home screen with this month's scanned-receipt count and the ones waiting for review, or your loyalty cards for a quick pull-up at the till. Receipt scanning starts straight from the widget.",
    "feat.flags.title": "Manage features",
    "feat.flags.body":
      "Trips, loans, savings, budgets, receipts, loyalty cards, currency pools, statement import and the on-device AI can each be switched off. A disabled module leaves the menu and stops sending its reminders. Your data is not deleted — turn it back on any time. Expenses, incomes and statistics stay on.",

    "cat.tracking": "Expense tracking",
    "cat.cards": "Cards & installments",
    "cat.reminders": "Reminders & notifications",
    "cat.savings": "Savings & loyalty",

    "feat.scan.title": "Fiscal receipt scanning",
    "feat.scan.body":
      "Scan the QR code on a fiscal receipt with your phone's camera. Currently supported: 🇷🇸 Serbia (suf.purs.gov.rs), 🇧🇦 Republic of Srpska (suf.poreskaupravars.org), 🇲🇪 Montenegro (mapr.tax.gov.me) and 🇬🇷 Greece (mydatapi.aade.gr). The app pulls the data straight from the official tax portal and fills in the store, amount and items. Greek merchant names are translated or transliterated where possible. North Macedonia coming soon.",
    "feat.localAi.title": "On-device receipt AI",
    "feat.localAi.body":
      "Take or choose a receipt photo. ML Kit OCR and a small Qwen2.5 language model run on your device. The model is downloaded once from Hugging Face (about 547 MB), while OCR text is not sent to a cloud AI service. You review every suggested field before saving.",

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
    "privacy.localAi.title": "Receipts and local AI",
    "privacy.localAi.body":
      "Receipt image processing stays on your phone: ML Kit extracts the text, and Qwen2.5 locally suggests the seller, amount, date, currency, payment method, category, and tags. Only the model file is downloaded from Hugging Face on first use; the receipt and OCR text are not sent to a cloud AI service. The expense reaches Troskomir only after you review and save it.",

    "about.heading": "About the author",
    "about.name": "Nikola Dašić",
    "about.bio":
      "God helps — I'm Nikola Da\u0161i\u0107, a father, a {age}-year-old programmer, HAM radio operator, a guy with way too many hobbies, an irregular creatine drinker, a Prolom water devotee, chicken farmer, proud Dacia owner, IKEA regular, GNU/Linux supporter, electronics technician, Orthodox Christian, gym devotee who on 17 August 2026 ran a lap around Ada Ciganlija for the first time, prosciutto connoisseur, Yandex admirer, cycling buddy, and someone who tracked expenses in cursed Excel spreadsheets for way too many years... until I decided to just build something better. Troskomir runs on my own home server lab, not some big commercial cloud, which is exactly why the core features stay free. Questions or suggestions? Just reach out.",
    "about.linkedin": "Connect on LinkedIn",

    "hosting.heading": "Where it runs",
    "hosting.body":
      "Troskomir runs on my own home server lab, not a big commercial cloud. That keeps costs low and lets me offer the app for free, though it also means the service is only as reliable as my home internet and power. If the server goes down, the app still works on your phone: data is saved locally and syncs when the connection comes back. The same account works on more than one device.",
    "hosting.caption1":
      "The wooden shed in my backyard, home to the whole lab (and my HAM radio gear).",
    "hosting.caption2": "The servers, mid-setup.",

    "footer.contact": "Questions? Ideas?",
    "footer.contactBody":
      "Join the Telegram community and ask anything, pitch a feature, report a bug, or just chat with other users.",
    "footer.rights": "All rights reserved.",
    "nav.privacyPolicy": "Privacy policy",
    "nav.terms": "Terms of use",
    "footer.email": "E-mail",
    "footer.legal": "Legal",
    "privacy.readFullPolicy": "Read the full privacy policy",
    "privacy.marketingNote": "The text above is a summary. The privacy policy is the binding version.",

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
    "open.title": "Открываем Трошкомир",
    "open.body": "Если приложение не открылось само, нажмите кнопку ниже.",
    "open.button": "Открыть приложение",
    "open.fallback": "Нет приложения? Загрузите его из Google Play и попробуйте снова.",

    "hero.badge": "Уже в Google Play",
    "hero.subtitle":
      "Трошкомир точно показывает, куда уходят ваши деньги: расходы, карты, рассрочка, накопления и напоминания, всё в одном месте.",
    "cta.playStore": "Загрузите в Google Play",
    "cta.appStore": "Загрузите в App Store",
    "cta.playStoreSoon": "Google Play, скоро",
    "cta.appStoreSoon": "App Store, скоро",
    "cta.storesComingSoon": "Скоро в Google Play и App Store",
    "cta.comingSoonHint":
      "Ссылка на App Store появится, когда Apple одобрит приложение.",

    "features.heading": "Что умеет Трошкомир",
    "features.subheading":
      "Короткий обзор всех функций, чтобы вы знали, что получаете.",
    "features.joke": "",

    "cat.works": "Как это работает",
    "feat.offline.title": "Работает без интернета",
    "feat.offline.body":
      "Расходы, доходы, займы, накопления, бюджеты, валютные пулы и карты лояльности полностью работают офлайн. Всё сохраняется на телефоне и синхронизируется, когда связь возвращается, будь то ваш интернет или мой домашний сервер. Общее домохозяйство и групповые поездки до тех пор доступны только для просмотра, потому что изменение должно дойти и до другой стороны.",
    "feat.devices.title": "Один аккаунт на нескольких устройствах",
    "feat.devices.body":
      "Войдите с тем же аккаунтом на телефоне и планшете. Изменения подтягиваются, когда оба устройства снова в сети. Если одна и та же запись изменена в двух местах офлайн, конфликт показывается, а не перезаписывается молча. В настройках видны все активные сессии, любую можно отозвать.",
    "feat.backup.title": "Резервные копии и экспорт",
    "feat.backup.body":
      "Экспортируйте полную JSON-копию, которую потом восстановите, с объединением или заменой текущих данных, либо TXT-отчёт и CSV для Excel. Если включить защиту данных, копия шифруется тем же ключом.",
    "feat.statements.title": "Импорт банковской выписки",
    "feat.statements.body":
      "Загрузите PDF-выписку, и Трошкомир внесёт расходы и доходы сразу, проверив, что сальдо сходится. Сейчас: Banca Intesa, OTP banka Srbija и Yettel banka. Дубликаты распознаются, так что одну и ту же строку вы не внесёте дважды.",
    "feat.widgets.title": "Виджет на домашнем экране",
    "feat.widgets.body":
      "Поставьте виджет с числом отсканированных чеков за этот месяц и теми, что ждут проверки, или карты лояльности для быстрого доступа на кассе. Сканирование чека запускается прямо с виджета.",
    "feat.flags.title": "Управление функциями",
    "feat.flags.body":
      "Поездки, займы, накопления, бюджеты, чеки, карты лояльности, валютные пулы, импорт выписки и локальный ИИ можно выключить. Отключённый модуль исчезает из меню и перестаёт слать напоминания. Данные не удаляются, включите снова в любой момент. Расходы, доходы и статистика всегда остаются включёнными.",

    "cat.tracking": "Учёт расходов",
    "cat.cards": "Карты и рассрочка",
    "cat.reminders": "Напоминания и уведомления",
    "cat.savings": "Накопления и лояльность",

    "feat.scan.title": "Сканирование фискального чека",
    "feat.scan.body":
      "Отсканируйте QR-код на фискальном чеке камерой телефона. Сейчас поддерживаются: 🇷🇸 Сербия (suf.purs.gov.rs), 🇧🇦 Республика Сербская (suf.poreskaupravars.org), 🇲🇪 Черногория (mapr.tax.gov.me) и 🇬🇷 Греция (mydatapi.aade.gr). Приложение получает данные напрямую с официального налогового портала и само заполняет магазин, сумму и товары. Греческие названия по возможности переводятся или транслитерируются. Скоро: Северная Македония.",
    "feat.localAi.title": "Локальный ИИ для чеков",
    "feat.localAi.body":
      "Сфотографируйте чек или выберите изображение. ML Kit OCR и небольшая языковая модель Qwen2.5 работают на вашем устройстве. Модель один раз загружается с Hugging Face (около 547 МБ), а OCR-текст не отправляется в облачный ИИ-сервис. Перед сохранением вы проверяете все предложенные поля.",

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
    "privacy.localAi.title": "Чеки и локальный ИИ",
    "privacy.localAi.body":
      "Обработка изображения чека остаётся на телефоне: ML Kit извлекает текст, а Qwen2.5 локально предлагает продавца, сумму, дату, валюту, способ оплаты, категорию и теги. При первом использовании с Hugging Face загружается только файл модели; чек и OCR-текст не отправляются в облачный ИИ-сервис. Расход попадает в Трошкомир только после вашей проверки и сохранения.",

    "about.heading": "Об авторе",
    "about.name": "Никола Дашич",
    "about.bio":
      "Помогай Бог, я Никола Дашич, отец, {age}-летний программист, радиолюбитель (HAM), человек со слишком большим количеством увлечений, нерегулярный любитель креатина, поклонник воды Prolom, птицевод, гордый владелец Dacia, завсегдатай IKEA, сторонник GNU/Linux, специалист по электронике, православный христианин, преданный спортзалу, который 17 августа 2026 года впервые пробежал круг вокруг Ады Циганлии, ценитель прошутто, поклонник Яндекса, велосипедный товарищ и тот, кто годами вёл учёт расходов в проклятом Excel'е... пока не решил сделать что-то получше. Трошкомир работает на моём домашнем сервере, а не в большом коммерческом облаке, именно поэтому основные функции остаются бесплатными. Есть вопросы или предложения? Пишите.",
    "about.linkedin": "Давайте свяжемся в LinkedIn",

    "hosting.heading": "Где это работает",
    "hosting.body":
      "Трошкомир работает на моём домашнем сервере (home lab), а не в большом коммерческом облаке. Это снижает расходы и позволяет мне предлагать приложение бесплатно, но также означает, что доступность сервиса зависит от моего домашнего интернета и электричества. Если сервер упадёт, приложение всё равно работает на телефоне: данные сохраняются локально и синхронизируются, когда связь вернётся. Один и тот же аккаунт можно использовать на нескольких устройствах.",
    "hosting.caption1":
      "Деревянный сарай на заднем дворе, здесь живёт вся домашняя лаборатория (и моё радиооборудование).",
    "hosting.caption2": "Серверы, во время установки.",

    "footer.contact": "Вопросы? Идеи?",
    "footer.contactBody":
      "Присоединяйтесь к Telegram-группе: задавайте вопросы, предлагайте новые функции, сообщайте об ошибках или просто общайтесь с другими пользователями.",
    "footer.rights": "Все права защищены.",
    "nav.privacyPolicy": "Политика конфиденциальности",
    "nav.terms": "Условия использования",
    "footer.email": "Эл. почта",
    "footer.legal": "Правовые документы",
    "privacy.readFullPolicy": "Читать полную политику конфиденциальности",
    "privacy.marketingNote": "Текст выше — краткое изложение. Обязательной версией является политика конфиденциальности.",

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
