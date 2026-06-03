# Grant's Martial Arts Academy — Site

Single-page app (`index.html`) for [grantsmartialarts.ca](https://www.grantsmartialarts.ca). Dark theme, mobile-responsive, no framework dependencies.

## Pages

- **Home** — hero, programs grid, schedule preview, philosophy, YouTube, Instagram strip
- **Schedule** — full weekly class table with day/discipline filters
- **Programs** — Gi BJJ, No-Gi BJJ, Muay Thai, Kids, Open Mat, MMA Team, Roll Like a Girl — with live-site images + pricing
  - **MMA Team** (`page-prog-mma`) — young FLA competitive team mentored by TJ Grant. Roster: Matt "Tiger" Harnish (#1 contender 145lb), Breton "The Weapon" Maloney (FLA 135lb champ), James Richardson, Dylan "Candyman" Benjamin, Evan "ET" Thom. Links to [fightleagueatlantic.com](https://www.fightleagueatlantic.com).
  - **Roll Like a Girl** (`page-prog-rlag`) — women's BJJ team program, all levels welcome
- **Instructors** — TJ Grant, Alex MacDonald, supporting coaches
- **Facility** — photos, stats, Google Maps embed
- **Members** — portal links (GymDesk)
- **Community** — trial booking survey

---

## Outstanding: Things That Need Fixing

### 1. Class Schedule
The schedule data in `index.html` (search `const schedule = {`) is **placeholder** — not the real timetable. Needs to be replaced with the actual weekly schedule once confirmed.

**What's known so far (from Instagram/site):**
- Mon: 12pm GI BJJ · 5pm Kids 7+ · 6:15pm GI BJJ · 7:30pm Muay Thai
- Wed: 12pm GI BJJ
- Sat: 9am Kids 4–6 · Kids 7+ (time TBC)
- Tue / Thu / Fri / Sun: unknown

### 2. Instagram Feed
The Instagram strip on the Home page is currently **placeholder gradient tiles** linking to the profile. Needs real post images.

**Options:**
- **Easiest:** Embed a third-party widget (e.g. [Elfsight](https://elfsight.com), [SnapWidget](https://snapwidget.com)) — copy/paste a script tag, no API key needed.
- **Proper:** Instagram Basic Display API — requires a Facebook Developer app and a long-lived access token. Token expires every 60 days unless refreshed.
- **Manual:** Replace gradient tiles with static `<img>` tags pointing to specific post media URLs — works but needs manual updates.

Account: `@grantsmartialarts`

### 3. Instagram Reels Section
There's no dedicated Reels section yet. Once the Instagram feed is connected, Reels can be pulled from the same API/widget or embedded individually via `https://www.instagram.com/reel/{id}/embed`.

### 4. YouTube Feed
The YouTube section on the Home page uses a **static placeholder embed** (no real video loaded). Needs the actual channel/video connected.

**Options:**
- **Single video:** Replace the placeholder `src` with the real YouTube embed URL (`https://www.youtube.com/embed/{VIDEO_ID}`).
- **Latest video feed:** Use the YouTube Data API v3 (`/search` endpoint) with a public API key to pull the latest videos dynamically.

Channel: confirm YouTube channel ID or handle with the team.

### 5. Minor Polish
- Mobile: verify all pages look correct on small screens (iPhone SE / 375px width)
- Programs page images: confirm the 5 Wix CDN images map to the correct disciplines (order assumed from page scrape — may need swapping)
- Footer social links: currently plain text, could add Instagram/YouTube icon links
