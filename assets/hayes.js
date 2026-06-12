// Annotated transcript: Ed Zitron on Chris Hayes' "Why Is This Happening" (2026).
// Each entry is one substantive claim, quoted verbatim, with a verdict, a stakes
// tier, and an assessment consistent with the rest of the audit. `host` holds the
// sympathetic interviewer's pushback where it lands.
window.HAYES = [
  {
    t: "01:00",
    topic: "Nobody discloses AI revenue",
    q: "None of them talk about their AI revenue. Microsoft mentioned it in 2 quarters, last quarter of 2024, first quarter of 2025, and then stopped. IBM just stopped mentioning their AI revenue. When nobody wants to talk about the money, and nobody can really precisely describe the outcomes, that's when people should get concerned.",
    v: "Mixed",
    s: "S6 · Company economics",
    a: "The genuine point is real: the hyperscalers report AI capex in full but bury AI gross margin, so segment profitability is opaque. The framing overstates it. Microsoft has disclosed an AI run-rate above 13 billion dollars, and the labs publish revenue numbers he quotes elsewhere in this same interview. Opacity on margins is fair. \"Nobody talks about the money\" is rhetoric."
  },
  {
    t: "04:30",
    topic: "The rot-economy thesis",
    q: "The AI bubble is a symptom of a larger problem with the software industry. The hypergrowth era is ending. Everything's seen through what I call the grot economy, the growth at all cost mindset.",
    v: "Mixed",
    s: "S3 · Political economy",
    a: "Right that something structural is broken, fuzzy on the mechanism. The serious left read puts the problem in ownership and the distribution of gains, a structural question, not in the technology being fake. <a href='index.html#bruenig' >Bruenig makes exactly this case</a>: the tech is real, the valuation may be inflated, the harm is capitalism's. Zitron fuses the three and lands on \"con.\""
  },
  {
    t: "04:53",
    topic: "AI is the next crypto",
    q: "A little before the metaverse there was another bubble people forgot, Clubhouse. With NFTs, with the metaverse. They changed their entire company name to Meta. The actual experience was a very bad virtual reality experience. Every single bubble is looked at through the same lens.",
    host: "Hayes: \"No one could ever explain the use case of the metaverse. I don't feel that way with AI. There are use cases. I've used it. You can articulate what it's for in a way the metaverse never did.\"",
    v: "Wrong",
    s: "S1 · Is the tech real",
    a: "This is the brand, and it broke. Crypto, NFTs, and the metaverse never produced durable mass use. Generative AI did: roughly 900 million weekly ChatGPT users, real agentic coding. On the one axis that separates a fraud from a technology, the analogy fails. The sympathetic host says so to his face in the same breath."
  },
  {
    t: "09:30",
    topic: "Hallucination is inherent, so it's unreliable",
    q: "The idea that you can rely on it is inherently broken because OpenAI's own research says hallucinations are a part of these things. They're never going away. You have people in the AI industry claiming hallucinations are going away. They're just wrong. OpenAI said it.",
    v: "Mixed",
    s: "S1 · Reliability",
    a: "Two claims fused. \"Hallucination persists\" is defensible: <a href='https://arxiv.org/abs/2509.04664' target='_blank' rel='noopener'>OpenAI's paper</a> argues it follows from the training objective. \"Therefore you can't rely on it\" is a category error the same literature refutes. The deployment standard is comparative, not perfect: better than the human you would otherwise use, with grounding and verification. The <a href='https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321' target='_blank' rel='noopener'>BCG-Harvard trial</a> found 40 percent higher quality inside the frontier. A tool with that effect is not \"inherently broken.\""
  },
  {
    t: "10:30",
    topic: "Coding only impresses people who can't code",
    q: "There is a contingent of software engineers that might not know a lot about code. To them this might seem magical. The moment you start building entire things, you're kicking the can. You're still going to have to read all this code. Software can function when the code is bad.",
    v: "Mostly wrong",
    s: "S2 · Does it deliver value",
    a: "The review point is fair: you still read the output. The dismissal is not. Senior engineers at the labs use these tools daily, and Zitron's own best scoops, on how much companies burn on Claude Code and Codex, document exactly the demand this sentence denies. \"Only the ignorant are impressed\" is an assertion his own reporting contradicts."
  },
  {
    t: "12:40",
    topic: "No roadmap to utility, unlike fiber or smartphones",
    q: "Cavello notes that in the early 2000s there were clear roadmaps, smaller chips, smaller batteries, that would lead to smartphones. No such path exists for large language models. You would have to have a way in which the cost came down and the hallucinations went away. Neither of those appears to be happening.",
    v: "Wrong",
    s: "S1 · Is the tech real",
    a: "The cost half is flatly wrong. Price per fixed unit of capability has fallen about a <a href='index.html#cheapness'>thousandfold in three years</a> (Epoch, a16z): GPT-4-level intelligence now costs roughly one-thousandth its launch price. Concrete roadmaps exist, distillation, mixture-of-experts, better silicon, small models matching last year's frontier. The hallucination half is the comparative-standard error from two answers up."
  },
  {
    t: "13:35",
    topic: "Benchmarks are gamed",
    q: "It's actually very difficult to measure them. The benchmarks are deliberately created for them. All of the benchmarks for software engineering are focused on one programming language, Python, and very common GitHub issues. They're going to have to create specialized data forever.",
    v: "Mixed",
    s: "S1 · Capability",
    a: "Contamination and benchmark narrowness are real critiques worth making, and SWE-bench is Python-heavy. But \"deliberately created for them\" overstates the gaming, and gains show up on contamination-controlled and independent evaluations too. A legitimate caution, inflated into fraud."
  },
  {
    t: "14:13",
    topic: "It just copies, it can't be novel",
    q: "One of the Anthropic models had just started going and looking for the solution on GitHub. People mistake this for intelligence. You can't get out past the arithmetic statistical average. They did a C++ compiler, it was a clone of an open-source project, and it was something like 10,000 times less efficient.",
    host: "Hayes: \"A year ago I couldn't do that. It is doing something new, even if it's going to GitHub.\"",
    v: "Mostly wrong",
    s: "S1 · Capability",
    a: "\"Can't exceed the statistical average\" is the strong-denialism claim, and it's the least supported. Tool use plus long-horizon task completion is precisely the 2025-26 capability jump, not a non-event. Systems like AlphaEvolve have produced genuinely novel results. The one cherry-picked compiler anecdote stands against a host telling him, firsthand, the thing changed in a year."
  },
  {
    t: "15:39",
    topic: "The scale of the money, and nobody is profitable",
    q: "If you think about all of the venture capital, all the capex from Microsoft, Amazon, Google, Meta. The money is coming from private equity, private credit, venture capital, and Japan, Sumitomo, MUFG. Most of it's flowing to like 3 companies. None of these businesses are profitable, not a single one of them.",
    v: "Mostly correct",
    s: "S5 · Sector economics",
    a: "His strong terrain. The financing map is broadly right, and the pure-play labs do lose money at scale. Two cautions: the aggregate dollar figures are loose, and \"none profitable\" elides that the hyperscalers are wildly profitable overall, just not on the AI segment they won't break out. On the structure of the money, credit to him."
  },
  {
    t: "22:55",
    topic: "Claude Code is subsidized 8 to 13.5x",
    q: "Claude Code, crazy fact. For every dollar that someone is spending on an Anthropic subscription, when they use Claude Code, Anthropic can spend anywhere from 8 to 13.5 dollars worth of compute, because Anthropic is subsidizing them.",
    v: "Mixed",
    s: "S6 · Company economics",
    a: "This is his best reporting, and it cuts against him. The subsidy is real: flat subscriptions are priced below the API cost of heavy use. But 13.50 per dollar is a worst-case power-user figure presented as the rule, and the deeper point undermines the thesis. People burn that much compute because they want the product. That is the demand he says does not exist, measured in dollars."
  },
  {
    t: "26:10",
    topic: "Bigger subsidy than Uber or Amazon, and not getting cheaper",
    q: "It's like Amazon, which lost money on every book for a shockingly long period, and achieved pricing power. Uber is another example. But the scale of the subsidy here is just way bigger. Everything is more expensive and it's not getting cheaper.",
    v: "Mixed",
    s: "S5 · Sector economics",
    a: "The \"subsidize to capture the market\" analogy is apt, but it cuts both ways: Amazon and Uber became real businesses, so the comparison argues against a fraud, not for one. The scale point is fair. \"Not getting cheaper\" is the same factual error: <a href='index.html#cheapness'>per-capability cost is collapsing</a>, even as frontier launch prices and per-task reasoning tokens rise."
  },
  {
    t: "28:34",
    topic: "Circular financing: the shovel-seller funds the diggers",
    q: "Nvidia has agreed to spend tens of billions in AI compute deals. I don't think it's a good sign that the shovel seller is also paying for the digs. CoreWeave, Nvidia propped up their IPO, bought 2 billion of stock, and is one of their largest customers. Google is renting compute from CoreWeave to rent to OpenAI. Less than a billion of revenue on 178.5 billion of data-center credit deals.",
    v: "Mostly correct",
    s: "S5 · Sector economics",
    a: "The circularity is real and well documented: the Nvidia-OpenAI-Oracle-CoreWeave vendor-financing loops genuinely raise the risk that the same dollars are being counted twice. The juxtaposition is the sleight of hand: under-a-billion in third-party rental revenue against 178.5 billion in multi-year buildout debt compares one year of one slice to the entire stock of the other. Real concern, mismatched denominators."
  },
  {
    t: "31:39",
    topic: "The collapse chain",
    q: "The sandwich costs a dollar and it costs them 10 dollars to make. Their only customers appear to be themselves or a small amount of AI companies, all terribly unprofitable. At a certain point the music ends and people go diving for the chairs. If the models aren't profitable, then they don't need the data centers, and if the data centers aren't profitable, no one needs the chips, and the whole thing collapses.",
    v: "Too early to tell",
    s: "S4 · Markets",
    a: "The dependency chain is the coherent core of the bear case, and it deserves to be stated. But it is a prediction resting on the premise that demand is fake, and Nvidia's customers include hyperscalers with enormous real cloud revenue. \"It might unwind\" is table stakes everyone concedes. The contested claim, that there is no real demand underneath, is the one his own subsidy scoop refutes."
  },
  {
    t: "36:48",
    topic: "Venture and private credit are already cracking",
    q: "Since 2018 venture capital has failed to average a TVPI higher than 0.8 to 1.2. Private equity is having trouble selling their companies. There's 42 billion of software loans in distress status. Private equity firms are leveraged 4 to 6 times the value of their assets. They're suddenly starting to take payment in kind.",
    v: "Mostly correct",
    s: "S5 · Sector economics",
    a: "His best and best-sourced terrain. The venture returns slump, the frozen exit market, the rise of payment-in-kind toggles and continuation funds, and distressed software credit are all real and underappreciated. This is the reporting that earns the B. None of it establishes the foundational claim that the technology is fake."
  },
  {
    t: "39:25",
    topic: "DeepSeek trained cheaper, but it's still not getting cheaper",
    q: "What DeepSeek did was they train cheaper, but the cost of inference is still going up. Some models have got cheaper. People conflate that with the companies finding a cheaper way. They've never said that. They've just brought the price down. Pre-training hit diminishing returns, so the only way to do more was to burn more tokens. You're spending more money as a user.",
    v: "Mostly wrong",
    s: "S1 · Is the tech real",
    a: "The reasoning-tokens observation is real and narrow: chain-of-thought does spend more per task. The headline is wrong. Distillation, mixture-of-experts, and hardware gains are genuine efficiency wins, not just subsidized price cuts, which is why a fixed capability keeps getting cheaper. \"They just lowered the price, they never got cheaper\" is contradicted by the engineering."
  },
  {
    t: "40:41",
    topic: "Obsolete chips and depreciation",
    q: "It takes 2 to 3 years to build a data center. Nvidia is selling new chips every year. They burn out in 3 to 6 years. I've heard crazy failure rates like 10 to 20 percent within a year, but we truly don't know. Stargate Abilene will be using Blackwell GPUs that by 2027 are 2 to 3 years old. I heard of a data center in North Dakota losing a million dollars a day.",
    v: "Mixed",
    s: "S5 · Sector economics",
    a: "GPU depreciation and softening rental prices are real, and the build-time-versus-chip-cycle squeeze is a fair point. Two limits. The vivid numbers, 10 to 20 percent annual failure, a million a day, are his own unconfirmed rumors, flagged as such even by him. And depreciation hits only the GPU layer. The durable base, power, grid, fabs, fiber, shells, with 15-to-40-year lives, is roughly half the buildout and does not rot on a chip cycle."
  },
  {
    t: "43:50",
    topic: "It can't replace a first-year associate, and law is a graveyard for it",
    q: "Law firm associates make law firms work. What you're paying for with employees is actually risk management, judgment, taste. It isn't doing it. Every single example I hear of, in law, large language models being used ends up with someone getting in trouble with a judge.",
    host: "Hayes: \"I don't think that's true that every example, because people are using AI all over the legal world. There definitely have been hallucinated citations, but not every example.\"",
    v: "Mixed",
    s: "S2 · Does it deliver value",
    a: "The first half is genuinely good and correct: associates supply judgment and risk-bearing, not just document review, and replacing the bottom rung breaks the partner pipeline. This is the augmentation-not-replacement read, the strongest thing he says. The second half is false on its face, and the host corrects him in real time. Hallucinated citations are real; \"every single example ends in sanctions\" is not."
  },
  {
    t: "47:13",
    topic: "Scaling laws are broken; it's just better search",
    q: "The scaling laws are broken. It's no longer getting the same improvements just by pre-training.",
    host: "Hayes describes a multi-step research task, finding and citing the right historical sources on 1890s homicide rates: \"A computer could not do that a year ago. It just couldn't.\" Zitron: \"What you're ultimately describing is more sophisticated but less reliable search. You have to check every single thing.\"",
    v: "Mostly wrong",
    s: "S1 · Capability",
    a: "Pre-training returns did flatten around 2024, that part is true. But the field moved the scaling axis to reinforcement learning and test-time compute, which is where the gains now come from, so \"scaling laws are broken\" is half-right and misleading. The tell is the exchange: a sympathetic host reports a concrete capability that did not exist a year ago, and Zitron reframes long-horizon, source-grounded reasoning as \"just search.\" That is the failure to update, live."
  },
  {
    t: "50:11",
    topic: "The horns of the dilemma, and the math",
    q: "Either your case is correct, in which case it's not profitable and collapses. Or you're wrong, they get profitable, and that means replacing the labor of tens of millions of people. That's another cataclysm. By 2030, Microsoft, Meta, Google and Amazon need 200 billion of brand-new revenue, in a software industry that has never been higher than 700 billion a year. And it needs to happen in the next 6 months.",
    v: "Mixed",
    s: "S3 · Political economy",
    a: "The dilemma is his sharpest frame, and the labor-displacement worry is legitimate, but it points the wrong way. If the bad outcome is mass displacement, the answer is distributional, not technological: tax the winners, socialize the equity, build the welfare floor. <a href='index.html#ownership'>Bruenig and the People's Policy Project</a> aim at ownership. Zitron aims at the technology and predicts collapse. The \"next 6 months\" urgency is overstated; the scale of the revenue gap is roughly right."
  },
  {
    t: "58:42",
    topic: "Oracle, OpenAI, and pension money in the pipes",
    q: "Some of the money going into data centers is from insurance funds and retirement funds. Oracle has taken over 100 billion of debt, had negative cash flow of 24 billion, and is building 4.5 gigawatts of data centers for one company, OpenAI. Oracle will die if OpenAI dies. Oracle cannot pay the debt if OpenAI does not make more money than Nvidia does right now, by 2030.",
    v: "Mostly correct",
    s: "S5 · Sector economics",
    a: "The concentration risk is real and well argued: Oracle's buildout is dangerously levered to a single unprofitable customer, and the seepage of data-center credit into insurance and pension portfolios is a genuine systemic point too few people are making. This is the bubble case at its strongest. It is a claim about finance and exposure, not about whether the technology works."
  },
  {
    t: "59:17",
    topic: "The honest core",
    q: "Their bet is on a revenue trajectory that is essentially unprecedented in human capitalism. They think they can achieve it, and if they don't, it doesn't work.",
    v: "Correct",
    s: "S4 · Markets",
    a: "Correct, and the cleanest sentence in the interview. This is the real stake, and it is a live risk everyone serious concedes, including the people building it. The bubble may pop. That was never the contested claim. The contested claim is the one he spends the hour on: that the technology underneath is fake, useless, and going nowhere. The finance is sound. The foundation is the coin flip."
  }
];
