# @ote/web — Landing page

The Open Token Exchange marketing / investor landing page. A single long-form,
narrow-column page with a sticky scroll-spy side nav, sourced from Xing (2026),
["AI Token Futures Market"](https://arxiv.org/abs/2603.21690) (a copy of the PDF
lives in `/reference`).

Next.js (App Router), plain JSX, no TypeScript. Fonts (Fraunces / Inter /
JetBrains Mono) load from Google Fonts at runtime; design lives in a single
`app/globals.css`.

## Develop

```bash
npm run web          # from the repo root — dev server on http://localhost:4311
# or
npm run dev --workspace=@ote/web
```

## Build

```bash
npm run web:build    # production build
npm run web:start    # serve the build on :4311
```

## Layout

```
app/
  layout.jsx    # <head>, fonts, metadata, favicon
  page.jsx      # all content sections (the copy)
  globals.css   # the entire design system
components/
  sections.js   # section registry (id / number / label) — shared
  SideNav.jsx   # client: IntersectionObserver scroll-spy
public/
  logo.svg      # brand mark
```

Content is mapped onto the information architecture of
[interceptfund.com](https://www.interceptfund.com/); the visual language
combines GitUpdates.ai (scroll-spy side nav, structured detail cards, serif
display type), sfcompute.com (narrow editorial column), and multica.ai.
