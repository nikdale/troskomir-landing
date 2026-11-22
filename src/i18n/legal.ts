import type { Lang } from "./translations";

/**
 * The canonical privacy policy and terms of use.
 *
 * ## Why this file exists
 *
 * There used to be three of these, and they disagreed. The backend served an
 * English-only pair at `/api/privacy` and `/api/terms`; the mobile app shipped
 * its own copy in five ARB locales; this site had marketing prose under
 * `#privatnost` doing duty as a policy. Only the app copy mentioned the
 * on-device AI, only the backend copy had a retention section, only the
 * landing copy admitted the server is a home lab, and none of the three
 * mentioned Firebase, the fiscal portals, IP logging or how to delete an
 * account.
 *
 * A store submission needs one authoritative URL. This is it. The backend now
 * 301-redirects its old paths here so already-installed builds keep working,
 * and the app's Settings screens link out rather than rendering a local copy.
 *
 * ## Why it lives on the landing site
 *
 * The policy URL must stay reachable when the API is down. Play re-crawls it
 * periodically and flags unreachable policies; the API is a single home-lab
 * host, while this site is static on GitHub Pages with independent uptime.
 *
 * ## Editing rules
 *
 * Every disclosure here is load-bearing against the Play Data Safety form and
 * the App Store privacy nutrition label. Adding a third-party service, a
 * permission, or a new stored field means editing this file in the same
 * change — `tests/legal-content.test.mjs` asserts the required disclosures are
 * present so a future edit can't silently drop one.
 *
 * Facts this text states that live outside this repository, and must be
 * changed here when they change there:
 *  - backup retention: troskomir-bekend `scripts/backup-db.sh`
 *    (BACKUP_RETENTION_DAYS 30, pre-deploy snapshots 2 and at most 14 days),
 *    and every other copy of the database (off-host copies, VM images) has to
 *    expire within the same 30 days or the deletion section becomes untrue;
 *  - the geo-IP lookup: `src/auth/geo-ip.service.ts` (ipwho.is, IP only);
 *  - push text sent through FCM: `src/notifications/notification-content.ts`;
 *  - the shared QR-receipt cache: `src/fiscal-receipt/fiscal-receipt.service.ts`
 *    (24 h);
 *  - sign-in records: `auth-audit-retention.scheduler.ts` (90 days) and
 *    `sessions.service.ts` (sessions expire 35 days after last use);
 *  - idempotency responses: `idempotency-cleanup.scheduler.ts` (90 days);
 *  - analytics and crash defaults: troskomir-mobile
 *    `analytics_settings.dart` / `crash_reporting.dart` (both on by default),
 *    and the toggle labels in the app's ARB files, quoted verbatim below.
 */

export interface LegalSection {
  heading: string;
  /** Paragraphs. HTML is allowed for links only. */
  body?: string[];
  bullets?: string[];
}

export interface LegalDocument {
  title: string;
  effective: string;
  intro: string[];
  sections: LegalSection[];
}

/** Published contact for privacy questions and support. Both stores require a
 *  reachable one, and GDPR Art. 13 requires it of the controller. */
export const PRIVACY_CONTACT_EMAIL = "nikdale@duck.com";

/** The data controller, named as GDPR Art. 13 requires. */
export const DATA_CONTROLLER = "Nikola Dašić";

/** The same name in the script of the Cyrillic documents (VELES V-L10N-05).
 *  Serbian writes it natively in Cyrillic, and transliterateToLatin() turns it
 *  back into exactly DATA_CONTROLLER for sr-Latn. Russian transliterates the
 *  surname differently, so the legal Latin spelling follows in brackets to
 *  keep the controller unambiguous. */
const DATA_CONTROLLER_SR = "Никола Дашић";
const DATA_CONTROLLER_RU = `Никола Дашич (${DATA_CONTROLLER})`;

/** Minimum age. Serbia's ZZPL follows GDPR Art. 8; 16 is the ceiling and needs
 *  no parental-consent machinery, which this app has none of. */
export const MINIMUM_AGE = 16;

export const DELETE_ACCOUNT_URL =
  "https://troskomir.stryna.com/delete-account/";

const FISCAL_PORTALS =
  "suf.purs.gov.rs, suf.poreskaupravars.org, mapr.tax.gov.me, mydatapi.aade.gr";

/**
 * Serbian Cyrillic → Latin, applied to the `sr` documents to produce `sr-Latn`.
 *
 * Derived rather than hand-written because the two scripts are a strict
 * one-to-one mapping in Serbian, and keeping two hand-edited copies of a legal
 * document is how the app ended up with three divergent privacy policies in
 * the first place. Only Cyrillic codepoints are touched, so embedded HTML,
 * e-mail addresses, "Google Firebase" and "AES-256-GCM" pass through unchanged.
 */
const CYRILLIC_TO_LATIN: Record<string, string> = {
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Ђ: "Đ",
  Е: "E",
  Ж: "Ž",
  З: "Z",
  И: "I",
  Ј: "J",
  К: "K",
  Л: "L",
  Љ: "Lj",
  М: "M",
  Н: "N",
  Њ: "Nj",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  Ћ: "Ć",
  У: "U",
  Ф: "F",
  Х: "H",
  Ц: "C",
  Ч: "Č",
  Џ: "Dž",
  Ш: "Š",
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  ђ: "đ",
  е: "e",
  ж: "ž",
  з: "z",
  и: "i",
  ј: "j",
  к: "k",
  л: "l",
  љ: "lj",
  м: "m",
  н: "n",
  њ: "nj",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  ћ: "ć",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "č",
  џ: "dž",
  ш: "š",
};

export function transliterateToLatin(text: string): string {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const mapped = CYRILLIC_TO_LATIN[char];
    if (mapped === undefined) {
      out += char;
      continue;
    }
    // A digraph written after an uppercase letter belongs to an all-caps word
    // ("ЊЕГОВ" → "NJEGOV", not "NjEGOV").
    if (mapped.length === 2 && /\p{Lu}/u.test(mapped[0])) {
      const next = text[i + 1];
      const nextIsUpper =
        next !== undefined &&
        CYRILLIC_TO_LATIN[next] !== undefined &&
        /\p{Lu}/u.test(CYRILLIC_TO_LATIN[next][0]);
      out += nextIsUpper ? mapped.toUpperCase() : mapped;
      continue;
    }
    out += mapped;
  }
  return out;
}

function toLatinDocument(doc: LegalDocument): LegalDocument {
  return {
    title: transliterateToLatin(doc.title),
    effective: transliterateToLatin(doc.effective),
    intro: doc.intro.map(transliterateToLatin),
    sections: doc.sections.map((section) => ({
      heading: transliterateToLatin(section.heading),
      body: section.body?.map(transliterateToLatin),
      bullets: section.bullets?.map(transliterateToLatin),
    })),
  };
}

const privacyPolicySr: LegalDocument = {
  title: "Политика приватности",
  effective: "Важи од: 22. новембар 2026.",
  intro: [
    "Трошкомир је апликација за праћење личних финансија: трошкова, прихода, позајмица, штедње, буџета, путовања и подсетника.",
    `Руковалац подацима је ${DATA_CONTROLLER_SR} (Србија). За сва питања о приватности пишите на <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>.`,
  ],
  sections: [
    {
      heading: "Које податке чувамо",
      bullets: [
        "Подаци о налогу: име, адреса е-поште и подаци о сесији.",
        "Финансијски записи које уносите: трошкови, приходи, позајмице, штедња, буџети, картице и записи везани за путовања.",
        "Подаци са скенираних фискалних рачуна: продавац, износ, датум и ставке рачуна.",
        "Подсетници и подешавања апликације.",
        "Технички подаци о пријављивању: IP адреса, идентификатор прегледача или уређаја (user-agent), назив и метаподаци уређаја и приближна локација (град и држава) одређена према IP адреси.",
      ],
    },
    {
      heading: "Заштита података (шифровање с краја на крај)",
      body: [
        "Трошкомир нуди опциону заштиту података. Када је укључите, осетљива текстуална поља — описи, белешке и детаљи рачуна — шифрују се на вашем уређају пре него што стигну до сервера, алгоритмом AES-256-GCM. Кључ се изводи из ваше лозинке за заштиту података помоћу Argon2id и никада не напушта уређај. Дељење унутар домаћинства користи размену кључева X25519/HKDF.",
        "То значи да сервер те садржаје не може прочитати. Значи и да их нико, укључујући нас, не може повратити ако изгубите и лозинку и једнократни код за опоравак.",
        "Износи, датуми, валуте, категорије, ознаке, називи валутних базена и веза са налогом нису шифровани на овај начин — потребни су серверу за обрачун. Нису шифрована ни путовања ни заједничке позајмице, укључујући имена особа у њима, јер остали учесници немају ваш кључ. Заштита података је подразумевано искључена; док је искључена, сервер види све ваше уносе.",
        "Изузетак су и рачуни скенирани преко QR кода. Да би рачун преузео са пореског портала, наш сервер мора да га прочита, па види садржај рачуна и када је заштита података укључена, и чува га у привременој меморији (кешу) 24 сата, да поновно скенирање истог рачуна не би поново ишло на портал.",
        "Апликација чува и офлајн копију ваших података на самом телефону, како бисте их видели без интернета. Та копија је шифрована засебним кључем уређаја, а не вашом лозинком за заштиту података — што значи да остаје читљива и док је апликација закључана. Брише се при одјави и при брисању налога.",
      ],
    },
    {
      heading: "Где се подаци чувају",
      body: [
        "Сервер се налази у Србији, на приватној инфраструктури којом управља руковалац, а не у комерцијалном облаку. Комуникација иде преко HTTPS-а. И резервне копије се чувају само на опреми којом руковалац сам управља; ноћне резервне копије базе су шифроване.",
      ],
    },
    {
      heading: "Услуге трећих страна",
      body: [
        "Трошкомир не користи рекламне SDK-ове нити праћење између апликација. Користи следеће услуге, свака за тачно наведену сврху:",
      ],
      bullets: [
        "Google Firebase Crashlytics — извештаји о падовима, како би се грешке исправиле. Подразумевано укључено; можете искључити у апликацији: Подешавања > Приватност података > Шаљи извештаје о падовима. Извештај садржи грешку и место у апликацији где се десила, модел уређаја, верзије оперативног система и апликације и насумични идентификатор инсталације који прави Firebase; не садржи ваше име ни адресу е-поште. Извештаји се шаљу компанији Google.",
        "Google Firebase Cloud Messaging — доставља обавештења која укључите. Google добија токен вашег уређаја и, за свако обавештење, његов наслов и текст, који могу садржати износ, продавца, категорију или име особе у позајмици. На iPhone-у обавештење преноси и Apple-ова услуга за push обавештења.",
        "ipwho.is — када се пријавите и када се промени IP адреса пријављеног уређаја, наш сервер шаље ту IP адресу услузи ipwho.is (ништа друго: ни име, ни адресу е-поште, ни идентификатор налога) да би одредио приближан град и државу. Резултат се чува уз сесију тог уређаја и приказује вам се у апликацији на списку пријављених уређаја, да бисте приметили пријаву која није ваша.",
        `Државни фискални портали (${FISCAL_PORTALS}) — када скенирате QR код са фискалног рачуна, наш сервер у ваше име преузима садржај рачуна са портала надлежне пореске управе.`,
        "Провера рачуна код пореске управе (suf.purs.gov.rs) — ако одлучите да проверите скенирани рачун, апликација отвара званичну страницу пореске управе за проверу директно на вашем уређају, у правом прегледачу, и попуњава број рачуна, контролни број, износ и датум/време које је већ прочитала са вашег скенирања. Ова веза иде директно између вашег уређаја и пореске управе; наш сервер у томе не учествује нити је види.",
        "EU VIES (ec.europa.eu) — када грчки рачун нема назив продавца, тражимо порески број (ΑΦΜ) на европском VIES сервису да бисмо добили званичан назив предузећа.",
        "Hugging Face — извор датотеке за коју год од три опционе локалне моделе изаберете (у апликацији, Подешавања > Локални AI) ако укључите обраду рачуна на уређају. На уређају се чува само један модел одједном; сам модел затим ради локално, а слике рачуна се не шаљу никоме.",
        "Google ML Kit — библиотеке које на уређају читају QR кодове, бар-кодове и текст са фотографија рачуна. Фотографија и препознати текст остају на уређају; према наводима компаније Google, библиотеке шаљу компанији Google техничке податке о сопственом раду (модел уређаја, верзије оперативног система и апликације, учинак библиотеке).",
        "Статистика коришћења функција апликације (Aptabase) и посета веб страници (Umami) — обе услуге раде на нашем серверу и не шаљу ништа другим компанијама. Статистика у апликацији је подразумевано укључена; можете је искључити у апликацији: Подешавања > Приватност података > Шаљи анонимну статистику коришћења. Сваки догађај садржи назив коришћене функције или екрана, верзију апликације, верзију оперативног система, језик и насумични идентификатор сесије који се мења после сат времена неактивности. Ниједна од две услуге не користи колачиће нити идентификаторе уређаја и не може се повезати са вашим налогом или идентитетом.",
      ],
    },
    {
      heading: "Камера и фотографије",
      body: [
        "Приступ камери користи се за скенирање QR кодова са рачуна и бар-кодова картица лојалности. Приступ галерији користи се да изаберете фотографију рачуна. Обрада слике и препознавање текста одвијају се на уређају; сама слика се не отпрема на сервер. На сервер одлази само трошак који из ње направите.",
      ],
    },
    {
      heading: "Колико дуго чувамо податке",
      bullets: [
        "Подаци налога и финансијски записи: док не обришете запис или налог.",
        "Безбедносни дневник пријављивања и измена налога (адреса е-поште, IP адреса, user-agent): 90 дана.",
        "Пријављени уређаји (назив уређаја, IP адреса и приближна локација прве и последње пријаве): док се сесија користи. Сесија се завршава када се одјавите или после 35 дана некоришћења, а њен запис се брише најкасније 35 дана после последњег коришћења.",
        "Сачувани одговори на захтеве апликације (чувају се да захтев који апликација понови после прекида везе не би био примењен двапут): садржај одговора 90 дана; после тога само белешка да је захтев обрађен, без садржаја, док налог постоји.",
        "Рачуни преузети са пореског портала: у кешу сервера 24 сата (трошак који сачувате чува се као и сваки други запис).",
        "Резервне копије: ноћне резервне копије базе чувају се 30 дана, а копије направљене непосредно пре ажурирања највише 14 дана; после тога се бришу.",
        "Извештаји о падовима: 90 дана, према правилима задржавања услуге Firebase Crashlytics.",
        "Статистика коришћења: чува се на нашем серверу; није повезана са вашим налогом, па се не може ни пронаћи ни обрисати заједно са њим.",
      ],
    },
    {
      heading: "Брисање налога",
      body: [
        `Налог можете обрисати из саме апликације или преко веб странице <a href="${DELETE_ACCOUNT_URL}">${DELETE_ACCOUNT_URL}</a>. У апликацији потврђујете лозинком налога или кодом послатим на вашу адресу е-поште; на веб страници су потребни и код и лозинка налога.`,
        "Брисање одмах уклања из базе ваш налог и све финансијске записе везане за њега, ваше чланство у домаћинствима, сачуване одговоре на захтеве и техничке записе о пријављивању. Брисање се не може опозвати.",
        "Неки трагови остају још ограничено време или у облику који вас више не идентификује:",
      ],
      bullets: [
        "Подаци у резервним копијама направљеним пре брисања, док се те копије не обришу 30 дана након што су направљене.",
        "Путовања и заједничке позајмице у којима сте учествовали остају осталим учесницима, јер је то и њихова евиденција; ваше име и адреса е-поште се из њих уклањају и приказујете се као обрисан члан.",
        "Ако налог обришете преко веб странице, запис о брисању у безбедносном дневнику (ваша адреса е-поште и IP адреса са које је брисање тражено) чува се 90 дана.",
        "Статистика коришћења и извештаји о падовима нису повезани са вашим налогом и не бришу се са њим (види „Колико дуго чувамо податке“).",
      ],
    },
    {
      heading: "Ваша права",
      body: [
        "У складу са Општом уредбом о заштити података (GDPR) и Законом о заштити података о личности имате право на: приступ својим подацима, исправку нетачних података, брисање, ограничење обраде, преносивост података и приговор на обраду.",
        `Захтев пошаљите на <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>. Имате и право да поднесете притужбу Поверенику за информације од јавног значаја и заштиту података о личности (poverenik.rs), односно надзорном органу у својој земљи.`,
      ],
    },
    {
      heading: "Узраст",
      body: [
        `Трошкомир није намењен деци. Морате имати најмање ${MINIMUM_AGE} година да бисте направили налог. Ако сазнамо да смо прикупили податке о млађој особи, обрисаћемо их.`,
      ],
    },
    {
      heading: "Праћење и оглашавање",
      body: [
        "Трошкомир не приказује огласе, не користи рекламне SDK-ове и не повезује ваше податке са подацима трећих страна ради оглашавања или мерења.",
        "Анонимна, збирна статистика о коришћењу функција (види „Услуге трећих страна\") користи се искључиво да бисмо разумели шта је корисно — никада за оглашавање нити за препознавање појединачног корисника.",
      ],
    },
    {
      heading: "Измене политике",
      body: [
        "Ову политику можемо изменити због промена у производу, закону или безбедности. Датум важења на врху увек показује последњу верзију.",
      ],
    },
    {
      heading: "Контакт",
      body: [
        `${DATA_CONTROLLER_SR}, Србија — <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>`,
      ],
    },
  ],
};

const privacyPolicyEn: LegalDocument = {
  title: "Privacy Policy",
  effective: "Effective: 22 November 2026",
  intro: [
    "Troškomir is a personal finance app for tracking expenses, incomes, loans, savings, budgets, trips and reminders.",
    `The data controller is ${DATA_CONTROLLER} (Serbia). For any privacy question, write to <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>.`,
  ],
  sections: [
    {
      heading: "What we store",
      bullets: [
        "Account details: name, e-mail address and session data.",
        "Financial records you enter: expenses, incomes, loans, savings, budgets, cards and trip-related entries.",
        "Data from scanned fiscal receipts: merchant, amount, date and line items.",
        "Reminders and app preferences.",
        "Technical sign-in records: IP address, user-agent, device name and metadata, and the approximate location (city and country) worked out from the IP address.",
      ],
    },
    {
      heading: "Data Protection (end-to-end encryption)",
      body: [
        "Troškomir offers optional Data Protection. With it on, sensitive text fields — descriptions, notes and receipt details — are encrypted on your device with AES-256-GCM before they reach the server. The key is derived from your Data Protection password using Argon2id and never leaves the device. Household sharing uses X25519/HKDF key exchange.",
        "This means the server cannot read that content. It also means nobody, including us, can recover it if you lose both your password and your one-time recovery code.",
        "Amounts, dates, currencies, categories, tags, currency-pool names and the link to your account are not encrypted this way — the server needs them to calculate. Neither are trips and shared loans, including the names of the people in them, because the other people in them do not hold your key. Data Protection is off by default; while it is off, the server can see everything you enter.",
        "Receipts scanned from a QR code are an exception too. To fetch a receipt from the tax portal our server has to read it, so it sees the receipt's contents even with Data Protection on, and keeps them in a short-lived cache for 24 hours so that scanning the same receipt again does not ask the portal twice.",
        "The app also keeps an offline copy of your data on the phone itself, so you can read it with no connection. That copy is encrypted under a separate device key rather than your Data Protection password — which means it stays readable while the app is locked. It is erased on logout and on account deletion.",
      ],
    },
    {
      heading: "Where data is stored",
      body: [
        "The server is in Serbia, on private infrastructure run by the controller rather than a commercial cloud. Traffic uses HTTPS. Backups, too, are kept only on equipment the controller runs himself; the nightly database backups are encrypted.",
      ],
    },
    {
      heading: "Third-party services",
      body: [
        "Troškomir uses no advertising SDKs and no cross-app tracking. It does use the following services, each for exactly the stated purpose:",
      ],
      bullets: [
        "Google Firebase Crashlytics — crash reports, so faults can be fixed. On by default; you can turn it off in the app under Settings > Data privacy > Send crash reports. A report contains the error and where in the app it happened, the device model, the operating-system and app versions and a random installation identifier created by Firebase; it does not contain your name or e-mail address. Reports go to Google.",
        "Google Firebase Cloud Messaging — delivers the notifications you enable. Google receives your device's push token and, for each notification, its title and text, which can include an amount, a merchant, a category or the name of a person in a loan. On an iPhone, Apple's push notification service carries it as well.",
        "ipwho.is — when you sign in, and when the IP address of a signed-in device changes, our server sends that IP address to the ipwho.is lookup service (nothing else: no name, e-mail address or account identifier) to find the approximate city and country. The result is stored with that device's session and shown to you in the app's list of signed-in devices, so you can spot a sign-in that isn't yours.",
        `Government fiscal portals (${FISCAL_PORTALS}) — when you scan a receipt QR code, our server fetches the receipt contents from the relevant tax authority's portal on your behalf.`,
        "Tax authority receipt verification (suf.purs.gov.rs) — if you choose to verify a scanned receipt, the app opens the tax authority's own verification page directly on your device, in a real browser view, and fills in the invoice number, control number, amount and date/time already read from your scan. This connection runs directly between your device and the tax authority; our server is not involved in it and does not see it.",
        "EU VIES (ec.europa.eu) — when a Greek receipt has no seller name, we look up the tax number (ΑΦΜ) on the European VIES service to get the official company name.",
        "Hugging Face — the source of whichever of three optional local models you choose (in the app, Settings > Local AI) if you enable on-device receipt processing. Only one model is kept on the device at a time; whichever one you pick runs locally, and receipt images are not sent anywhere.",
        "Google ML Kit — the libraries that read QR codes, barcodes and the text of receipt photos on the device. The photo and the recognised text stay on the device; according to Google, the libraries send Google technical information about their own operation (device model, operating-system and app versions, how the library performed).",
        "App feature-usage statistics (Aptabase) and website visit statistics (Umami) — both run on our own server and send nothing to any other company. The app's statistics are on by default; you can turn them off in the app under Settings > Data privacy > Send anonymous usage statistics. Each event names the feature or screen used, together with the app version, operating-system version and language and a random session identifier that is replaced after an hour of inactivity. Neither service uses cookies or device identifiers, and neither can be linked to your account or identity.",
      ],
    },
    {
      heading: "Camera and photos",
      body: [
        "Camera access is used to scan receipt QR codes and loyalty-card barcodes. Photo library access is used so you can pick a receipt photo. Image processing and text recognition happen on the device; the image itself is not uploaded. Only the expense you create from it is sent to the server.",
      ],
    },
    {
      heading: "How long we keep data",
      bullets: [
        "Account details and financial records: until you delete the record or your account.",
        "Security log of sign-ins and account changes (e-mail address, IP address, user-agent): 90 days.",
        "Signed-in devices (device name, IP address and approximate location of the first and the latest sign-in): while the session is in use. A session ends when you sign out or after 35 days without use, and its record is deleted at the latest 35 days after its last use.",
        "Saved responses to app requests (kept so that a request the app repeats after a lost connection is not applied twice): the response for 90 days; after that only a note that the request was handled, without its content, for as long as the account exists.",
        "Receipts fetched from a tax portal: in the server's cache for 24 hours (the expense you save is kept like any other record).",
        "Backups: nightly database backups are kept for 30 days and copies made just before an update for at most 14 days; after that they are deleted.",
        "Crash reports: 90 days, under Firebase Crashlytics' retention rules.",
        "Usage statistics: kept on our server; they are not linked to your account, so they can neither be found nor deleted with it.",
      ],
    },
    {
      heading: "Deleting your account",
      body: [
        `You can delete your account from inside the app or on the web at <a href="${DELETE_ACCOUNT_URL}">${DELETE_ACCOUNT_URL}</a>. In the app you confirm with your account password or a code sent to your e-mail address; on the website you need both the code and your account password.`,
        "Deletion removes your account and every financial record attached to it, your household memberships, stored request responses and technical sign-in records from the database at once. It cannot be undone.",
        "Some traces outlast it for a limited time, or in a form that no longer identifies you:",
      ],
      bullets: [
        "Data in backups made before the deletion, until those backups are deleted 30 days after they were made.",
        "Trips and shared loans you took part in stay with the other people in them, because the record is theirs too; your name and e-mail address are removed from them and you appear as a deleted member.",
        "If you delete your account on the website, a security log entry of the deletion (your e-mail address and the IP address the request came from) is kept for 90 days.",
        "Usage statistics and crash reports are not linked to your account and are not deleted with it (see “How long we keep data”).",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Under the GDPR and Serbia’s Personal Data Protection Act you have the right to access your data, correct inaccurate data, have it erased, restrict processing, receive it in a portable form and object to processing.",
        `Send requests to <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>. You also have the right to complain to Serbia's Commissioner for Information of Public Importance and Personal Data Protection (poverenik.rs), or to the supervisory authority in your own country.`,
      ],
    },
    {
      heading: "Age",
      body: [
        `Troškomir is not directed at children. You must be at least ${MINIMUM_AGE} to create an account. If we learn we have collected data about someone younger, we delete it.`,
      ],
    },
    {
      heading: "Tracking and advertising",
      body: [
        "Troškomir shows no ads, uses no advertising SDKs, and does not combine your data with third-party data for advertising or measurement.",
        "Anonymous, aggregate feature-usage statistics (see “Third-party services” above) are used solely to understand what's useful — never for advertising, and never to identify an individual user.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "We may update this policy for product, legal or security reasons. The effective date at the top always reflects the current version.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `${DATA_CONTROLLER}, Serbia — <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>`,
      ],
    },
  ],
};

const privacyPolicyRu: LegalDocument = {
  title: "Политика конфиденциальности",
  effective: "Действует с: 22 ноября 2026 г.",
  intro: [
    "Трошкомир — приложение для учёта личных финансов: расходов, доходов, займов, накоплений, бюджетов, поездок и напоминаний.",
    `Оператор данных — ${DATA_CONTROLLER_RU} (Сербия). По любым вопросам о конфиденциальности пишите на <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>.`,
  ],
  sections: [
    {
      heading: "Какие данные мы храним",
      bullets: [
        "Данные учётной записи: имя, адрес электронной почты и данные сессии.",
        "Финансовые записи, которые вы вводите: расходы, доходы, займы, накопления, бюджеты, карты и записи о поездках.",
        "Данные отсканированных фискальных чеков: продавец, сумма, дата и позиции чека.",
        "Напоминания и настройки приложения.",
        "Технические записи о входе: IP-адрес, user-agent, название и метаданные устройства и приблизительное местоположение (город и страна), определённое по IP-адресу.",
      ],
    },
    {
      heading: "Защита данных (сквозное шифрование)",
      body: [
        "В Трошкомире есть необязательная защита данных. Когда она включена, чувствительные текстовые поля — описания, заметки и детали чеков — шифруются на вашем устройстве алгоритмом AES-256-GCM до отправки на сервер. Ключ выводится из вашего пароля защиты данных с помощью Argon2id и никогда не покидает устройство. Совместный доступ в рамках домохозяйства использует обмен ключами X25519/HKDF.",
        "Это значит, что сервер не может прочитать это содержимое. Это также значит, что никто, включая нас, не сможет его восстановить, если вы потеряете и пароль, и одноразовый код восстановления.",
        "Суммы, даты, валюты, категории, теги, названия валютных пулов и привязка к учётной записи так не шифруются — они нужны серверу для расчётов. Не шифруются и поездки и совместные займы, включая имена их участников, потому что у других участников нет вашего ключа. Защита данных выключена по умолчанию; пока она выключена, сервер видит всё, что вы вводите.",
        "Исключение составляют и чеки, отсканированные по QR-коду. Чтобы получить чек с налогового портала, наш сервер должен его прочитать, поэтому он видит содержимое чека даже при включённой защите данных и хранит его во временном кэше 24 часа, чтобы повторное сканирование того же чека не обращалось к порталу ещё раз.",
        "Приложение также хранит офлайн-копию ваших данных на самом телефоне, чтобы вы могли читать их без интернета. Эта копия зашифрована отдельным ключом устройства, а не паролем защиты данных — то есть остаётся читаемой, пока приложение заблокировано. Она удаляется при выходе из аккаунта и при удалении аккаунта.",
      ],
    },
    {
      heading: "Где хранятся данные",
      body: [
        "Сервер находится в Сербии, на частной инфраструктуре оператора, а не в коммерческом облаке. Трафик идёт по HTTPS. Резервные копии тоже хранятся только на оборудовании, которым оператор управляет сам; ночные резервные копии базы данных зашифрованы.",
      ],
    },
    {
      heading: "Сторонние сервисы",
      body: [
        "Трошкомир не использует рекламные SDK и межприложенческое отслеживание. Он использует следующие сервисы, каждый строго для указанной цели:",
      ],
      bullets: [
        "Google Firebase Crashlytics — отчёты о сбоях для исправления ошибок. Включено по умолчанию; отключить можно в приложении: Настройки > Конфиденциальность данных > Отправлять отчёты о сбоях. Отчёт содержит ошибку и место в приложении, где она произошла, модель устройства, версии операционной системы и приложения и случайный идентификатор установки, созданный Firebase; ваше имя и адрес почты в него не входят. Отчёты отправляются в Google.",
        "Google Firebase Cloud Messaging — доставляет включённые вами уведомления. Google получает push-токен вашего устройства и для каждого уведомления его заголовок и текст, в которых может быть сумма, продавец, категория или имя человека в займе. На iPhone уведомление также передаёт служба push-уведомлений Apple.",
        "ipwho.is — при входе и при смене IP-адреса устройства, на котором выполнен вход, наш сервер отправляет этот IP-адрес сервису ipwho.is (и больше ничего: ни имени, ни адреса почты, ни идентификатора учётной записи), чтобы определить приблизительный город и страну. Результат сохраняется вместе с сессией этого устройства и показывается вам в приложении в списке устройств, на которых выполнен вход, чтобы вы могли заметить чужой вход.",
        `Государственные фискальные порталы (${FISCAL_PORTALS}) — при сканировании QR-кода чека наш сервер по вашему поручению получает содержимое чека с портала соответствующей налоговой службы.`,
        "Проверка чека в налоговой службе (suf.purs.gov.rs) — если вы решите проверить отсканированный чек, приложение открывает официальную страницу проверки налоговой службы прямо на вашем устройстве, в настоящем браузере, и заполняет номер чека, контрольный номер, сумму и дату/время, уже считанные с вашего скана. Это соединение идёт напрямую между вашим устройством и налоговой службой; наш сервер в этом не участвует и его не видит.",
        "EU VIES (ec.europa.eu) — если на греческом чеке нет названия продавца, мы запрашиваем налоговый номер (ΑΦΜ) в европейском сервисе VIES, чтобы получить официальное название компании.",
        "Hugging Face — источник файла для любой из трёх опциональных локальных моделей, которую вы выберете (в приложении, Настройки > Локальный ИИ), если включите обработку чеков на устройстве. На устройстве хранится только одна модель одновременно; выбранная модель работает локально, а изображения чеков никуда не отправляются.",
        "Google ML Kit — библиотеки, которые на устройстве читают QR-коды, штрихкоды и текст на фотографиях чеков. Фото и распознанный текст остаются на устройстве; по данным Google, библиотеки отправляют в Google технические сведения о своей работе (модель устройства, версии операционной системы и приложения, показатели работы библиотеки).",
        "Статистика использования функций приложения (Aptabase) и посещений сайта (Umami) — оба сервиса работают на нашем собственном сервере и ничего не передают другим компаниям. Статистика в приложении включена по умолчанию; отключить её можно в приложении: Настройки > Конфиденциальность данных > Отправлять анонимную статистику использования. Каждое событие содержит название использованной функции или экрана, версию приложения, версию операционной системы, язык и случайный идентификатор сессии, который меняется после часа бездействия. Ни один из сервисов не использует куки или идентификаторы устройств, и их данные нельзя связать с вашей учётной записью или личностью.",
      ],
    },
    {
      heading: "Камера и фотографии",
      body: [
        "Доступ к камере нужен для сканирования QR-кодов чеков и штрихкодов карт лояльности. Доступ к галерее — чтобы вы могли выбрать фотографию чека. Обработка изображения и распознавание текста происходят на устройстве; само изображение не загружается на сервер. На сервер отправляется только созданный из него расход.",
      ],
    },
    {
      heading: "Сколько мы храним данные",
      bullets: [
        "Данные учётной записи и финансовые записи: пока вы не удалите запись или учётную запись.",
        "Журнал безопасности входов и изменений учётной записи (адрес почты, IP-адрес, user-agent): 90 дней.",
        "Устройства, на которых выполнен вход (название устройства, IP-адрес и приблизительное местоположение первого и последнего входа): пока сессия используется. Сессия завершается при выходе из аккаунта или после 35 дней без использования, а её запись удаляется не позднее чем через 35 дней после последнего использования.",
        "Сохранённые ответы на запросы приложения (хранятся, чтобы запрос, повторённый приложением после обрыва связи, не был выполнен дважды): содержимое ответа — 90 дней; после этого только отметка о том, что запрос обработан, без содержимого, пока существует учётная запись.",
        "Чеки, полученные с налогового портала: в кэше сервера 24 часа (сохранённый вами расход хранится как любая другая запись).",
        "Резервные копии: ночные резервные копии базы данных хранятся 30 дней, а копии, сделанные непосредственно перед обновлением, — не более 14 дней; затем они удаляются.",
        "Отчёты о сбоях: 90 дней, согласно правилам хранения Firebase Crashlytics.",
        "Статистика использования: хранится на нашем сервере; она не связана с вашей учётной записью, поэтому её нельзя ни найти, ни удалить вместе с ней.",
      ],
    },
    {
      heading: "Удаление учётной записи",
      body: [
        `Учётную запись можно удалить из приложения или на сайте: <a href="${DELETE_ACCOUNT_URL}">${DELETE_ACCOUNT_URL}</a>. В приложении удаление подтверждается паролем учётной записи или кодом, отправленным на вашу почту; на сайте нужны и код, и пароль учётной записи.`,
        "Удаление сразу убирает из базы данных вашу учётную запись и все связанные с ней финансовые записи, членство в домохозяйствах, сохранённые ответы на запросы и технические записи о входе. Это необратимо.",
        "Некоторые следы остаются ещё ограниченное время или в виде, который больше не указывает на вас:",
      ],
      bullets: [
        "Данные в резервных копиях, сделанных до удаления, — пока эти копии не будут удалены через 30 дней после создания.",
        "Поездки и совместные займы, в которых вы участвовали, остаются у других участников, потому что это и их учёт; ваше имя и адрес почты из них удаляются, и вы отображаетесь как удалённый участник.",
        "Если вы удаляете учётную запись на сайте, запись об удалении в журнале безопасности (ваш адрес почты и IP-адрес, с которого пришёл запрос) хранится 90 дней.",
        "Статистика использования и отчёты о сбоях не связаны с вашей учётной записью и вместе с ней не удаляются (см. «Сколько мы храним данные»).",
      ],
    },
    {
      heading: "Ваши права",
      body: [
        "По GDPR и сербскому Закону о защите персональных данных вы вправе получить доступ к своим данным, исправить неточные, удалить их, ограничить обработку, получить данные в переносимом формате и возразить против обработки.",
        `Запросы отправляйте на <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>. Вы также вправе подать жалобу Уполномоченному Сербии по информации общественного значения и защите персональных данных (poverenik.rs) или надзорному органу в своей стране.`,
      ],
    },
    {
      heading: "Возраст",
      body: [
        `Трошкомир не предназначен для детей. Для создания учётной записи вам должно быть не менее ${MINIMUM_AGE} лет. Если мы узнаем, что собрали данные о более младшем человеке, мы их удалим.`,
      ],
    },
    {
      heading: "Отслеживание и реклама",
      body: [
        "Трошкомир не показывает рекламу, не использует рекламные SDK и не объединяет ваши данные со сторонними для рекламы или аналитики.",
        "Анонимная, агрегированная статистика использования функций (см. «Сторонние сервисы» выше) используется исключительно для того, чтобы понять, что полезно, — никогда для рекламы и никогда для идентификации отдельного пользователя.",
      ],
    },
    {
      heading: "Изменения политики",
      body: [
        "Мы можем обновлять эту политику по продуктовым, юридическим или связанным с безопасностью причинам. Дата вверху всегда отражает текущую версию.",
      ],
    },
    {
      heading: "Контакт",
      body: [
        `${DATA_CONTROLLER_RU}, Сербия — <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>`,
      ],
    },
  ],
};

const termsSr: LegalDocument = {
  title: "Услови коришћења",
  effective: "Важи од: 16. август 2026.",
  intro: [
    "Трошкомир је намењен искључиво законитом праћењу личних финансија. Одговорни сте за тачност података које уносите и за одлуке које доносите на основу прорачуна, извештаја и извоза из апликације.",
  ],
  sections: [
    {
      heading: "Није финансијски ни правни савет",
      body: [
        "Трошкомир је алат за евиденцију. Планови отплате кредита, буџети, статистика и обрачуни конверзије валута су информативног карактера и не представљају финансијски, порески, рачуноводствени ни правни савет. За обавезујуће одлуке обратите се стручном лицу.",
      ],
    },
    {
      heading: "Ваш налог",
      body: [
        `Морате имати најмање ${MINIMUM_AGE} година. Одговорни сте за чување своје лозинке и, ако укључите заштиту података, свог кода за опоравак. Ако изгубите обоје, шифровани садржај се не може повратити — ни од стране аутора.`,
      ],
    },
    {
      heading: "Бесплатна апликација, добровољне донације",
      body: [
        "Трошкомир је бесплатан. Ако постоји могућност донације, она је добровољна и покрива трошкове одржавања. Донације се примају искључиво преко веб странице и не купују премијум приступ, власништво нити посебна права.",
      ],
    },
    {
      heading: "Доступност и измене",
      body: [
        "Функције се могу мењати ради унапређења апликације, безбедности или стабилности. Сервис се пружа „такав какав јесте“; непрекидна доступност и тачност у сваком тренутку не могу се гарантовати.",
      ],
    },
    {
      heading: "Ограничење одговорности",
      body: [
        "У мери у којој то закон дозвољава, аутор не одговара за индиректну или последичну штету, изгубљену добит нити за губитак података настао коришћењем апликације. Ово не искључује одговорност коју по закону није могуће искључити.",
      ],
    },
    {
      heading: "Меродавно право",
      body: [
        "На ове услове примењује се право Републике Србије. За спорове је надлежан стварно надлежни суд у Београду, без утицаја на права која потрошач има по принудним прописима своје земље пребивалишта.",
      ],
    },
    {
      heading: "Контакт",
      body: [
        `${DATA_CONTROLLER_SR}, Србија — <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>`,
      ],
    },
  ],
};

const termsEn: LegalDocument = {
  title: "Terms of Use",
  effective: "Effective: 16 August 2026",
  intro: [
    "Troškomir is intended for lawful personal finance tracking only. You are responsible for the accuracy of the data you enter and for any decisions you make based on the app’s calculations, reports or exports.",
  ],
  sections: [
    {
      heading: "Not financial or legal advice",
      body: [
        "Troškomir is a record-keeping tool. Loan schedules, budgets, statistics and currency conversions are informational and are not financial, tax, accounting or legal advice. Consult a qualified professional before acting on them.",
      ],
    },
    {
      heading: "Your account",
      body: [
        `You must be at least ${MINIMUM_AGE}. You are responsible for keeping your password and, if you enable Data Protection, your recovery code. If you lose both, encrypted content cannot be recovered — not by us either.`,
      ],
    },
    {
      heading: "Free app, voluntary donations",
      body: [
        "Troškomir is free. Where donations are offered they are voluntary and help cover running costs. Donations are accepted through the website only, and do not buy premium access, ownership or special rights.",
      ],
    },
    {
      heading: "Availability and changes",
      body: [
        'Features may change to improve the app, its security or its stability. The service is provided "as is"; uninterrupted availability and moment-to-moment accuracy cannot be guaranteed.',
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        "To the extent permitted by law, the author is not liable for indirect or consequential loss, lost profits, or data loss arising from use of the app. Nothing here excludes liability that cannot lawfully be excluded.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the law of the Republic of Serbia, with the competent court in Belgrade having jurisdiction. This does not affect mandatory consumer rights you have under the law of your country of residence.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `${DATA_CONTROLLER}, Serbia — <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>`,
      ],
    },
  ],
};

const termsRu: LegalDocument = {
  title: "Условия использования",
  effective: "Действует с: 16 августа 2026 г.",
  intro: [
    "Трошкомир предназначен только для законного учёта личных финансов. Вы отвечаете за точность вводимых данных и за решения, принятые на основе расчётов, отчётов и выгрузок приложения.",
  ],
  sections: [
    {
      heading: "Не финансовая и не юридическая консультация",
      body: [
        "Трошкомир — инструмент учёта. Графики погашения кредитов, бюджеты, статистика и конвертация валют носят информационный характер и не являются финансовой, налоговой, бухгалтерской или юридической консультацией. Перед принятием решений обратитесь к специалисту.",
      ],
    },
    {
      heading: "Ваша учётная запись",
      body: [
        `Вам должно быть не менее ${MINIMUM_AGE} лет. Вы отвечаете за сохранность пароля и, если включена защита данных, кода восстановления. Если потеряете и то и другое, зашифрованное содержимое восстановить невозможно — в том числе нам.`,
      ],
    },
    {
      heading: "Бесплатное приложение, добровольные пожертвования",
      body: [
        "Трошкомир бесплатен. Если предлагается пожертвование, оно добровольное и покрывает расходы на поддержку. Пожертвования принимаются только через сайт и не дают премиум-доступа, прав собственности или особых прав.",
      ],
    },
    {
      heading: "Доступность и изменения",
      body: [
        "Функции могут меняться ради улучшения приложения, безопасности или стабильности. Сервис предоставляется «как есть»; непрерывная доступность и точность в каждый момент не гарантируются.",
      ],
    },
    {
      heading: "Ограничение ответственности",
      body: [
        "В пределах, допускаемых законом, автор не несёт ответственности за косвенные убытки, упущенную выгоду или потерю данных вследствие использования приложения. Это не исключает ответственность, которую нельзя исключить по закону.",
      ],
    },
    {
      heading: "Применимое право",
      body: [
        "К настоящим условиям применяется право Республики Сербия; споры рассматривает компетентный суд в Белграде. Это не затрагивает императивные права потребителя по праву страны вашего проживания.",
      ],
    },
    {
      heading: "Контакт",
      body: [
        `${DATA_CONTROLLER_RU}, Сербия — <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>`,
      ],
    },
  ],
};

export const privacyPolicy: Record<Lang, LegalDocument> = {
  sr: privacyPolicySr,
  "sr-Latn": toLatinDocument(privacyPolicySr),
  en: privacyPolicyEn,
  ru: privacyPolicyRu,
};

export const termsOfUse: Record<Lang, LegalDocument> = {
  sr: termsSr,
  "sr-Latn": toLatinDocument(termsSr),
  en: termsEn,
  ru: termsRu,
};
