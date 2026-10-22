#!/usr/bin/env python3
"""Site integrity check for A Physicist's Perspective (static GitHub Pages site).
Run locally:  python3 tools/site-check.py
In CI:        .github/workflows/check.yml
Checks every top-level .html page:
  1. all inline <script> blocks parse (node --check)
  2. favicon present; og:image present (404.html exempt)
  3. every local href/src target exists on disk
  4. the shared assets login.js / login.css / cursor.js exist
Exits non-zero if anything fails.
"""
import pathlib, re, subprocess, sys, tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
pages = sorted(ROOT.glob('*.html'))
fails = []

for asset in ('login.js', 'login.css', 'cursor.js', 'og-image.png'):
    if not (ROOT / asset).exists():
        fails.append(f'missing shared asset: {asset}')

script_re = re.compile(r'<script>(.*?)</script>', re.S)
checked = 0
with tempfile.TemporaryDirectory() as td:
    for page in pages:
        s = page.read_text(encoding='utf-8')
        if 'rel="icon"' not in s:
            fails.append(f'{page.name}: no favicon')
        if page.name != '404.html' and 'og:image' not in s:
            fails.append(f'{page.name}: no og:image')
        for i, js in enumerate(script_re.findall(s)):
            p = pathlib.Path(td) / f'{page.stem}_{i}.js'
            p.write_text(js, encoding='utf-8')
            r = subprocess.run(['node', '--check', str(p)], capture_output=True, text=True)
            checked += 1
            if r.returncode != 0:
                fails.append(f'{page.name}: inline script #{i} fails node --check')
        markup = script_re.sub('<script></script>', s)  # ignore JS template strings
        for ref in re.findall(r'(?:href|src)="([^"#]+)"', markup):
            if ref.startswith(('http://', 'https://', 'mailto:', 'tel:', 'data:', 'javascript:')):
                continue
            target = (ROOT / ref.split('?')[0]).resolve()
            if not target.exists():
                fails.append(f'{page.name}: broken local ref -> {ref}')

for extra in ('login.js', 'cursor.js'):
    r = subprocess.run(['node', '--check', str(ROOT / extra)], capture_output=True, text=True)
    if r.returncode != 0:
        fails.append(f'{extra}: fails node --check')

print(f'checked {len(pages)} pages, {checked} inline scripts')
if fails:
    print('FAILURES:')
    for f in fails:
        print(' -', f)
    sys.exit(1)
print('ALL CHECKS PASSED')
