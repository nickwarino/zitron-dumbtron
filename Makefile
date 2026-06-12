# Zitron Dumbtron. The site is static: open index.html. These targets
# maintain the data behind it.

check:        ## parse all data files, verify scoring invariants, print headline stats
	python3 scripts/validate.py

update:       ## fetch any new wheresyoured.at posts into crawl/md/
	bash scripts/update_corpus.sh

verify:       ## verify every cited URL serves its quoted passage (needs .claude/skills)
	python3 .claude/skills/verify-citations/verify.py

serve:        ## local server (tooltips and fetches behave like production)
	python3 -m http.server 8000

.PHONY: check update verify serve
