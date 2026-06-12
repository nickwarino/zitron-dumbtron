"""Load and save the window.X= data files in assets/.

Each data file is a one-line `window.NAME=<json>` (optionally with a leading
comment and a trailing semicolon). The assets are the canonical data store;
crawl/ holds provenance. Edit via load()/save() so formatting survives.
"""
import json
import re

VARS = {
    'assets/claims-full.js': 'CLAIMS_FULL',
    'assets/categories.js': 'CATEGORIES',
    'assets/lenses.js': 'LENSES',
    'assets/cheapness.js': 'CHEAPNESS',
    'assets/comparisons.js': 'COMPARISONS',
    'assets/analysts.js': 'ANALYSTS',
    'assets/hayes.js': 'HAYES',
    'assets/bruenig-transcript.js': 'BRUENIG_TX',
    'assets/tooze-transcript.js': 'TOOZE_TX',
}


def load(path, var=None):
    raw = open(path).read()
    pat = re.compile(r'window\.' + (var or r'[A-Z_]+') + r'\s*=')
    m = pat.search(raw)
    header, payload = raw[:m.end()], raw[m.end():]
    trail = ';' if payload.rstrip().endswith(';') else ''
    data = json.loads(payload.rstrip().rstrip(';'))
    return data, header, trail


def save(path, data, header, trail=''):
    out = header + json.dumps(data, ensure_ascii=False) + trail
    open(path, 'w').write(out)
