import SideNav from "../components/SideNav";
import LogoField from "../components/LogoField";
import TradeDialog from "../components/TradeDialog";
import { Button } from "../components/ui/button";
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
            <img src="/logo.svg" alt="Open Intelligence" />
            <span className="brand-name">Open Intelligence</span>
          </a>
          <nav className="topnav">
            <a href="#commodity">Thesis</a>
            <a href="#product">Product</a>
            <a href="#build">Roadmap</a>
            <a href="/blog">Blog</a>
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
            You can already see the shape of this market forming. The only thing
            missing is the market itself.
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
              Today,{" "}
              <Term def="The cost of running the model every time someone asks it a question.">
                inference
              </Term>{" "}
              has surpassed{" "}
              <Term def="The one-time price of teaching a model everything it knows.">
                training
              </Term>{" "}
              to become AI&rsquo;s dominant cost,{" "}
              <Cite {...CITES[1]}>
                approaching 60% of all compute, up from roughly 30% in 2023
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
              This shift turns the output of a model into something an economist
              would recognize as a commodity. A unit of inference, one million
              tokens, is now bought and sold much like a barrel of oil or a
              kilowatt-hour of electricity.
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
              tomorrow. For oil, electricity, and carbon, such markets exist.
            </p>
            <p>For intelligence, none does.</p>
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
              An open futures market needs two things that build on each other:
              a public price for a unit of intelligence, and a place to trade
              that price forward. We are building both.
            </p>

            <div className="prod-grid">
              <div className="prod-col">
                <span className="prod-num">01</span>
                <h3 className="prod-title">The Open Intelligence Index</h3>
                <p className="prod-lead">
                  A public, reproducible price for a unit of intelligence.
                </p>
                <p className="prod-body">
                  It rests on two definitions. The{" "}
                  <strong>Standard Inference Token</strong> (SIT) normalizes one
                  unit of model output to a fixed capability bar, so stronger
                  models count for proportionally more. The{" "}
                  <strong>Token Price Index</strong> (TPI) is the
                  volume-weighted average of what qualified providers charge for
                  it, with no single provider allowed to dominate the figure.
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

          {/* IV - how to build it */}
          <section className="section" id="build">
            <p className="kicker">
              <span className="num">04</span> Roadmap
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
                    Match by hand <span className="tag good">Building now</span>
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
        <LogoField className="foot-field" originX={0.92} originY={0.96} />
        <div className="foot-inner">
          <div className="foot-top">
            <div className="foot-brand">
              <div className="fb">
                <img src="/logo.svg" alt="" />
                <span>Open Intelligence</span>
              </div>
              <p>Standing at the cusp of commoditized intelligence.</p>
            </div>
            <div className="foot-cols">
              <div className="foot-col">
                <h5>Resources</h5>
                <a href="/blog">Blog</a>
              </div>
              <div className="foot-col">
                <h5>Company</h5>
                <a href="mailto:liam@velvety.cc">Contact</a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Open Intelligence. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
