// An inline citation in the style of interceptfund.com. A small mono superscript
// marker follows the cited text; hovering or focusing the marker reveals the
// source as a note in the right margin, level with that line (a Tufte-style
// sidenote). On narrow screens the note becomes a small popover below the
// marker. Pure CSS drives the reveal, so no client JS is needed.
export default function Cite({ n, note, source, href, children }) {
  return (
    <span className="cite">
      {children}
      <button
        type="button"
        className="cite-ref"
        role="doc-noteref"
        aria-label={`Footnote ${n}: ${source}`}
      >
        {n}
      </button>
      <span className="cite-pop" role="note">
        <span className="cite-num">{n}</span>
        <span className="cite-text">
          {note}{" "}
          <a href={href} target="_blank" rel="noreferrer">
            {source}
          </a>
        </span>
      </span>
    </span>
  );
}
