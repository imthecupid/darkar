const main = document.getElementById("main")
const modalRoot = document.getElementById("modalRoot")

const formatPrice = (price, currency = "USD") =>
  new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 0 }).format(price)

const uid = () => {
  const s = crypto.getRandomValues(new Uint32Array(3))
  return `${s[0].toString(16)}${s[1].toString(16)}${s[2].toString(16)}`
}

const clampInt = (v) => {
  const n = Number.parseInt(String(v ?? ""), 10)
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
      country: "United States",
      city: "Austin",
      addressLine: "South Congress",
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
      country: "United States",
      city: "Chicago",
      addressLine: "West Loop",
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
      country: "United States",
      city: "San Diego",
      addressLine: "North County",
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
      country: "United States",
      city: "Nashville",
      addressLine: "East Nashville",
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
      propertyType: "apartment",
      title: "Quiet Studio with Terrace",
      description:
        "A compact studio that feels bigger than it is. Terrace doors open to fresh air, with room for a tiny table and plants.",
      price: 112000,
      currency: "USD",
      country: "United States",
      city: "Portland",
      addressLine: "Pearl District",
      bedrooms: 0,
      bathrooms: 1,
      areaSqm: 44,
      landAreaSqm: undefined,
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
  store.set(KEYS.users, [])
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
    if (!cleanEmail.includes("@")) throw new Error("Enter a valid email.")
    if (cleanName.length < 2) throw new Error("Enter your name.")
    if (String(password ?? "").length < 6) throw new Error("Password must be at least 6 characters.")

    const users = db.getUsers()
    if (users.some((u) => u.email === cleanEmail)) throw new Error("That email is already in use.")
    const passwordHash = await sha256Hex(String(password))
    const user = { id: uid(), email: cleanEmail, passwordHash, name: cleanName, createdAt: new Date().toISOString() }
    db.setUsers([user, ...users])
    db.setSession({ userId: user.id })
    return user
  },
  async login({ email, password }) {
    const cleanEmail = String(email ?? "").trim().toLowerCase()
    const users = db.getUsers()
    const user = users.find((u) => u.email === cleanEmail)
    if (!user) throw new Error("Email or password is incorrect.")
    const passwordHash = await sha256Hex(String(password))
    if (user.passwordHash !== passwordHash) throw new Error("Email or password is incorrect.")
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
  search({ q, propertyType, minPrice, maxPrice, bedrooms, city }) {
    const cleanQ = String(q ?? "").trim().toLowerCase()
    const cleanCity = String(city ?? "").trim().toLowerCase()

    const minP = clampInt(minPrice)
    const maxP = clampInt(maxPrice)
    const beds = clampInt(bedrooms)

    return db
      .getListings()
      .filter((l) => l.status === "published")
      .filter((l) => (propertyType ? l.propertyType === propertyType : true))
      .filter((l) => (Number.isFinite(minP) ? l.price >= minP : true))
      .filter((l) => (Number.isFinite(maxP) ? l.price <= maxP : true))
      .filter((l) => (Number.isFinite(beds) ? (l.bedrooms ?? 0) >= beds : true))
      .filter((l) => (cleanCity ? l.city.toLowerCase().includes(cleanCity) : true))
      .filter((l) => {
        if (!cleanQ) return true
        const blob = `${l.title} ${l.description} ${l.city} ${l.addressLine ?? ""}`.toLowerCase()
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
      country: listing.country || "United States",
      city: listing.city,
      addressLine: listing.addressLine || "",
      bedrooms: listing.propertyType === "land" ? undefined : listing.bedrooms ?? 0,
      bathrooms: listing.propertyType === "land" ? undefined : listing.bathrooms ?? 0,
      areaSqm: listing.propertyType === "land" ? undefined : listing.areaSqm ?? undefined,
      landAreaSqm: listing.propertyType === "land" ? listing.landAreaSqm ?? undefined : undefined,
      photoUrls: listing.photoUrls?.length
        ? listing.photoUrls
        : [
            imgUrl(
              "realistic photography, architectural exterior, warm minimal style, soft daylight, real estate listing photo, high detail"
            ),
          ],
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
    if (!listing || listing.ownerUserId !== userId) throw new Error("Listing not found.")
    const next = { ...listing, status: "published", updatedAt: new Date().toISOString() }
    db.setListings([next, ...all.filter((l) => l.id !== listingId)])
    return next
  },
  archive(listingId, userId) {
    const all = db.getListings()
    const listing = all.find((l) => l.id === listingId)
    if (!listing || listing.ownerUserId !== userId) throw new Error("Listing not found.")
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
    if (!listing) throw new Error("Listing not found.")
    if (listing.ownerUserId === buyerUserId) throw new Error("You can’t inquire about your own listing.")

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
    if (!msg.body) throw new Error("Write a short message.")

    const nextThreads = existing
      ? [{ ...thread, updatedAt: now }, ...threads.filter((t) => t.id !== thread.id)]
      : [thread, ...threads]
    db.setThreads(nextThreads)
    db.setMessages([msg, ...messages])
    return thread.id
  },
  sendMessage({ threadId, senderUserId, body }) {
    const thread = this.getThread(threadId)
    if (!thread) throw new Error("Thread not found.")
    if (thread.buyerUserId !== senderUserId && thread.sellerUserId !== senderUserId) throw new Error("Not allowed.")

    const now = new Date().toISOString()
    const messages = db.getMessages()
    const msg = { id: uid(), threadId, senderUserId, body: String(body ?? "").trim(), createdAt: now }
    if (!msg.body) throw new Error("Write a message.")

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
          "aria-label": "Close",
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

  const email = el("input", { class: "Input", placeholder: "Email", type: "email", autocomplete: "email" })
  const password = el("input", { class: "Input", placeholder: "Password", type: "password", autocomplete: "current-password" })
  const error = el("div", { class: "Tiny", style: "color:var(--danger); min-height: 18px" })

  return new Promise((resolve) => {
    openModal({
      title: "Log in to continue",
      body: el("div", { class: "Grid" }, [
        el("div", { class: "Tiny", text: "This prototype stores data locally on this device." }),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: "Email" }), email]),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: "Password" }), password]),
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
          ["Cancel"]
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
                error.textContent = e?.message ?? "Could not log in."
              }
            },
          },
          ["Log in"]
        ),
        el(
          "button",
          {
            class: "Btn",
            type: "button",
            onClick: async () => {
              try {
                const u = await auth.signup({ email: email.value, password: password.value, name: "New User" })
                closeModal()
                resolve(u)
              } catch (e) {
                error.textContent = e?.message ?? "Could not sign up."
              }
            },
          },
          ["Quick sign up"]
        ),
      ],
    })
  })
}

const renderListingCard = (listing, { href }) => {
  const media = el("div", { class: "ListingMedia" }, [
    el("img", { src: listing.photoUrls?.[0] ?? "", alt: listing.title, loading: "lazy" }),
    el("div", { class: "Badge", text: listing.propertyType.toUpperCase() }),
  ])

  const card = el("a", { class: "Card ListingCard", href: `#${href}` }, [
    media,
    el("div", { class: "CardInset Grid" }, [
      el("div", { class: "Row" }, [el("div", { class: "H2", text: listing.title }), el("div", { class: "Price", text: formatPrice(listing.price, listing.currency) })]),
      el("div", { class: "Meta" }, [
        `${listing.city}`,
        listing.propertyType === "land"
          ? `${listing.landAreaSqm ?? "—"} sqm`
          : `${listing.bedrooms ?? 0} bd • ${listing.bathrooms ?? 0} ba • ${listing.areaSqm ?? "—"} sqm`,
      ]),
    ]),
  ])

  return card
}

const setActiveNav = (path) => {
  const items = Array.from(document.querySelectorAll(".NavItem"))
  for (const item of items) item.removeAttribute("data-active")
  const key =
    path.startsWith("/search") ? "search" : path.startsWith("/sell") ? "sell" : path.startsWith("/favorites") ? "favorites" : path.startsWith("/inquiries") ? "inquiries" : "explore"
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

  const searchInput = el("input", { class: "Input", placeholder: "Search city, neighborhood, or keyword", value: q })
  const cityInput = el("input", { class: "Input", placeholder: "City (optional)", value: city })

  const onSearch = () => {
    const params = new URLSearchParams()
    if (searchInput.value.trim()) params.set("q", searchInput.value.trim())
    if (cityInput.value.trim()) params.set("city", cityInput.value.trim())
    navigate(`/search?${params.toString()}`)
  }

  const categoryRow = el("div", { class: "ChipRow" }, [
    el("button", { class: "Chip", type: "button", onClick: () => navigate("/search?type=house") }, ["Houses"]),
    el("button", { class: "Chip", type: "button", onClick: () => navigate("/search?type=apartment") }, ["Apartments"]),
    el("button", { class: "Chip", type: "button", onClick: () => navigate("/search?type=land") }, ["Land"]),
    el("button", { class: "Chip", type: "button", onClick: () => navigate("/search") }, ["All"]),
  ])

  return el("div", { class: "Grid" }, [
    el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("h1", { class: "Title", text: "Find a place that feels like home." }),
        el("p", { class: "P", text: "Browse curated listings, save what you love, and message sellers with one tap." }),
        el("div", { class: "Grid" }, [
          el("div", { class: "Field" }, [el("div", { class: "Label", text: "Search" }), searchInput]),
          el("div", { class: "Field" }, [el("div", { class: "Label", text: "City" }), cityInput]),
        ]),
        el("div", { class: "BtnRow" }, [
          el("button", { class: "Btn BtnPrimary", type: "button", onClick: onSearch }, ["Search"]),
          el("button", { class: "Btn", type: "button", onClick: () => navigate("/sell/new") }, ["List a property"]),
        ]),
        categoryRow,
      ]),
    ]),

    el("div", { class: "Row" }, [el("div", { class: "H2", text: "Featured" }), el("div", { class: "Tiny", text: "Hand-picked highlights" })]),
    el("div", { class: "Grid" }, featured.map((l) => renderListingCard(l, { href: `/listing/${l.id}` }))),

    el("div", { class: "Row", style: "margin-top:4px" }, [
      el("div", { class: "H2", text: "New listings" }),
      el("button", { class: "Chip", type: "button", onClick: () => navigate("/search") }, ["Browse all"]),
    ]),
    el("div", { class: "Grid" }, recent.map((l) => renderListingCard(l, { href: `/listing/${l.id}` }))),
  ])
}

const SearchPage = ({ query }) => {
  const q = query.get("q") ?? ""
  const city = query.get("city") ?? ""
  const type = query.get("type") ?? ""
  const minPrice = query.get("minPrice") ?? ""
  const maxPrice = query.get("maxPrice") ?? ""
  const bedrooms = query.get("bedrooms") ?? ""

  const qInput = el("input", { class: "Input", value: q, placeholder: "Keyword (e.g. terrace, quiet, ridge)" })
  const cityInput = el("input", { class: "Input", value: city, placeholder: "City" })
  const minInput = el("input", { class: "Input", value: minPrice, placeholder: "Min price", inputmode: "numeric" })
  const maxInput = el("input", { class: "Input", value: maxPrice, placeholder: "Max price", inputmode: "numeric" })
  const bedInput = el("input", { class: "Input", value: bedrooms, placeholder: "Bedrooms (min)", inputmode: "numeric" })

  const typeChips = ["", "house", "apartment", "land"].map((t) =>
    el(
      "button",
      {
        class: "Chip",
        type: "button",
        "data-active": t === type ? "true" : undefined,
        onClick: () => {
          const p = new URLSearchParams(query.toString())
          if (t) p.set("type", t)
          else p.delete("type")
          navigate(`/search?${p.toString()}`)
        },
      },
      [t ? t[0].toUpperCase() + t.slice(1) : "All"]
    )
  )

  const apply = () => {
    const p = new URLSearchParams()
    if (qInput.value.trim()) p.set("q", qInput.value.trim())
    if (cityInput.value.trim()) p.set("city", cityInput.value.trim())
    if (type) p.set("type", type)
    if (minInput.value.trim()) p.set("minPrice", minInput.value.trim())
    if (maxInput.value.trim()) p.set("maxPrice", maxInput.value.trim())
    if (bedInput.value.trim()) p.set("bedrooms", bedInput.value.trim())
    navigate(`/search?${p.toString()}`)
  }

  const results = listingService.search({ q, propertyType: type || undefined, minPrice, maxPrice, bedrooms, city })

  return el("div", { class: "Grid" }, [
    el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "Row" }, [el("div", { class: "H2", text: "Search" }), el("div", { class: "Tiny", text: `${results.length} results` })]),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: "Type" }), el("div", { class: "ChipRow" }, typeChips)]),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: "Keyword" }), qInput]),
        el("div", { class: "Grid", style: "grid-template-columns:1fr 1fr; gap:10px" }, [
          el("div", { class: "Field" }, [el("div", { class: "Label", text: "Min price" }), minInput]),
          el("div", { class: "Field" }, [el("div", { class: "Label", text: "Max price" }), maxInput]),
        ]),
        el("div", { class: "Grid", style: "grid-template-columns:1fr 1fr; gap:10px" }, [
          el("div", { class: "Field" }, [el("div", { class: "Label", text: "City" }), cityInput]),
          el("div", { class: "Field" }, [el("div", { class: "Label", text: "Bedrooms" }), bedInput]),
        ]),
        el("div", { class: "BtnRow" }, [
          el("button", { class: "Btn BtnPrimary", type: "button", onClick: apply }, ["Apply filters"]),
          el(
            "button",
            {
              class: "Btn",
              type: "button",
              onClick: () => {
                navigate("/search")
              },
            },
            ["Reset"]
          ),
        ]),
      ]),
    ]),
    results.length
      ? el("div", { class: "Grid" }, results.map((l) => renderListingCard(l, { href: `/listing/${l.id}` })))
      : el("div", { class: "Card" }, [
          el("div", { class: "CardInset Grid" }, [
            el("div", { class: "H2", text: "No matches" }),
            el("p", { class: "P", text: "Try removing a filter or searching for a nearby city." }),
            el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/search") }, ["Clear filters"]),
          ]),
        ]),
  ])
}

const ListingPage = async ({ params }) => {
  const listing = listingService.getById(params.listingId)
  if (!listing || listing.status !== "published") {
    return el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: "Listing not found" }),
        el("p", { class: "P", text: "This listing may have been removed or is not published." }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/search") }, ["Back to search"]),
      ]),
    ])
  }

  const user = auth.getCurrentUser()
  const isSaved = user ? favoritesService.has(user.id, listing.id) : false

  const saveBtn = el("button", { class: "Btn", type: "button" }, [isSaved ? "Saved" : "Save"])
  saveBtn.addEventListener("click", async () => {
    const u = await requireAuth()
    if (!u) return
    favoritesService.toggle(u.id, listing.id)
    toast(favoritesService.has(u.id, listing.id) ? "Saved to favorites" : "Removed from favorites")
    render()
  })

  const contactBtn = el("button", { class: "Btn BtnPrimary", type: "button" }, ["Message seller"])
  contactBtn.addEventListener("click", async () => {
    const u = await requireAuth()
    if (!u) return
    const message = el("textarea", { class: "TextArea", placeholder: "Hi! I’m interested. Is this still available?" })
    const error = el("div", { class: "Tiny", style: "color:var(--danger); min-height:18px" })
    openModal({
      title: "Send inquiry",
      body: el("div", { class: "Grid" }, [
        el("div", { class: "Tiny", text: `To: ${listing.title}` }),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: "Message" }), message]),
        error,
      ]),
      actions: [
        el("button", { class: "Btn", type: "button", onClick: () => closeModal() }, ["Cancel"]),
        el(
          "button",
          {
            class: "Btn BtnPrimary",
            type: "button",
            onClick: () => {
              try {
                const threadId = inquiryService.startThread({ listingId: listing.id, buyerUserId: u.id, initialMessage: message.value })
                closeModal()
                toast("Inquiry sent")
                navigate(`/inquiries/${threadId}`)
              } catch (e) {
                error.textContent = e?.message ?? "Could not send."
              }
            },
          },
          ["Send"]
        ),
      ],
    })
  })

  const stats = [
    { label: "Type", value: listing.propertyType[0].toUpperCase() + listing.propertyType.slice(1) },
    { label: "City", value: listing.city },
    listing.propertyType !== "land" ? { label: "Bedrooms", value: String(listing.bedrooms ?? 0) } : null,
    listing.propertyType !== "land" ? { label: "Bathrooms", value: String(listing.bathrooms ?? 0) } : null,
    listing.propertyType !== "land" ? { label: "Area", value: listing.areaSqm ? `${listing.areaSqm} sqm` : "—" } : null,
    listing.propertyType === "land" ? { label: "Land size", value: listing.landAreaSqm ? `${listing.landAreaSqm} sqm` : "—" } : null,
  ].filter(Boolean)

  const render = () => {
    clear(main)
    const u = auth.getCurrentUser()
    const saved = u ? favoritesService.has(u.id, listing.id) : false
    saveBtn.textContent = saved ? "Saved" : "Save"
    saveBtn.className = saved ? "Btn" : "Btn"

    main.append(
      el("div", { class: "Grid" }, [
        el("div", { class: "Card ListingCard" }, [
          el("div", { class: "ListingMedia" }, [
            el("img", { src: listing.photoUrls?.[0] ?? "", alt: listing.title }),
            el("div", { class: "Badge", text: listing.propertyType.toUpperCase() }),
          ]),
          el("div", { class: "CardInset Grid" }, [
            el("div", { class: "Row" }, [
              el("div", { class: "H2", text: listing.title }),
              el("div", { class: "Price", text: formatPrice(listing.price, listing.currency) }),
            ]),
            el("div", { class: "Meta" }, [`${listing.city} • ${listing.addressLine ?? ""}`]),
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
        el("div", { class: "H2", text: "Saved listings" }),
        el("p", { class: "P", text: "Log in to save listings to this device." }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/account") }, ["Go to account"]),
      ]),
    ])
  }

  const ids = favoritesService.getIds(user.id)
  const listings = ids.map((id) => listingService.getById(id)).filter(Boolean)

  return el("div", { class: "Grid" }, [
    el("div", { class: "Row" }, [el("div", { class: "H2", text: "Saved" }), el("div", { class: "Tiny", text: `${listings.length} items` })]),
    listings.length
      ? el("div", { class: "Grid" }, listings.map((l) => renderListingCard(l, { href: `/listing/${l.id}` })))
      : el("div", { class: "Card" }, [
          el("div", { class: "CardInset Grid" }, [
            el("div", { class: "H2", text: "Nothing saved yet" }),
            el("p", { class: "P", text: "Tap Save on any listing to keep it here." }),
            el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/search") }, ["Browse listings"]),
          ]),
        ]),
  ])
}

const SellerDashboardPage = async () => {
  const user = await requireAuth()
  if (!user) {
    return el("div", { class: "Card" }, [el("div", { class: "CardInset Grid" }, [el("div", { class: "H2", text: "Seller dashboard" }), el("p", { class: "P", text: "Log in to manage your listings." })])])
  }

  const mine = listingService.getMine(user.id)

  return el("div", { class: "Grid" }, [
    el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "Row" }, [el("div", { class: "H2", text: "Your listings" }), el("div", { class: "Tiny", text: `${mine.length} total` })]),
        el("p", { class: "P", text: "Draft, publish, edit, or archive your properties." }),
        el("div", { class: "BtnRow" }, [
          el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/sell/new") }, ["Create new listing"]),
          el("button", { class: "Btn", type: "button", onClick: () => navigate("/search") }, ["View marketplace"]),
        ]),
      ]),
    ]),
    mine.length
      ? el(
          "div",
          { class: "Grid" },
          mine.map((l) => {
            const card = renderListingCard(l, { href: `/sell/${l.id}/edit` })
            const tag = el("div", { class: "Badge", text: l.status.toUpperCase(), style: "left:auto; right:12px; background:rgba(22,25,24,0.78)" })
            card.querySelector(".ListingMedia")?.append(tag)
            return card
          })
        )
      : el("div", { class: "Card" }, [
          el("div", { class: "CardInset Grid" }, [
            el("div", { class: "H2", text: "No listings yet" }),
            el("p", { class: "P", text: "Create your first listing in a few minutes." }),
            el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/sell/new") }, ["Start selling"]),
          ]),
        ]),
  ])
}

const SellFormPage = async ({ params }) => {
  const user = await requireAuth()
  if (!user) return el("div", { class: "Card" }, [el("div", { class: "CardInset Grid" }, [el("div", { class: "H2", text: "Sell" }), el("p", { class: "P", text: "Log in to create a listing." })])])

  const editing = Boolean(params.listingId)
  const existing = editing ? listingService.getById(params.listingId) : null
  if (editing && (!existing || existing.ownerUserId !== user.id)) {
    return el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: "Listing not found" }),
        el("p", { class: "P", text: "You can only edit your own listings." }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/sell") }, ["Back to dashboard"]),
      ]),
    ])
  }

  const propertyType = el("select", { class: "Select" }, [
    el("option", { value: "house", text: "House" }),
    el("option", { value: "apartment", text: "Apartment" }),
    el("option", { value: "land", text: "Land" }),
  ])
  const title = el("input", { class: "Input", placeholder: "Short title", value: existing?.title ?? "" })
  const price = el("input", { class: "Input", placeholder: "Price (USD)", inputmode: "numeric", value: existing?.price ?? "" })
  const city = el("input", { class: "Input", placeholder: "City", value: existing?.city ?? "" })
  const addressLine = el("input", { class: "Input", placeholder: "Neighborhood / address line", value: existing?.addressLine ?? "" })
  const description = el("textarea", { class: "TextArea", placeholder: "Describe the property in a few lines", value: existing?.description ?? "" })
  const photoUrl = el("input", { class: "Input", placeholder: "Photo URL (optional)", value: existing?.photoUrls?.[0] ?? "" })

  const bedrooms = el("input", { class: "Input", placeholder: "Bedrooms", inputmode: "numeric", value: existing?.bedrooms ?? 0 })
  const bathrooms = el("input", { class: "Input", placeholder: "Bathrooms", inputmode: "numeric", value: existing?.bathrooms ?? 0 })
  const areaSqm = el("input", { class: "Input", placeholder: "Area (sqm)", inputmode: "numeric", value: existing?.areaSqm ?? "" })
  const landAreaSqm = el("input", { class: "Input", placeholder: "Land size (sqm)", inputmode: "numeric", value: existing?.landAreaSqm ?? "" })

  propertyType.value = existing?.propertyType ?? "house"

  const formError = el("div", { class: "Tiny", style: "color:var(--danger); min-height:18px" })
  const helper = el("div", { class: "Tiny" })

  const setHelper = () => {
    const t = propertyType.value
    helper.textContent =
      t === "land"
        ? "For land, bedrooms/bathrooms are hidden. Add land size and a clear location."
        : "Add bedrooms, bathrooms, and size so buyers can compare quickly."
  }

  const factsGrid = el("div", { class: "Grid", style: "grid-template-columns:1fr 1fr; gap:10px" }, [])

  const rerenderFacts = () => {
    clear(factsGrid)
    if (propertyType.value === "land") {
      factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: "Land size (sqm)" }), landAreaSqm]))
      factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: "Notes" }), el("div", { class: "Tiny", text: "Include access road / utilities in description." })]))
      return
    }
    factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: "Bedrooms" }), bedrooms]))
    factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: "Bathrooms" }), bathrooms]))
    factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: "Area (sqm)" }), areaSqm]))
    factsGrid.append(el("div", { class: "Field" }, [el("div", { class: "Label", text: "Land size (optional)" }), landAreaSqm]))
  }

  propertyType.addEventListener("change", () => {
    setHelper()
    rerenderFacts()
  })

  setHelper()
  rerenderFacts()

  const validate = () => {
    formError.textContent = ""
    if (!title.value.trim()) throw new Error("Title is required.")
    if (!city.value.trim()) throw new Error("City is required.")
    const p = clampInt(price.value)
    if (!Number.isFinite(p) || p <= 0) throw new Error("Enter a valid price.")
    if (!description.value.trim() || description.value.trim().length < 20) throw new Error("Add a longer description (20+ characters).")
    if (propertyType.value === "land") {
      const land = clampInt(landAreaSqm.value)
      if (!Number.isFinite(land) || land <= 0) throw new Error("Enter land size (sqm).")
    }
  }

  const saveDraft = () => {
    validate()
    const next = listingService.upsertDraft({
      userId: user.id,
      listing: {
        id: existing?.id,
        createdAt: existing?.createdAt,
        status: existing?.status ?? "draft",
        propertyType: propertyType.value,
        title: title.value.trim(),
        description: description.value.trim(),
        price: clampInt(price.value),
        country: "United States",
        city: city.value.trim(),
        addressLine: addressLine.value.trim(),
        bedrooms: clampInt(bedrooms.value),
        bathrooms: clampInt(bathrooms.value),
        areaSqm: clampInt(areaSqm.value),
        landAreaSqm: clampInt(landAreaSqm.value),
        photoUrls: photoUrl.value.trim() ? [photoUrl.value.trim()] : [],
      },
    })
    toast("Draft saved")
    return next
  }

  const publish = () => {
    const draft = saveDraft()
    listingService.publish(draft.id, user.id)
    toast("Listing published")
    navigate("/sell")
  }

  const archive = () => {
    if (!existing) return
    listingService.archive(existing.id, user.id)
    toast("Listing archived")
    navigate("/sell")
  }

  return el("div", { class: "Grid" }, [
    el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "Row" }, [el("div", { class: "H2", text: editing ? "Edit listing" : "Create listing" }), el("div", { class: "Tiny", text: editing ? existing?.status?.toUpperCase() ?? "" : "DRAFT" })]),
        helper,
        el("div", { class: "Field" }, [el("div", { class: "Label", text: "Property type" }), propertyType]),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: "Title" }), title]),
        el("div", { class: "Grid", style: "grid-template-columns:1fr 1fr; gap:10px" }, [
          el("div", { class: "Field" }, [el("div", { class: "Label", text: "Price (USD)" }), price]),
          el("div", { class: "Field" }, [el("div", { class: "Label", text: "City" }), city]),
        ]),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: "Neighborhood / address line" }), addressLine]),
        el("div", { class: "Field" }, [el("div", { class: "Label", text: "Photo URL" }), photoUrl]),
        factsGrid,
        el("div", { class: "Field" }, [el("div", { class: "Label", text: "Description" }), description]),
        formError,
        el("div", { class: "BtnRow" }, [
          el("button", { class: "Btn", type: "button", onClick: () => navigate("/sell") }, ["Back"]),
          el(
            "button",
            {
              class: "Btn",
              type: "button",
              onClick: () => {
                try {
                  saveDraft()
                } catch (e) {
                  formError.textContent = e?.message ?? "Could not save."
                }
              },
            },
            ["Save draft"]
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
                  formError.textContent = e?.message ?? "Could not publish."
                }
              },
            },
            ["Publish"]
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
                ["Archive"]
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
        el("div", { class: "H2", text: "Inquiries" }),
        el("p", { class: "P", text: "Log in to message sellers and track your conversations." }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/account") }, ["Go to account"]),
      ]),
    ])
  }

  const threads = inquiryService.getThreadsForUser(user.id)

  const cards = threads.map((t) => {
    const listing = listingService.getById(t.listingId)
    const msgs = inquiryService.getMessages(t.id)
    const last = msgs[msgs.length - 1]
    return el("div", { class: "Card", style: "cursor:pointer" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "Row" }, [
          el("div", { class: "H2", text: listing?.title ?? "Listing" }),
          el("div", { class: "Tiny", text: new Date(t.updatedAt).toLocaleDateString() }),
        ]),
        el("div", { class: "Tiny", text: listing ? `${listing.city} • ${formatPrice(listing.price, listing.currency)}` : "" }),
        el("div", { class: "P", text: last ? last.body : "No messages yet." }),
      ]),
    ])
  })

  for (const [idx, card] of cards.entries()) {
    card.addEventListener("click", () => navigate(`/inquiries/${threads[idx].id}`))
  }

  return el("div", { class: "Grid" }, [
    el("div", { class: "Row" }, [el("div", { class: "H2", text: "Inquiries" }), el("div", { class: "Tiny", text: `${threads.length} threads` })]),
    threads.length
      ? el("div", { class: "Grid" }, cards)
      : el("div", { class: "Card" }, [
          el("div", { class: "CardInset Grid" }, [
            el("div", { class: "H2", text: "No inquiries yet" }),
            el("p", { class: "P", text: "Open a listing and message the seller to start." }),
            el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/search") }, ["Browse listings"]),
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
        el("div", { class: "H2", text: "Thread not found" }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/inquiries") }, ["Back"]),
      ]),
    ])
  }

  if (thread.buyerUserId !== user.id && thread.sellerUserId !== user.id) {
    return el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: "Not allowed" }),
        el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/inquiries") }, ["Back"]),
      ]),
    ])
  }

  const listing = listingService.getById(thread.listingId)
  const messages = inquiryService.getMessages(thread.id)

  const body = el("div", { class: "Grid" }, [
    el("div", { class: "Row" }, [el("div", { class: "H2", text: listing?.title ?? "Inquiry" }), el("button", { class: "Chip", type: "button", onClick: () => navigate(`/listing/${thread.listingId}`) }, ["View listing"])]),
    el("div", { class: "Tiny", text: listing ? `${listing.city} • ${formatPrice(listing.price, listing.currency)}` : "" }),
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

  const input = el("textarea", { class: "TextArea", placeholder: "Write a message…" })
  const err = el("div", { class: "Tiny", style: "color:var(--danger); min-height:18px" })

  const send = () => {
    try {
      inquiryService.sendMessage({ threadId: thread.id, senderUserId: user.id, body: input.value })
      input.value = ""
      toast("Sent")
      navigate(`/inquiries/${thread.id}`)
    } catch (e) {
      err.textContent = e?.message ?? "Could not send."
    }
  }

  return el("div", { class: "Grid" }, [
    el("div", { class: "BtnRow" }, [el("button", { class: "Btn", type: "button", onClick: () => navigate("/inquiries") }, ["Back"])]),
    el("div", { class: "Card" }, [el("div", { class: "CardInset" }, [body])]),
    el("div", { class: "StickyFooter" }, [
      el("div", { class: "Grid" }, [
        el("div", { class: "Field" }, [el("div", { class: "Label", text: "Reply" }), input]),
        err,
        el("div", { class: "BtnRow" }, [el("button", { class: "Btn BtnPrimary", type: "button", onClick: send }, ["Send message"])]),
      ]),
    ]),
  ])
}

const AccountPage = () => {
  const user = auth.getCurrentUser()
  if (!user) {
    const email = el("input", { class: "Input", type: "email", placeholder: "Email", autocomplete: "email" })
    const name = el("input", { class: "Input", placeholder: "Name", autocomplete: "name" })
    const password = el("input", { class: "Input", type: "password", placeholder: "Password (6+ chars)", autocomplete: "new-password" })
    const error = el("div", { class: "Tiny", style: "color:var(--danger); min-height:18px" })

    const signup = async () => {
      try {
        await auth.signup({ email: email.value, password: password.value, name: name.value })
        toast("Welcome")
        navigate("/account")
      } catch (e) {
        error.textContent = e?.message ?? "Could not sign up."
      }
    }

    const login = async () => {
      try {
        await auth.login({ email: email.value, password: password.value })
        toast("Logged in")
        navigate("/account")
      } catch (e) {
        error.textContent = e?.message ?? "Could not log in."
      }
    }

    return el("div", { class: "Grid" }, [
      el("div", { class: "Card" }, [
        el("div", { class: "CardInset Grid" }, [
          el("div", { class: "H2", text: "Account" }),
          el("p", { class: "P", text: "Log in to save favorites, send inquiries, and list properties." }),
          el("div", { class: "Field" }, [el("div", { class: "Label", text: "Email" }), email]),
          el("div", { class: "Field" }, [el("div", { class: "Label", text: "Name (for sign up)" }), name]),
          el("div", { class: "Field" }, [el("div", { class: "Label", text: "Password" }), password]),
          error,
          el("div", { class: "BtnRow" }, [
            el("button", { class: "Btn BtnPrimary", type: "button", onClick: signup }, ["Sign up"]),
            el("button", { class: "Btn", type: "button", onClick: login }, ["Log in"]),
          ]),
          el("div", { class: "Tiny", text: "Everything is stored locally on this device for the prototype." }),
        ]),
      ]),
    ])
  }

  const savedCount = favoritesService.getIds(user.id).length
  const myListings = listingService.getMine(user.id)
  const inquiryCount = inquiryService.getThreadsForUser(user.id).length

  return el("div", { class: "Grid" }, [
    el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: `Hi, ${user.name}` }),
        el("p", { class: "P", text: "Manage your activity from here." }),
        el("div", { class: "Grid", style: "grid-template-columns:1fr 1fr; gap:10px" }, [
          el("div", { class: "Card", style: "border-radius:14px; background:rgba(255,255,255,0.72)" }, [
            el("div", { class: "CardInset", style: "padding:12px" }, [el("div", { class: "Tiny", text: "Saved" }), el("div", { style: "font-weight:600; margin-top:3px" }, [String(savedCount)])]),
          ]),
          el("div", { class: "Card", style: "border-radius:14px; background:rgba(255,255,255,0.72)" }, [
            el("div", { class: "CardInset", style: "padding:12px" }, [el("div", { class: "Tiny", text: "Inquiries" }), el("div", { style: "font-weight:600; margin-top:3px" }, [String(inquiryCount)])]),
          ]),
        ]),
        el("div", { class: "BtnRow" }, [
          el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/sell") }, ["Seller dashboard"]),
          el("button", { class: "Btn", type: "button", onClick: () => navigate("/favorites") }, ["Saved"]),
          el("button", { class: "Btn", type: "button", onClick: () => navigate("/inquiries") }, ["Inquiries"]),
        ]),
        myListings.length
          ? el("div", { class: "Tiny", text: `You have ${myListings.length} listing(s).` })
          : el("div", { class: "Tiny", text: "You have no listings yet. Create one from Sell." }),
        el(
          "button",
          {
            class: "Btn",
            type: "button",
            onClick: () => {
              auth.logout()
              toast("Logged out")
              navigate("/account")
            },
          },
          ["Log out"]
        ),
      ]),
    ]),
  ])
}

const routes = [
  { match: /^\/$/, render: (ctx) => ExplorePage(ctx) },
  { match: /^\/search$/, render: (ctx) => SearchPage(ctx) },
  { match: /^\/listing\/([^/]+)$/, render: (ctx) => ListingPage({ ...ctx, params: { listingId: ctx.match[1] } }) },
  { match: /^\/favorites$/, render: () => FavoritesPage() },
  { match: /^\/sell$/, render: () => SellerDashboardPage() },
  { match: /^\/sell\/new$/, render: () => SellFormPage({ params: {} }) },
  { match: /^\/sell\/([^/]+)\/edit$/, render: (ctx) => SellFormPage({ params: { listingId: ctx.match[1] } }) },
  { match: /^\/inquiries$/, render: () => InquiriesListPage() },
  { match: /^\/inquiries\/([^/]+)$/, render: (ctx) => InquiryThreadPage({ params: { threadId: ctx.match[1] } }) },
  { match: /^\/account$/, render: () => AccountPage() },
]

const render = async () => {
  const { path, query } = parseRoute()
  setActiveNav(path)

  clear(main)
  main.append(
    el("div", { class: "Card" }, [
      el("div", { class: "CardInset Grid" }, [
        el("div", { class: "H2", text: "Loading" }),
        el("p", { class: "P", text: "Preparing the next view…" }),
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
          el("div", { class: "H2", text: "Page not found" }),
          el("p", { class: "P", text: "That page doesn’t exist in this prototype." }),
          el("button", { class: "Btn BtnPrimary", type: "button", onClick: () => navigate("/") }, ["Go home"]),
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

document.getElementById("globalSearchBtn")?.addEventListener("click", () => navigate("/search"))
document.getElementById("accountBtn")?.addEventListener("click", () => navigate("/account"))

ensureSeed()
window.addEventListener("hashchange", render)
render()
