# A Physicist's Perspective — GitHub Pages (full site)

Student website by Meskat: lectures + MCQ exam papers in one place.
Plain HTML/CSS/JS — no build step, no framework. Just upload and enable Pages.

## Pages in this repo
| File | What it is |
|---|---|
| `index.html` | Home — hero, progress tracker, Daily Challenge, mini-quiz, all exams, lectures, resources |
| `exams.html` | Dedicated exams page — all 23 sets, search + filters, progress syncs with home (same browser storage) |
| `lectures.html` | Lectures & videos — new-channel videos land here as embedded players, each paired with its chapter's exam |
| `about.html` | About Meskat, how the site works, support/Donate (bKash/Nagad 01731454792) |
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

## Adding content later
- **New exam:** copy one block in the `EXAMS` list (bottom of `index.html` AND `exams.html`),
  change `id` (unique), `title`, `q`, Form link. Give the link to Muse and it can do both files for you.
- **New video:** give Muse the new channel's YouTube link → one block in the `VIDEOS`
  list in `index.html` / `lectures.html`, paired with the chapter's exam `id`.
