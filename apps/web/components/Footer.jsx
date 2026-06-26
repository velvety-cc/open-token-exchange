import LogoField from "./LogoField";

// Shared site footer. Used on every page unless a page specifically opts out.
export default function Footer() {
  return (
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
  );
}
