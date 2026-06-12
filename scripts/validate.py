"""Regression checks for the site data. Run after any data edit: make check.

Checks: every data file parses; verdict-to-correctness mapping holds;
no em/en dashes or transform scars in generated prose (verbatim quote
fields are exempt); prints the headline stats so prose can be synced.
"""
import json
import re
import statistics as st
import sys
import os

os.chdir(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, 'scripts')
from assetlib import VARS, load

VERDICT_MAP = {'Correct': 5, 'Mostly correct': 4, 'Mixed': 3,
               'Overstated': 2, 'Mostly wrong': 2, 'Wrong': 1}
UNSCORED = {'Too early to tell', 'Unverifiable'}
# verbatim fields keep the author's own punctuation; srcs/src_title are
# external publication titles
QUOTE_FIELDS = {'quote', 'q', 'passage', 'text', 'srcs', 'src_title'}
ABBR = ('al', 'etc', 'e.g', 'i.e', 'vs', 'inc', 'co', 'no', 'st')
LOWER_BRANDS = re.compile(r'^(a16z|w\d+|x\.com|iphone|wheresyoured)')

errors = []


def walk(node, path, fn):
    if isinstance(node, dict):
        for k, v in node.items():
            walk(v, path + [k], fn)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            walk(v, path + [str(i)], fn)
    elif isinstance(node, str):
        fn(node, path)


def check_prose(s, path):
    if any(p in QUOTE_FIELDS for p in path):
        return
    if 'http' in s and len(s) < 200 and ' ' not in s.strip():
        return  # bare URL
    plain = re.sub(r'<[^>]+>', '', s)  # ignore dashes inside tag attrs
    if '—' in plain or '–' in plain:
        errors.append(f"dash in generated prose: {'.'.join(path)}: ...{plain[:90]}")
    for m in re.finditer(r'(\w[\w%)\'"]*)\. ([a-z][\w]*)', plain):
        last = m.group(1).split('.')[-1].split("'")[0]
        if len(last) > 1 and last.lower() not in ABBR and not LOWER_BRANDS.match(m.group(2)):
            errors.append(f"scar (lowercase after period): {'.'.join(path)}: "
                          f"...{plain[max(0, m.start()-40):m.end()+40]}")


# hand-written JS literals (unquoted keys, verbatim quotes), not generated JSON
HAND_WRITTEN = {'HAYES', 'BRUENIG_TX', 'TOOZE_TX'}

for path, var in VARS.items():
    if var in HAND_WRITTEN:
        continue
    try:
        data, _, _ = load(path, var)
    except Exception as e:  # noqa: BLE001
        errors.append(f'{path}: does not parse: {e}')
        continue
    walk(data, [path], check_prose)
    if var == 'CLAIMS_FULL':
        claims = data

for c in claims:
    v, corr = c['verdict'], c['correctness']
    if v in VERDICT_MAP and corr != VERDICT_MAP[v]:
        errors.append(f"{c['id']}: verdict {v} but correctness {corr}")
    if v in UNSCORED and corr is not None:
        errors.append(f"{c['id']}: verdict {v} should carry no score")

ai = [c for c in claims if c['domain'] == 'AI' and c['correctness'] is not None]


def tier_counts(tiers):
    s = [c for c in ai if c['stakes'] in tiers]
    return (len(s), sum(1 for c in s if c['correctness'] <= 2),
            sum(1 for c in s if c['correctness'] >= 4),
            sum(1 for c in s if c['correctness'] == 3))


print('=== headline stats (sync the prose to these) ===')
for t in (('S1', 'S2'), ('S5', 'S6')):
    n, w, r, m = tier_counts(t)
    print(f"{'+'.join(t)}: {w} wrong / {r} right / {m} mixed of {n} scored "
          f"({w / n * 100:.0f}% wrong)")
dist = [c['correctness'] for c in ai if c['distinct'] == 'distinctive']
ts = [c['correctness'] for c in ai if c['distinct'] == 'table-stakes']
print(f'distinctive {st.mean(dist):.2f} / table-stakes {st.mean(ts):.2f}')
crypto = [c['correctness'] for c in claims
          if c['domain'] == 'crypto-web3' and c['correctness'] is not None]
print(f'crypto {st.mean(crypto):.2f} / AI {st.mean([c["correctness"] for c in ai]):.2f}')
wts = {'S1': 7, 'S2': 6, 'S3': 5, 'S4': 4, 'S5': 3, 'S6': 2, 'S7': 1}
print(f"stakes-weighted {sum(c['correctness'] * wts[c['stakes']] for c in ai) / sum(wts[c['stakes']] for c in ai):.2f}")
for t in ('S1', 'S2', 'S7'):
    xs = [c['correctness'] for c in ai if c['stakes'] == t]
    print(f'{t} mean {st.mean(xs):.2f} (n={len(xs)})')
moved = sum(1 for c in claims if c['stakes'] != c['stakes_auto'])
print(f'hand pass moved {moved}/{len(claims)} ({moved / len(claims) * 100:.0f}%)')

print()
if errors:
    print(f'=== {len(errors)} PROBLEMS ===')
    for e in errors[:40]:
        print(e)
    sys.exit(1)
print('all checks pass')
