# Zitron Dumbtron, Project and Methodology

A handoff brief. This document explains what this project is, how it was built, how to extend it, and where to distrust it. It is written so another agent (or a person) can pick it up cold.

## 1. What this is

A static, interactive website that audits Ed Zitron's writing about AI. Zitron runs the newsletter "Where's Your Ed At" (wheresyoured.at) and the Better Offline podcast, and is the internet's most prominent AI-bubble critic. The site scores his claims two ways at once: how correct each one is, and how much rides on it being true. The thesis the site builds and tests is that he is most right where it matters least (company finance) and most wrong where it matters most (whether the technology is real, useful, and improving).

The site is `index.html` (the audit), `analysts.html` (The Literature, a verified database of what top-tier analysts say about AI plus a lit review), `methodology.html` (the method page), and `hayes.html` (an annotated Chris Hayes transcript). Plain HTML, CSS, and vanilla JS, no build step. Open `index.html` in a browser.

The audit is benchmarked against a standard, not the average commentator: the level of Matt Levine and Adam Tooze, and a wider panel of serious analysts (Bruenig, Mazzucato, Perez, DeLong, Acemoglu). The point the whole site makes is that these analysts share nearly all of Zitron's concerns (bubble, circular financing, concentration, elusive profits, labor harm) and still reach the opposite conclusion, because they keep the technology separate from its finance and its political economy. See the political-economy framework below for the normative spine.

## The political-economy framework (the normative spine)

The audit is not neutral about political economy, and does not pretend to be. It is built on a specific left-institutionalist view of AI, the one held by the People's Policy Project (3P), Matt Bruenig, and Nick Warino's 3P report "The Nordic Model Invents the Goods." The core claims:

- **The technology is real and good.** AI is a labor-saving, general-purpose technology in the lineage of word processing, the assembly line, and fertilizer. It is "the wonder workers made." Treating it as fake is, in Bruenig's words, "the most indefensible type of skepticism."
- **The problem is ownership and distribution, not the technology.** Billionaire wealth, labor displacement, degraded products are valid critiques of capitalism, not of LLMs. They are "a great case for socialism, but not really a case against any particular labor-saving technology."
- **The state invents the goods.** Per "The Nordic Model Invents the Goods" and Mazzucato's entrepreneurial-state work, public institutions create and de-risk the foundational technology (the internet, GPS, the transformer); the failure is letting the gains be captured as private "algorithmic rents."
- **The constructive program is institutional:** a robust welfare state for labor reallocation (Bruenig's Jacobin case), social ownership of capital such as a social wealth fund (the 3P proposal behind the Sanders AI sovereign-wealth-fund bill), antitrust, collective bargaining, and public direction of the technology's path.
- **The political error of the fraud thesis:** if the gains are not real, there is nothing to redistribute and nothing to govern. A development pause is the cartel move; the way to beat the incumbents is to push the technology forward and socialize the equity. The fraud framing aims the fight at the technology instead of at ownership, the one direction that helps the people Zitron wants to beat.

This frame is why the rating tops out at "Bruenig-level," why the Standard / Bruenig / Ownership sections are central, and why the broken-economy and productive-bubble lenses route through 3P, Bruenig, Mazzucato, Carlota Perez, and Acemoglu rather than generic anti-growth declinism.

## 2. The deliverable, file by file

```
index.html              The audit page. All sections, all render JS.
analysts.html           The Literature: the analyst-claims DB + lit review.
hayes.html              Annotated Chris Hayes transcript (standalone page).
methodology.html        Short public method page.
PROJECT.md              This handoff doc.
assets/
  styles.css            Shared stylesheet. NYT-ish. Light/dark themes.
  claims-full.js        window.CLAIMS_FULL: 610 Zitron claims from 110 posts.
  categories.js         window.CATEGORIES: 12 recurring-claim themes.
  lenses.js             window.LENSES: 6 adversarially-checked arguments.
  cheapness.js          window.CHEAPNESS: "is AI getting cheaper" + price timeline.
  comparisons.js        window.COMPARISONS: his analogies, ranked, with quotes.
  citations.js          window.CITES: verified inline-citation passages/analysis.
  analysts.js           window.ANALYSTS: 110 panel-author AI claims, verified.
  hayes.js              window.HAYES: 21 annotated Chris Hayes podcast claims.
  bruenig-transcript.js window.BRUENIG_TX: Bruenig podcast, annotated drawer.
  tooze-transcript.js   window.TOOZE_TX: Tooze, two episodes, annotated drawer.
transcripts/            Transcript copies (Hayes .txt; Bruenig and Tooze .md).
scripts/                Committed tooling: assetlib.py, validate.py, update_corpus.sh, workflows/.
Makefile                make check / update / verify / serve.
crawl/                  Provenance and intermediate data (gitignored).
  md/                   All 110 post .md files (full text + publish dates).
  rerate/               Re-rating, dead-link-repair, and lit-swarm agent I/O.
```

The original two-document scorecard (`comprehensive.html`, `claims-docs.js`, `claims-comprehensive.js`) was deleted on request.

## 3. The page sections (top to bottom)

1. **Hero + intro.** Frame: "it might be a bubble" is table stakes. His distinctive claims get graded.
2. **The Rating.** Tier scale S to F. **D as an analyst, B as a reporter.** Why not F: real reporting, the bubble is a live risk, unproven ROI is fair. "What the foundational errors mean" (accurate finance bricks on a coin-flip foundation).
3. **The Tell: He Called It Crypto.** The temporal argument; AI cleared the durable-mass-use bar crypto never did. Points to Perez (railways and the internet crashed and were real).
4. **Right Where It Matters Least.** The Stakes x Correctness matrix (live from CLAIMS_FULL).
5. **The Right/Wrong Index.** One composite score per AI claim (accuracy x stakes x originality, -100..+100), a histogram, a Most Wrong / Most Right leaderboard, per-claim drawers with a shareable PNG card and `#rw-<id>` deep links.
6. **What He Compares AI To.** Ranked analogy inventory with hover quotes and side-drawer timelines.
7. **His Greatest Hits.** 12 recurring-claim dot-timelines.
8. **Six Arguments, Stress-Tested.** The lenses, now mapped onto the panel.
9. **Is AI Getting Cheaper?** Verdict (mostly wrong) + GPT-4-class price chart. Points to DeLong (falling unit cost vs elusive profits).
10. **The Standard.** The top-tier panel (Tooze, Levine, Bruenig, Mazzucato, Acemoglu, DeLong, Perez), each with a verified verbatim quote: what each takes seriously and what each rejects. Includes the Acemoglu counter-testimony (adoption is not productivity; the macro record is still on the skeptic's side). Links to The Literature page. Followed by **Where He Beat the Panel** (`#beat`): five reporting wins (FTX mechanism, Copilot-in-HR scoop, token repricing squeeze, neocloud concentration, the 3GW absorption gap), sourced from the claims DB.
11. **Evans / Tooze / Bruenig / Ownership.** The measured-analyst deep-dives. Evans deck; Tooze (two episodes, the three-bubbles taxonomy, sidebar); Bruenig (the S-tier benchmark + the LLM book + NLRB Research, built for workers); Ownership (the constructive program, social wealth fund, the public-investment receipts: NSF/ImageNet, DARPA, Mazzucato, WGA). Ownership ends with **Stress-testing the program**: four left objections to "socialize the equity," answered against the bill's actual mechanism, a one-time 50% equity tax paid in shares (Meidner, not a purchase, so Gabor-style de-risking critiques miss). Includes the honest dividend math: ~$615B fund off the two labs at current marks, ~$95/adult/year at 4% payout, ~$38 after a 60% haircut; the case is the upside and governance, not the first check.
12. **Reliability.** The hallucination deep-dive (bimodal, jagged frontier).
13. **How The Argument Moved.** Scope mix by year.
14. **The Database.** All 610 Zitron claims, filterable.
15. **The Literature (analysts.html).** 110 verified analyst claims + the lit review.

## 4. Methodology

**Sources.** Enumerated wheresyoured.at via its sitemap (457 posts, back to 2019). Pulled each post's machine-readable `.md` (carries the real publish date and full text, including premium). 110 posts were AI-relevant.

**Extraction.** A background multi-agent workflow read all 110 posts and pulled 610 dated, falsifiable claims, each tagged by `domain` (AI, crypto-web3, business-pr-culture, etc.), `scope`, and `distinctiveness` (distinctive vs table-stakes). Trivial and purely rhetorical lines were skipped.

**Scoring (the two axes).**
- `verdict` enum: Correct, Mostly correct, Mixed, Too early to tell, Overstated, Mostly wrong, Wrong, Unverifiable.
- `correctness` 1 to 5, derived deterministically: Correct=5, Mostly correct=4, Mixed=3, Overstated/Mostly-wrong=2, Wrong=1. Unverifiable and Too-early carry no score and are excluded from averages.
- `stakes` S1 to S7, S1 most consequential. Two layers: `stakes_auto` is the reproducible scope-mapping (tech-viability=S1, demand-adoption=S2, political-economy=S3, bubble-timing=S4, industry-economics=S5, company=S6, other=S7); `stakes` is a per-claim hand-judged tier (a swarm read each claim and overrode the default where content warranted) with `stakes_rationale`. The matrix uses `stakes`. The hand pass moved 89 of 610 claims by at least a tier (15%), on net against Zitron.
- `qgroup` (the four questions), mapped from scope: Capability, Diffusion & utility, Finance & markets, Political economy.
- `knowability`, mapped from claim type: Checkable, Forecast, Interpretive, Normative.

**Recurring-claim timelines.** A separate regex scan of full text, restricted to AI-era posts (2023+) that have at least one AI-domain claim, required to sit near AI context, deduplicated. Each surviving sentence is one dot.

**The lenses.** Each core argument was researched once, then handed to a second agent told to attack both the research and Zitron and revise the verdict. The published verdict is the adversarial one. The price analysis and the durable-vs-stranded-asset analysis were built the same way. The broken-economy and productive-bubble lenses were later rewritten to route through the panel (3P/Bruenig/Mazzucato; Perez/Tooze/DeLong).

**The Literature (analyst DB, `analysts.js`).** A seven-author research swarm, one agent per panel author, pulled every verifiable AI claim from Tooze, Levine, Bruenig, Mazzucato, Perez, DeLong, and Acemoglu. Each claim carries a curl-verified live source and a verbatim quote, categorized on the same scope framework (capability / diffusion-utility / finance-markets / political-economy) with political-economy sub-categories (ownership, welfare-state, labor-unions, productivity-growth, market-concentration, public-investment-direction, distribution) and tagged by stance vs Zitron (shares-concern, contradicts, rejects-conclusion, orthogonal).

**Link discipline (important).** A round of hallucinated and dead source links was caught and repaired. Now every URL is curl-verified 200 before it ships; any agent proposing a replacement must verify it live and confirm the quoted passage is verbatim on the page. Authors' quotes keep their original punctuation (em dashes and all); only generated prose is de-em-dashed.

## 5. Key findings (as of 2026-06-12)

- On the combined foundational question (is the tech real, S1, and does it deliver value, S2): **82 wrong, 45 right, 16 mixed (143 scored). Well more wrong than right.**
- Company and sector finance (S5, S6): 30% wrong, under the same definition as the foundational stat (correctness <= 2 over scored claims). His strong zone: barely half his 57% wrong rate on S1+S2. One definition, both stats; an earlier draft published 21% on a different denominator.
- Distinctive AI claims average 3.02 of 5; table-stakes AI claims 3.56.
- He was more right about crypto (3.73) than about AI (3.06).
- Ratings apply three sharpening rules. (1) Trajectory lens: a forward/directional capability bet is judged against the trend as of mid-2026, and a narrow correct call on a dead product (e.g. Sora) is not credited as a foundational win (it is credited at product stakes: c165 is Correct at S7). (2) Load-bearing prediction: a claim is graded on the distinctive prediction it asserts, not on a true premise underneath it. "Demand would evaporate" is graded on whether demand evaporated (it did not; demand is real and price-elastic), not on whether the subsidy fact is real, so it is Wrong, not Overstated. Absolute false predictions ("nobody wants it", "has peaked", "never", "evaporate") are Wrong; Overstated is reserved for claims whose core direction is true but exaggerated. The calibration also cuts the other way, crediting true premises: "hallucination is inevitable" is technically correct (OpenAI's "Why Language Models Hallucinate", Xu et al.), so those claims are Mostly correct or Mixed, not Wrong, with the markdown only for the "therefore useless" leap; and AI writing, bland but increasingly used for real drafting, is graded Mixed rather than a clean win for "soulless". (3) Time anchor: present-state characterizations are graded against the world when written; trend/persistence claims ("stalled", "peaked", "evaporate") are graded against the trend through the data date, and a trend claim made too close to the data date to resolve is Mixed, not credited (c190 Wrong vs c585 Mixed); conditionals whose antecedent has not fired (bubble-pop consequences) carry no score (c254, c303, c294, c423 all Too early). Recurring claims are harmonized so the same prediction scores the same wherever it appears (all "AI has peaked" instances Wrong; the hallucination-inevitability cluster consistent at Mixed: c153, c334, c601). Across these passes roughly 160 of 489 AI claims were re-rated, moving the foundational picture well against Zitron (S1+S2 went from a near coin flip to 82 wrong / 45 right). A 2026-06-12 consistency pass re-graded seven claims both ways (c153, c585, c586 down; c165, c228 up; c254, c303 to unresolved), moved c395 to S6 per its own rationale, and standardized the Anthropic profitable-quarter fact to "reportedly on track" in the seven assessments that lean on it, since Q2 2026 had not closed at the data date.
- Lens verdicts: bubble-consensus, tech-denialism, productive-bubble all "largely undercut Zitron"; analogy-check and circular-financing "genuinely mixed"; broken-economy "partly supports."
- Crash sensitivity (published in The Tell): a 2027 crash resolves the 20 unresolved bubble-pop predictions his way and re-litigates the 14 wrong market-timing calls; of the 82 S1+S2 wrongs, exactly 1 is bubble-timing scoped, so the foundational verdict survives a crash. The site's own falsification condition is stated in advance: demand collapsing under sustained true-cost pricing, or the capability trend breaking.
- "Is AI getting cheaper": he is mostly wrong. Price per fixed capability fell ~50 to 200x/year (Epoch), ~1000x over three years (a16z); GPT-4-level intelligence is ~1/1000th its launch cost. His narrow point (frontier launch prices, cost-per-task rising with reasoning tokens) is real but does not support the headline.
- Durable vs stranded assets: GPUs (~half of data-center capex, 3 to 5 year life) are the fast-rotting layer, but the durable base (power, grid, fabs, EUV, HBM, fiber, shells, 15 to 40+ year lives) is 45 to 55% of data-center capex and a majority of the total buildout. The rails-and-fiber story largely holds; only the chip strands.

## 6. How to rebuild or extend

The `assets/*.js` files are the canonical data store; `crawl/` is provenance. Edit data through `scripts/assetlib.py` (load/save keeps the `window.X=` format), then run `make check` (`scripts/validate.py`): it parses every data file, enforces the verdict-to-correctness map, scans generated prose for em/en dashes and transform scars, and prints the headline stats so the prose in index.html, methodology.html, and this file can be synced.

- `make update` (`scripts/update_corpus.sh`) diffs the live sitemap against `crawl/md/` and fetches any new posts' `.md` (carries real publish date and full text). Claim extraction from new posts is agent work; merge the new records into `assets/claims-full.js` via assetlib, then `make check`.
- The original crawl/extraction/citation `Workflow` scripts are committed under `scripts/workflows/`. The enriched intermediate `crawl/claims_enriched.json` is provenance, no longer the source of truth: re-grades go directly into `assets/claims-full.js`.
- `make verify` runs the citation checker (`.claude/skills/verify-citations/`, committed).
- `hayes.js`, `bruenig-transcript.js`, `tooze-transcript.js` are hand-written JS literals, edited directly.
- Generated prose is de-em-dashed (em dash to comma or period); authors' verbatim quotes keep their punctuation. validate.py enforces this.

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
- This is a representative sample of his most testable claims, not a transcript of every sentence. It reflects data as of June 12 2026 and will age.
