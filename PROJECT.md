# Zitron Dumbtron, Project and Methodology

A handoff brief. This document explains what this project is, how it was built, how to extend it, and where to distrust it. It is written so another agent (or a person) can pick it up cold.

## 1. What this is

A static, interactive website that audits Ed Zitron's writing about AI. Zitron runs the newsletter "Where's Your Ed At" (wheresyoured.at) and the Better Offline podcast, and is the internet's most prominent AI-bubble critic. The site scores his claims two ways at once: how correct each one is, and how much rides on it being true. The thesis the site builds and tests is that he is most right where it matters least (company finance) and most wrong where it matters most (whether the technology is real, useful, and improving).

The site lives at `index.html` (the audit) and `methodology.html` (a short method page). It is plain HTML, CSS, and vanilla JS with no build step. Open `index.html` in a browser.

## 2. The deliverable, file by file

```
index.html              The single audit page. All sections, all render JS.
methodology.html        Short public method page.
PROJECT.md              This handoff doc.
assets/
  styles.css            Shared stylesheet. NYT-ish. Light/dark themes.
  claims-full.js        window.CLAIMS_FULL: 610 claims from 110 posts, enriched.
  categories.js         window.CATEGORIES: 12 recurring-claim themes, dated instances, verdicts.
  lenses.js             window.LENSES: 6 adversarially-checked arguments.
  cheapness.js          window.CHEAPNESS: "is AI getting cheaper" verdict + GPT-4 price timeline.
  comparisons.js        window.COMPARISONS: what analogies he uses, ranked, with quotes.
crawl/                  Provenance and intermediate data (see section 6).
  md/                   All 110 post .md files (full text + publish dates).
  *.json                Intermediate extraction/enrichment data.
  *.js                  The background workflow scripts that built the database.
```

Old files deleted on request: the original two-document scorecard (`comprehensive.html`, `claims-docs.js`, `claims-comprehensive.js`) is gone. The comprehensive page is now the only page.

## 3. The page sections (top to bottom)

1. **Hero + intro.** Frame: "it might be a bubble" is table stakes, conceded by Altman, Bezos, Pichai. His distinctive claims are what get graded.
2. **The Rating.** Tier scale S to F. He lands at **D as an analyst, B as a reporter**. Billed as an analyst, so the headline is D. Why not F: real reporting, the bubble is a live risk, "enterprise ROI unproven" is fair. Includes "What the foundational errors mean" (the dependency argument: accurate finance bricks sit on a coin-flip foundation).
3. **The Tell: He Called It Crypto.** The temporal argument. His 2023 crypto/NFT analogy had a clean test; four years ran it; durable mass use is the axis that separates a fraud from a technology, and AI cleared it while crypto never did. He has not updated. His own token-spend scoops refute his "nobody wants it" claim.
4. **Right Where It Matters Least.** The Stakes x Correctness matrix (computed live from CLAIMS_FULL).
5. **What He Compares AI To.** Ranked analogy inventory with hover quotes. Corrects the record: he does not use Theranos; he uses crypto/NFT/metaverse, subprime, Uber/WeWork, and on Enron he disclaims accounting fraud while sarcastically insinuating it (the "NVIDIA Isn't Enron" piece is mockery, not a clean concession).
6. **His Greatest Hits.** 12 recurring-claim dot-timelines. Click to open, hover a dot for the quote, click a dot to open the post. Each theme has a verdict.
7. **Six Arguments, Stress-Tested.** The lenses.
8. **Is AI Getting Cheaper?** Verdict (Zitron is mostly wrong) plus a GPT-4-class price chart and a per-metric breakdown.
9. **How The Argument Moved.** Scope mix by year.
10. **The Database.** All 610 claims, filterable.

## 4. Methodology

**Sources.** Enumerated wheresyoured.at via its sitemap (457 posts, back to 2019). Pulled each post's machine-readable `.md` (carries the real publish date and full text, including premium). 110 posts were AI-relevant.

**Extraction.** A background multi-agent workflow read all 110 posts and pulled 610 dated, falsifiable claims, each tagged by `domain` (AI, crypto-web3, business-pr-culture, etc.), `scope`, and `distinctiveness` (distinctive vs table-stakes). Trivial and purely rhetorical lines were skipped.

**Scoring (the two axes).**
- `verdict` enum: Correct, Mostly correct, Mixed, Too early to tell, Overstated, Mostly wrong, Wrong, Unverifiable.
- `correctness` 1 to 5, derived deterministically: Correct=5, Mostly correct=4, Mixed/Too-early=3, Overstated/Mostly-wrong=2, Wrong=1. Unverifiable and Too-early carry no score and are excluded from averages.
- `stakes` S1 to S7, S1 most consequential. Two layers: `stakes_auto` is the reproducible scope-mapping (tech-viability=S1, demand-adoption=S2, political-economy=S3, bubble-timing=S4, industry-economics=S5, company=S6, other=S7); `stakes` is a per-claim hand-judged tier (a swarm read each claim and overrode the default where content warranted) with `stakes_rationale`. The matrix uses `stakes`. The hand pass moved about a quarter of claims and shifted the picture against Zitron.
- `qgroup` (the four questions), mapped from scope: Capability, Diffusion & utility, Finance & markets, Political economy.
- `knowability`, mapped from claim type: Checkable, Forecast, Interpretive, Normative.

**Recurring-claim timelines.** A separate regex scan of full text, restricted to AI-era posts (2023+) that have at least one AI-domain claim, required to sit near AI context, deduplicated. Each surviving sentence is one dot.

**The lenses.** Each core argument was researched once, then handed to a second agent told to attack both the research and Zitron and revise the verdict. The published verdict is the adversarial one. The price analysis and the durable-vs-stranded-asset analysis were built the same way.

## 5. Key findings (as of 2026-06-11)

- On the combined foundational question (is the tech real, S1, and does it deliver value, S2): **88 wrong, 40 right. More than two to one against.**
- Company and sector finance (S5, S6): ~21% wrong. His strong zone.
- Distinctive claims average 3.00 of 5; table-stakes claims 3.72.
- He was more right about crypto (3.73) than about AI (3.05).
- Ratings apply two sharpening rules. (1) Trajectory lens: a forward/directional capability bet is judged against the trend as of mid-2026, and a narrow correct call on a dead product (e.g. Sora) is not credited as a foundational win. (2) Load-bearing prediction: a claim is graded on the distinctive prediction it asserts, not on a true premise underneath it. "Demand would evaporate" is graded on whether demand evaporated (it did not; demand is real and price-elastic), not on whether the subsidy fact is real, so it is Wrong, not Overstated. Absolute false predictions ("nobody wants it", "has peaked", "never", "evaporate") are Wrong; Overstated is reserved for claims whose core direction is true but exaggerated. The recurring "AI has peaked" call is harmonized so the same prediction scores the same wherever it appears (all instances Wrong). Across these passes roughly 150 of 489 AI claims were re-rated, moving the foundational picture well against Zitron (S1+S2 went from a near coin flip to 88 wrong / 40 right).
- Lens verdicts: bubble-consensus, tech-denialism, productive-bubble all "largely undercut Zitron"; analogy-check and circular-financing "genuinely mixed"; broken-economy "partly supports."
- "Is AI getting cheaper": he is mostly wrong. Price per fixed capability fell ~50 to 200x/year (Epoch), ~1000x over three years (a16z); GPT-4-level intelligence is ~1/1000th its launch cost. His narrow point (frontier launch prices, cost-per-task rising with reasoning tokens) is real but does not support the headline.
- Durable vs stranded assets: GPUs (~half of data-center capex, 3 to 5 year life) are the fast-rotting layer, but the durable base (power, grid, fabs, EUV, HBM, fiber, shells, 15 to 40+ year lives) is 45 to 55% of data-center capex and a majority of the total buildout. The rails-and-fiber story largely holds; only the chip strands.

## 6. How to rebuild or extend

The data files are generated, not hand-edited. To change them, edit the generating Python (re-run the snippets that produced each `assets/*.js` from `crawl/*.json`) or edit the JSON and regenerate.

- The crawl, extraction, and enrichment were done by `Workflow` scripts saved under `crawl/` and the session's workflow scripts directory. The raw extraction output is the workflow task output; the enriched records are `crawl/claims_enriched.json`.
- `crawl/md/*.md` is the full local corpus. Re-fetch with `curl -sS -A "Mozilla/5.0" https://www.wheresyoured.at/<slug>.md`.
- All generated prose is de-em-dashed by a fixed transform (em dash to period or comma). Zitron's verbatim quotes keep their original punctuation.

## 7. Style rules (important, the user cares)

- No em dashes in our prose. No en dashes used as punctuation. Numeric ranges as "X to Y" or hyphens.
- No AI tics. No "it's not just X, it's Y," no rule-of-three padding, no "the whole story," no "to be clear." Short declarative sentences. Extremely pithy.
- Keep Zitron's quotes verbatim, including his em dashes.
- Rating uses a tier scale, not letter grades: S Bruenig-level, A great, B solid, C Yiggy/Ezra zone, D what are we even doing here, F clown shit. Judge him against the standard he claims for himself, the definitive AI analyst.
- Be fair but blunt. Credit what is right, rebut what is not, and let the data move the verdict even against the user's prior.

## 8. Open items / TODO

- **Inline citations.** Weave inline hyperlinks into every claim. On hover, show the full source passage plus surrounding text, a stance tag (supports, complicates, undermines Zitron), and a line of analysis. Infrastructure is in place: any element with `data-tip="ID"` and an entry in the JS `TIPS` map gets the rich hover; `.cite` is the anchor style; `.stance-sup/comp/und` are the stance tags. This needs a swarm to produce, per claim, a verified URL + passage + stance + analysis.
- **Verification.** Use the `verify-citations` skill (`.claude/skills/verify-citations/`) to fetch every cited URL and confirm the quoted passage actually exists, to catch hallucinated links or passages. Run it after any citation work.

## 9. Where to distrust this

- Individual-claim verdicts are agent-assigned with web checks, not all hand-verified. The lenses and the price and durable-asset work got the most scrutiny.
- Stakes are now per-claim hand-judged (a judgment layer), with the reproducible scope-mapping kept as `stakes_auto`. The judgment can drift; the deterministic default is there to check it against.
- Correctness means different things across tiers. A cash-flow claim can be flatly wrong; a political-economy claim is part value judgment.
- Counts in the recurring-claim scan move with the matching rule. Treat them as close, not exact.
- Sources are labeled by outlet and date. Some links point to mid-2026 reporting and may move. A few of Zitron's own figures rest on anonymous tips, flagged in place.
- This is a representative sample of his most testable claims, not a transcript of every sentence. It reflects data as of June 11 2026 and will age.
