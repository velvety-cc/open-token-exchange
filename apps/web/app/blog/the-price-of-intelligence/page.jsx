import SupplyDemandChart from "../../../components/SupplyDemandChart";
import TokenPriceChart from "../../../components/TokenPriceChart";
import Footer from "../../../components/Footer";

export const metadata = {
  title: "Why the price of intelligence will swing | Open Intelligence",
  description:
    "The four forces that drove token prices down are stalling, a fifth is pushing back, and nothing can store the difference. Why a hedge works.",
};

export default function Post() {
  return (
    <div className="blog-page">
      {/* top bar (tiny, non-sticky) */}
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="/">
            <img src="/logo.svg" alt="Open Intelligence" />
            <span className="brand-name">Open Intelligence</span>
          </a>
          <nav className="topnav">
            <a href="/">Home</a>
            <a href="/blog">Blog</a>
            <a href="mailto:liam@velvety.cc">Contact</a>
          </nav>
        </div>
      </header>

      <div className="shell">
        <main className="col">
          <div className="post-head">
            <p className="post-eyebrow">
              <a href="/blog">Research</a>
            </p>
            <h1>Why the price of intelligence will swing</h1>
            <p className="post-sub">
              The four forces that drove token prices down are stalling, a fifth
              is pushing back, and nothing can store the difference. Here is why
              a hedge works.
            </p>
          </div>

          {/* I - why prices move */}
          <section className="section" id="prices">
            <p className="kicker">
              <span className="num">01</span> Why prices move
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

          {/* II - no inventory */}
          <section className="section" id="inventory">
            <p className="kicker">
              <span className="num">02</span> No inventory
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

          {/* III - the hedge */}
          <section className="section" id="evidence">
            <p className="kicker">
              <span className="num">03</span> The hedge
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

            <p className="post-cta">
              This is the case for the index and the instruments built on it.{" "}
              <a href="/#product">See what we are building</a>.
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
