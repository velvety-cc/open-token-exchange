import Footer from "../../components/Footer";

export const metadata = {
  title: "Blog | Open Intelligence",
  description:
    "Notes on the economics of inference and the market for commoditized intelligence.",
};

const POSTS = [
  {
    slug: "the-price-of-intelligence",
    title: "Why the price of intelligence will swing",
    excerpt:
      "The four forces that drove token prices down are stalling, a fifth is pushing back, and nothing can store the difference. Here is why a hedge works.",
    date: "June 2026",
    tag: "Research",
  },
];

export default function Blog() {
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
            <p className="post-eyebrow">Blog</p>
            <h1>Notes on commoditized intelligence</h1>
            <p className="post-sub">
              Research and writing on the economics of inference and the market
              we are building.
            </p>
          </div>

          <ul className="post-list">
            {POSTS.map((p) => (
              <li key={p.slug}>
                <a href={`/blog/${p.slug}`}>
                  <span className="post-list-meta">
                    {p.tag} · {p.date}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="post-list-more">Read →</span>
                </a>
              </li>
            ))}
          </ul>
        </main>
      </div>

      <Footer />
    </div>
  );
}
