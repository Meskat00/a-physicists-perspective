# A Physicist's Perspective — GitHub Pages (full site)

Student website by Meskat: lectures + MCQ exam papers in one place.
Plain HTML/CSS/JS — no build step, no framework. Just upload and enable Pages.

## Pages in this repo
| File | What it is |
|---|---|
| `index.html` | Home — hero, progress tracker, Daily Challenge, mini-quiz, all exams, lectures, resources |
| `exams.html` | Dedicated exams page — all 23 sets, search + filters, progress syncs with home (same browser storage) |
| `series-physics-admission.html` | Lecture series 'Physics Admission Program' — 6 Vector episodes in playlist order, paper/set block directly under each player, YouTube fallback links |
| `lectures.html` | Lectures & videos — new-channel videos land here as embedded players, each paired with its chapter's exam |
| `problems.html` | Problem-wise practice — 15 real vector problems with answers in disclosure, source-set links, honest video-explanation status |
| `chapter-vector.html` / `chapter-circular-motion.html` / `chapter-straight-line.html` | Chapter pages — every set of the chapter on one direct URL, with lesson + paper links |
| `sitemap.xml` / `robots.txt` | SEO — all published pages listed |
| `about.html` | About Meskat, how the site works, support/Donate (bKash/Nagad 01731871692) |
| `circular-motion-mcq-30.html` | Printable A4 MCQ paper — বৃত্তাকার গতি, 30 questions, answer key on separate page |
| `404.html` | Branded not-found page (GitHub Pages uses it automatically) |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Content (verified)
- **23 live Google Forms exam sets = 495 MCQs**: বৃত্তাকার গতি 30 · ভেক্টর HSC 5×30 ·
  ভেক্টর Admission 5×30 · ভেক্টর বিগত-বছরের ধাঁচে 9×15 · ভেক্টর লব্ধি 10 · সরলরেখা 2×10
- Videos come ONLY from Meskat's new student channel (name/link pending).
  Videos from any previous/old channel are never used here.

## Deploy (one time, ~3 minutes)
1. Create a NEW repo on github.com, e.g. `a-physicists-perspective` (do NOT reuse `habitus-os-personal`).
2. Upload ALL files in this folder via "Add file → Upload files" (including `.nojekyll` — if the web UI hides dotfiles, the site still works without it).
3. Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.
4. Live at `https://meskat00.github.io/a-physicists-perspective/` in ~1 minute.

## Structure notes (audit pass, 2026-10-21)
- Every lesson card/video carries its question-paper block directly with it; where no paper exists yet the block says so honestly instead of showing a dummy link.
- Exams page filters/search are shareable: `exams.html?filter=ভেক্টর&q=লব্ধি` — plus a clear-all (✕ সব মুছো) button.
- Chapter counts are generated from the real catalog: Vector 20 sets/445 MCQ, Circular Motion 1/30, Straight Line 2/20 = 23 sets/495.

## Standing owner rule (2026-10-21)
Whenever a new MCQ Google Form is created for Meskat, it is added to this website in the **same task** (EXAMS lists in `index.html` + `exams.html`, the matching `chapter-*.html` page, verified counts) and pushed + live-verified. The form is not finished until it is on the site.

## Adding content later
- **New exam:** copy one block in the `EXAMS` list (bottom of `index.html` AND `exams.html`),
  change `id` (unique), `title`, `q`, Form link. Give the link to Muse and it can do both files for you.
- **New video:** give Muse the new channel's YouTube link → one block in the `VIDEOS`
  list in `index.html` / `lectures.html`, paired with the chapter's exam `id`.

## SSC (মাধ্যমিক) section — 2026-10-21

The site also serves SSC students: a dedicated SSC section (id="ssc") on exams.html and lectures.html lists all 14 NCTB মাধ্যমিক পদার্থবিজ্ঞান chapters (all marked Coming Soon until content is supplied); the homepage Start-Here pathways include an SSC card, and branding lines now read "SSC • HSC • Admission". Future SSC MCQ sets and lectures get filed under these chapters when supplied.

