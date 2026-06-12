#!/usr/bin/env python3
"""verify-citations: fetch every cited URL in the Zitron Dumbtron site and check
the attached claim/quote/passage actually appears there. Tripwire for hallucinated
links and passages. See SKILL.md."""
import json, re, sys, os, subprocess, glob
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
os.chdir(ROOT)

def load_js(path):
    raw = open(path, encoding="utf-8", errors="replace").read()
    body = raw.split("=", 1)[1].rstrip().rstrip(";")
    return json.loads(body)

def norm(s):
    s = re.sub(r"<[^>]+>", " ", s or "")
    s = s.lower()
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    return re.sub(r"\s+", " ", s).strip()

def sig_words(s):
    return [w for w in norm(s).split() if len(w) > 3]

# ---- collect citations: list of dicts {label, url, expect, terms} ----
def collect():
    cites = []
    def add(label, url, expect=None, terms=None):
        if url and url.startswith("http"):
            cites.append({"label": label, "url": url, "expect": expect, "terms": terms or label})

    targets = sys.argv[1:] or [
        "assets/lenses.js", "assets/categories.js", "assets/claims-full.js",
        "assets/cheapness.js", "assets/comparisons.js", "assets/citations.js",
    ]
    for t in targets:
        if not os.path.exists(t):
            continue
        if t.endswith("citations.js"):
            data = None
        else:
            data = load_js(t)
        if t.endswith("lenses.js"):
            for x in data:
                for ti, u in x.get("srcs", []):
                    add(f"lens:{x['id']} {ti}", u, terms=ti)
        elif t.endswith("categories.js"):
            for x in data:
                for ti, u in x.get("srcs", []):
                    add(f"cat:{x['id']} {ti}", u, terms=ti)
        elif t.endswith("claims-full.js"):
            for x in data:
                for s in x.get("srcs", []):
                    add(f"claim:{x['id']} {s[0]}", s[1], terms=s[0])
        elif t.endswith("cheapness.js"):
            for s in data.get("srcs", []):
                add(f"cheap {s[0]}", s[1], terms=s[0])
        elif t.endswith("comparisons.js"):
            for f in data.get("families", []):
                for ex in f.get("examples", []):
                    add(f"compare:{f['id']} {ex['date']}", ex["url"], expect=ex["quote"])
        elif t.endswith("citations.js"):
            raw = open(t, encoding="utf-8", errors="replace").read()
            seg = raw.split("window.CITES=", 1)[1].split(";\nwindow.CITES_NAR", 1)[0]
            cobj = json.loads(seg)
            for k, c in cobj.items():
                add(c.get("title") or k, c.get("url"),
                    expect=c.get("passage"), terms=c.get("title"))
    return cites

def fetch(url):
    # prefer local corpus for wheresyoured.at posts
    m = re.match(r"https?://www\.wheresyoured\.at/([^/?#]+)/?$", url)
    if m:
        lp = os.path.join("crawl", "md", m.group(1) + ".md")
        if os.path.exists(lp):
            return open(lp, encoding="utf-8", errors="replace").read(), "local"
    try:
        out = subprocess.run(
            ["curl", "-sSL", "-m", "25", "-A", "Mozilla/5.0 (verify-citations)", url],
            capture_output=True, timeout=30)
        return out.stdout.decode("utf-8", "replace"), "web"
    except Exception as e:
        return "", "error:" + str(e)

def classify(c, text):
    if not text or len(text) < 80:
        return "DEAD", 0.0
    page = norm(text)
    if c["expect"]:
        ws = sig_words(c["expect"])
        if not ws:
            ws = sig_words(c["terms"] or "")
        present = sum(1 for w in set(ws) if w in page)
        frac = present / max(len(set(ws)), 1)
        # also try a contiguous window of the first significant words
        head = " ".join(sig_words(c["expect"])[:8])
        if head and head in page:
            return "OK", 1.0
        return ("OK" if frac >= 0.7 else "WEAK" if frac >= 0.45 else "NOT_FOUND"), round(frac, 2)
    else:
        ws = set(sig_words(c["terms"] or ""))
        if not ws:
            return "OK", 1.0  # nothing to check beyond liveness
        present = sum(1 for w in ws if w in page)
        frac = present / len(ws)
        return ("OK" if frac >= 0.5 else "WEAK" if frac >= 0.25 else "NOT_FOUND"), round(frac, 2)

def main():
    cites = collect()
    # dedupe by (url, expect)
    seen = set(); uniq = []
    for c in cites:
        k = (c["url"], (c["expect"] or "")[:40])
        if k in seen: continue
        seen.add(k); uniq.append(c)
    print(f"Checking {len(uniq)} unique citations...\n")
    report = []; tally = Counter()
    for i, c in enumerate(uniq, 1):
        text, src = fetch(c["url"])
        status, score = classify(c, text)
        tally[status] += 1
        report.append({**c, "status": status, "score": score, "fetched": src})
        flag = "" if status == "OK" else "  <<<"
        print(f"[{status:9s} {score:>4}] {c['label'][:60]}{flag}")
        if status in ("NOT_FOUND", "DEAD"):
            print(f"            {c['url']}")
    os.makedirs("crawl", exist_ok=True)
    json.dump(report, open("crawl/citation_report.json", "w"), ensure_ascii=False, indent=1)
    print("\n=== SUMMARY ===")
    for k in ("OK", "WEAK", "NOT_FOUND", "DEAD"):
        print(f"  {k:10s} {tally.get(k,0)}")
    bad = tally.get("NOT_FOUND", 0) + tally.get("DEAD", 0)
    print(f"\n{'PASS' if bad==0 else 'FAIL'}: {bad} citations need attention. Full report: crawl/citation_report.json")
    sys.exit(1 if bad else 0)

if __name__ == "__main__":
    main()
