# Santosh Bakers — Kota, Rajasthan

A fast, single‑page website for **Santosh Bakers (संतोष बेकर्स), Kota** — built as a
plain static site with **no backend, no database and no build step**.

Everything is hand‑written HTML, CSS and vanilla JS, so it deploys free on Vercel
(or any static host) and loads in well under a second.

---

## What's inside

| File | Purpose |
| --- | --- |
| `index.html` | All content + structured data (JSON‑LD) for the four outlets |
| `assets/css/style.css` | Design system, layout, animations, responsive rules |
| `assets/js/main.js` | Nav, scroll reveal, scroll‑spy, FAQ, WhatsApp cake‑enquiry builder |
| `assets/img/` | Hero + 4 signature cake photos, daily counter photo, favicon |
| `vercel.json` | Static hosting config (clean URLs, caching, basic security headers) |
| `robots.txt`, `sitemap.xml` | SEO basics |

**Order-on-apps tabs** sit directly under the hero buttons ("Order a cake" and
"See signature cakes"): Swiggy (orange) and Zomato (red) pills that open the
bakery's live listings, so app customers can order without hunting for a link.

No npm packages, no framework, no external JS. The only network requests are
Google Fonts (Fraunces + Manrope) and the images in `assets/img`.

---

## Outlets included

Only the four same‑owner outlets are listed — **Gumanpura, R K Puram, Dadabari and
Kunhadi**. (Talwandi and the Ramganj Mandi shop are intentionally **not** on the site.)

| Outlet | Address | Phone | Hours |
| --- | --- | --- | --- |
| Gumanpura (flagship) | 123, Kotri Road, Ballabhbari, Gumanpura, Kota 324007 | +91 95872 74379 | 8:00 AM – 11:30 PM |
| R K Puram | 154B, R K Puram Road, opposite D Mart, Kota 324005 | +91 95872 74345 | 9:00 AM – 11:00 PM |
| Dadabari | 1, CH‑15, Swami Dayanand Saraswati Road, Dadabari Extension, Kota 324009 | +91 95872 74325 | 8:30 AM – 10:30 PM |
| Kunhadi | Shop 3–4, Landmark City, opposite Allen Samyak, Kota 324008 | +91 95872 74321 | 9:00 AM – 11:00 PM |

Each card links to the Google Maps listing that was shared for that outlet.
The Instagram bio lists Dadabari as `95872 74379` (same as Gumanpura) while the
Dadabari Google listing shows `95872 74325` — the site uses the outlet‑specific
number. Change it in one place if needed (see below).

---

## How to edit

**Prices** — search `index.html` for `cake-card__price` (the four cakes) and
`price-row__amount` (the daily counter list). Every price is plain text; no JS
build required.

**Phone / WhatsApp number** — the WhatsApp number is used in two places:
1. `assets/js/main.js` → `WHATSAPP_NUMBER = "919587274379"`
2. The `wa.me/...` links inside `index.html` (hero, cake cards, footer, floating button).

Replace `919587274379` with any other outlet's number (`91` + 10 digits, no `+` or spaces).

**Photos** — drop a new image into `assets/img/` with the same filename to replace
one, or update the `src` in `index.html`. Recommended: 1400 × 933 px, JPEG, under 250 KB.

**Swiggy / Zomato links** — the two app tabs under the hero buttons (and the links
in the final CTA, FAQ and footer) point to:

- Swiggy: `https://www.swiggy.com/city/kota/santosh-bakery-kothari-road-chawani-rest98322`
- Zomato: `https://www.zomato.com/kota/santosh-bakers-chawani/order`

Search `index.html` for `swiggy.com` / `zomato.com` to update them; also update
`sameAs` in the JSON-LD block at the bottom of the page.

**KotaLabs credit** — the bottom card links to `https://kotalabs.xyz` (placeholder);
update both `href="https://kotalabs.xyz"` links when the real URL is ready.

**Canonical / sitemap domain** — currently `https://santoshbakers.in/`. Update
`<link rel="canonical">`, `sitemap.xml` and `robots.txt` once the domain is final.

---

## Run it locally

```bash
python3 -m http.server 3000
# open http://localhost:3000
```

## Deploy free on Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Other**. Build command: *(empty)*. Output directory: `.` (root).
4. Deploy. Add the custom domain later under **Settings → Domains**.

Or drag the folder into <https://vercel.com/new> — no configuration needed.

---

## Notes

- The cake "enquiry builder" only composes a pre‑filled WhatsApp message — nothing
  is sent to or stored on a server, so there is no form backend to maintain.
- Menu prices are indicative and taken from the bakery's published listings
  (Swiggy/Zomato/Google); the site says so under the menu and cake grid.
- All images are AI‑generated placeholders in the brand's style. Swap in real
  product photos from the outlets when available — that is the single biggest
  upgrade for the site.
