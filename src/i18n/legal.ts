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
  effective: "Важи од: 29. август 2026.",
  intro: [
    "Трошкомир је апликација за праћење личних финансија: трошкова, прихода, позајмица, штедње, буџета, путовања и подсетника.",
    `Руковалац подацима је ${DATA_CONTROLLER} (Србија). За сва питања о приватности пишите на <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>.`,
  ],
  sections: [
    {
      heading: "Које податке чувамо",
      bullets: [
        "Подаци о налогу: име, адреса е-поште и подаци о сесији.",
        "Финансијски записи које уносите: трошкови, приходи, позајмице, штедња, буџети, картице и записи везани за путовања.",
        "Подаци са скенираних фискалних рачуна: продавац, износ, датум и ставке рачуна.",
        "Подсетници и подешавања апликације.",
        "Технички подаци о пријављивању: IP адреса, идентификатор прегледача или уређаја (user-agent) и метаподаци уређаја.",
      ],
    },
    {
      heading: "Заштита података (шифровање с краја на крај)",
      body: [
        "Трошкомир нуди опциону заштиту података. Када је укључите, осетљива текстуална поља — описи, белешке и детаљи рачуна — шифрују се на вашем уређају пре него што стигну до сервера, алгоритмом AES-256-GCM. Кључ се изводи из ваше лозинке за заштиту података помоћу Argon2id и никада не напушта уређај. Дељење унутар домаћинства користи размену кључева X25519/HKDF.",
        "То значи да сервер те садржаје не може прочитати. Значи и да их нико, укључујући нас, не може повратити ако изгубите и лозинку и једнократни код за опоравак.",
        "Износи, датуми и веза са налогом нису шифровани на овај начин — потребни су серверу за обрачун. Заштита података је подразумевано искључена; док је искључена, сервер види све ваше уносе.",
        "Апликација чува и офлајн копију ваших података на самом телефону, како бисте их видели без интернета. Та копија је шифрована засебним кључем уређаја, а не вашом лозинком за заштиту података — што значи да остаје читљива и док је апликација закључана. Брише се при одјави и при брисању налога.",
      ],
    },
    {
      heading: "Где се подаци чувају",
      body: [
        "Сервер се налази у Србији, на приватној инфраструктури којом управља руковалац, а не у комерцијалном облаку. Комуникација иде преко HTTPS-а. Резервне копије базе су шифроване.",
      ],
    },
    {
      heading: "Услуге трећих страна",
      body: [
        "Трошкомир не користи рекламне SDK-ове нити праћење између апликација. Користи следеће услуге, свака за тачно наведену сврху:",
      ],
      bullets: [
        "Google Firebase Crashlytics — извештаји о падовима и дијагностички подаци, како би се грешке исправиле. Извештаји се шаљу компанији Google.",
        "Google Firebase Cloud Messaging — токен вашег уређаја, како бисте примали обавештења која сте укључили. Токен се шаље компанији Google.",
        `Државни фискални портали (${FISCAL_PORTALS}) — када скенирате QR код са фискалног рачуна, наш сервер у ваше име преузима садржај рачуна са портала надлежне пореске управе.`,
        "Провера рачуна код пореске управе (suf.purs.gov.rs) — ако одлучите да проверите скенирани рачун, апликација отвара званичну страницу пореске управе за проверу директно на вашем уређају, у правом прегледачу, и попуњава број рачуна, контролни број, износ и датум/време које је већ прочитала са вашег скенирања. Ова веза иде директно између вашег уређаја и пореске управе; наш сервер у томе не учествује нити је види.",
        "EU VIES (ec.europa.eu) — када грчки рачун нема назив продавца, тражимо порески број (ΑΦΜ) на европском VIES сервису да бисмо добили званичан назив предузећа.",
        "Hugging Face — једнократно преузимање датотеке модела ако укључите обраду рачуна на уређају. Сам модел затим ради локално; слике рачуна се не шаљу никоме.",
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
        "Технички подаци о пријављивању (IP адреса, user-agent): 90 дана.",
        "Кључеви идемпотентности захтева, укључујући садржај одговора: 7 дана.",
        "Извештаји о падовима: према правилима задржавања услуге Firebase Crashlytics.",
      ],
    },
    {
      heading: "Брисање налога",
      body: [
        `Налог можете обрисати из саме апликације или преко веб странице <a href="${DELETE_ACCOUNT_URL}">${DELETE_ACCOUNT_URL}</a>. Затражићемо потврду кодом послатим на вашу адресу е-поште.`,
        "Брисање уклања ваш налог и све финансијске записе везане за њега, ваше чланство у домаћинствима, сачуване одговоре на захтеве и техничке записе о пријављивању. Брисање је трајно и не може се опозвати.",
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
        `${DATA_CONTROLLER}, Србија — <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>`,
      ],
    },
  ],
};

const privacyPolicyEn: LegalDocument = {
  title: "Privacy Policy",
  effective: "Effective: 29 August 2026",
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
        "Technical sign-in records: IP address, user-agent and device metadata.",
      ],
    },
    {
      heading: "Data Protection (end-to-end encryption)",
      body: [
        "Troškomir offers optional Data Protection. With it on, sensitive text fields — descriptions, notes and receipt details — are encrypted on your device with AES-256-GCM before they reach the server. The key is derived from your Data Protection password using Argon2id and never leaves the device. Household sharing uses X25519/HKDF key exchange.",
        "This means the server cannot read that content. It also means nobody, including us, can recover it if you lose both your password and your one-time recovery code.",
        "Amounts, dates and the link to your account are not encrypted this way — the server needs them to calculate. Data Protection is off by default; while it is off, the server can see everything you enter.",
        "The app also keeps an offline copy of your data on the phone itself, so you can read it with no connection. That copy is encrypted under a separate device key rather than your Data Protection password — which means it stays readable while the app is locked. It is erased on logout and on account deletion.",
      ],
    },
    {
      heading: "Where data is stored",
      body: [
        "The server is in Serbia, on private infrastructure run by the controller rather than a commercial cloud. Traffic uses HTTPS. Database backups are encrypted.",
      ],
    },
    {
      heading: "Third-party services",
      body: [
        "Troškomir uses no advertising SDKs and no cross-app tracking. It does use the following services, each for exactly the stated purpose:",
      ],
      bullets: [
        "Google Firebase Crashlytics — crash reports and diagnostic data, so faults can be fixed. Reports go to Google.",
        "Google Firebase Cloud Messaging — your device push token, so you can receive the notifications you enable. The token goes to Google.",
        `Government fiscal portals (${FISCAL_PORTALS}) — when you scan a receipt QR code, our server fetches the receipt contents from the relevant tax authority's portal on your behalf.`,
        "Tax authority receipt verification (suf.purs.gov.rs) — if you choose to verify a scanned receipt, the app opens the tax authority's own verification page directly on your device, in a real browser view, and fills in the invoice number, control number, amount and date/time already read from your scan. This connection runs directly between your device and the tax authority; our server is not involved in it and does not see it.",
        "EU VIES (ec.europa.eu) — when a Greek receipt has no seller name, we look up the tax number (ΑΦΜ) on the European VIES service to get the official company name.",
        "Hugging Face — a one-time model file download if you enable on-device receipt processing. The model then runs locally; receipt images are not sent anywhere.",
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
        "Technical sign-in records (IP address, user-agent): 90 days.",
        "Request idempotency keys, including response bodies: 7 days.",
        "Crash reports: per Firebase Crashlytics retention.",
      ],
    },
    {
      heading: "Deleting your account",
      body: [
        `You can delete your account from inside the app or on the web at <a href="${DELETE_ACCOUNT_URL}">${DELETE_ACCOUNT_URL}</a>. We confirm with a code sent to your e-mail address.`,
        "Deletion removes your account and every financial record attached to it, your household memberships, stored request responses and technical sign-in records. It is permanent and cannot be undone.",
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
  effective: "Действует с: 29 августа 2026 г.",
  intro: [
    "Трошкомир — приложение для учёта личных финансов: расходов, доходов, займов, накоплений, бюджетов, поездок и напоминаний.",
    `Оператор данных — ${DATA_CONTROLLER} (Сербия). По любым вопросам о конфиденциальности пишите на <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>.`,
  ],
  sections: [
    {
      heading: "Какие данные мы храним",
      bullets: [
        "Данные учётной записи: имя, адрес электронной почты и данные сессии.",
        "Финансовые записи, которые вы вводите: расходы, доходы, займы, накопления, бюджеты, карты и записи о поездках.",
        "Данные отсканированных фискальных чеков: продавец, сумма, дата и позиции чека.",
        "Напоминания и настройки приложения.",
        "Технические записи о входе: IP-адрес, user-agent и метаданные устройства.",
      ],
    },
    {
      heading: "Защита данных (сквозное шифрование)",
      body: [
        "В Трошкомире есть необязательная защита данных. Когда она включена, чувствительные текстовые поля — описания, заметки и детали чеков — шифруются на вашем устройстве алгоритмом AES-256-GCM до отправки на сервер. Ключ выводится из вашего пароля защиты данных с помощью Argon2id и никогда не покидает устройство. Совместный доступ в рамках домохозяйства использует обмен ключами X25519/HKDF.",
        "Это значит, что сервер не может прочитать это содержимое. Это также значит, что никто, включая нас, не сможет его восстановить, если вы потеряете и пароль, и одноразовый код восстановления.",
        "Суммы, даты и привязка к учётной записи так не шифруются — они нужны серверу для расчётов. Защита данных выключена по умолчанию; пока она выключена, сервер видит всё, что вы вводите.",
        "Приложение также хранит офлайн-копию ваших данных на самом телефоне, чтобы вы могли читать их без интернета. Эта копия зашифрована отдельным ключом устройства, а не паролем защиты данных — то есть остаётся читаемой, пока приложение заблокировано. Она удаляется при выходе из аккаунта и при удалении аккаунта.",
      ],
    },
    {
      heading: "Где хранятся данные",
      body: [
        "Сервер находится в Сербии, на частной инфраструктуре оператора, а не в коммерческом облаке. Трафик идёт по HTTPS. Резервные копии базы данных зашифрованы.",
      ],
    },
    {
      heading: "Сторонние сервисы",
      body: [
        "Трошкомир не использует рекламные SDK и межприложенческое отслеживание. Он использует следующие сервисы, каждый строго для указанной цели:",
      ],
      bullets: [
        "Google Firebase Crashlytics — отчёты о сбоях и диагностические данные для исправления ошибок. Отчёты отправляются в Google.",
        "Google Firebase Cloud Messaging — push-токен вашего устройства, чтобы вы получали включённые вами уведомления. Токен отправляется в Google.",
        `Государственные фискальные порталы (${FISCAL_PORTALS}) — при сканировании QR-кода чека наш сервер по вашему поручению получает содержимое чека с портала соответствующей налоговой службы.`,
        "Проверка чека в налоговой службе (suf.purs.gov.rs) — если вы решите проверить отсканированный чек, приложение открывает официальную страницу проверки налоговой службы прямо на вашем устройстве, в настоящем браузере, и заполняет номер чека, контрольный номер, сумму и дату/время, уже считанные с вашего скана. Это соединение идёт напрямую между вашим устройством и налоговой службой; наш сервер в этом не участвует и его не видит.",
        "EU VIES (ec.europa.eu) — если на греческом чеке нет названия продавца, мы запрашиваем налоговый номер (ΑΦΜ) в европейском сервисе VIES, чтобы получить официальное название компании.",
        "Hugging Face — однократная загрузка файла модели, если вы включите обработку чеков на устройстве. Далее модель работает локально; изображения чеков никуда не отправляются.",
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
        "Технические записи о входе (IP-адрес, user-agent): 90 дней.",
        "Ключи идемпотентности запросов, включая тела ответов: 7 дней.",
        "Отчёты о сбоях: согласно срокам хранения Firebase Crashlytics.",
      ],
    },
    {
      heading: "Удаление учётной записи",
      body: [
        `Учётную запись можно удалить из приложения или на сайте: <a href="${DELETE_ACCOUNT_URL}">${DELETE_ACCOUNT_URL}</a>. Мы подтверждаем удаление кодом, отправленным на вашу почту.`,
        "Удаление убирает вашу учётную запись и все связанные с ней финансовые записи, членство в домохозяйствах, сохранённые ответы на запросы и технические записи о входе. Это необратимо.",
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
        `${DATA_CONTROLLER}, Сербия — <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>`,
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
        `${DATA_CONTROLLER}, Србија — <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>`,
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
        `${DATA_CONTROLLER}, Сербия — <a href="mailto:${PRIVACY_CONTACT_EMAIL}">${PRIVACY_CONTACT_EMAIL}</a>`,
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
