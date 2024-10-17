/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
/// FREE < GENERAL <  HRJUNIOR<  GENERAL<  CREATOR<  PREMIUM,< ULTRA
exports.LEVEL_PLAN = ['FREE', 'GENERAL', 'HRJUNIOR', 'HR', 'CREATOR', 'PREMIUM', 'ULTRA'];
exports.TIME_ZONE_DEFAULT = 'Asia/Ho_Chi_Minh';
exports.LANGUAGE_NAME = 'vi';
exports.STATUS = {
    100: 'WaitingAccepted', // Draft -> WaitingAccepted -> Active
    200: 'Active', // Published
    300: 'Inactive', // Unpublished
    400: 'Draft', // Draft
};
exports.IS_DELETED = {
    200: 'No', // deleted yet
    300: 'Yes', // deleted
};
// System lại tài khoản hệ thống sử dụng staff
// Regular tài khoản khách hàng
exports.USER_TYPE = ['System', 'Regular', 'Guest'];
exports.IS_SYSTEM = ['No', 'Yes'];
exports.YES_NO = ['Yes', 'No'];
exports.SEX = ['Male', 'Female', 'Other'];
exports.TYPE = ['Text', 'Radio', 'Checkbox', 'Select', 'Textarea', 'Date', 'Number'];
exports.THREAD_MODE = ['gpt-3.5-turbo', 'gpt-4'];
exports.THREAD_TYPE = ['Prompts', 'Images', 'Docs'];
exports.TAG_TYPE = ['Docs', 'FavoriteHistories', 'collections', 'prompts', 'prompt_workflows', 'assistants'];
exports.FEATURE_TYPE = ['text_to_speech', 'slide'];
exports.FEATURE_PROVIDE = ['google', 'azure', 'chatgpt', 'slide', 'elevenLabs'];
exports.FEATURE_PRICE_TYPE = ['regular', 'bonus'];
exports.MODEL_TYPE = {
    100: 'prompts',
    200: 'prompt_collections',
    300: 'prompt_workflows',
    400: 'chatgpts',
};
exports.MASSAGES_ROLE = ['system', 'assistant', 'user', 'function'];
exports.SIZE_IMAGE = {
    vertical: '1024x1792',
    square: '1024x1024',
    horizontal: '1792x1024',
};
exports.TRANSACTION_OPTION = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
};
exports.TYPE_COMMENT = ['assistants'];
exports.EXPIRES_FORGOT_PASSWORD = 15;
exports.SECRET_LOGIN = 'c2VjcmV0QDIwMjQ'; // secret@2024
exports.SECRET = 'gmoEnplusHR@2022';
exports.PROMPT_USER_ACTION = {
    100: 'View',
    200: 'Vote',
    300: 'Favorite',
};
exports.IS_YES = { 200: 'No', 300: 'Yes' };
exports.CONFIG_CODES = {
    100: 'AIVA001', 200: 'AIVA002', 300: 'AIVA003', 400: 'AIVA004', 500: 'AIVA005',
};
exports.PAYMENT_TYPE = ['Cash', 'Transfer', 'ScanQRcode', 'VnPay', 'OnePay']; // Transfer chuyển khoản, ScanQRcode quét mã QR
exports.TYPE_OPTION = ['default', 'addon', 'features']; // default mặc định theo gói, addon: bổ sung, features chức năng mới
exports.LANGUAGES = {
    vi: 'Tiếng Việt',
    en: 'English',
    zh: '中文',
    ja: '日本語',
    ar: 'العربية',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    hi: 'हिन्दी',
    it: 'Italiano',
    ko: '한국어',
    pt: 'Português',
    ru: 'Русский',
    th: 'ไทย',
    tr: 'Türkçe',
    af: 'Afrikaans',
    am: 'አማርኛ',
    az: 'Azərbaycan dili',
    be: 'Беларуская',
    bg: 'Български',
    bn: 'বাংলা',
    bs: 'Bosanski',
    ca: 'Català',
    ceb: 'Cebuano',
    co: 'Corsu',
    cs: 'Čeština',
    cy: 'Cymraeg',
    da: 'Dansk',
    el: 'Ελληνικά',
    eo: 'Esperanto',
    et: 'Eesti',
    eu: 'Euskara',
    fa: 'فارسی',
    fi: 'Suomi',
    ga: 'Gaeilge',
    gd: 'Gàidhlig',
    gl: 'Galego',
    gu: 'ગુજરાતી',
    ha: 'Hausa',
    haw: 'ʻŌlelo Hawaiʻi',
    he: 'עִבְרִית',
    hr: 'Hrvatski',
    ht: 'Kreyòl Ayisyen',
    hu: 'Magyar',
    hy: 'Հայերեն',
    id: 'Bahasa Indonesia',
    ig: 'Igbo',
    is: 'Íslenska',
    jv: 'Basa Jawa',
    ka: 'ქართული',
    kk: 'Қазақ тілі',
    km: 'ភាសាខ្មែរ',
    kn: 'ಕನ್ನಡ',
    ku: 'Kurdî',
    ky: 'Кыргызча',
    lb: 'Lëtzebuergesch',
    lo: 'ລາວ',
    lt: 'Lietuvių',
    lv: 'Latviešu',
    mg: 'Malagasy',
    mi: 'Māori',
    mk: 'Македонски',
    ml: 'മലയാളം',
    mn: 'Монгол',
    mr: 'मराठी',
    ms: 'Bahasa Melayu',
    mt: 'Malti',
    my: 'မြန်မာ',
    ne: 'नेपाली',
    nl: 'Nederlands',
    no: 'Norsk',
    ny: 'ChiCheŵa',
    pa: 'ਪੰਜਾਬੀ',
    pl: 'Polski',
    ps: 'پښتو',
    ro: 'Română',
    sd: 'سنڌي',
    si: 'සිංහල',
    sk: 'Slovenčina',
    sl: 'Slovenščina',
    sm: 'Gagana Samoa',
    sn: 'ChiShona',
    so: 'Soomaali',
    sq: 'Shqip',
    sr: 'Српски',
    st: 'Sesotho',
    su: 'Basa Sunda',
    sv: 'Svenska',
    sw: 'Kiswahili',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    tg: 'Тоҷикӣ',
    tk: 'Türkmençe',
    tl: 'Filipino',
    tt: 'Татарча',
    ug: 'ئۇيغۇرچە',
    uk: 'Українська',
    ur: 'اردو',
    uz: "O'zbekcha",
    xh: 'isiXhosa',
    yi: 'ייִדיש',
    yo: 'Èdè Yorùbá',
    zu: 'isiZulu',
};
exports.GLOBAL_LANGUAGES = {
    vi: 'Vietnam',
    en: 'English',
    zh: 'China',
    ja: 'Japan',
    ar: 'Saudi Arabia',
    es: 'Spain',
    fr: 'France',
    de: 'Germany',
    hi: 'India',
    it: 'Italy',
    ko: 'South Korea',
    pt: 'Portugal',
    ru: 'Russia',
    th: 'Thailand',
    tr: 'Turkey',
    af: 'South Africa',
    am: 'Ethiopia',
    az: 'Azerbaijan',
    be: 'Belarus',
    bg: 'Bulgaria',
    bn: 'Bangladesh',
    bs: 'Bosnia and Herzegovina',
    ca: 'Catalonia',
    ceb: 'Philippines',
    co: 'Corsica',
    cs: 'Czech Republic',
    cy: 'Wales',
    da: 'Denmark',
    el: 'Greece',
    eo: 'International',
    et: 'Estonia',
    eu: 'Basque Country',
    fa: 'Iran',
    fi: 'Finland',
    ga: 'Ireland',
    gd: 'Scotland',
    gl: 'Galicia',
    gu: 'Gujarat',
    ha: 'Nigeria',
    haw: 'Hawaii',
    he: 'Israel',
    hr: 'Croatia',
    ht: 'Haiti',
    hu: 'Hungary',
    hy: 'Armenia',
    id: 'Indonesia',
    ig: 'Nigeria',
    is: 'Iceland',
    jv: 'Java',
    ka: 'Georgia',
    kk: 'Kazakhstan',
    km: 'Cambodia',
    kn: 'Karnataka',
    ku: 'Kurdistan',
    ky: 'Kyrgyzstan',
    lb: 'Luxembourg',
    lo: 'Laos',
    lt: 'Lithuania',
    lv: 'Latvia',
    mg: 'Madagascar',
    mi: 'New Zealand',
    mk: 'North Macedonia',
    ml: 'Kerala',
    mn: 'Mongolia',
    mr: 'Maharashtra',
    ms: 'Malaysia',
    mt: 'Malta',
    my: 'Myanmar',
    ne: 'Nepal',
    nl: 'Netherlands',
    no: 'Norway',
    ny: 'Malawi',
    pa: 'Punjab',
    pl: 'Poland',
    ps: 'Afghanistan',
    ro: 'Romania',
    sd: 'Sindh',
    si: 'Sri Lanka',
    sk: 'Slovakia',
    sl: 'Slovenia',
    sm: 'Samoa',
    sn: 'Zimbabwe',
    so: 'Somalia',
    sq: 'Albania',
    sr: 'Serbia',
    st: 'Lesotho',
    su: 'West Java',
    sv: 'Sweden',
    sw: 'Tanzania',
    ta: 'Tamil Nadu',
    te: 'Andhra Pradesh',
    tg: 'Tajikistan',
    tk: 'Turkmenistan',
    tl: 'Philippines',
    tt: 'Tatarstan',
    ug: 'Xinjiang',
    uk: 'Ukraine',
    ur: 'Pakistan',
    uz: 'Uzbekistan',
    xh: 'South Africa',
    yi: 'Jewish diaspora',
    yo: 'Nigeria',
    zu: 'South Africa',
};
exports.GLOBAL_LANGUAGE_CODE = {
    vi: 'vi-VN', // Vietnamese (Vietnam)
    en: 'en-GB', // English (United Kingdom)
    zh: 'zh-CN', // Chinese (China)
    ja: 'ja-JP', // Japanese (Japan)
    ar: 'ar-SA', // Arabic (Saudi Arabia)
    es: 'es-ES', // Spanish (Spain)
    fr: 'fr-FR', // French (France)
    de: 'de-DE', // German (Germany)
    hi: 'hi-IN', // Hindi (India)
    it: 'it-IT', // Italian (Italy)
    ko: 'ko-KR', // Korean (South Korea)
    pt: 'pt-PT', // Portuguese (Portugal)
    ru: 'ru-RU', // Russian (Russia)
    th: 'th-TH', // Thai (Thailand)
    tr: 'tr-TR', // Turkish (Turkey)
    af: 'af-ZA', // Afrikaans (South Africa)
    am: 'am-ET', // Amharic (Ethiopia)
    az: 'az-AZ', // Azerbaijani (Azerbaijan)
    be: 'be-BY', // Belarusian (Belarus)
    bg: 'bg-BG', // Bulgarian (Bulgaria)
    bn: 'bn-BD', // Bengali (Bangladesh)
    bs: 'bs-BA', // Bosnian (Bosnia and Herzegovina)
    ca: 'ca-ES', // Catalan (Spain)
    ceb: 'ceb-PH', // Cebuano (Philippines)
    co: 'co-FR', // Corsican (France)
    cs: 'cs-CZ', // Czech (Czech Republic)
    cy: 'cy-GB', // Welsh (United Kingdom)
    da: 'da-DK', // Danish (Denmark)
    el: 'el-GR', // Greek (Greece)
    eo: 'eo-001', // Esperanto (World)
    et: 'et-EE', // Estonian (Estonia)
    eu: 'eu-ES', // Basque (Spain)
    fa: 'fa-IR', // Persian (Iran)
    fi: 'fi-FI', // Finnish (Finland)
    ga: 'ga-IE', // Irish (Ireland)
    gd: 'gd-GB', // Scottish Gaelic (United Kingdom)
    gl: 'gl-ES', // Galician (Spain)
    gu: 'gu-IN', // Gujarati (India)
    ha: 'ha-NG', // Hausa (Nigeria)
    haw: 'haw-US', // Hawaiian (United States)
    he: 'he-IL', // Hebrew (Israel)
    hr: 'hr-HR', // Croatian (Croatia)
    ht: 'ht-HT', // Haitian Creole (Haiti)
    hu: 'hu-HU', // Hungarian (Hungary)
    hy: 'hy-AM', // Armenian (Armenia)
    id: 'id-ID', // Indonesian (Indonesia)
    ig: 'ig-NG', // Igbo (Nigeria)
    is: 'is-IS', // Icelandic (Iceland)
    jv: 'jv-ID', // Javanese (Indonesia)
    ka: 'ka-GE', // Georgian (Georgia)
    kk: 'kk-KZ', // Kazakh (Kazakhstan)
    km: 'km-KH', // Khmer (Cambodia)
    kn: 'kn-IN', // Kannada (India)
    ku: 'ku-TR', // Kurdish (Turkey)
    ky: 'ky-KG', // Kyrgyz (Kyrgyzstan)
    lb: 'lb-LU', // Luxembourgish (Luxembourg)
    lo: 'lo-LA', // Lao (Laos)
    lt: 'lt-LT', // Lithuanian (Lithuania)
    lv: 'lv-LV', // Latvian (Latvia)
    mg: 'mg-MG', // Malagasy (Madagascar)
    mi: 'mi-NZ', // Maori (New Zealand)
    mk: 'mk-MK', // Macedonian (North Macedonia)
    ml: 'ml-IN', // Malayalam (India)
    mn: 'mn-MN', // Mongolian (Mongolia)
    mr: 'mr-IN', // Marathi (India)
    ms: 'ms-MY', // Malay (Malaysia)
    mt: 'mt-MT', // Maltese (Malta)
    my: 'my-MM', // Burmese (Myanmar)
    ne: 'ne-NP', // Nepali (Nepal)
    nl: 'nl-NL', // Dutch (Netherlands)
    no: 'no-NO', // Norwegian (Norway)
    ny: 'ny-MW', // Chichewa (Malawi)
    pa: 'pa-IN', // Punjabi (India)
    pl: 'pl-PL', // Polish (Poland)
    ps: 'ps-AF', // Pashto (Afghanistan)
    ro: 'ro-RO', // Romanian (Romania)
    sd: 'sd-PK', // Sindhi (Pakistan)
    si: 'si-LK', // Sinhala (Sri Lanka)
    sk: 'sk-SK', // Slovak (Slovakia)
    sl: 'sl-SI', // Slovenian (Slovenia)
    sm: 'sm-WS', // Samoan (Samoa)
    sn: 'sn-ZW', // Shona (Zimbabwe)
    so: 'so-SO', // Somali (Somalia)
    sq: 'sq-AL', // Albanian (Albania)
    sr: 'sr-RS', // Serbian (Serbia)
    st: 'st-LS', // Sesotho (Lesotho)
    su: 'su-ID', // Sundanese (Indonesia)
    sv: 'sv-SE', // Swedish (Sweden)
    sw: 'sw-TZ', // Swahili (Tanzania)
    ta: 'ta-IN', // Tamil (India)
    te: 'te-IN', // Telugu (India)
    tg: 'tg-TJ', // Tajik (Tajikistan)
    tk: 'tk-TM', // Turkmen (Turkmenistan)
    tl: 'tl-PH', // Filipino (Philippines)
    tt: 'tt-RU', // Tatar (Russia)
    ug: 'ug-CN', // Uyghur (China)
    uk: 'uk-UA', // Ukrainian (Ukraine)
    ur: 'ur-PK', // Urdu (Pakistan)
    uz: 'uz-UZ', // Uzbek (Uzbekistan)
    xh: 'xh-ZA', // Xhosa (South Africa)
    yi: 'yi-001', // Yiddish (World)
    yo: 'yo-NG', // Yoruba (Nigeria)
    zu: 'zu-ZA', // Zulu (South Africa)
};
exports.ACCENT_LANGUAGE = {
    vi: 'Vietnamese',
    en: 'English',
    zh: 'Chinese',
    ja: 'Japanese',
    ar: 'Arabic',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    hi: 'Hindi',
    it: 'Italian',
    ko: 'Korean',
    pt: 'Portuguese',
    ru: 'Russian',
    th: 'Thai',
    tr: 'Turkish',
    af: 'Afrikaans',
    am: 'Amharic',
    az: 'Azerbaijani',
    be: 'Belarusian',
    bg: 'Bulgarian',
    bn: 'Bengali',
    bs: 'Bosnian',
    ca: 'Catalan',
    ceb: 'Cebuano',
    co: 'Corsican',
    cs: 'Czech',
    cy: 'Welsh',
    da: 'Danish',
    el: 'Greek',
    eo: 'Esperanto',
    et: 'Estonian',
    eu: 'Basque',
    fa: 'Persian',
    fi: 'Finnish',
    ga: 'Irish',
    gd: 'Scottish Gaelic',
    gl: 'Galician',
    gu: 'Gujarati',
    ha: 'Hausa',
    haw: 'Hawaiian',
    he: 'Hebrew',
    hr: 'Croatian',
    ht: 'Haitian Creole',
    hu: 'Hungarian',
    hy: 'Armenian',
    id: 'Indonesian',
    ig: 'Igbo',
    is: 'Icelandic',
    jv: 'Javanese',
    ka: 'Georgian',
    kk: 'Kazakh',
    km: 'Khmer',
    kn: 'Kannada',
    ku: 'Kurdish',
    ky: 'Kyrgyz',
    lb: 'Luxembourgish',
    lo: 'Lao',
    lt: 'Lithuanian',
    lv: 'Latvian',
    mg: 'Malagasy',
    mi: 'Maori',
    mk: 'Macedonian',
    ml: 'Malayalam',
    mn: 'Mongolian',
    mr: 'Marathi',
    ms: 'Malay',
    mt: 'Maltese',
    my: 'Burmese',
    ne: 'Nepali',
    nl: 'Dutch',
    no: 'Norwegian',
    ny: 'Chichewa',
    pa: 'Punjabi',
    pl: 'Polish',
    ps: 'Pashto',
    ro: 'Romanian',
    sd: 'Sindhi',
    si: 'Sinhala',
    sk: 'Slovak',
    sl: 'Slovenian',
    sm: 'Samoan',
    sn: 'Shona',
    so: 'Somali',
    sq: 'Albanian',
    sr: 'Serbian',
    st: 'Sesotho',
    su: 'Sundanese',
    sv: 'Swedish',
    sw: 'Swahili',
    ta: 'Tamil',
    te: 'Telugu',
    tg: 'Tajik',
    tk: 'Turkmen',
    tl: 'Filipino',
    tt: 'Tatar',
    ug: 'Uyghur',
    uk: 'Ukrainian',
    ur: 'Urdu',
    uz: 'Uzbek',
    xh: 'Xhosa',
    yi: 'Yiddish',
    yo: 'Yoruba',
    zu: 'Zulu',
};
exports.TRANSACTION_OPTION = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
};
exports.NOTIFICATION_STATUS = ['Readed', 'Deleted'];
/**
  * CreateOrder: Tạo đơn hàng
  * CreateAddonOrder: Tạo đơn hàng mua addon
  * ApprovedUpgradeOrder: Đơn hàng được kích hoạt - nâng cấp
  * ApprovedExtendOrder: Đơn hàng được kích hoạt - gia hạn
  * ApprovedAddonOrder: Đơn hàng được kích hoạt - mua credit ngoài gói
  * Affiliates: Cộng tác viên
  * Voucher: Có voucher/ coupon mới
  * Remind: Nhắc gia hạn/ Nâng cấp gói
  * ActiveCode: Sử dụng mã kích hoạt
  * Points: Tích điểm thưởng
 */
exports.NOTIFICATION_TYPE = ['CreateOrder', 'CreateAddonOrder', 'ApprovedUpgradeOrder', 'ApprovedExtendOrder',
    'ApprovedAddonOrder', 'Affiliates', 'Voucher', 'Remind', 'ActiveCode', 'Points', 'ActiveOrder', 'CreateFeatureOrder'];

exports.TYPE_POINT = {
    VISIT_DAILY: 1, // Truy cập hàng ngày
    USE_ONE_ASSISTANCE_ONCE_A_DAY: 1, // Sử dụng một trợ lý/ ngày
    USE_TWO_ASSISTANCE_DURING_THE_DAY: 3, // Sử dụng 5 trợ lý trong ngày
    RECOMMEND_TO_A_FRIEND: 5, // Giới thiệu cho 1 người bạn
    RECOMMEND_ONE_PERSON_TO_BUY_THE_ULTRA_PACKAGE: 10, // Giới thiệu  một người mua gói Ultra
    USED_THE_FIRST_WORK_FLOWER: 5, // Sử dụng 1 lần lam viec một người
    USED_THE_FIRST_AIVA_DOC: 5, // Sử dụng aiva doc lần đầu tiên
    USED_THE_FIRST_AIVA_IMAGE: 5, // Sử dụng aiva image lần đầu tiên
    CREATE_BRAND_VOICE: 5, // Tạo brand voice lần đâu tiên
    CREATE_DATASET: 5, // Tạo dataset lần đâu tiên
    THE_FIRST_LIKE_PROMPT: 5, // Lần đâu tiên yêu thích trợ lý
    THE_FIRST_SHARE_THREAD: 5, // Lần đâu tiên chia sẻ luồng chat
    THE_FIRST_MASSAGES: 5, // Lần đâu tiên chia sẻ nội dung chat
};

exports.LIST_BANK = {
    ABBANK: 'Ngân hàng thương mại cổ phần An Bình (ABBANK)',
    ACB: 'Ngân hàng ACB',
    AGRIBANK: 'Ngân hàng Nông nghiệp (Agribank)',
    BACABANK: 'Ngân Hàng TMCP Bắc Á',
    BIDV: 'Ngân hàng đầu tư và phát triển Việt Nam (BIDV)',
    DONGABANK: 'Ngân hàng Đông Á (DongABank)',
    EXIMBANK: 'Ngân hàng EximBank',
    HDBANK: 'Ngan hàng HDBank',
    IVB: 'Ngân hàng TNHH Indovina (IVB)',
    MBBANK: 'Ngân hàng thương mại cổ phần Quân đội',
    MSBANK: 'Ngân hàng Hàng Hải (MSBANK)',
    NAMABANK: 'Ngân hàng Nam Á (NamABank)',
    NCB: 'Ngân hàng Quốc dân (NCB)',
    OCB: 'Ngân hàng Phương Đông (OCB)',
    OJB: 'Ngân hàng Đại Dương (OceanBank)',
    PVCOMBANK: 'Ngân hàng TMCP Đại Chúng Việt Nam',
    SACOMBANK: 'Ngân hàng TMCP Sài Gòn Thương Tín (SacomBank)',
    SAIGONBANK: 'Ngân hàng thương mại cổ phần Sài Gòn Công Thương',
    SCB: 'Ngân hàng TMCP Sài Gòn (SCB)',
    SHB: 'Ngân hàng Thương mại cổ phần Sài Gòn - Hà Nội(SHB)',
    TECHCOMBANK: 'Ngân hàng Kỹ thương Việt Nam (TechcomBank)',
    TPBANK: 'Ngân hàng Tiên Phong (TPBank)',
    VPBANK: 'Ngân hàng Việt Nam Thịnh vượng (VPBank)',
    SEABANK: 'Ngân Hàng TMCP Đông Nam Á',
    VIB: 'Ngân hàng Thương mại cổ phần Quốc tế Việt Nam (VIB)',
    VIETABANK: 'Ngân hàng TMCP Việt Á',
    VIETBANK: 'Ngân hàng thương mại cổ phần Việt Nam Thương Tín',
    VIETCAPITALBANK: 'Ngân Hàng Bản Việt',
    VIETCOMBANK: 'Ngân hàng Ngoại thương (Vietcombank)',
    VIETINBANK: 'Ngân hàng Công thương (Vietinbank)',
    BIDC: 'Ngân Hàng BIDC',
    LAOVIETBANK: 'NGÂN HÀNG LIÊN DOANH LÀO - VIỆT',
    WOORIBANK: 'Ngân hàng TNHH MTV Woori Việt Nam',
    AMEX: 'American Express',
    VISA: 'Thẻ quốc tế Visa',
    MASTERCARD: 'Thẻ quốc tế MasterCard',
    JCB: 'Thẻ quốc tế JCB',
    UPI: 'UnionPay International',
    VNMART: 'Ví điện tử VnMart',
    VNPAYQR: 'Cổng thanh toán VNPAYQR',
    ONEPAY: 'Ví điện tử OnePay',
    FOXPAY: 'Ví điện tử FOXPAY',
    VIMASS: 'Ví điện tử Vimass',
    VINID: 'Ví điện tử VINID',
    VIVIET: 'Ví điện tử Ví Việt',
    VNPTPAY: 'Ví điện tử VNPTPAY',
    YOLO: 'Ví điện tử YOLO',
};
