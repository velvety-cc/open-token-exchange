import SideNav from "../components/SideNav";
import LogoField from "../components/LogoField";

export default function Home() {
  return (
    <>
      {/* top bar (tiny, non-sticky) */}
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top">
            <img src="/logo.svg" alt="Open Token Exchange" />
            <span className="brand-name">Open Token Exchange</span>
          </a>
          <nav className="topnav">
            <a href="#commodity">Thesis</a>
            <a href="#instrument">Instrument</a>
            <a href="#build">Roadmap</a>
            <a href="mailto:liam@velvety.cc">Contact</a>
          </nav>
        </div>
      </header>

      {/* hero: copy left, animated logo field right */}
      <section className="hero" id="top">
        <LogoField />
        <div className="hero-copy">
          <h1>An open market for commoditized intelligence</h1>
          <p className="hero-sub">
            The case for a futures market in machine intelligence.
          </p>
          <p className="hero-sub">
            You can already see the shape of this market forming. The only
            thing missing is the market itself.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="mailto:liam@velvety.cc">
              Talk to us →
            </a>
          </div>
        </div>
      </section>

      {/* shell */}
      <div className="shell">
        <SideNav />
        <main className="col">
          {/* I - a commodity */}
          <section className="section" id="commodity">
            <p className="kicker">
              <span className="num">01</span> A new commodity
            </p>
            <h2>Intelligence is becoming a commodity.</h2>
            <p>
              For most of the last decade, the cost that defined artificial
              intelligence was the cost of <em>training</em>: the one-time
              price of teaching a model everything it knows. That era is
              ending. The expensive part is now <em>inference</em>, the cost of
              running the model every time someone asks it a question. In 2026,
              inference passed 60% of all AI compute at the major providers, up
              from roughly a third in 2023.
              <sup className="fnref">
                <a href="#fn1" id="fnref1">
                  1
                </a>
              </sup>{" "}
              Training is a sunk cost, paid once. Inference is a marginal cost,
              paid forever, and it grows with every user and every agent.
            </p>

            <div className="stats">
              <div className="cell">
                <span className="num">
                  60<span className="u">%+</span>
                </span>
                <span className="lab">of AI compute is now inference</span>
              </div>
              <div className="cell">
                <span className="num">
                  &gt;$10<span className="u">B</span>
                </span>
                <span className="lab">inference market in 2024</span>
              </div>
              <div className="cell">
                <span className="num">
                  2<span className="u">×+ / yr</span>
                </span>
                <span className="lab">and more than doubling each year</span>
              </div>
            </div>

            <p>
              This shift turns the output of a model into something an
              economist would recognize as a commodity. A unit of inference,
              one million tokens, is now bought and sold much like a barrel of
              oil or a kilowatt-hour of electricity. It is <em>fungible</em>: an
              application cares about the quality and speed of the answer, not
              which company&rsquo;s chip produced it, so tokens of equal
              capability are interchangeable across providers. It is{" "}
              <em>standardized</em>: &ldquo;per million tokens&rdquo; is a
              universal unit, the kilowatt-hour of intelligence. And it is
              already <em>traded at scale</em>, with the inference market
              clearing well over $10 billion in 2024 and more than doubling
              each year.
            </p>
            <p>
              When a vital good becomes fungible, standardized, and heavily
              traded, it stops being a product and becomes a commodity.
            </p>
            <p className="pull">
              We are standing at the cusp of commoditized intelligence.
            </p>

            <p className="footnote" id="fn1">
              <span className="fn-num">1</span> Deloitte projects inference will
              reach roughly two-thirds of AI compute by 2026, up from a third
              in 2023 and half in 2025 (
              <a
                href="https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/compute-power-ai.html"
                target="_blank"
                rel="noreferrer"
              >
                Deloitte, 2026 TMT Predictions
              </a>
              ). Reporting on hyperscaler capital expenditure puts the figure
              at 60 to 70 percent across major providers in 2026, up from about
              40 percent in 2024.
            </p>
          </section>

          {/* II - no inventory */}
          <section className="section" id="inventory">
            <p className="kicker">
              <span className="num">02</span> No inventory
            </p>
            <h2>A commodity with no inventory.</h2>
            <p>
              One feature of this new commodity decides everything that
              follows: you cannot store it. A token is produced and consumed in
              the same instant. There is no warehouse of tokens to draw down
              when demand spikes, and none to fill when it collapses. In this,
              intelligence resembles electricity far more than oil. Oil can sit
              in a tank and wait. A kilowatt-hour cannot, and neither can a
              token.
            </p>
            <p>
              Non-storability is the most important fact about any
              commodity&rsquo;s price, because inventory is the buffer that
              smooths every other market. Take the buffer away and supply has
              to meet demand in real time, so any mismatch between them shows up
              at once as a price swing. This is why electricity, despite being
              one of the most essential goods on Earth, is also one of the most
              violently volatile. Tokens will inherit that property for the same
              reason.
            </p>
            <p>What sets the supply of tokens is a simple identity:</p>

            <div className="formula">
              <div className="eq">
                Q<sub>token</sub> = (<b>η_H</b> · <b>η_A</b> / <b>C_E</b>) ·{" "}
                <b>K</b>
              </div>
              <div className="def">
                <div>
                  <b>C_E</b>: energy cost ($/kWh)
                </div>
                <div>
                  <b>η_H</b>: hardware efficiency (FLOPS/$)
                </div>
                <div>
                  <b>η_A</b>: algorithm efficiency (tokens/FLOP)
                </div>
                <div>
                  <b>K</b>: total capital deployed
                </div>
              </div>
            </div>

            <p>
              In plain terms: there are only four ways to make more tokens.
              Hardware can get cheaper, algorithms can get more efficient,
              energy can get cheaper, or more money can be poured into chips and
              data centers. More supply means a lower price, which is why tokens
              have become so cheap so fast. But none of these four levers can be
              pushed forever, and that is why the price cannot keep falling, the
              point we turn to next.
            </p>
          </section>

          {/* III - why prices move */}
          <section className="section" id="prices">
            <p className="kicker">
              <span className="num">03</span> Why prices move
            </p>
            <h2>Why prices fall now, and why that ends.</h2>
            <p>
              It is tempting to watch token prices drop more than tenfold in two
              years and conclude that intelligence simply gets cheaper forever.
              It does not. That decline rests on three forces, and each one is
              temporary.
            </p>
            <ul>
              <li>
                <strong>Efficiency.</strong> Cheaper hardware, leaner
                algorithms, and falling energy costs keep cutting the cost of
                producing a token. But these gains slow as they approach
                physical limits.
              </li>
              <li>
                <strong>Subsidy.</strong> Providers sell tokens below cost to
                capture market share. But selling below cost cannot last, and it
                ends once the market consolidates.
              </li>
              <li>
                <strong>Open weights.</strong> Open models are no longer toys.
                The same capable intelligence now runs across many competing
                providers, so buyers no longer have to depend on one
                company&rsquo;s flagship, and that competition floods the market
                with interchangeable supply. But it is a one-time step change,
                not a permanent tailwind.
              </li>
            </ul>
            <p>
              Demand runs the other way, and it does not fade. The number of
              inference requests is compounding, and the heaviest users, the
              autonomous agents and reasoning systems now entering production,
              cannot simply switch to a cheaper, weaker model when prices rise.
              Their demand is <em>inelastic</em>: it does not shrink when the
              price goes up.
            </p>
            <p>
              Put the two together. Three temporary forces have been pushing
              price down; one permanent force, inelastic demand, keeps pushing
              it up; and there is no inventory to absorb the gap between them. As
              the downward forces exhaust themselves, the balance tips, and
              price stops moving in one direction. It begins to swing. The path
              runs in three phases:
            </p>

            <div className="chart" aria-hidden="true">
              <svg viewBox="0 0 640 170" className="chart-svg">
                <line x1="228" y1="6" x2="228" y2="150" className="chart-div" />
                <line x1="430" y1="6" x2="430" y2="150" className="chart-div" />
                <polyline
                  className="chart-line"
                  points="8,22 60,40 112,58 164,78 208,96 248,92 288,103 332,94 372,104 412,97 448,76 478,128 508,64 540,136 572,58 604,130 632,90"
                />
              </svg>
              <div className="chart-x">
                <span>I · 2023–2025</span>
                <span>II · 2025–2027</span>
                <span>III · post-2027</span>
              </div>
            </div>

            <div className="steps">
              <div className="step">
                <div className="ph">I</div>
                <div>
                  <h4>
                    Supply-driven decline{" "}
                    <span className="tag good">2023–2025</span>
                  </h4>
                  <p>
                    All three forces push together; prices fall more than
                    tenfold.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="ph">II</div>
                <div>
                  <h4>
                    Rebalancing <span className="tag hold">2025–2027</span>
                  </h4>
                  <p>
                    Demand grows faster than data centers, chips, and power can
                    be built. The decline slows, and the first rebounds appear.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="ph">III</div>
                <div>
                  <h4>
                    Demand-driven volatility{" "}
                    <span className="tag">post-2027</span>
                  </h4>
                  <p>
                    A single popular application can multiply token demand in
                    days, while new supply takes one to three years of concrete,
                    silicon, and substations to come online. The mismatch
                    produces electricity-style swings.
                  </p>
                </div>
              </div>
            </div>
            <p className="note">
              Demand moves at the speed of software. Supply moves at the speed
              of construction. The distance between those two speeds is where
              volatility lives.
            </p>
          </section>

          {/* IV - the missing instrument */}
          <section className="section" id="instrument">
            <p className="kicker">
              <span className="num">04</span> The instrument
            </p>
            <h2>The missing instrument.</h2>
            <p>
              Here is the problem this creates. Every company that builds on AI
              now carries a large, growing, unavoidable inference bill, on a
              good whose price is about to become unpredictable and which it
              cannot stockpile in advance. In every other commodity, that exact
              situation calls for a futures market: a way to agree today on the
              price you will pay tomorrow. For oil, electricity, and carbon,
              such markets exist. For intelligence, none does.
            </p>
            <p>
              This is an old pattern. In 1730, rice merchants in Osaka opened
              the Dōjima Rice Exchange, the first organized futures market in
              history, for exactly this reason: rice was essential and its price
              was unmanageable. Standardized receipts turned a chaotic spot
              market into a place to lock tomorrow&rsquo;s price today.
            </p>
            <figure className="figure">
              <img
                src="/dojima-exchange.jpg"
                alt="Woodblock print of the Dōjima Rice Exchange in Osaka"
              />
              <figcaption>
                The Dōjima Rice Exchange, Osaka, c.&nbsp;1730: the first futures
                market. Every staple that becomes standardized and volatile
                eventually gets one.
              </figcaption>
            </figure>
            <p>
              The same logic later tamed oil, electricity, and carbon. Each
              began as a vital good with a wild price and ended with an exchange
              that let the world hedge it. Intelligence is next in line. It is
              missing only its market.
            </p>
            <p>
              Building that market takes two simple pieces: a standard unit, and
              a reference price.
            </p>
            <p>
              The standard unit is the{" "}
              <strong>Standard Inference Token</strong>, or SIT: one token from
              any model that clears a fixed bar of capability, with stronger
              models counting for proportionally more. This fixes the obvious
              objection that not all tokens are equal. It defines what
              &ldquo;one unit of intelligence&rdquo; means.
            </p>

            <div className="card">
              <p className="card-head">
                The Standard Inference Token (SIT)
                <span className="tag">capability bar</span>
              </p>
              <table className="spec">
                <tbody>
                  <tr>
                    <th>MMLU</th>
                    <td>≥ 86%</td>
                  </tr>
                  <tr>
                    <th>HumanEval</th>
                    <td>≥ 67%</td>
                  </tr>
                  <tr>
                    <th>GSM8K</th>
                    <td>≥ 92%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              The reference price is the <strong>Token Price Index</strong>, or
              TPI: a volume-weighted average of what qualified providers charge
              for a SIT, with no single provider allowed to dominate the figure.
            </p>

            <div className="formula">
              <div className="eq">
                TPI<sub>t</sub> = Σ <b>w_i</b> · <b>P_i,t</b>
              </div>
              <div className="def">
                <div>
                  <b>P_i,t</b>: provider price, capability-normalized to SIT
                </div>
                <div>
                  <b>w_i</b>: volume weight, capped at 30% per provider
                </div>
              </div>
            </div>

            <p>
              Because the index is public, reproducible, and hard to manipulate,
              the whole market can settle against it. And since tokens cannot be
              physically delivered, settlement is in cash against that index,
              exactly as electricity and compute futures already work.
            </p>
          </section>

          {/* V - the hedge */}
          <section className="section" id="evidence">
            <p className="kicker">
              <span className="num">05</span> The evidence
            </p>
            <h2>Does the hedge actually work?</h2>
            <p>
              A hedge is only worth building if it measurably lowers risk.
              Calibrate a standard price model to the dynamics we expect, a
              downward trend, reversion toward a moving average, and occasional
              sharp upward jumps, and the answer is clear. A buyer who hedges
              cuts the volatility of their procurement costs by roughly 62 to 78
              percent in every scenario tested. The same model shows why the
              need is real: about 15 percent of simulated price paths contain a
              spike of 100 percent or more within three years. A risk that
              large, with no instrument to manage it, is the gap this market
              fills.
            </p>
            <div className="stats">
              <div className="cell">
                <span className="num">62–78%</span>
                <span className="lab">
                  cut in procurement-cost volatility, every scenario tested
                </span>
              </div>
              <div className="cell">
                <span className="num">~15%</span>
                <span className="lab">
                  of price paths spike 100%+ within three years
                </span>
              </div>
            </div>
          </section>

          {/* VI - how to build it */}
          <section className="section" id="build">
            <p className="kicker">
              <span className="num">06</span> How to build it
            </p>
            <h2>How to build it.</h2>
            <p>
              A market like this cannot be declared into existence, and the
              sequence is the whole thesis. Each stage is cheap to run, proves
              out the next, and leaves behind an asset the eventual exchange is
              built on.
            </p>

            <div className="steps">
              <div className="step">
                <div className="ph">1</div>
                <div>
                  <h4>
                    Match by hand{" "}
                    <span className="tag good">Building now</span>
                  </h4>
                  <p>
                    Today the market is thin and sell-biased: with prices still
                    falling, more parties want to lock in a sale than a
                    purchase. So we do not open an order book and wait for one
                    to form. We broker it. We find owners of spare compute
                    willing to sell tokens forward at a discount, the natural
                    shorts, and companies that want to fix their token costs,
                    the natural longs, and we match them deal by deal. This
                    takes little capital and carries little balance-sheet risk.
                    More important, every trade we broker quietly builds the two
                    assets that matter most: the price data behind the index
                    (the TPI) and the capability standard that defines a unit of
                    intelligence (the SIT). We leave this stage not as a broker
                    but as the owner of the benchmark everyone else will have to
                    price against.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="ph">2</div>
                <div>
                  <h4>
                    Productize the deal <span className="tag hold">Next</span>
                  </h4>
                  <p>
                    Once the matchmaking has steady flow and the index has a
                    track record, we replace bespoke deals with one standard
                    product: a redeemable voucher, a prepaid claim on future
                    inference the holder can redeem for real tokens or resell to
                    exit. Because it can always be redeemed for the real thing,
                    arbitrage keeps its price honest and we never have to trust
                    an outside oracle. This turns a hand-run brokerage into a
                    two-sided market that scales without us standing in the
                    middle of every trade.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="ph">3</div>
                <div>
                  <h4>
                    Open the exchange <span className="tag">Gated</span>
                  </h4>
                  <p>
                    With a proven index and a liquid voucher market, the full
                    cash-settled futures follow, settling against the TPI and
                    open to the speculators and market-makers who add depth.
                    This is the prize: whoever owns the settlement layer for
                    intelligence owns a toll on every contract written against
                    it.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* footer */}
      <footer className="foot">
        <div className="foot-inner">
          <div className="foot-top">
            <div className="foot-brand">
              <div className="fb">
                <img src="/logo.svg" alt="" />
                <span>Open Token Exchange</span>
              </div>
              <p>Standing at the cusp of commoditized intelligence.</p>
            </div>
            <div className="foot-cols">
              <div className="foot-col">
                <h5>Company</h5>
                <a href="mailto:liam@velvety.cc">Contact</a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Open Token Exchange. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
