import SideNav from "../components/SideNav";
import LogoField from "../components/LogoField";
import TradeDialog from "../components/TradeDialog";
import { Button } from "../components/ui/button";
import SupplyDemandChart from "../components/SupplyDemandChart";
import TokenPriceChart from "../components/TokenPriceChart";
import TokenVolumeChart from "../components/TokenVolumeChart";
import Term from "../components/Term";
import Cite from "../components/Cite";

// Inline source notes for Section I, keyed by reference number. Each maps to a
// <Cite> in the prose: the marker reveals this note in the right margin.
const CITES = {
  1: {
    n: 1,
    note: "Deloitte finds inference is roughly two-thirds of all compute in 2026, up from a third in 2023 and half in 2025.",
    source: "Deloitte, “More compute for AI, not less,” Nov 2025",
    href: "https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/compute-power-ai.html",
  },
  2: {
    n: 2,
    note: "Goldman Sachs projects token consumption multiplying 24× to 120 quadrillion tokens per month between 2026 and 2030, about 2.2× per year.",
    source: "Goldman Sachs Research, May 2026",
    href: "https://www.goldmansachs.com/insights/articles/ai-agents-forecast-to-boost-tech-cash-flow-as-usage-soars",
  },
  3: {
    n: 3,
    note: "The global AI inference market is projected to grow from $106.15 billion in 2025 to $254.98 billion by 2030, a 19.2% CAGR.",
    source: "MarketsandMarkets, AI Inference Market 2025–2030",
    href: "https://www.marketsandmarkets.com/Market-Reports/ai-inference-market-189921964.html",
  },
};

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
          <p className="hero-sub">Intelligence is becoming a commodity.</p>
          <p className="hero-sub">
            You can already see the shape of this market forming. The only
            thing missing is the market itself.
          </p>
          <div className="hero-cta">
            <TradeDialog mode="buy">
              <Button size="lg" className="rounded-full">
                Lock a price
              </Button>
            </TradeDialog>
            <TradeDialog mode="sell">
              <Button size="lg" variant="outline" className="rounded-full">
                Sell capacity
              </Button>
            </TradeDialog>
          </div>
          <p className="mt-3.5 text-sm text-mut">
            or{" "}
            <a
              className="text-brand-ink underline underline-offset-2"
              href="mailto:liam@velvety.cc"
            >
              talk to us
            </a>
          </p>
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
              <Term def="The cost of running the model every time someone asks it a question.">
                Inference
              </Term>{" "}
              has surpassed{" "}
              <Term def="The one-time price of teaching a model everything it knows.">
                training
              </Term>{" "}
              to become AI&rsquo;s dominant cost,{" "}
              <Cite {...CITES[1]}>
                approaching two-thirds of all compute, up from roughly a third
                in 2023
              </Cite>
              .
            </p>
            <p>
              This explosion is driven by the extraordinary growth in token
              consumption volume, which is{" "}
              <Cite {...CITES[2]}>
                doubling every year and on track to grow more than 20× by 2030
              </Cite>
              . By revenue, the inference market is already over $100 billion,
              and is set to more than double,{" "}
              <Cite {...CITES[3]}>
                reaching $255 billion by the end of the decade
              </Cite>
              .
            </p>

            <TokenVolumeChart />

            <p>
              This shift turns the output of a model into something an
              economist would recognize as a commodity. A unit of inference,
              one million tokens, is now bought and sold much like a barrel of
              oil or a kilowatt-hour of electricity.
            </p>
            <p className="pull">
              We are standing at the cusp of commoditized intelligence.
            </p>
          </section>

          {/* II - the missing instrument */}
          <section className="section" id="instrument">
            <p className="kicker">
              <span className="num">02</span> The problem
            </p>
            <h2>The missing instrument.</h2>
            <p>
              Here is the problem. Every company that builds on AI now carries a
              large, growing, and unavoidable inference bill. When the cost gets
              big enough, predictability becomes a necessity.
            </p>
            <p>
              In every other commodity market, that exact situation calls for a
              futures market: a way to agree today on the price you will pay
              tomorrow. For oil, electricity, and carbon, such markets exist. For
              intelligence, none does.
            </p>
            <aside className="ref-note">
              <span className="ref-note-label">Precedent</span>
              <img
                src="/dojima-exchange.jpg"
                alt="Woodblock print of the Dōjima Rice Exchange in Osaka"
              />
              <p>
                In 1730, rice merchants in Osaka opened the Dōjima Rice Exchange,
                the first organized futures market in history: rice was essential
                and its price was unmanageable. Standardized receipts turned a
                chaotic spot market into a place to lock tomorrow&rsquo;s price
                today. The same logic later tamed oil, electricity, and carbon.
              </p>
            </aside>
          </section>

          {/* III - the product */}
          <section className="section dark" id="product">
            <p className="kicker">
              <span className="num">03</span> The product
            </p>
            <h2>
              Two products.{" "}
              <span className="h2-dim">One market for intelligence.</span>
            </h2>
            <p className="lede">
              An open futures market needs two things that build on each other: a
              public price for a unit of intelligence, and a place to trade that
              price forward. We are building both.
            </p>

            <div className="prod-grid">
              <div className="prod-col">
                <span className="prod-num">01</span>
                <h3 className="prod-title">The Index</h3>
                <p className="prod-lead">
                  A public, reproducible price for a unit of intelligence.
                </p>
                <p className="prod-body">
                  It rests on two definitions. The{" "}
                  <strong>Standard Inference Token</strong> (SIT) normalizes one
                  unit of model output to a fixed capability bar, so stronger
                  models count for proportionally more. The{" "}
                  <strong>Token Price Index</strong> (TPI) is the volume-weighted
                  average of what qualified providers charge for it, with no
                  single provider allowed to dominate the figure.
                </p>
                <div className="prod-detail">
                  <p className="prod-detail-head">
                    The SIT capability bar
                    <span className="tag">qualifying</span>
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
                  <div className="prod-eq">
                    TPI<sub>t</sub> = Σ <b>w_i</b> · <b>P_i,t</b>
                  </div>
                </div>
              </div>

              <div className="prod-col">
                <span className="prod-num">02</span>
                <h3 className="prod-title">The Token Futures Market</h3>
                <p className="prod-lead">
                  A cash-settled futures market built on the index.
                </p>
                <p className="prod-body">
                  Buyers lock tomorrow&rsquo;s token price today; suppliers with
                  spare capacity guarantee their revenue. Because the index is
                  public and hard to manipulate, the whole market can settle
                  against it. Since tokens cannot be physically delivered, every
                  contract settles in cash against the TPI, exactly as
                  electricity and compute futures already do.
                </p>
                <div className="prod-detail">
                  <p className="prod-detail-head">
                    A token futures contract
                    <span className="tag">cash-settled</span>
                  </p>
                  <table className="spec">
                    <tbody>
                      <tr>
                        <th>Underlying</th>
                        <td>TPI ($/SIT)</td>
                      </tr>
                      <tr>
                        <th>Settlement</th>
                        <td>Cash vs index</td>
                      </tr>
                      <tr>
                        <th>Tenors</th>
                        <td>1 to 12 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* III - why prices move */}
          <section className="section" id="prices">
            <p className="kicker">
              <span className="num">04</span> Why prices move
            </p>
            <h2>Why the price fell, and why that ends.</h2>
            <p>
              Since 2023, the price of a fixed level of intelligence has fallen
              by roughly tenfold a year, one of the steepest cost declines in
              the history of computing. Four forces drove it down.
            </p>
            <ul>
              <li>
                <strong>Labs subsidize.</strong> The leading labs price tokens
                below cost to win users and lock in market share.
              </li>
              <li>
                <strong>Chips got faster.</strong> Each new generation of
                inference hardware produces more tokens per dollar, but slowly:
                performance per dollar improves only about 1.3× a year, doubling
                roughly every two years.
              </li>
              <li>
                <strong>Models got leaner.</strong> Distillation and smaller
                architectures cut the compute behind a given answer by roughly
                3× a year, halving it every eight months. This is the fastest of
                the four forces, and also a finite one.
              </li>
              <li>
                <strong>Competition intensified.</strong> Open-weight
                challengers undercut the incumbents hard (DeepSeek launched at
                roughly 90% below prevailing prices), and each new frontier
                model turns last year&rsquo;s premium capability into this
                year&rsquo;s commodity.
              </li>
            </ul>
            <p>
              Two of these are pure supply mechanics, captured in a simple
              identity:
            </p>

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
              Faster chips raise hardware efficiency and leaner models raise
              algorithmic efficiency, and both multiply the tokens a fixed
              amount of capital and energy can produce. Subsidy and competition
              then push the market price below even what those mechanics
              require.
            </p>
            <p>
              But every one of these forces is near its limit, and a fifth has
              begun to push the other way.
            </p>
            <ul>
              <li>
                <strong>Subsidy ends.</strong> Below-cost pricing cannot outlast
                the race for share. Headline prices are already decelerating
                toward roughly 40% a year, with some services nudging back up.
              </li>
              <li>
                <strong>The buildout slows.</strong> Chip stock can double every
                seven months on paper, but it is gated by power, which grows
                only about 15% a year and takes five to seven years to bring
                online.
              </li>
              <li>
                <strong>Chips run short.</strong> That 1.3× a year is already
                near the physical floor, and a supply crunch (HBM sold out for
                2026, year-long GPU lead times) can push prices the other way.
              </li>
              <li>
                <strong>Good enough arrives.</strong> Open models are already
                good enough for most work, so chasing an ever-higher frontier
                stops driving prices down. Buyers settle on what works, and the
                capability they actually use stops getting cheaper.
              </li>
              <li>
                <strong>Demand explodes.</strong> Above all, autonomous agents
                consume tokens at a scale no human ever did: business token use
                grew more than tenfold in the sixteen months to early 2026, a
                single agent burns 5 to 30 times the tokens of a chat, and
                demand is forecast to multiply another 24× by 2030. Their
                appetite is inelastic: they cannot drop to a weaker model when
                prices rise.
              </li>
            </ul>
            <p>
              Line them up and the cross looks inevitable: efficiency buys about
              3× a year and is slowing toward its 1.3× hardware floor, while
              demand has lately grown closer to 8× a year. The downward forces
              are decelerating; the upward one is not.
            </p>

            <SupplyDemandChart />
          </section>

          {/* IV - no inventory */}
          <section className="section" id="inventory">
            <p className="kicker">
              <span className="num">05</span> No inventory
            </p>
            <h2>A commodity with no inventory.</h2>
            <p>
              And because a token cannot be stored, nothing absorbs the gap. It
              is produced and consumed in the same instant, with no warehouse to
              draw down when demand spikes and none to fill when it falls.
              Supply has to meet demand in real time, so any mismatch shows up
              at once as a price swing. This is why electricity, which also
              cannot be stored, is one of the most volatile commodities on
              Earth. Intelligence is about to join it, and the shift comes in
              three phases:
            </p>

            <TokenPriceChart />

            <div className="steps">
              <div className="step">
                <div className="ph">I</div>
                <div>
                  <h4>
                    Supply-driven decline{" "}
                    <span className="tag good">2023–2025</span>
                  </h4>
                  <p>
                    All four forces push together; prices fall by roughly
                    tenfold a year.
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
                    days, while new supply takes years to arrive: one to three
                    for a data center, and far longer for the power and
                    substations to feed it. The mismatch produces
                    electricity-style swings.
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

          {/* V - the hedge */}
          <section className="section" id="evidence">
            <p className="kicker">
              <span className="num">06</span> The evidence
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
              <span className="num">07</span> Roadmap
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
