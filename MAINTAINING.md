# Maintaining this site

Conventions for editing keelapps.app. The rules that carry consequences beyond
this repository — the frozen URLs and the in-force legal text — are in
[`README.md`](README.md); this file is how the site is built and checked.

## Why the paths look like this

Pages are laid out as `/<app>/<document>/` rather than `/<app>-<document>.html`:

```
/accesslens/privacy/
```

Marketplace listings and app install flows link to these URLs, and a submitted
privacy policy URL is awkward to change afterwards. Keeping app and document as
separate path segments means a second app is a new directory rather than a new
repository, and moving to the custom domain was a `CNAME` file — the paths, and
therefore every URL already handed to Atlassian, stayed exactly as they were.

## Adding a page

Drop an `index.html` at the right path and push. There is nothing to build.
Copy the `<head>` block, an empty `<header class="masthead"></header>` and a
footer holding only the page's `<p class="footer__fine">`, then run
`tools/make-chrome`. Without a build step there is no include mechanism, so
the chrome is repeated in every file — and written there by that script rather
than by hand.

## The chrome is generated

`tools/make-chrome` writes the parts more than one page carries:

- the masthead — the lockup, the app a page belongs to and that app's three
  pages, and its "Try it free" button once it has a Marketplace listing;
- the footer — every app by product, then the page's own fine print, which it
  reads back out of the page and keeps;
- the home page's catalog, between `<!-- fleet:begin -->` and `<!-- fleet:end -->`;
- each product page's "more apps" row, between `<!-- related:begin -->` and
  `<!-- related:end -->`;
- the theme colours and the two font preloads in every `<head>`.

A card carries no copy of its own. Its headline is the product page's `<h1>`,
its demo length the page's `VideoObject` duration, its status whether the
page's intro links to a Marketplace listing, and its picture whatever
`tools/make-card-images` made from the page's `og:image`. Edit the product
page, then:

```sh
tools/make-card-images          # only if a product page's og:image changed
tools/make-chrome               # rewrite the chrome in every page
tools/make-chrome --check       # non-zero if any page has drifted
```

Adding an app is a row in `APPS` at the top of `tools/make-chrome`, its three
pages, and those two scripts. The home page counts the fleet in words ("Eleven
apps. One job each.", "See all eleven apps") — those are copy, and change by
hand.

## The page is a cross-section

Every page is drawn as a hull cut at the waterline. The masthead, and on the
home and product pages the hero below it, sit on the tint (`--color-tint`) —
above the waterline. The hero's bottom rule is the waterline. The home page
sets the mark on it, keel hanging into the fleet; a product page sets its demo
across it, half above and half below. Everything under it is on the canvas,
and each page has at most one *deep* band (`.deep` in `site.css`) where the
plate inverts: the home page's four shared principles, a product page's
availability and call to action.

## Video embeds

A product demo is embedded as an `<iframe>` carrying **both** `src` and `srcdoc`.
Browsers render the `srcdoc` document and never fetch `src`, so the page loads
with no third-party request; the `srcdoc` is a same-origin page — `about:srcdoc`
inherits this site's base URL — holding the app's screenshot from
`assets/screenshots/` and a play glyph, wrapped in a link to the embed URL with
`autoplay=1`. Clicking navigates the iframe itself to YouTube. That click is the
first and only request to a third party, and it is the visitor's.

Copy the block from any live product page. The `<figure>` carries `id="demo"`:
the hero's "Watch the demo" link and every app card's "Demo" link point there,
so the only way to YouTube is still the visitor's click on the poster. Three
rules:

- The poster is a screenshot already in `assets/screenshots/`. Never a YouTube
  thumbnail — that would be a third-party request on load.
- Always `www.youtube-nocookie.com`, for both `src` and the link inside `srcdoc`.
- No script, and no bare YouTube iframe. The facade is the only embed form here.

The `srcdoc` document cannot see `root.css`, so its two colours are written out:
`#0F2536` (navy) and `#F4EFE6` (cream) — the same two materials, nothing new.

## Search engines

`robots.txt` allows everything and points at `sitemap.xml`, which lists every
`index.html` in the tree. Nothing regenerates it on push, so after adding or
editing a page:

```sh
tools/make-sitemap              # rewrite sitemap.xml; run last, commit with the edit
tools/make-sitemap --check      # non-zero if a page is missing from it
```

Each live product page carries one `application/ld+json` block in its `<head>`
— a `SoftwareApplication` with its demo as a `VideoObject` — and the home page
an `Organization`. It is data, not script: nothing executes and nothing is
fetched. Three rules:

- `name` is the app's current Marketplace listing name, `alternateName` the
  short name the page itself uses. Rename the listing, rename it here.
- `description` and `image` repeat the page's own meta description and
  `og:image`. There is no second set of copy to keep in step.
- The `Offer` says what `pricing-line` says. A coming-soon page gets no block
  until it has a listing to point `installUrl` at.

## CSS

Seven flat files, loaded in this order. Each page links the first four plus its
own:

| File | Contains |
| --- | --- |
| `reset.css` | Zeroing. Must load first so everything after it wins. |
| `root.css` | Design tokens only. No selector but `:root`. |
| `elements.css` | Unclassed element baseline — a page with only these three is already readable and on-brand. |
| `site.css` | Masthead, breadcrumb, buttons, eyebrow, the deep band, the app card, footer, asides, tables, pagination. |
| `home.css` / `product.css` / `manual.css` | One per page type. `manual.css` serves both docs and privacy. |

`elements.css` uses only bare tag selectors, so any component rule beats it on
specificity and nothing ever needs `!important`.

### Fonts

Outfit and Geist Mono are served from `assets/fonts/`: the Latin subsets of the
variable fonts from Google Fonts, about 55 KB together, each beside its SIL
Open Font License. `root.css` declares them, every page preloads both, and
`font-display: swap` shows the fallback in each stack until they arrive.
Characters outside the subset — the arrows in pagination — come from the
fallback face. Nothing is fetched from Google at run time.

### The palette is two colours

From the Keelapps brand guide: navy and cream, swapping between
figure and ground with the colour scheme, plus coral for the ballast bulb in the
mark and **nothing else** — not links, not buttons, not emphasis. Every neutral
on the site is ink at an alpha, which is why there is no third hex value in
`root.css`.

Two consequences worth knowing before editing:

- **Links carry no colour.** They are ink with an underline that darkens on
  hover. A coloured link would be a third material.
- **`--color-ink-faint` is 2.8:1 and must not carry text.** It is for the
  generated station numbers and list markers, which repeat what is beside them.
  Use `--color-ink-muted` (5.2:1) for anything a person has to read. Decoration
  that has to be faint — the slash in the masthead, the `st.00` / `wl +0`
  marks on the home page's waterline — is generated content, not text.
- **The deep band has its own dilutions.** On the inverted plate the ground is
  ink, so muted and faint text there is `--color-canvas-muted` and
  `--color-canvas-faint`, the ground at the same alphas.

## Checks before pushing

```sh
tools/check-legal-text          # in-force legal text is byte-identical vs HEAD
```

Each published privacy policy is wrapped in `<!-- legal:begin -->` /
`<!-- legal:end -->` sentinels and listed in the script's `PAGES`. Restyling and
re-tagging inside the sentinels is fine; rewording is not. The script diffs the
extracted prose and exits non-zero on any change, so a reword has to be
deliberate — and has to happen in the app repository at the same time.

A page newly added to `PAGES` fails until the commit that adds it lands. That
commit is the baseline; the failure is the script working, not a mistake.

```sh
tools/check-contrast.js         # paste into a devtools console, both schemes
```

Returns every text node below WCAG AA for its size, resolving alpha against what
it is actually painted on. Empty array is clean.

```sh
tools/make-chrome --check       # masthead, footer, cards and <head> up to date
```

The masthead is byte-identical across an app's three pages and differs between
apps; the footer's fleet is identical everywhere and its fine print is each
page's own. `--check` fails on any page that no longer matches what the script
would write.

## Local preview

```sh
python3 -m http.server 8000
```

Use a server, not `file://` — every stylesheet and asset is referenced from the
site root and those paths do not resolve under the file protocol.
