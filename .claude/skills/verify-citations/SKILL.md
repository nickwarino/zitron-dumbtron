---
name: verify-citations
description: Fetch every hyperlink cited in the Zitron Dumbtron site and check the claim or quote it is attached to actually appears at that URL. Use after generating, editing, or swarming any cited claim, inline citation, or source link, to catch hallucinated URLs or passages before they ship. Run it whenever sources or citations change.
---

# Verify Citations

This skill checks that the site is not citing hallucinated links or passages. It fetches every cited URL and confirms the associated claim, quote, or passage is actually present at that URL.

## When to use

- After any swarm or agent adds or edits citations, inline links, or source lists.
- After editing `assets/lenses.js`, `assets/categories.js`, `assets/claims-full.js`, `assets/cheapness.js`, `assets/comparisons.js`, or a future `assets/citations.js`.
- Before telling the user a citation pass is done. Never ship a citation that fails this check.

## How to run

```
python3 .claude/skills/verify-citations/verify.py
```

Options:
- `python3 .claude/skills/verify-citations/verify.py assets/lenses.js` to check one file.
- It writes a full report to `crawl/citation_report.json` and prints a summary.

## What it checks

For every cited source it finds, it fetches the URL (following redirects, with a browser user agent) and classifies it:

- **OK** the page loads and the expected text or enough of its key terms are present.
- **WEAK** the page loads but the topical terms are only weakly present. Eyeball it.
- **NOT_FOUND** the page loads but the quoted passage or the claim's key terms are absent. Likely a wrong link or a hallucinated passage. Fix or drop it.
- **DEAD** the URL does not load (HTTP error, timeout, empty). Replace it.

A citation that carries an explicit `passage` or verbatim `quote` is held to a strict substring-style check. A citation that has only a title is held to a softer liveness-and-topic check.

## How to interpret and act

1. Read the printed summary. Anything in NOT_FOUND or DEAD is a likely hallucination or a broken link.
2. For each failure, open the URL, find a real supporting passage, and either fix the link, fix the passage, or remove the citation. Do not invent a replacement; verify it.
3. Re-run until NOT_FOUND and DEAD are zero. WEAK entries should be spot-checked by hand.
4. Note: paywalled or bot-blocked pages can produce false DEAD or WEAK results. Confirm by hand before discarding a citation that is otherwise sound.

## Notes

- Zitron's own quotes (in `comparisons.js` and the recurring-claim timelines) can be verified against the local corpus in `crawl/md/`, which is exact. The script prefers the local copy for wheresyoured.at URLs when present.
- The check is deliberately conservative. It is a tripwire for hallucination, not a proof of correctness. A passage being present does not mean it supports the claim, only that it exists.
