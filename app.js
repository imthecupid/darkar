const main = document.getElementById("main")
const modalRoot = document.getElementById("modalRoot")

const FX_USD_PER = {
  USD: 1,
  EUR: 1.08,
  SYP: 0.000077,
}

const toUsd = (amount, currency) => {
  const n = Number(amount)
  const rate = FX_USD_PER[currency] ?? 1
  return n * rate
}

const fromUsd = (amountUsd, currency) => {
  const n = Number(amountUsd)
  const rate = FX_USD_PER[currency] ?? 1
  return n / rate
}

const normalizeCurrency = (c, fallback = "USD") => {
  const clean = String(c ?? "").trim().toUpperCase()
  if (FX_USD_PER[clean]) return clean
  if (clean === "US DOLLAR" || clean === "DOLLAR" || clean === "$") return "USD"
  if (clean === "SYRIAN POUND" || clean === "SYRIAN POUNDS" || clean === "SYRIAN LIRA" || clean === "ليرة سورية") return "SYP"
  if (clean === "EURO" || clean === "€") return "EUR"
  return fallback
}

const uid = () => {
  const s = crypto.getRandomValues(new Uint32Array(3))
  return `${s[0].toString(16)}${s[1].toString(16)}${s[2].toString(16)}`
}

const clampInt = (v) => {
  const n = Number.parseInt(String(v ?? ""), 10)
  return Number.isFinite(n) ? n : undefined
}

const clampNum = (v) => {
  const n = Number.parseFloat(String(v ?? "").replace(",", "."))
  return Number.isFinite(n) ? n : undefined
}

const imgUrl = (prompt, imageSize = "landscape_16_9") => {
  const encoded = encodeURIComponent(prompt)
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encoded}&image_size=${imageSize}`
}

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return fallback
      return JSON.parse(raw)
    } catch {
      return fallback
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
}

const KEYS = {
  users: "hh_users",
  session: "hh_session",
  listings: "hh_listings",
  favorites: "hh_favorites",
  threads: "hh_threads",
  messages: "hh_messages",
  prefs: "hh_prefs",
}

const DEFAULT_PREFS = {
  lang: "en",
  currency: "USD",
}

const getPrefs = () => {
  const raw = store.get(KEYS.prefs, DEFAULT_PREFS)
  const lang = raw?.lang === "ar" ? "ar" : "en"
  const currency = raw?.currency === "EUR" || raw?.currency === "SYP" ? raw.currency : "USD"
  return { lang, currency }
}

const setPrefs = (next) => {
  store.set(KEYS.prefs, { ...getPrefs(), ...next })
}

const DICT = {
  en: {
    explore: "Explore",
    search: "Search",
    sell: "Sell",
    saved: "Saved",
    inquiries: "Messages",
    account: "Account",
    language: "Language",
    currency: "Currency",
    hi: "Hi",
    englishLang: "English",
    arabicLang: "Arabic",
    usd: "US Dollar",
    eur: "Euro",
    syp: "Syrian Pound",
    seller: "Seller",
    bioLabel: "Public bio",
    profilePhoto: "Profile photo",
    uploadPhoto: "Upload photo",
    removePhoto: "Remove photo",
    photoTooLarge: "Please choose an image under 1MB.",
    listingPhotos: "Photos",
    uploadListingPhotos: "Upload photos",
    photosRequired: "Please upload at least 1 photo.",
    bioPlaceholder: "Add a phone number or any contact info you want to share publicly…",
    bioEmpty: "No contact info provided.",
    saveBio: "Save bio",
    listProperty: "List a property",
    applyFilters: "Apply filters",
    reset: "Reset",
    back: "Back",
    save: "Save",
    savedBtn: "Saved",
    savedToFavorites: "Saved to favorites",
    removedFromFavorites: "Removed from favorites",
    messageSeller: "Message seller",
    messageSellerTo: "Message {name}",
    sortBy: "Sort by",
    sortLowHigh: "Cheapest first",
    sortHighLow: "Most expensive first",
    sortNewest: "Newest first",
    sortOldest: "Oldest first",
    results: "results",
    messageSent: "Message sent",
    send: "Send",
    sendMessage: "Send message",
    reply: "Reply",
    loginToContinue: "Log in to continue",
    login: "Log in",
    continueWithGoogle: "Continue with Google",
    continueWithFacebook: "Continue with Facebook",
    signupQuick: "Quick sign up",
    cancel: "Cancel",
    close: "Close",
    apply: "Apply",
    signUp: "Sign up",
    welcome: "Welcome",
    loggedIn: "Logged in",
    logOut: "Log out",
    email: "Email",
    password: "Password",
    name: "Name",
    goToAccount: "Go to account",
    newUserName: "New user",
    couldNotLogin: "Could not log in.",
    couldNotSignUp: "Could not sign up.",
    couldNotSend: "Could not send.",
    couldNotSave: "Could not save.",
    couldNotPublish: "Could not publish.",
    favoritesTitle: "Saved listings",
    inquiriesTitle: "Messages",
    sellerDashboard: "Seller dashboard",
    sellerDashboardSub: "Draft, publish, edit, or archive your listings.",
    createNewListing: "Create new listing",
    startSelling: "Start selling",
    backToDashboard: "Back to dashboard",
    drafts: "Drafts",
    draftsTitle: "Draft listings",
    noDraftsYet: "No drafts yet.",
    yourListings: "Your listings",
    published: "Published",
    vehicles: "Vehicles",
    houses: "Houses",
    apartments: "Apartments",
    landLabel: "Land",
    allLabel: "All",
    typeHouse: "House",
    typeApartment: "Apartment",
    typeLand: "Land",
    typeVehicle: "Vehicle",
    vehicleMake: "Make",
    vehicleModel: "Model",
    vehicleYear: "Year",
    vehicleMileage: "Mileage (km)",
    vehicleHelp: "Add make/model and basics so buyers can compare quickly.",
    createListing: "Create listing",
    editListing: "Edit listing",
    publish: "Publish",
    saveDraft: "Save draft",
    archive: "Archive",
    archived: "Archived",
    draft: "Draft",
    items: "items",
    total: "total",
    threads: "threads",
    handPickedHighlights: "Hand-picked highlights",
    listingNotFound: "Listing not found",
    listingNotFoundSub: "This listing may have been removed or is not published.",
    listingLabel: "Listing",
    loginToSave: "Log in to save listings to this device.",
    nothingSavedYet: "Nothing saved yet",
    nothingSavedYetSub: "Tap Save on any listing to keep it here.",
    loginToManageListings: "Log in to manage your listings.",
    noListingsYetTitle: "No listings yet",
    noListingsYetSub: "Create your first listing in a few minutes.",
    loginToCreateListing: "Log in to create a listing.",
    editOwnOnly: "You can only edit your own listings.",
    landSize: "Land size",
    notes: "Notes",
    landNotes: "Include access road / utilities in description.",
    landHelp: "For land, bedrooms/bathrooms are hidden. Add land size and a clear location.",
    propertyHelp: "Add bedrooms, bathrooms, and size so buyers can compare quickly.",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    areaSqm: "Area",
    unit: "Unit",
    sqft: "sqft",
    dunum: "dunum",
    landSizeOptional: "Land size (optional)",
    shortTitle: "Short title",
    photoUrlOptional: "Photo URL (optional)",
    describePlaceholder: "Describe the listing in a few lines",
    sendTo: "To: {title}",
    message: "Message",
    interestedMessage: "Hi! I’m interested. Is this still available?",
    writeMessage: "Write a message…",
    loginToMessages: "Log in to message sellers and track your conversations.",
    noMessagesYet: "No messages yet",
    noMessagesYetSub: "Open a listing and message the seller to start.",
    threadNotFound: "Thread not found",
    notAllowed: "Not allowed",
    viewListing: "View listing",
    draftSaved: "Draft saved",
    listingPublished: "Listing published",
    listingArchived: "Listing archived",
    sent: "Sent",
    enterValidEmail: "Enter a valid email.",
    enterYourName: "Enter your name.",
    passwordMin: "Password must be at least 6 characters.",
    emailInUse: "That email is already in use.",
    emailOrPasswordIncorrect: "Email or password is incorrect.",
    cannotMessageOwnListing: "You can’t message about your own listing.",
    writeShortMessage: "Write a short message.",
    writeMessageError: "Write a message.",
    titleRequired: "Title is required.",
    cityRequired: "City is required.",
    enterValidPrice: "Enter a valid price.",
    descriptionTooShort: "Add a longer description (20+ characters).",
    enterLandSizeError: "Enter land size (sqm).",
    addMakeOrModel: "Add make or model.",
    bd: "bd",
    ba: "ba",
    sqm: "sqm",
    km: "km",
    loading: "Loading",
    preparing: "Preparing the next view…",
    exploreHeroTitle: "Find a place that feels like home.",
    exploreHeroSub: "Browse curated listings, save what you love, and message sellers with one tap.",
    featured: "Featured",
    newListings: "New listings",
    browseAll: "Browse all",
    searchKeywordPlaceholder: "Keyword (e.g. terrace, quiet, ridge)",
    cityPlaceholder: "City",
    district: "District",
    districtPlaceholder: "District",
    minPrice: "Min price",
    maxPrice: "Max price",
    bedroomsMin: "Bedrooms (min)",
    type: "Type",
    keyword: "Keyword",
    priceLabel: "Price",
    currency: "Currency",
    photoUrl: "Photo URL",
    description: "Description",
    propertyType: "Property type",
    titleLabel: "Title",
    neighborhood: "Neighborhood / address line",
    accountLoginHint: "Log in to save favorites, send messages, and list properties.",
    nameForSignup: "Name (for sign up)",
    passwordHint: "Password (6+ chars)",
    localNote: "Everything is stored locally on this device for the prototype.",
    manageActivity: "Manage your activity from here.",
    youHaveListings: "You have {count} listing(s).",
    noListingsYet: "You have no listings yet. Create one from Sell.",
    pageNotFound: "Page not found",
    pageNotFoundSub: "That page doesn’t exist in this prototype.",
    goHome: "Go home",
  },
  ar: {
    explore: "اكتشف",
    search: "بحث",
    sell: "بيع",
    saved: "المحفوظات",
    inquiries: "الرسائل",
    account: "الحساب",
    language: "اللغة",
    currency: "العملة",
    hi: "مرحباً",
    englishLang: "الإنجليزية",
    arabicLang: "العربية",
    usd: "الدولار الأمريكي",
    eur: "اليورو",
    syp: "الليرة السورية",
    seller: "البائع",
    bioLabel: "نبذة عامة (عامة)",
    profilePhoto: "الصورة الشخصية",
    uploadPhoto: "رفع صورة",
    removePhoto: "حذف الصورة",
    photoTooLarge: "اختر صورة أقل من 1 ميجابايت.",
    listingPhotos: "الصور",
    uploadListingPhotos: "رفع صور",
    photosRequired: "يرجى رفع صورة واحدة على الأقل.",
    bioPlaceholder: "اكتب رقم الهاتف أو أي وسيلة تواصل تريد مشاركتها بشكل عام…",
    bioEmpty: "لا توجد معلومات تواصل.",
    saveBio: "حفظ النبذة",
    listProperty: "أضف عقارك",
    applyFilters: "تطبيق الفلاتر",
    reset: "إعادة ضبط",
    back: "رجوع",
    save: "حفظ",
    savedBtn: "محفوظ",
    savedToFavorites: "تمت الإضافة إلى المحفوظات",
    removedFromFavorites: "تمت الإزالة من المحفوظات",
    messageSeller: "مراسلة البائع",
    messageSellerTo: "مراسلة {name}",
    sortBy: "الترتيب",
    sortLowHigh: "الأرخص أولاً",
    sortHighLow: "الأغلى أولاً",
    sortNewest: "الأحدث أولاً",
    sortOldest: "الأقدم أولاً",
    results: "نتائج",
    messageSent: "تم إرسال الرسالة",
    send: "إرسال",
    sendMessage: "إرسال الرسالة",
    reply: "رد",
    loginToContinue: "سجّل الدخول للمتابعة",
    login: "تسجيل الدخول",
    continueWithGoogle: "المتابعة عبر Google",
    continueWithFacebook: "المتابعة عبر Facebook",
    signupQuick: "إنشاء حساب سريع",
    cancel: "إلغاء",
    close: "إغلاق",
    apply: "تطبيق",
    signUp: "إنشاء حساب",
    welcome: "مرحباً",
    loggedIn: "تم تسجيل الدخول",
    logOut: "تسجيل الخروج",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    name: "الاسم",
    goToAccount: "اذهب إلى الحساب",
    newUserName: "مستخدم جديد",
    couldNotLogin: "تعذر تسجيل الدخول.",
    couldNotSignUp: "تعذر إنشاء الحساب.",
    couldNotSend: "تعذر الإرسال.",
    couldNotSave: "تعذر الحفظ.",
    couldNotPublish: "تعذر النشر.",
    favoritesTitle: "العقارات المحفوظة",
    inquiriesTitle: "الرسائل",
    sellerDashboard: "لوحة البائع",
    sellerDashboardSub: "أنشئ مسودة، انشر، عدّل، أو أرشف إعلاناتك.",
    createNewListing: "إنشاء إعلان جديد",
    startSelling: "ابدأ البيع",
    backToDashboard: "العودة للوحة البائع",
    drafts: "المسودات",
    draftsTitle: "مسودات الإعلانات",
    noDraftsYet: "لا توجد مسودات بعد.",
    yourListings: "عقاراتك",
    published: "منشور",
    vehicles: "مركبات",
    houses: "منازل",
    apartments: "شقق",
    landLabel: "أراضٍ",
    allLabel: "الكل",
    typeHouse: "منزل",
    typeApartment: "شقة",
    typeLand: "أرض",
    typeVehicle: "مركبة",
    vehicleMake: "الماركة",
    vehicleModel: "الموديل",
    vehicleYear: "السنة",
    vehicleMileage: "المسافة (كم)",
    vehicleHelp: "أضف الماركة/الموديل والمعلومات الأساسية للمقارنة بسهولة.",
    createListing: "إنشاء إعلان",
    editListing: "تعديل الإعلان",
    publish: "نشر",
    saveDraft: "حفظ كمسودة",
    archive: "أرشفة",
    archived: "مؤرشف",
    draft: "مسودة",
    items: "عنصر",
    total: "الإجمالي",
    threads: "محادثات",
    handPickedHighlights: "مختارات مميزة",
    listingNotFound: "الإعلان غير موجود",
    listingNotFoundSub: "قد يكون الإعلان محذوفاً أو غير منشور.",
    listingLabel: "إعلان",
    loginToSave: "سجّل الدخول لحفظ الإعلانات على هذا الجهاز.",
    nothingSavedYet: "لا توجد محفوظات بعد",
    nothingSavedYetSub: "اضغط حفظ على أي إعلان ليظهر هنا.",
    loginToManageListings: "سجّل الدخول لإدارة إعلاناتك.",
    noListingsYetTitle: "لا توجد إعلانات بعد",
    noListingsYetSub: "أنشئ أول إعلان خلال دقائق.",
    loginToCreateListing: "سجّل الدخول لإنشاء إعلان.",
    editOwnOnly: "يمكنك تعديل إعلاناتك فقط.",
    landSize: "مساحة الأرض",
    notes: "ملاحظات",
    landNotes: "اذكر طريق الوصول/الخدمات في الوصف.",
    landHelp: "للأراضي، لا تظهر غرف النوم/الحمامات. أضف مساحة الأرض وموقعاً واضحاً.",
    propertyHelp: "أضف غرف النوم والحمامات والمساحة للمقارنة بسهولة.",
    bedrooms: "غرف النوم",
    bathrooms: "الحمامات",
    areaSqm: "المساحة",
    unit: "وحدة القياس",
    sqft: "قدم²",
    dunum: "دونم",
    landSizeOptional: "مساحة الأرض (اختياري)",
    shortTitle: "عنوان مختصر",
    photoUrlOptional: "رابط الصورة (اختياري)",
    describePlaceholder: "اكتب وصفاً مختصراً للإعلان",
    sendTo: "إلى: {title}",
    message: "الرسالة",
    interestedMessage: "مرحباً! أنا مهتم. هل الإعلان ما زال متاحاً؟",
    writeMessage: "اكتب رسالة…",
    loginToMessages: "سجّل الدخول لمراسلة البائع ومتابعة محادثاتك.",
    noMessagesYet: "لا توجد رسائل بعد",
    noMessagesYetSub: "افتح إعلاناً وراسل البائع للبدء.",
    threadNotFound: "المحادثة غير موجودة",
    notAllowed: "غير مسموح",
    viewListing: "عرض الإعلان",
    draftSaved: "تم حفظ المسودة",
    listingPublished: "تم نشر الإعلان",
    listingArchived: "تمت أرشفة الإعلان",
    sent: "تم الإرسال",
    enterValidEmail: "أدخل بريداً إلكترونياً صحيحاً.",
    enterYourName: "أدخل اسمك.",
    passwordMin: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
    emailInUse: "هذا البريد مستخدم بالفعل.",
    emailOrPasswordIncorrect: "البريد أو كلمة المرور غير صحيحة.",
    cannotMessageOwnListing: "لا يمكنك مراسلة إعلانك.",
    writeShortMessage: "اكتب رسالة قصيرة.",
    writeMessageError: "اكتب رسالة.",
    titleRequired: "العنوان مطلوب.",
    cityRequired: "المدينة مطلوبة.",
    enterValidPrice: "أدخل سعراً صحيحاً.",
    descriptionTooShort: "أضف وصفاً أطول (20 حرفاً على الأقل).",
    enterLandSizeError: "أدخل مساحة الأرض (م²).",
    addMakeOrModel: "أضف الماركة أو الموديل.",
    bd: "غ",
    ba: "ح",
    sqm: "م²",
    km: "كم",
    loading: "جاري التحميل",
    preparing: "جاري تجهيز الصفحة…",
    exploreHeroTitle: "اعثر على مكان تشعر فيه بأنه بيتك.",
    exploreHeroSub: "تصفّح عقارات مختارة، احفظ ما تحب، وتواصل مع البائع بضغطة واحدة.",
    featured: "مختارات",
    newListings: "الأحدث",
    browseAll: "عرض الكل",
    searchKeywordPlaceholder: "كلمة مفتاحية (مثل: شرفة، هادئ، مرتفع)",
    cityPlaceholder: "المدينة",
    district: "المنطقة",
    districtPlaceholder: "المنطقة",
    minPrice: "أقل سعر",
    maxPrice: "أعلى سعر",
    bedroomsMin: "عدد غرف النوم (حد أدنى)",
    type: "النوع",
    keyword: "الكلمة",
    priceLabel: "السعر",
    currency: "العملة",
    photoUrl: "رابط الصورة",
    description: "الوصف",
    propertyType: "نوع العقار",
    titleLabel: "العنوان",
    neighborhood: "الحي / العنوان",
    accountLoginHint: "سجّل الدخول لحفظ المفضلة، إرسال الرسائل، وإضافة عقارك.",
    nameForSignup: "الاسم (لإنشاء حساب)",
    passwordHint: "كلمة المرور (6+ أحرف)",
    localNote: "يتم حفظ البيانات محلياً على هذا الجهاز لهذا النموذج.",
    manageActivity: "أدر نشاطك من هنا.",
    youHaveListings: "لديك {count} إعلان/إعلانات.",
    noListingsYet: "ليس لديك إعلانات بعد. أنشئ واحداً من صفحة البيع.",
    pageNotFound: "الصفحة غير موجودة",
    pageNotFoundSub: "هذه الصفحة غير متاحة في هذا النموذج.",
    goHome: "العودة للرئيسية",
  },
}

const t = (key, params) => {
  const prefs = getPrefs()
  const raw = DICT[prefs.lang]?.[key] ?? DICT.en[key] ?? key
  if (!params) return raw
  return Object.entries(params).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), raw)
}

const SY_ADMIN = [
  { key: "damascus", en: "Damascus", ar: "دمشق", districtsEn: ["Damascus"], districtsAr: ["دمشق"] },
  {
    key: "rif_dimashq",
    en: "Rif Dimashq",
    ar: "ريف دمشق",
    districtsEn: ["Markaz Rif Dimashq", "Darayya", "Douma", "An-Nabek", "Qatana", "Qudsaya", "Al-Qutayfah", "Al-Tall", "Yabroud", "Al-Zabadani"],
    districtsAr: ["مركز ريف دمشق", "داريا", "دوما", "النبك", "قطنا", "قدسيا", "القطيفة", "التل", "يبرود", "الزبداني"],
  },
  {
    key: "aleppo",
    en: "Aleppo",
    ar: "حلب",
    districtsEn: ["Mount Simeon", "Afrin", "Atarib", "Ayn al-Arab", "Azaz", "Al-Bab", "Dayr Hafir", "Jarabulus", "Manbij", "As-Safira"],
    districtsAr: ["جبل سمعان", "عفرين", "الأتارب", "عين العرب", "أعزاز", "الباب", "دير حافر", "جرابلس", "منبج", "السفيرة"],
  },
  {
    key: "homs",
    en: "Homs",
    ar: "حمص",
    districtsEn: ["Homs", "Al-Mukharram", "Al-Qusayr", "Ar-Rastan", "Tadmur", "Taldou", "Talkalakh"],
    districtsAr: ["حمص", "المخرم", "القصير", "الرستن", "تدمر", "تلدو", "تلكلخ"],
  },
  { key: "hama", en: "Hama", ar: "حماة", districtsEn: ["Hama", "Masyaf", "Mahardah", "Salamiyah", "Al-Suqaylabiyah"], districtsAr: ["حماة", "مصياف", "محردة", "السلمية", "السقيلبية"] },
  { key: "latakia", en: "Latakia", ar: "اللاذقية", districtsEn: ["Latakia", "Jableh", "Al-Haffah", "Qardaha"], districtsAr: ["اللاذقية", "جبلة", "الحفة", "القرداحة"] },
  { key: "tartus", en: "Tartus", ar: "طرطوس", districtsEn: ["Tartus", "Baniyas", "Duraykish", "Safita", "Al-Shaykh Badr"], districtsAr: ["طرطوس", "بانياس", "دريكيش", "صافيتا", "الشيخ بدر"] },
  { key: "idlib", en: "Idlib", ar: "إدلب", districtsEn: ["Idlib", "Ariha", "Harem", "Jisr al-Shughur", "Maarat al-Numan"], districtsAr: ["إدلب", "أريحا", "حارم", "جسر الشغور", "معرة النعمان"] },
  { key: "raqqa", en: "Raqqa", ar: "الرقة", districtsEn: ["Raqqa", "Tell Abyad", "Tabqa"], districtsAr: ["الرقة", "تل أبيض", "الثورة"] },
  { key: "deir_ez_zor", en: "Deir ez-Zor", ar: "دير الزور", districtsEn: ["Deir ez-Zor", "Mayadin", "Abu Kamal"], districtsAr: ["دير الزور", "الميادين", "البوكمال"] },
  { key: "hasakah", en: "Hasakah", ar: "الحسكة", districtsEn: ["Al-Hasakah", "Al-Malikiyah", "Qamishli", "Ras al-Ayn"], districtsAr: ["الحسكة", "المالكية", "القامشلي", "رأس العين"] },
  { key: "daraa", en: "Daraa", ar: "درعا", districtsEn: ["Daraa", "Izra", "Al-Sanamayn"], districtsAr: ["درعا", "إزرع", "الصنمين"] },
  { key: "suwayda", en: "Suwayda", ar: "السويداء", districtsEn: ["Suwayda", "Shahba", "Salkhad"], districtsAr: ["السويداء", "شهبا", "صلخد"] },
  { key: "quneitra", en: "Quneitra", ar: "القنيطرة", districtsEn: ["Quneitra", "Fiq"], districtsAr: ["القنيطرة", "فيق"] },
]

const governorateOptions = () => {
  const prefs = getPrefs()
  return prefs.lang === "ar" ? SY_ADMIN.map((x) => x.ar) : SY_ADMIN.map((x) => x.en)
}

const districtsForGovernorateName = (name) => {
  const prefs = getPrefs()
  const clean = String(name ?? "").trim()
  if (!clean) return []
  const hit = SY_ADMIN.find((x) => x.en === clean || x.ar === clean)
  if (!hit) return []
  return prefs.lang === "ar" ? hit.districtsAr : hit.districtsEn
}

const isGovernorateName = (name) => {
  const clean = String(name ?? "").trim()
  if (!clean) return false
  return SY_ADMIN.some((x) => x.en === clean || x.ar === clean)
}

const renderGovernorateDatalist = (id) => {
  const items = governorateOptions()
  return el("datalist", { id }, items.map((c) => el("option", { value: c })))
}

const renderDistrictDatalist = (id, governorateName) => {
  const items = districtsForGovernorateName(governorateName)
  return el("datalist", { id }, items.map((c) => el("option", { value: c })))
}

const typeLabel = (pt) => {
  if (pt === "house") return t("typeHouse")
  if (pt === "apartment") return t("typeApartment")
  if (pt === "land") return t("typeLand")
  if (pt === "vehicle") return t("typeVehicle")
  return String(pt ?? "")
}

const statusLabel = (status) => {
  if (status === "draft") return t("draft")
  if (status === "published") return t("published")
  if (status === "archived") return t("archived")
  return String(status ?? "")
}

const initialsFor = (name) => {
  const parts = String(name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (!parts.length) return "?"
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : ""
  return (first + last).toUpperCase()
}

const renderAvatar = (user) => {
  const url = String(user?.avatar ?? "").trim()
  if (url) return el("div", { class: "Avatar" }, [el("img", { class: "AvatarImg", src: url, alt: user?.name ?? t("account") })])
  return el("div", { class: "Avatar" }, [el("div", { class: "AvatarFallback", text: initialsFor(user?.name) })])
}

const listingFacts = (listing) => {
  const unit = String(listing.areaUnit ?? "").trim() || t("sqm")
  const bd = t("bd")
  const ba = t("ba")
  const km = t("km")
  if (listing.propertyType === "land") return `${listing.landAreaSqm ?? "—"} ${unit}`
  if (listing.propertyType === "vehicle")
    return `${listing.vehicleYear ?? "—"} • ${listing.vehicleMileageKm ? `${listing.vehicleMileageKm} ${km}` : "—"}`
  return `${listing.bedrooms ?? 0} ${bd} • ${listing.bathrooms ?? 0} ${ba} • ${listing.areaSqm ?? "—"} ${unit}`
}

const formatMoneyUsd = (amountUsd) => {
  const prefs = getPrefs()
  const value = fromUsd(amountUsd, prefs.currency)
  const locale = prefs.lang === "ar" ? "ar" : undefined
  return new Intl.NumberFormat(locale, { style: "currency", currency: prefs.currency, maximumFractionDigits: 0 }).format(
    value
  )
}

const applyPrefsToShell = () => {
  const prefs = getPrefs()
  document.documentElement.lang = prefs.lang
  document.documentElement.dir = prefs.lang === "ar" ? "rtl" : "ltr"

  const langBtn = document.getElementById("langBtn")
  if (langBtn) langBtn.textContent = prefs.lang === "ar" ? "AR" : "EN"

  const nav = {
    explore: document.querySelector('.NavItem[data-nav="explore"] .NavLabel'),
    account: document.querySelector('.NavItem[data-nav="account"] .NavLabel'),
    sell: document.querySelector('.NavItem[data-nav="sell"] .NavLabel'),
    favorites: document.querySelector('.NavItem[data-nav="favorites"] .NavLabel'),
    inquiries: document.querySelector('.NavItem[data-nav="inquiries"] .NavLabel'),
  }
  if (nav.explore) nav.explore.textContent = t("explore")
  if (nav.sell) nav.sell.textContent = t("sell")
  if (nav.favorites) nav.favorites.textContent = t("saved")
  if (nav.inquiries) nav.inquiries.textContent = t("inquiries")
  if (nav.account) nav.account.textContent = t("account")

  if (langBtn) langBtn.setAttribute("aria-label", t("language"))
}

const ensureSeed = () => {
  const hasListings = Array.isArray(store.get(KEYS.listings, null))
  if (hasListings) return

  const listings = [
    {
      id: uid(),
      ownerUserId: "seed",
      status: "published",
      propertyType: "house",
      title: "Evergreen Courtyard House",
      description:
        "A bright modern home with a quiet courtyard, shaded patio, and flexible living spaces. Designed for calm mornings and late dinners.",
      price: 285000,
      currency: "USD",
      country: "Syria",
      city: "Damascus",
      district: "Damascus",
      addressLine: "Al Malki",
      bedrooms: 3,
      bathrooms: 2,
      areaSqm: 162,
      landAreaSqm: 420,
      photoUrls: [
        imgUrl(
          "realistic photography, modern two story house exterior, warm evergreen accents, lush courtyard plants, golden hour sunlight, 35mm lens, high detail"
        ),
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      ownerUserId: "seed",
      status: "published",
      propertyType: "apartment",
      title: "Cityline Corner Apartment",
      description:
        "Corner unit with wide windows, soft natural light, and a clean open-plan layout. Walkable neighborhood with cafés and transit nearby.",
      price: 190000,
      currency: "USD",
      country: "Syria",
      city: "Aleppo",
      district: "Aleppo",
      addressLine: "Al Jamiliyah",
      bedrooms: 2,
      bathrooms: 1,
      areaSqm: 86,
      landAreaSqm: undefined,
      photoUrls: [
        imgUrl(
          "realistic photography, modern apartment living room, floor to ceiling windows, warm wood textures, minimal decor, daylight, high detail"
        ),
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      ownerUserId: "seed",
      status: "published",
      propertyType: "land",
      title: "Coastal Ridge Land Plot",
      description:
        "A gently sloped ridge plot with expansive views and easy access to nearby roads. Ideal for a future home, small retreat, or long-term investment.",
      price: 95000,
      currency: "USD",
      country: "Syria",
      city: "Latakia",
      district: "Latakia",
      addressLine: "Coastal ridge",
      bedrooms: undefined,
      bathrooms: undefined,
      areaSqm: undefined,
      landAreaSqm: 2100,
      photoUrls: [
        imgUrl(
          "realistic photography, coastal land plot, soft grass, distant ocean view, gentle hills, cinematic lighting, high detail"
        ),
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      ownerUserId: "seed",
      status: "published",
      propertyType: "house",
      title: "Stone & Cedar Family Home",
      description:
        "Warm stone and cedar details, a generous kitchen, and a backyard made for gatherings. A practical layout with a quiet work nook.",
      price: 325000,
      currency: "USD",
      country: "Syria",
      city: "Homs",
      district: "Homs",
      addressLine: "Al Zahraa",
      bedrooms: 4,
      bathrooms: 3,
      areaSqm: 204,
      landAreaSqm: 520,
      photoUrls: [
        imgUrl(
          "realistic photography, modern family house exterior, stone and cedar facade, overcast soft light, suburban street, high detail"
        ),
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      ownerUserId: "seed",
      status: "published",
      propertyType: "vehicle",
      title: "Toyota Land Cruiser 2018",
      description:
        "Well maintained 4x4 with a clean interior and strong AC. Ready for long trips and daily driving. Full service history available.",
      price: 36000,
      currency: "USD",
      country: "Syria",
      city: "Rif Dimashq",
      district: "Douma",
      addressLine: "Douma",
      bedrooms: undefined,
      bathrooms: undefined,
      areaSqm: undefined,
      landAreaSqm: undefined,
      vehicleMake: "Toyota",
      vehicleModel: "Land Cruiser",
      vehicleYear: 2018,
      vehicleMileageKm: 78000,
      photoUrls: [
        imgUrl(
          "realistic photography, dark green toyota land cruiser suv parked on a clean street, golden hour lighting, 35mm lens, high detail, sharp focus"
        ),
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uid(),
      ownerUserId: "seed",
      status: "published",
      propertyType: "apartment",
      title: "Quiet Studio with Terrace",
      description:
        "A compact studio that feels bigger than it is. Terrace doors open to fresh air, with room for a tiny table and plants.",
      price: 112000,
      currency: "USD",
      country: "Syria",
      city: "Tartus",
      district: "Tartus",
      addressLine: "Corniche",
      bedrooms: 0,
      bathrooms: 1,
      areaSqm: 44,
      landAreaSqm: undefined,
      vehicleMake: undefined,
      vehicleModel: undefined,
      vehicleYear: undefined,
      vehicleMileageKm: undefined,
      photoUrls: [
        imgUrl(
          "realistic photography, minimal studio apartment interior with terrace doors, soft linen textures, plants, natural daylight, high detail"
        ),
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  store.set(KEYS.listings, listings)
  store.set(KEYS.users, [
    {
      id: "seed",
      email: "seller@darwcar.local",
      passwordHash: "",
      name: "داروكار",
      bio: "",
      createdAt: new Date().toISOString(),
    },
  ])
  store.set(KEYS.favorites, {})
  store.set(KEYS.threads, [])
  store.set(KEYS.messages, [])
  store.set(KEYS.session, { userId: null })
}

const db = {
  getSession() {
    return store.get(KEYS.session, { userId: null })
  },
  setSession(session) {
    store.set(KEYS.session, session)
  },
  getUsers() {
    return store.get(KEYS.users, [])
  },
  setUsers(users) {
    store.set(KEYS.users, users)
  },
  getListings() {
    return store.get(KEYS.listings, [])
  },
  setListings(listings) {
    store.set(KEYS.listings, listings)
  },
  getFavoritesMap() {
    return store.get(KEYS.favorites, {})
  },
  setFavoritesMap(map) {
    store.set(KEYS.favorites, map)
  },
  getThreads() {
    return store.get(KEYS.threads, [])
  },
  setThreads(threads) {
    store.set(KEYS.threads, threads)
  },
  getMessages() {
    return store.get(KEYS.messages, [])
  },
  setMessages(messages) {
    store.set(KEYS.messages, messages)
  },
}

const normalizeUsers = () => {
  const users = db.getUsers()
  const next = users.map((u) => ({
    ...u,
    bio: typeof u.bio === "string" ? u.bio : "",
    avatar: typeof u.avatar === "string" ? u.avatar : "",
  }))
  db.setUsers(next)
}

const ensureSeedUser = () => {
  const users = db.getUsers()
  if (users.some((u) => u.id === "seed")) return
  db.setUsers([
    {
      id: "seed",
      email: "seller@darwcar.local",
      passwordHash: "",
      name: "داروكار",
      bio: "",
      avatar: "",
      createdAt: new Date().toISOString(),
    },
    ...users,
  ])
}

const ensureVehicleSeedListing = () => {
  const listings = db.getListings()
  if (!Array.isArray(listings) || listings.length === 0) return
  if (listings.some((l) => l.propertyType === "vehicle")) return
  const now = new Date().toISOString()
  db.setListings([
    {
      id: uid(),
      ownerUserId: "seed",
      status: "published",
      propertyType: "vehicle",
      title: "Toyota Land Cruiser 2018",
      description:
        "Well maintained 4x4 with a clean interior and strong AC. Ready for long trips and daily driving. Full service history available.",
      price: 36000,
      currency: "USD",
      country: "Syria",
      city: "Rif Dimashq",
      district: "Douma",
      addressLine: "Douma",
      bedrooms: undefined,
      bathrooms: undefined,
      areaSqm: undefined,
      landAreaSqm: undefined,
      vehicleMake: "Toyota",
      vehicleModel: "Land Cruiser",
      vehicleYear: 2018,
      vehicleMileageKm: 78000,
      photoUrls: [
        imgUrl(
          "realistic photography, dark green toyota land cruiser suv parked on a clean street, golden hour lighting, 35mm lens, high detail, sharp focus"
        ),
      ],
      createdAt: now,
      updatedAt: now,
    },
    ...listings,
  ])
}

const updateUser = (userId, patch) => {
  const users = db.getUsers()
  const idx = users.findIndex((u) => u.id === userId)
  if (idx < 0) return null
  const nextUser = { ...users[idx], ...patch }
  db.setUsers([nextUser, ...users.filter((u) => u.id !== userId)])
  return nextUser
}

const sha256Hex = async (text) => {
  const buf = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest("SHA-256", buf)
  const bytes = Array.from(new Uint8Array(hash))
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("")
}

const auth = {
  async signup({ email, password, name }) {
    const cleanEmail = String(email ?? "").trim().toLowerCase()
    const cleanName = String(name ?? "").trim()
    if (!cleanEmail.includes("@")) throw new Error(t("enterValidEmail"))
    if (cleanName.length < 2) throw new Error(t("enterYourName"))
    if (String(password ?? "").length < 6) throw new Error(t("passwordMin"))

    const users = db.getUsers()
    if (users.some((u) => u.email === cleanEmail)) throw new Error(t("emailInUse"))
    const passwordHash = await sha256Hex(String(password))
    const user = { id: uid(), email: cleanEmail, passwordHash, name: cleanName, bio: "", createdAt: new Date().toISOString() }
    db.setUsers([user, ...users])
    db.setSession({ userId: user.id })
    return user
  },
  async social({ provider, email, name }) {
    const cleanEmail = String(email ?? "").trim().toLowerCase()
    if (!cleanEmail.includes("@")) throw new Error(t("enterValidEmail"))
    const cleanName = String(name ?? "").trim()
    const users = db.getUsers()
    const existing = users.find((u) => u.email === cleanEmail)
    if (existing) {
      db.setSession({ userId: existing.id })
      return existing
    }
    const inferred = cleanName || cleanEmail.split("@")[0] || t("newUserName")
    const user = {
      id: uid(),
      email: cleanEmail,
      passwordHash: "",
      name: inferred,
      bio: "",
      authProvider: provider,
      createdAt: new Date().toISOString(),
    }
    db.setUsers([user, ...users])
    db.setSession({ userId: user.id })
    return user
  },
  async login({ email, password }) {
    const cleanEmail = String(email ?? "").trim().toLowerCase()
    const users = db.getUsers()
    const user = users.find((u) => u.email === cleanEmail)
    if (!user) throw new Error(t("emailOrPasswordIncorrect"))
    const passwordHash = await sha256Hex(String(password))
    if (user.passwordHash !== passwordHash) throw new Error(t("emailOrPasswordIncorrect"))
    db.setSession({ userId: user.id })
    return user
  },
  logout() {
    db.setSession({ userId: null })
  },
  getCurrentUser() {
    const session = db.getSession()
    if (!session.userId) return null
    return db.getUsers().find((u) => u.id === session.userId) ?? null
  },
}

const listingService = {
  getById(id) {
    return db.getListings().find((l) => l.id === id) ?? null
  },
  search({ q, propertyType, minPriceUsd, maxPriceUsd, bedrooms, city, district }) {
    const cleanQ = String(q ?? "").trim().toLowerCase()
    const cleanCity = String(city ?? "").trim().toLowerCase()
    const cleanDistrict = String(district ?? "").trim().toLowerCase()

    const minP = Number.isFinite(minPriceUsd) ? minPriceUsd : undefined
    const maxP = Number.isFinite(maxPriceUsd) ? maxPriceUsd : undefined
    const beds = clampInt(bedrooms)

    return db
      .getListings()
      .filter((l) => l.status === "published")
      .filter((l) => (propertyType ? l.propertyType === propertyType : true))
      .filter((l) => (Number.isFinite(minP) ? l.price >= minP : true))
      .filter((l) => (Number.isFinite(maxP) ? l.price <= maxP : true))
      .filter((l) => (Number.isFinite(beds) ? (l.bedrooms ?? 0) >= beds : true))
      .filter((l) => (cleanCity ? l.city.toLowerCase().includes(cleanCity) : true))
      .filter((l) => (cleanDistrict ? String(l.district ?? l.addressLine ?? "").toLowerCase().includes(cleanDistrict) : true))
      .filter((l) => {
        if (!cleanQ) return true
        const blob = `${l.title} ${l.description} ${l.city} ${l.district ?? ""} ${l.addressLine ?? ""}`.toLowerCase()
        return blob.includes(cleanQ)
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },
  getFeatured() {
    return db
      .getListings()
      .filter((l) => l.status === "published")
      .slice()
      .sort((a, b) => b.price - a.price)
      .slice(0, 4)
  },
  getRecent() {
    return db
      .getListings()
      .filter((l) => l.status === "published")
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 12)
  },
  getMine(userId) {
    return db
      .getListings()
      .filter((l) => l.ownerUserId === userId)
      .slice()
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  },
  upsertDraft({ userId, listing }) {
    const now = new Date().toISOString()
    const next = {
      id: listing.id ?? uid(),
      ownerUserId: userId,
      status: listing.status ?? "draft",
      propertyType: listing.propertyType,
      title: listing.title,
      description: listing.description,
      price: listing.price,
      currency: "USD",
      priceCurrency: listing.priceCurrency || "",
      country: listing.country || "Syria",
      city: listing.city,
      district: listing.district || "",
      addressLine: listing.addressLine || "",
      areaUnit: listing.areaUnit || "",
      bedrooms: listing.propertyType === "land" || listing.propertyType === "vehicle" ? undefined : listing.bedrooms ?? 0,
      bathrooms: listing.propertyType === "land" || listing.propertyType === "vehicle" ? undefined : listing.bathrooms ?? 0,
      areaSqm: listing.propertyType === "land" || listing.propertyType === "vehicle" ? undefined : listing.areaSqm ?? undefined,
      landAreaSqm: listing.propertyType === "land" ? listing.landAreaSqm ?? undefined : undefined,
      vehicleMake: listing.propertyType === "vehicle" ? listing.vehicleMake ?? "" : undefined,
      vehicleModel: listing.propertyType === "vehicle" ? listing.vehicleModel ?? "" : undefined,
      vehicleYear: listing.propertyType === "vehicle" ? listing.vehicleYear ?? undefined : undefined,
      vehicleMileageKm: listing.propertyType === "vehicle" ? listing.vehicleMileageKm ?? undefined : undefined,
      photoUrls: listing.photoUrls?.length ? listing.photoUrls : [],
      createdAt: listing.createdAt ?? now,
      updatedAt: now,
    }

    const all = db.getListings()
    const idx = all.findIndex((l) => l.id === next.id)
    const merged = idx >= 0 ? [next, ...all.filter((l) => l.id !== next.id)] : [next, ...all]
    db.setListings(merged)
    return next
  },
  publish(listingId, userId) {
    const all = db.getListings()
    const listing = all.find((l) => l.id === listingId)
    if (!listing || listing.ownerUserId !== userId) throw new Error(t("listingNotFound"))
    const next = { ...listing, status: "published", updatedAt: new Date().toISOString() }
    db.setListings([next, ...all.filter((l) => l.id !== listingId)])
    return next
  },
  archive(listingId, userId) {
    const all = db.getListings()
    const listing = all.find((l) => l.id === listingId)
    if (!listing || listing.ownerUserId !== userId) throw new Error(t("listingNotFound"))
    const next = { ...listing, status: "archived", updatedAt: new Date().toISOString() }
    db.setListings([next, ...all.filter((l) => l.id !== listingId)])
    return next
  },
}

const favoritesService = {
  getIds(userId) {
    const map = db.getFavoritesMap()
    return Array.isArray(map[userId]) ? map[userId] : []
  },
  has(userId, listingId) {
    return this.getIds(userId).includes(listingId)
  },
  toggle(userId, listingId) {
    const map = db.getFavoritesMap()
    const ids = new Set(this.getIds(userId))
    if (ids.has(listingId)) ids.delete(listingId)
    else ids.add(listingId)
    map[userId] = Array.from(ids)
    db.setFavoritesMap(map)
  },
}

const inquiryService = {
  getThreadsForUser(userId) {
    return db
      .getThreads()
      .filter((t) => t.buyerUserId === userId || t.sellerUserId === userId)
      .slice()
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  },
  getThread(threadId) {
    return db.getThreads().find((t) => t.id === threadId) ?? null
  },
  getMessages(threadId) {
    return db
      .getMessages()
      .filter((m) => m.threadId === threadId)
      .slice()
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  },
  startThread({ listingId, buyerUserId, initialMessage }) {
    const listing = listingService.getById(listingId)
    if (!listing) throw new Error(t("listingNotFound"))
    if (listing.ownerUserId === buyerUserId) throw new Error(t("cannotMessageOwnListing"))

    const threads = db.getThreads()
    const existing = threads.find((t) => t.listingId === listingId && t.buyerUserId === buyerUserId)
    const now = new Date().toISOString()

    const thread =
      existing ??
      ({
        id: uid(),
        listingId,
        buyerUserId,
        sellerUserId: listing.ownerUserId,
        createdAt: now,
        updatedAt: now,
      })

    const messages = db.getMessages()
    const msg = {
      id: uid(),
      threadId: thread.id,
      senderUserId: buyerUserId,
      body: String(initialMessage ?? "").trim(),
      createdAt: now,
    }
    if (!msg.body) throw new Error(t("writeShortMessage"))

    const nextThreads = existing
      ? [{ ...thread, updatedAt: now }, ...threads.filter((t) => t.id !== thread.id)]
      : [thread, ...threads]
    db.setThreads(nextThreads)
    db.setMessages([msg, ...messages])
    return thread.id
  },
  sendMessage({ threadId, senderUserId, body }) {
    const thread = this.getThread(threadId)
    if (!thread) throw new Error(t("threadNotFound"))
    if (thread.buyerUserId !== senderUserId && thread.sellerUserId !== senderUserId) throw new Error(t("notAllowed"))

    const now = new Date().toISOString()
    const messages = db.getMessages()
    const msg = { id: uid(), threadId, senderUserId, body: String(body ?? "").trim(), createdAt: now }
    if (!msg.body) throw new Error(t("writeMessageError"))

    db.setMessages([msg, ...messages])
    const threads = db.getThreads()
    db.setThreads([{ ...thread, updatedAt: now }, ...threads.filter((t) => t.id !== threadId)])
  },
}

const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag)
  Object.entries(attrs).forEach(([k, v]) => {
    if (v === undefined || v === null) return
    if (k === "class") node.className = v
    else if (k === "text") node.textContent = v
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v)
    else node.setAttribute(k, String(v))
  })
  for (const child of children) {
    if (child === undefined || child === null) continue
    node.append(child.nodeType ? child : document.createTextNode(String(child)))
  }
  return node
}

const clear = (node) => {
  while (node.firstChild) node.removeChild(node.firstChild)
}

const openModal = ({ title, body, actions, onClose }) => {
  modalRoot.setAttribute("aria-hidden", "false")
  clear(modalRoot)

  let closed = false
  const doClose = () => {
    if (closed) return
    closed = true
    closeModal()
    if (typeof onClose === "function") onClose()
  }

  const card = el("div", { class: "Card ModalCard" }, [
    el("div", { class: "ModalHeader" }, [
      el("div", { class: "H2", text: title }),
      el(
        "button",
        {
          class: "IconButton",
          type: "button",
          onClick: () => doClose(),
          "aria-label": t("close"),
        },
        ["×"]
      ),
    ]),
    el("div", { class: "ModalBody" }, [
      body,
      actions ? el("div", { class: "BtnRow", style: "margin-top:12px" }, actions) : null,
    ]),
  ])

  modalRoot.append(card)
  modalRoot.addEventListener(
    "click",
    (e) => {
      if (e.target === modalRoot) doClose()
    },
    { once: true }
  )
}

const closeModal = () => {
  modalRoot.setAttribute("aria-hidden", "true")
  clear(modalRoot)
}

const oauthMark = (provider) => el("span", { class: "OAuthMark", text: provider === "facebook" ? "f" : "G" })

const toastRoot = (() => {
  const n = el("div", { class: "ToastRoot", role: "status", "aria-live": "polite" })
  document.body.append(n)
  return n
})()

const toast = (message) => {
  const item = el("div", { class: "Toast", text: message })
  toastRoot.append(item)
  requestAnimationFrame(() => item.setAttribute("data-show", "true"))
  setTimeout(() => {
    item.removeAttribute("data-show")
    setTimeout(() => item.remove(), 220)
  }, 2200)
}

const requireAuth = async () => {
  const user = auth.getCurrentUser()
  if (user) return user

  const email = el("input", { class: "Input", placeholder: t("email"), type: "email", autocomplete: "email" })
  const password = el("input", { class: "Input", placeholder: t("password"), type: "password", autocomplete: "current-password" })
  const error = el("div", { class: "Tiny", style: "color:var(--danger); min-height: 18px" })
  const oauthError = (e) => (error.textContent = e?.message ?? t("couldNotLogin"))

  return new Promise((resolve) => {
    openModal({
      title: t("loginToContinue"),
      body: el("div", { class: "Grid" }, [
        el("div", { class: "Tiny", text: t("localNote") }),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: t("email") }), email]),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: t("password") }), password]),
        el("div", { class: "OAuthStack" }, [
          el(
            "button",
            {
              class: "Btn BtnOAuth",
              type: "button",
              onClick: async () => {
                try {
                  const u = await auth.social({ provider: "google", email: email.value, name: "" })
                  closeModal()
                  resolve(u)
                } catch (e) {
                  oauthError(e)
                }
              },
            },
            [oauthMark("google"), t("continueWithGoogle")]
          ),
          el(
            "button",
            {
              class: "Btn BtnOAuth",
              type: "button",
              onClick: async () => {
                try {
                  const u = await auth.social({ provider: "facebook", email: email.value, name: "" })
                  closeModal()
                  resolve(u)
                } catch (e) {
                  oauthError(e)
                }
              },
            },
            [oauthMark("facebook"), t("continueWithFacebook")]
          ),
        ]),
        error,
      ]),
      onClose: () => resolve(null),
      actions: [
        el(
          "button",
          {
            class: "Btn",
            type: "button",
            onClick: async () => {
              closeModal()
              resolve(null)
            },
          },
          [t("cancel")]
        ),
        el(
          "button",
          {
            class: "Btn BtnPrimary",
            type: "button",
            onClick: async () => {
              try {
                const u = await auth.login({ email: email.value, password: password.value })
                closeModal()
                resolve(u)
              } catch (e) {
                error.textContent = e?.message ?? t("couldNotLogin")
              }
            },
          },
          [t("login")]
        ),
        el(
          "button",
          {
            class: "Btn",
            type: "button",
            onClick: async () => {
              try {
                const u = await auth.signup({ email: email.value, password: password.value, name: t("newUserName") })
                closeModal()
                resolve(u)
              } catch (e) {
                error.textContent = e?.message ?? t("couldNotSignUp")
              }
            },
          },
          [t("signupQuick")]
        ),
      ],
    })
  })
}

const renderListingCard = (listing, { href }) => {
  const media = el("div", { class: "ListingMedia" }, [
    el("img", { src: listing.photoUrls?.[0] ?? "", alt: listing.title, loading: "lazy" }),
    el("div", { class: "Badge", text: typeLabel(listing.propertyType) }),
  ])

  const facts = listingFacts(listing)

  const card = el("a", { class: "Card ListingCard", href: `#${href}` }, [
    media,
    el("div", { class: "CardInset Grid" }, [
      el("div", { class: "Row" }, [el("div", { class: "H2", text: listing.title }), el("div", { class: "Price", text: formatMoneyUsd(listing.price) })]),
      el("div", { class: "Meta" }, [`${listing.city}`, facts]),
    ]),
  ])

  return card
}

const setActiveNav = (path) => {
  const items = Array.from(document.querySelectorAll(".NavItem"))
  for (const item of items) item.removeAttribute("data-active")
  const key =
    path.startsWith("/account")
      ? "account"
      : path.startsWith("/sell")
        ? "sell"
        : path.startsWith("/favorites")
          ? "favorites"
          : path.startsWith("/inquiries")
            ? "inquiries"
            : "explore"
  const hit = document.querySelector(`.NavItem[data-nav="${key}"]`)
  if (hit) hit.setAttribute("data-active", "true")
}

const parseRoute = () => {
  const raw = location.hash.replace(/^#/, "") || "/"
  const [pathPart, queryPart] = raw.split("?")
  const path = pathPart.startsWith("/") ? pathPart : `/${pathPart}`
  const query = new URLSearchParams(queryPart ?? "")
  return { path, query }
}

const navigate = (to) => {
  location.hash = `#${to}`
}

const ExplorePage = ({ query }) => {
  const featured = listingService.getFeatured()
  const recent = listingService.getRecent()

  const q = query.get("q") ?? ""
  const city = query.get("city") ?? ""
  const district = query.get("district") ?? ""
  const type = query.get("type") ?? ""
  const showAll = query.get("all") === "1"
  const rawSort = query.get("sort") ?? ""
  const sort =
    rawSort === "price_desc" || rawSort === "price_asc" || rawSort === "date_desc" || rawSort === "date_asc"
      ? rawSort
      : rawSort === "desc"
        ? "price_desc"
        : "price_asc"

  const searchInput = el("input", { class: "Input", placeholder: t("searchKeywordPlaceholder"), value: q })
  const governorateListId = "hh_sy_governorates"
  const cityInput = el("input", { class: "Input", placeholder: t("cityPlaceholder"), value: city, list: governorateListId })
  const districtInput = el("input", { class: "Input", placeholder: t("districtPlaceholder"), value: district })
  const districtField = el("div", { class: "Field", style: "display:none" }, [el("div", { class: "Label", text: t("district") }), districtInput])

  const onSearch = () => {
    const params = new URLSearchParams()
    if (searchInput.value.trim()) params.set("q", searchInput.value.trim())
    if (cityInput.value.trim()) params.set("city", cityInput.value.trim())
    if (districtInput.value.trim() && isGovernorateName(cityInput.value)) params.set("district", districtInput.value.trim())
    if (type) params.set("type", type)
    if (sort !== "price_asc") params.set("sort", sort)
    if (params.toString()) navigate(`/?${params.toString()}`)
    else navigate("/")
  }

  const categoryRow = el("div", { class: "ChipRow" }, [
    el(
      "button",
      { class: "Chip", type: "button", "data-active": type === "house" ? "true" : undefined, onClick: () => navigate("/?type=house") },
      [t("houses")]
    ),
    el(
      "button",
      {
        class: "Chip",
        type: "button",
        "data-active": type === "apartment" ? "true" : undefined,
        onClick: () => navigate("/?type=apartment"),
      },
      [t("apartments")]
    ),
    el(
      "button",
      { class: "Chip", type: "button", "data-active": type === "land" ? "true" : undefined, onClick: () => navigate("/?type=land") },
      [t("landLabel")]
    ),
    el(
      "button",
      { class: "Chip", type: "button", "data-active": type === "vehicle" ? "true" : undefined, onClick: () => navigate("/?type=vehicle") },
      [t("vehicles")]
    ),
    el("button", { class: "Chip", type: "button", "data-active": type === "" ? "true" : undefined, onClick: () => navigate("/") }, [t("allLabel")]),
  ])

  const hasQuery = showAll || Boolean(q.trim() || city.trim() || district.trim() || type)
  const resultsRaw = hasQuery
    ? listingService.search({ q, propertyType: type || undefined, minPriceUsd: undefined, maxPriceUsd: undefined, bedrooms: "", city, district })
    : []
  const results =
    sort === "price_desc"
      ? [...resultsRaw].sort((a, b) => b.price - a.price)
      : sort === "date_desc"
        ? resultsRaw
        : sort === "date_asc"
          ? [...resultsRaw].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
          : [...resultsRaw].sort((a, b) => a.price - b.price)

  const sortSelect = el(
    "select",
    {
      class: "Select",
      "aria-label": t("sortBy"),
      onChange: (e) => {
        const next =
          e.target.value === "price_desc" || e.target.value === "date_desc" || e.target.value === "date_asc" ? e.target.value : "price_asc"
        const p = new URLSearchParams(query.toString())
        if (next !== "price_asc") p.set("sort", next)
        else p.delete("sort")
        const qs = p.toString()
        navigate(qs ? `/?${qs}` : "/")
      },
    },
    [
      el("option", { value: "price_asc", text: t("sortLowHigh"), selected: sort === "price_asc" ? "selected" : undefined }),
      el("option", { value: "price_desc", text: t("sortHighLow"), selected: sort === "price_desc" ? "selected" : undefined }),
      el("option", { value: "date_desc", text: t("sortNewest"), selected: sort === "date_desc" ? "selected" : undefined }),
      el("option", { value: "date_asc", text: t("sortOldest"), selected: sort === "date_asc" ? "selected" : undefined }),
    ]
  )

  const syncDistrict = () => {
    const show = isGovernorateName(cityInput.value)
    districtField.style.display = show ? "" : "none"
    if (!show) {
      districtInput.value = ""
    }
  }

  cityInput.addEventListener("input", () => syncDistrict())
  syncDistrict()

  return el("div", { class: "Grid" }, [
    el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid", style: "padding:14px; gap:12px" }, [
        hasQuery
          ? el("div", { class: "Row" }, [
              el("div", { class: "H2", text: t("search") }),
              el("div", { class: "Tiny", text: `${results.length} ${t("results")}` }),
            ])
          : el("h1", { class: "Title", text: t("exploreHeroTitle") }),
        !hasQuery ? el("p", { class: "P", text: t("exploreHeroSub") }) : null,
        el("div", { class: "Grid" }, [
          el("div", { class: "Field" }, [el("div", { class: "Label", text: t("search") }), searchInput]),
          el("div", { class: "Field" }, [el("div", { class: "Label", text: t("cityPlaceholder") }), cityInput]),
        ]),
        renderGovernorateDatalist(governorateListId),
        districtField,
        hasQuery
          ? el("div", { class: "Grid", style: "grid-template-columns:1fr 1fr; gap:10px" }, [
              el("div", { class: "Field" }, [el("div", { class: "Label", text: t("sortBy") }), sortSelect]),
              el("div", { class: "Field" }, [
                el("div", { class: "Label", text: " " }),
                el("button", { class: "Btn", type: "button", onClick: () => navigate("/") }, [t("reset")]),
              ]),
            ])
          : null,
        el("div", { class: "BtnRow" }, [
          el("button", { class: "Btn BtnPrimary", type: "button", onClick: onSearch }, [t("search")]),
          el("button", { class: "Btn", type: "button", onClick: () => navigate("/sell/new") }, [t("listProperty")]),
        ]),
        categoryRow,
      ]),
    ]),

    hasQuery ? el("div", { class: "Grid" }, results.map((l) => renderListingCard(l, { href: `/listing/${l.id}` }))) : null,

    !hasQuery
      ? el("div", { class: "Row" }, [el("div", { class: "H2", text: t("featured") }), el("div", { class: "Tiny", text: t("handPickedHighlights") })])
      : null,
    !hasQuery ? el("div", { class: "Grid" }, featured.map((l) => renderListingCard(l, { href: `/listing/${l.id}` }))) : null,

    !hasQuery
      ? el("div", { class: "Row", style: "margin-top:4px" }, [
          el("div", { class: "H2", text: t("newListings") }),
          el("button", { class: "Chip", type: "button", onClick: () => navigate("/?all=1") }, [t("browseAll")]),
        ])
      : null,
    !hasQuery ? el("div", { class: "Grid" }, recent.map((l) => renderListingCard(l, { href: `/listing/${l.id}` }))) : null,
  ])
}

const ListingPage = async ({ params }) => {
  const listing = listingService.getById(params.listingId)
  if (!listing || listing.status !== "published") {
    return el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: t("listingNotFound") }),
        el("p", { class: "P", text: t("listingNotFoundSub") }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/") }, [t("goHome")]),
      ]),
    ])
  }

  const user = auth.getCurrentUser()
  const isSaved = user ? favoritesService.has(user.id, listing.id) : false
  const seller = db.getUsers().find((u) => u.id === listing.ownerUserId) ?? null
  const sellerName = seller?.name ?? t("seller")
  const sellerBio = String(seller?.bio ?? "").trim()

  const saveBtn = el("button", { class: "Btn", type: "button" }, [isSaved ? t("savedBtn") : t("save")])
  saveBtn.addEventListener("click", async () => {
    const u = await requireAuth()
    if (!u) return
    favoritesService.toggle(u.id, listing.id)
    toast(favoritesService.has(u.id, listing.id) ? t("savedToFavorites") : t("removedFromFavorites"))
    render()
  })

  const contactBtn = el("button", { class: "Btn BtnPrimary", type: "button" }, [t("messageSellerTo", { name: sellerName })])
  contactBtn.addEventListener("click", async () => {
    const u = await requireAuth()
    if (!u) return
    const message = el("textarea", { class: "TextArea", placeholder: t("interestedMessage") })
    const error = el("div", { class: "Tiny", style: "color:var(--danger); min-height:18px" })
    openModal({
      title: t("sendMessage"),
      body: el("div", { class: "Grid" }, [
        el("div", { class: "Tiny", text: t("sendTo", { title: listing.title }) }),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: t("message") }), message]),
        error,
      ]),
      actions: [
        el("button", { class: "Btn", type: "button", onClick: () => closeModal() }, [t("cancel")]),
        el(
          "button",
          {
            class: "Btn BtnPrimary",
            type: "button",
            onClick: () => {
              try {
                const threadId = inquiryService.startThread({ listingId: listing.id, buyerUserId: u.id, initialMessage: message.value })
                closeModal()
                toast(t("messageSent"))
                navigate(`/inquiries/${threadId}`)
              } catch (e) {
                error.textContent = e?.message ?? t("couldNotSend")
              }
            },
          },
          [t("send")]
        ),
      ],
    })
  })

  const typeValue = typeLabel(listing.propertyType)
  const unit = String(listing.areaUnit ?? "").trim() || t("sqm")

  const stats = [
    { label: t("type"), value: typeValue },
    { label: t("cityPlaceholder"), value: listing.city },
    listing.propertyType === "vehicle" ? { label: t("vehicleMake"), value: listing.vehicleMake || "—" } : null,
    listing.propertyType === "vehicle" ? { label: t("vehicleModel"), value: listing.vehicleModel || "—" } : null,
    listing.propertyType === "vehicle" ? { label: t("vehicleYear"), value: listing.vehicleYear ? String(listing.vehicleYear) : "—" } : null,
    listing.propertyType === "vehicle"
      ? { label: t("vehicleMileage"), value: listing.vehicleMileageKm ? `${listing.vehicleMileageKm} ${t("km")}` : "—" }
      : null,
    listing.propertyType !== "land" && listing.propertyType !== "vehicle" ? { label: t("bedrooms"), value: String(listing.bedrooms ?? 0) } : null,
    listing.propertyType !== "land" && listing.propertyType !== "vehicle" ? { label: t("bathrooms"), value: String(listing.bathrooms ?? 0) } : null,
    listing.propertyType !== "land" && listing.propertyType !== "vehicle"
      ? { label: `${t("areaSqm")} (${unit})`, value: listing.areaSqm ? `${listing.areaSqm} ${unit}` : "—" }
      : null,
    listing.propertyType === "land" ? { label: `${t("landSize")} (${unit})`, value: listing.landAreaSqm ? `${listing.landAreaSqm} ${unit}` : "—" } : null,
  ].filter(Boolean)

  const render = () => {
    clear(main)
    const u = auth.getCurrentUser()
    const saved = u ? favoritesService.has(u.id, listing.id) : false
    saveBtn.textContent = saved ? t("savedBtn") : t("save")
    saveBtn.className = saved ? "Btn" : "Btn"

    main.append(
      el("div", { class: "Grid" }, [
        el("div", { class: "Card ListingCard" }, [
          el("div", { class: "ListingMedia" }, [
            el("img", { src: listing.photoUrls?.[0] ?? "", alt: listing.title }),
            el("div", { class: "Badge", text: typeLabel(listing.propertyType) }),
          ]),
          el("div", { class: "CardInset Grid" }, [
            el("div", { class: "Row" }, [
              el("div", { class: "H2", text: listing.title }),
              el("div", { class: "Price", text: formatMoneyUsd(listing.price) }),
            ]),
            el("div", { class: "Meta" }, [`${listing.city} • ${listing.district || listing.addressLine || ""}`]),
            el("p", { class: "P", text: listing.description }),
            el("div", { class: "Divider" }),
            el(
              "div",
              { class: "Grid", style: "grid-template-columns:1fr 1fr; gap:10px" },
              stats.map((s) =>
                el("div", { class: "Card", style: "border-radius:14px; background:rgba(255,255,255,0.72)" }, [
                  el("div", { class: "CardInset", style: "padding:12px" }, [
                    el("div", { class: "Tiny", text: s.label }),
                    el("div", { style: "font-weight:600; margin-top:3px" }, [s.value]),
                  ]),
                ])
              )
            ),
            el("div", { class: "Divider" }),
            el("div", { class: "Card", style: "border-radius:14px; background:rgba(255,255,255,0.72)" }, [
              el("div", { class: "CardInset", style: "padding:12px" }, [
                el("div", { class: "Row" }, [
                  el("div", { class: "Row", style: "justify-content:flex-start; gap:10px" }, [
                    renderAvatar(seller),
                    el("div", { class: "Grid", style: "gap:2px" }, [
                      el("div", { class: "Tiny", text: t("seller") }),
                      el("div", { style: "font-weight:600" }, [sellerName]),
                    ]),
                  ]),
                ]),
                el("div", { class: "P", style: "margin-top:6px; color:rgba(22,25,24,0.76)" }, [sellerBio || t("bioEmpty")]),
              ]),
            ]),
          ]),
        ]),
        el("div", { class: "StickyFooter" }, [el("div", { class: "BtnRow" }, [saveBtn, contactBtn])]),
      ])
    )
  }

  render()
  return null
}

const FavoritesPage = () => {
  const user = auth.getCurrentUser()
  if (!user) {
    return el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: t("favoritesTitle") }),
        el("p", { class: "P", text: t("loginToSave") }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/account") }, [t("goToAccount")]),
      ]),
    ])
  }

  const ids = favoritesService.getIds(user.id)
  const listings = ids.map((id) => listingService.getById(id)).filter(Boolean)

  return el("div", { class: "Grid" }, [
    el("div", { class: "Row" }, [el("div", { class: "H2", text: t("saved") }), el("div", { class: "Tiny", text: `${listings.length} ${t("items")}` })]),
    listings.length
      ? el("div", { class: "Grid" }, listings.map((l) => renderListingCard(l, { href: `/listing/${l.id}` })))
      : el("div", { class: "Card" }, [
          el("div", { class: "CardInset Grid" }, [
            el("div", { class: "H2", text: t("nothingSavedYet") }),
            el("p", { class: "P", text: t("nothingSavedYetSub") }),
            el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/") }, [t("browseAll")]),
          ]),
        ]),
  ])
}

const DraftsPage = async () => {
  const user = await requireAuth()
  if (!user) {
    return el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: t("drafts") }),
        el("p", { class: "P", text: t("accountLoginHint") }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/account") }, [t("account")]),
      ]),
    ])
  }

  const mine = listingService.getMine(user.id).filter((l) => l.status === "draft")

  return el("div", { class: "Grid" }, [
    el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "Row" }, [el("div", { class: "H2", text: t("draftsTitle") }), el("div", { class: "Tiny", text: `${mine.length}` })]),
        el("div", { class: "BtnRow" }, [
          el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/sell/new") }, [t("createListing")]),
          el("button", { class: "Btn", type: "button", onClick: () => navigate("/sell") }, [t("sellerDashboard")]),
        ]),
      ]),
    ]),
    mine.length
      ? el(
          "div",
          { class: "Grid" },
          mine.map((l) => {
            const card = renderListingCard(l, { href: `/sell/${l.id}/edit` })
            const tag = el("div", { class: "Badge", text: t("draft"), style: "left:auto; right:12px; background:rgba(22,25,24,0.78)" })
            card.querySelector(".ListingMedia")?.append(tag)
            return card
          })
        )
      : el("div", { class: "Card" }, [
          el("div", { class: "CardInset Grid" }, [
            el("div", { class: "H2", text: t("noDraftsYet") }),
            el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/sell/new") }, [t("createListing")]),
          ]),
        ]),
  ])
}

const SellerDashboardPage = async () => {
  const user = await requireAuth()
  if (!user) {
    return el("div", { class: "Card" }, [el("div", { class: "CardInset Grid" }, [el("div", { class: "H2", text: t("sellerDashboard") }), el("p", { class: "P", text: t("loginToManageListings") })])])
  }

  const mine = listingService.getMine(user.id)

  return el("div", { class: "Grid" }, [
    el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "Row" }, [el("div", { class: "H2", text: t("yourListings") }), el("div", { class: "Tiny", text: `${mine.length} ${t("total")}` })]),
        el("p", { class: "P", text: t("sellerDashboardSub") }),
        el("div", { class: "BtnRow" }, [
          el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/sell/new") }, [t("createNewListing")]),
          el("button", { class: "Btn", type: "button", onClick: () => navigate("/") }, [t("explore")]),
        ]),
      ]),
    ]),
    mine.length
      ? el(
          "div",
          { class: "Grid" },
          mine.map((l) => {
            const card = renderListingCard(l, { href: `/sell/${l.id}/edit` })
            const tag = el("div", { class: "Badge", text: statusLabel(l.status), style: "left:auto; right:12px; background:rgba(22,25,24,0.78)" })
            card.querySelector(".ListingMedia")?.append(tag)
            return card
          })
        )
      : el("div", { class: "Card" }, [
          el("div", { class: "CardInset Grid" }, [
            el("div", { class: "H2", text: t("noListingsYetTitle") }),
            el("p", { class: "P", text: t("noListingsYetSub") }),
            el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/sell/new") }, [t("startSelling")]),
          ]),
        ]),
  ])
}

const SellFormPage = async ({ params }) => {
  const user = await requireAuth()
  if (!user)
    return el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [el("div", { class: "H2", text: t("sell") }), el("p", { class: "P", text: t("loginToCreateListing") })]),
    ])

  const prefs = getPrefs()
  const editing = Boolean(params.listingId)
  const existing = editing ? listingService.getById(params.listingId) : null
  if (editing && (!existing || existing.ownerUserId !== user.id)) {
    return el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: t("listingNotFound") }),
        el("p", { class: "P", text: t("editOwnOnly") }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/sell") }, [t("backToDashboard")]),
      ]),
    ])
  }

  const propertyType = el("select", { class: "Select" }, [
    el("option", { value: "house", text: t("typeHouse") }),
    el("option", { value: "apartment", text: t("typeApartment") }),
    el("option", { value: "land", text: t("typeLand") }),
    el("option", { value: "vehicle", text: t("typeVehicle") }),
  ])
  const title = el("input", { class: "Input", placeholder: t("shortTitle"), value: existing?.title ?? "" })
  const currencyListId = "hh_currencies"
  const priceCurrency = el("input", { class: "Input", list: currencyListId, value: normalizeCurrency(existing?.priceCurrency, prefs.currency) })
  const currencyDatalist = el("datalist", { id: currencyListId }, [
    el("option", { value: "USD" }),
    el("option", { value: "EUR" }),
    el("option", { value: "SYP" }),
  ])
  priceCurrency.addEventListener("focus", () => priceCurrency.select())
  priceCurrency.addEventListener("click", () => priceCurrency.select())
  priceCurrency.addEventListener("change", () => {
    priceCurrency.value = normalizeCurrency(priceCurrency.value, prefs.currency)
  })
  const price = el("input", {
    class: "Input",
    placeholder: t("priceLabel"),
    inputmode: "numeric",
    value: existing?.price ? String(Math.round(fromUsd(existing.price, priceCurrency.value))) : "",
  })
  const governorateListId = "hh_sy_governorates"
  const city = el("input", { class: "Input", placeholder: t("cityPlaceholder"), value: existing?.city ?? "", list: governorateListId })
  const district = el("input", { class: "Input", placeholder: t("districtPlaceholder"), value: existing?.district ?? "" })
  const districtField = el("div", { class: "Field", style: "display:none" }, [el("div", { class: "Label", text: t("district") }), district])
  const addressLine = el("input", { class: "Input", placeholder: t("neighborhood"), value: existing?.addressLine ?? "" })
  const description = el("textarea", { class: "TextArea", placeholder: t("describePlaceholder"), value: existing?.description ?? "" })
  let photos = Array.isArray(existing?.photoUrls) ? existing.photoUrls.slice() : []
  const photoInput = el("input", { type: "file", accept: "image/*", multiple: "multiple", style: "display:none" })
  photoInput.addEventListener("change", () => {
    const files = Array.from(photoInput.files ?? [])
    if (!files.length) return
    const pending = files.slice(0, 6)
    let i = 0
    const readNext = () => {
      const f = pending[i]
      if (!f) {
        photoInput.value = ""
        renderPhotos()
        return
      }
      if (f.size > 1024 * 1024) {
        toast(t("photoTooLarge"))
        i += 1
        readNext()
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        const url = String(reader.result ?? "")
        if (url) photos = [...photos, url]
        i += 1
        readNext()
      }
      reader.readAsDataURL(f)
    }
    readNext()
  })
  const photosGrid = el("div", { class: "Grid", style: "grid-template-columns:repeat(3, 1fr); gap:8px" }, [])
  const renderPhotos = () => {
    clear(photosGrid)
    photos.forEach((src, idx) => {
      photosGrid.append(
        el("div", { class: "Card", style: "border-radius:14px; overflow:hidden; background:rgba(255,255,255,0.72)" }, [
          el("div", { style: "position:relative" }, [
            el("img", { src, alt: t("listingPhotos"), style: "width:100%; height:92px; object-fit:cover; display:block" }),
            el(
              "button",
              {
                class: "IconButton",
                type: "button",
                style: "position:absolute; top:6px; right:6px; background:rgba(22,25,24,0.72); color:#fff",
                onClick: () => {
                  photos = photos.filter((_, j) => j !== idx)
                  renderPhotos()
                },
              },
              ["×"]
            ),
          ]),
        ])
      )
    })
  }
  renderPhotos()

  const unit = () => t("sqm")

  const bedrooms = el("input", { class: "Input", placeholder: t("bedrooms"), inputmode: "numeric", value: existing?.bedrooms ?? 0 })
  const bathrooms = el("input", { class: "Input", placeholder: t("bathrooms"), inputmode: "numeric", value: existing?.bathrooms ?? 0 })
  const areaSqm = el("input", {
    class: "Input",
    placeholder: t("areaSqm"),
    inputmode: "decimal",
    value: existing?.areaSqm ?? "",
  })
  const landAreaSqm = el("input", {
    class: "Input",
    placeholder: t("landSize"),
    inputmode: "decimal",
    value: existing?.landAreaSqm ?? "",
  })

  const vehicleMake = el("input", { class: "Input", placeholder: t("vehicleMake"), value: existing?.vehicleMake ?? "" })
  const vehicleModel = el("input", { class: "Input", placeholder: t("vehicleModel"), value: existing?.vehicleModel ?? "" })
  const vehicleYear = el("input", { class: "Input", placeholder: t("vehicleYear"), inputmode: "numeric", value: existing?.vehicleYear ?? "" })
  const vehicleMileageKm = el("input", {
    class: "Input",
    placeholder: t("vehicleMileage"),
    inputmode: "numeric",
    value: existing?.vehicleMileageKm ?? "",
  })

  propertyType.value = existing?.propertyType ?? "house"

  const formError = el("div", { class: "Tiny", style: "color:var(--danger); min-height:18px" })
  const helper = el("div", { class: "Tiny" })

  const setHelper = () => {
    const pt = propertyType.value
    helper.textContent =
      pt === "land"
        ? t("landHelp")
        : pt === "vehicle"
          ? t("vehicleHelp")
          : t("propertyHelp")
  }

  const factsGrid = el("div", { class: "Grid", style: "grid-template-columns:1fr 1fr; gap:10px" }, [])

  const rerenderFacts = () => {
    clear(factsGrid)
    const u = unit()
    if (propertyType.value === "land") {
      factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: `${t("landSize")} (${u})` }), landAreaSqm]))
      factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: t("notes") }), el("div", { class: "Tiny", text: t("landNotes") })]))
      return
    }
    if (propertyType.value === "vehicle") {
      factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: t("vehicleMake") }), vehicleMake]))
      factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: t("vehicleModel") }), vehicleModel]))
      factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: t("vehicleYear") }), vehicleYear]))
      factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: t("vehicleMileage") }), vehicleMileageKm]))
      return
    }
    factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: t("bedrooms") }), bedrooms]))
    factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: t("bathrooms") }), bathrooms]))
    factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: `${t("areaSqm")} (${u})` }), areaSqm]))
    factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: `${t("landSizeOptional")} (${u})` }), landAreaSqm]))
  }

  propertyType.addEventListener("change", () => {
    setHelper()
    rerenderFacts()
  })

  setHelper()
  rerenderFacts()

  const syncDistrict = () => {
    const show = isGovernorateName(city.value)
    districtField.style.display = show ? "" : "none"
    if (!show) {
      district.value = ""
    }
  }

  city.addEventListener("input", () => syncDistrict())
  syncDistrict()

  const validate = (requirePhotos = false) => {
    formError.textContent = ""
    if (!title.value.trim()) throw new Error(t("titleRequired"))
    if (!city.value.trim()) throw new Error(t("cityRequired"))
    const p = clampInt(price.value)
    const cur = normalizeCurrency(priceCurrency.value, prefs.currency)
    const pUsd = Number.isFinite(p) ? toUsd(p, cur) : NaN
    if (!Number.isFinite(pUsd) || pUsd <= 0) throw new Error(t("enterValidPrice"))
    if (!description.value.trim() || description.value.trim().length < 20) throw new Error(t("descriptionTooShort"))
    if (propertyType.value === "land") {
      const land = clampNum(landAreaSqm.value)
      if (!Number.isFinite(land) || land <= 0) throw new Error(t("enterLandSizeError"))
    }
    if (propertyType.value === "vehicle") {
      if (!vehicleMake.value.trim() && !vehicleModel.value.trim()) throw new Error(t("addMakeOrModel"))
    }
    if (requirePhotos) {
      const hasUpload = photos.some((u) => String(u).startsWith("data:image"))
      if (!hasUpload) throw new Error(t("photosRequired"))
    }
  }

  const saveDraft = () => {
    validate(false)
    const next = listingService.upsertDraft({
      userId: user.id,
      listing: {
        id: existing?.id,
        createdAt: existing?.createdAt,
        status: existing?.status ?? "draft",
        propertyType: propertyType.value,
        title: title.value.trim(),
        description: description.value.trim(),
        priceCurrency: normalizeCurrency(priceCurrency.value, prefs.currency),
        price: toUsd(clampInt(price.value), normalizeCurrency(priceCurrency.value, prefs.currency)),
        country: "Syria",
        city: city.value.trim(),
        district: isGovernorateName(city.value) ? district.value.trim() : "",
        addressLine: addressLine.value.trim(),
        bedrooms: clampInt(bedrooms.value),
        bathrooms: clampInt(bathrooms.value),
        areaUnit: "",
        areaSqm: clampNum(areaSqm.value),
        landAreaSqm: clampNum(landAreaSqm.value),
        vehicleMake: vehicleMake.value.trim(),
        vehicleModel: vehicleModel.value.trim(),
        vehicleYear: clampInt(vehicleYear.value),
        vehicleMileageKm: clampInt(vehicleMileageKm.value),
        photoUrls: photos,
      },
    })
    toast(t("draftSaved"))
    return next
  }

  const publish = () => {
    validate(true)
    const draft = saveDraft()
    listingService.publish(draft.id, user.id)
    toast(t("listingPublished"))
    navigate("/sell")
  }

  const archive = () => {
    if (!existing) return
    listingService.archive(existing.id, user.id)
    toast(t("listingArchived"))
    navigate("/sell")
  }

  return el("div", { class: "Grid" }, [
    el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "Row" }, [
          el("div", { class: "H2", text: editing ? t("editListing") : t("createListing") }),
          el("div", { class: "Tiny", text: editing ? statusLabel(existing?.status) : t("draft") }),
        ]),
        helper,
        el("div", { class: "Field" }, [el("div", { class: "Label", text: t("propertyType") }), propertyType]),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: t("titleLabel") }), title]),
        el("div", { class: "Grid", style: "grid-template-columns:1fr 132px; gap:10px" }, [
          el("div", { class: "Field" }, [el("div", { class: "Label", text: t("priceLabel") }), price]),
          el("div", { class: "Field" }, [el("div", { class: "Label", text: t("currency") }), priceCurrency]),
        ]),
        currencyDatalist,
        el("div", { class: "Field" }, [el("div", { class: "Label", text: t("cityPlaceholder") }), city]),
        renderGovernorateDatalist(governorateListId),
        districtField,
        el("div", { class: "Field" }, [el("div", { class: "Label", text: t("neighborhood") }), addressLine]),
        photoInput,
        el("div", { class: "Field" }, [
          el("div", { class: "Label", text: t("listingPhotos") }),
          el("div", { class: "BtnRow" }, [el("button", { class: "Btn", type: "button", onClick: () => photoInput.click() }, [t("uploadListingPhotos")])]),
        ]),
        photosGrid,
        factsGrid,
        el("div", { class: "Field" }, [el("div", { class: "Label", text: t("description") }), description]),
        formError,
        el("div", { class: "BtnRow" }, [
          el("button", { class: "Btn", type: "button", onClick: () => navigate("/sell") }, [t("back")]),
          el(
            "button",
            {
              class: "Btn",
              type: "button",
              onClick: () => {
                try {
                  saveDraft()
                } catch (e) {
                  formError.textContent = e?.message ?? t("couldNotSave")
                }
              },
            },
            [t("saveDraft")]
          ),
          el(
            "button",
            {
              class: "Btn BtnPrimary",
              type: "button",
              onClick: () => {
                try {
                  publish()
                } catch (e) {
                  formError.textContent = e?.message ?? t("couldNotPublish")
                }
              },
            },
            [t("publish")]
          ),
          editing && existing?.status !== "archived"
            ? el(
                "button",
                {
                  class: "Btn BtnDanger",
                  type: "button",
                  onClick: () => {
                    archive()
                  },
                },
                [t("archive")]
              )
            : null,
        ]),
      ]),
    ]),
  ])
}

const InquiriesListPage = async () => {
  const user = auth.getCurrentUser()
  if (!user) {
    return el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: t("inquiries") }),
        el("p", { class: "P", text: t("loginToMessages") }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/account") }, [t("goToAccount")]),
      ]),
    ])
  }

  const threads = inquiryService.getThreadsForUser(user.id)

  const cards = threads.map((t) => {
    const listing = listingService.getById(t.listingId)
    const msgs = inquiryService.getMessages(t.id)
    const last = msgs[msgs.length - 1]
    const otherId = t.buyerUserId === user.id ? t.sellerUserId : t.buyerUserId
    const other = db.getUsers().find((u) => u.id === otherId) ?? null
    return el("div", { class: "Card", style: "cursor:pointer" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "Row" }, [
          el("div", { class: "Row", style: "justify-content:flex-start; gap:10px" }, [
            renderAvatar(other),
            el("div", { class: "H2", text: listing?.title ?? t("listingLabel") }),
          ]),
          el("div", { class: "Tiny", text: new Date(t.updatedAt).toLocaleDateString() }),
        ]),
        el("div", { class: "Tiny", text: listing ? `${listing.city} • ${formatMoneyUsd(listing.price)}` : "" }),
        el("div", { class: "P", text: last ? last.body : t("noMessagesYet") }),
      ]),
    ])
  })

  for (const [idx, card] of cards.entries()) {
    card.addEventListener("click", () => navigate(`/inquiries/${threads[idx].id}`))
  }

  return el("div", { class: "Grid" }, [
    el("div", { class: "Row" }, [el("div", { class: "H2", text: t("inquiries") }), el("div", { class: "Tiny", text: `${threads.length} ${t("threads")}` })]),
    threads.length
      ? el("div", { class: "Grid" }, cards)
      : el("div", { class: "Card" }, [
          el("div", { class: "CardInset Grid" }, [
            el("div", { class: "H2", text: t("noMessagesYet") }),
            el("p", { class: "P", text: t("noMessagesYetSub") }),
            el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/?all=1") }, [t("browseAll")]),
          ]),
        ]),
  ])
}

const InquiryThreadPage = async ({ params }) => {
  const user = auth.getCurrentUser()
  if (!user) return InquiriesListPage()

  const thread = inquiryService.getThread(params.threadId)
  if (!thread) {
    return el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: t("threadNotFound") }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/inquiries") }, [t("back")]),
      ]),
    ])
  }

  if (thread.buyerUserId !== user.id && thread.sellerUserId !== user.id) {
    return el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: t("notAllowed") }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/inquiries") }, [t("back")]),
      ]),
    ])
  }

  const listing = listingService.getById(thread.listingId)
  const messages = inquiryService.getMessages(thread.id)

  const body = el("div", { class: "Grid" }, [
    el("div", { class: "Row" }, [
      el("div", { class: "H2", text: listing?.title ?? t("inquiries") }),
      el("button", { class: "Chip", type: "button", onClick: () => navigate(`/listing/${thread.listingId}`) }, [t("viewListing")]),
    ]),
    el("div", { class: "Tiny", text: listing ? `${listing.city} • ${formatMoneyUsd(listing.price)}` : "" }),
    el(
      "div",
      { class: "Grid" },
      messages.map((m) =>
        el(
          "div",
          {
            class: "Card",
            style:
              m.senderUserId === user.id
                ? "border-radius:18px; background:rgba(10,45,34,0.10); border-color: rgba(10,45,34,0.18)"
                : "border-radius:18px; background:rgba(255,255,255,0.78)",
          },
          [
            el("div", { class: "CardInset", style: "padding:12px" }, [
              el("div", { class: "Tiny", text: new Date(m.createdAt).toLocaleString() }),
              el("div", { style: "margin-top:6px; line-height:1.45" }, [m.body]),
            ]),
          ]
        )
      )
    ),
  ])

  const input = el("textarea", { class: "TextArea", placeholder: t("writeMessage") })
  const err = el("div", { class: "Tiny", style: "color:var(--danger); min-height:18px" })

  const send = () => {
    try {
      inquiryService.sendMessage({ threadId: thread.id, senderUserId: user.id, body: input.value })
      input.value = ""
      toast(t("sent"))
      navigate(`/inquiries/${thread.id}`)
    } catch (e) {
      err.textContent = e?.message ?? t("couldNotSend")
    }
  }

  return el("div", { class: "Grid" }, [
    el("div", { class: "BtnRow" }, [el("button", { class: "Btn", type: "button", onClick: () => navigate("/inquiries") }, [t("back")])]),
    el("div", { class: "Card" }, [el("div", { class: "CardInset" }, [body])]),
    el("div", { class: "StickyFooter" }, [
      el("div", { class: "Grid" }, [
        el("div", { class: "Field" }, [el("div", { class: "Label", text: t("reply") }), input]),
        err,
        el("div", { class: "BtnRow" }, [el("button", { class: "Btn BtnPrimary", type: "button", onClick: send }, [t("sendMessage")])]),
      ]),
    ]),
  ])
}

const AccountPage = () => {
  const user = auth.getCurrentUser()
  if (!user) {
    const email = el("input", { class: "Input", type: "email", placeholder: t("email"), autocomplete: "email" })
    const name = el("input", { class: "Input", placeholder: t("name"), autocomplete: "name" })
    const password = el("input", { class: "Input", type: "password", placeholder: t("passwordHint"), autocomplete: "new-password" })
    const error = el("div", { class: "Tiny", style: "color:var(--danger); min-height:18px" })

    const signup = async () => {
      try {
        await auth.signup({ email: email.value, password: password.value, name: name.value })
        toast(t("welcome"))
        navigate("/account")
        render()
      } catch (e) {
        error.textContent = e?.message ?? t("couldNotSignUp")
      }
    }

    const login = async () => {
      try {
        await auth.login({ email: email.value, password: password.value })
        toast(t("loggedIn"))
        navigate("/account")
        render()
      } catch (e) {
        error.textContent = e?.message ?? t("couldNotLogin")
      }
    }

    const social = async (provider) => {
      try {
        await auth.social({ provider, email: email.value, name: name.value })
        toast(t("loggedIn"))
        navigate("/account")
        render()
      } catch (e) {
        error.textContent = e?.message ?? t("couldNotLogin")
      }
    }

    return el("div", { class: "Grid" }, [
      el("div", { class: "Card" }, [
        el("div", { class: "CardInset Grid" }, [
          el("div", { class: "H2", text: t("account") }),
          el("p", { class: "P", text: t("accountLoginHint") }),
          el("div", { class: "Field" }, [el("div", { class: "Label", text: t("email") }), email]),
          el("div", { class: "Field" }, [el("div", { class: "Label", text: t("nameForSignup") }), name]),
          el("div", { class: "Field" }, [el("div", { class: "Label", text: t("passwordHint") }), password]),
          error,
          el("div", { class: "BtnRow" }, [
            el("button", { class: "Btn BtnPrimary", type: "button", onClick: signup }, [t("signUp")]),
            el("button", { class: "Btn", type: "button", onClick: login }, [t("login")]),
          ]),
          el("div", { class: "OAuthStack" }, [
            el("button", { class: "Btn BtnOAuth", type: "button", onClick: () => social("google") }, [oauthMark("google"), t("continueWithGoogle")]),
            el("button", { class: "Btn BtnOAuth", type: "button", onClick: () => social("facebook") }, [oauthMark("facebook"), t("continueWithFacebook")]),
          ]),
          el("div", { class: "Tiny", text: t("localNote") }),
        ]),
      ]),
    ])
  }

  const prefs = getPrefs()
  const savedCount = favoritesService.getIds(user.id).length
  const myListings = listingService.getMine(user.id)
  const inquiryCount = inquiryService.getThreadsForUser(user.id).length

  const avatarInput = el("input", { type: "file", accept: "image/*", style: "display:none" })
  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files?.[0]
    if (!file) return
    if (file.size > 1024 * 1024) {
      toast(t("photoTooLarge"))
      avatarInput.value = ""
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      updateUser(user.id, { avatar: String(reader.result ?? "") })
      avatarInput.value = ""
      render()
    }
    reader.readAsDataURL(file)
  })

  const langRow = el("div", { class: "ChipRow" }, [
    el(
      "button",
      {
        class: "Chip",
        type: "button",
        "data-active": prefs.lang === "en" ? "true" : undefined,
        onClick: () => {
          setPrefs({ lang: "en" })
          applyPrefsToShell()
          render()
        },
      },
      [t("englishLang")]
    ),
    el(
      "button",
      {
        class: "Chip",
        type: "button",
        "data-active": prefs.lang === "ar" ? "true" : undefined,
        onClick: () => {
          setPrefs({ lang: "ar" })
          applyPrefsToShell()
          render()
        },
      },
      [t("arabicLang")]
    ),
  ])

  const currencyRow = el("div", { class: "ChipRow" }, [
    el(
      "button",
      {
        class: "Chip",
        type: "button",
        "data-active": prefs.currency === "USD" ? "true" : undefined,
        onClick: () => {
          setPrefs({ currency: "USD" })
          render()
        },
      },
      [t("usd")]
    ),
    el(
      "button",
      {
        class: "Chip",
        type: "button",
        "data-active": prefs.currency === "EUR" ? "true" : undefined,
        onClick: () => {
          setPrefs({ currency: "EUR" })
          render()
        },
      },
      [t("eur")]
    ),
    el(
      "button",
      {
        class: "Chip",
        type: "button",
        "data-active": prefs.currency === "SYP" ? "true" : undefined,
        onClick: () => {
          setPrefs({ currency: "SYP" })
          render()
        },
      },
      [t("syp")]
    ),
  ])

  const bioInput = el("textarea", { class: "TextArea", placeholder: t("bioPlaceholder") })
  bioInput.value = user.bio ?? ""

  const saveBio = () => {
    updateUser(user.id, { bio: String(bioInput.value ?? "").trim() })
    toast(t("saveBio"))
    render()
  }

  return el("div", { class: "Grid" }, [
    el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "Row" }, [el("div", { class: "H2", text: `${t("hi")}, ${user.name}` }), renderAvatar(user)]),
        el("p", { class: "P", text: t("manageActivity") }),
        avatarInput,
        el("div", { class: "BtnRow" }, [
          el("button", { class: "Btn", type: "button", onClick: () => avatarInput.click() }, [t("uploadPhoto")]),
          String(user.avatar ?? "").trim()
            ? el("button", { class: "Btn", type: "button", onClick: () => { updateUser(user.id, { avatar: "" }); render() } }, [t("removePhoto")])
            : null,
        ]),
        el("div", { class: "Grid", style: "grid-template-columns:1fr 1fr; gap:10px" }, [
          el("div", { class: "Card", style: "border-radius:14px; background:rgba(255,255,255,0.72)" }, [
            el("div", { class: "CardInset", style: "padding:12px" }, [el("div", { class: "Tiny", text: t("saved") }), el("div", { style: "font-weight:600; margin-top:3px" }, [String(savedCount)])]),
          ]),
          el("div", { class: "Card", style: "border-radius:14px; background:rgba(255,255,255,0.72)" }, [
            el("div", { class: "CardInset", style: "padding:12px" }, [el("div", { class: "Tiny", text: t("inquiries") }), el("div", { style: "font-weight:600; margin-top:3px" }, [String(inquiryCount)])]),
          ]),
        ]),
        el("div", { class: "BtnRow" }, [
          el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/sell") }, [t("sellerDashboard")]),
          el("button", { class: "Btn", type: "button", onClick: () => navigate("/drafts") }, [t("drafts")]),
          el("button", { class: "Btn", type: "button", onClick: () => navigate("/favorites") }, [t("saved")]),
          el("button", { class: "Btn", type: "button", onClick: () => navigate("/inquiries") }, [t("inquiries")]),
        ]),
        el("div", { class: "Divider" }),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: t("language") }), langRow]),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: t("currency") }), currencyRow]),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: t("bioLabel") }), bioInput]),
        el("div", { class: "BtnRow" }, [el("button", { class: "Btn", type: "button", onClick: saveBio }, [t("saveBio")])]),
        myListings.length
          ? el("div", { class: "Tiny", text: t("youHaveListings", { count: myListings.length }) })
          : el("div", { class: "Tiny", text: t("noListingsYet") }),
        el(
          "button",
          {
            class: "Btn",
            type: "button",
            onClick: () => {
              auth.logout()
              toast(t("logOut"))
              navigate("/account")
            },
          },
          [t("logOut")]
        ),
      ]),
    ]),
  ])
}

const routes = [
  { match: /^\/$/, render: (ctx) => ExplorePage(ctx) },
  {
    match: /^\/search$/,
    render: ({ query }) => {
      const qs = query.toString()
      navigate(qs ? `/?${qs}` : "/")
      return null
    },
  },
  { match: /^\/listing\/([^/]+)$/, render: (ctx) => ListingPage({ ...ctx, params: { listingId: ctx.match[1] } }) },
  { match: /^\/favorites$/, render: () => FavoritesPage() },
  { match: /^\/drafts$/, render: () => DraftsPage() },
  { match: /^\/sell$/, render: () => SellerDashboardPage() },
  { match: /^\/sell\/new$/, render: () => SellFormPage({ params: {} }) },
  { match: /^\/sell\/([^/]+)\/edit$/, render: (ctx) => SellFormPage({ params: { listingId: ctx.match[1] } }) },
  { match: /^\/inquiries$/, render: () => InquiriesListPage() },
  { match: /^\/inquiries\/([^/]+)$/, render: (ctx) => InquiryThreadPage({ params: { threadId: ctx.match[1] } }) },
  { match: /^\/account$/, render: () => AccountPage() },
]

const render = async () => {
  applyPrefsToShell()
  const { path, query } = parseRoute()
  setActiveNav(path)

  clear(main)
  main.append(
    el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: t("loading") }),
        el("p", { class: "P", text: t("preparing") }),
      ]),
    ])
  )

  const matchEntry = routes
    .map((r) => {
      const m = path.match(r.match)
      return m ? { r, m } : null
    })
    .find(Boolean)

  if (!matchEntry) {
    clear(main)
    main.append(
      el("div", { class: "Card" }, [
        el("div", { class: "CardInset Grid" }, [
          el("div", { class: "H2", text: t("pageNotFound") }),
          el("p", { class: "P", text: t("pageNotFoundSub") }),
          el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/") }, [t("goHome")]),
        ]),
      ])
    )
    return
  }

  const ctx = { path, query, match: matchEntry.m }
  const out = await matchEntry.r.render(ctx)
  if (out) {
    clear(main)
    main.append(out)
  }
}

document.getElementById("langBtn")?.addEventListener("click", () => {
  const prefs = getPrefs()
  const langRow = el("div", { class: "ChipRow" }, [
    el(
      "button",
      {
        class: "Chip",
        type: "button",
        "data-active": prefs.lang === "en" ? "true" : undefined,
        onClick: () => {
          setPrefs({ lang: "en" })
          applyPrefsToShell()
          closeModal()
          render()
        },
      },
      [t("englishLang")]
    ),
    el(
      "button",
      {
        class: "Chip",
        type: "button",
        "data-active": prefs.lang === "ar" ? "true" : undefined,
        onClick: () => {
          setPrefs({ lang: "ar" })
          applyPrefsToShell()
          closeModal()
          render()
        },
      },
      [t("arabicLang")]
    ),
  ])

  openModal({
    title: t("language"),
    body: el("div", { class: "Grid" }, [langRow]),
  })
})

ensureSeed()
ensureSeedUser()
ensureVehicleSeedListing()
normalizeUsers()
window.addEventListener("hashchange", render)
render()
