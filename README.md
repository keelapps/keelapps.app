# keelapps.github.io

Public site for Keelapps: the vendor page, and the product, documentation and
legal pages for each Atlassian Marketplace app.

Served by GitHub Pages at <https://keelapps.app/>. Plain static HTML — no build
step, no external requests, no fonts or scripts to fetch. Every asset is
same-origin; the mark in the masthead is inline SVG rather than an image.

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

**These four URLs are filed with Atlassian and must not move:**
`/`, `/accesslens/`, `/accesslens/docs/`, `/accesslens/privacy/`.

Recur's three — `/recur/`, `/recur/docs/`, `/recur/privacy/` — go into its
listing when it is submitted, and are frozen from that point on. Treat them as
filed already: the listing is written against them.

## Adding a page

Drop an `index.html` at the right path and push. There is nothing to build.
Copy the `<head>` block and the masthead/footer markup from an existing page —
without a build step there is no include mechanism, so the site chrome is
repeated verbatim in every file.

## CSS

Seven flat files, loaded in this order. Each page links the first four plus its
own:

| File | Contains |
| --- | --- |
| `reset.css` | Zeroing. Must load first so everything after it wins. |
| `root.css` | Design tokens only. No selector but `:root`. |
| `elements.css` | Unclassed element baseline — a page with only these three is already readable and on-brand. |
| `site.css` | Masthead, breadcrumb, footer, asides, tables, pagination. |
| `home.css` / `product.css` / `manual.css` | One per page type. `manual.css` serves both docs and privacy. |

`elements.css` uses only bare tag selectors, so any component rule beats it on
specificity and nothing ever needs `!important`.

### The palette is two colours

From `keelapps/.github` `brand/README.md`: navy and cream, swapping between
figure and ground with the colour scheme, plus coral for the ballast bulb in the
mark and **nothing else** — not links, not buttons, not emphasis. Every neutral
on the site is ink at an alpha, which is why there is no third hex value in
`root.css`.

Two consequences worth knowing before editing:

- **Links carry no colour.** They are ink with an underline that darkens on
  hover. A coloured link would be a third material.
- **`--color-ink-faint` is 2.8:1 and must not carry text.** It is for the
  generated station numbers and list markers, which repeat what is beside them.
  Use `--color-ink-muted` (5.2:1) for anything a person has to read.

## Checks before pushing

```sh
tools/check-legal-text          # in-force legal text is byte-identical vs HEAD
```

The privacy policy is a published legal document whose URL is filed with the
Atlassian Marketplace. Its text is wrapped in `<!-- legal:begin -->` /
`<!-- legal:end -->` sentinels; restyling and re-tagging inside them is fine,
rewording is not. The script diffs the extracted prose and exits non-zero on any
change, so a reword has to be deliberate.

```sh
tools/check-contrast.js         # paste into a devtools console, both schemes
```

Returns every text node below WCAG AA for its size, resolving alpha against what
it is actually painted on. Empty array is clean.

The site chrome should stay byte-identical across an app's three pages, so drift
is greppable. The masthead differs *between* apps — its second link points at the
app you are on — so check one app at a time:

```sh
for app in accesslens recur; do
  for f in $app/index.html $app/docs/index.html $app/privacy/index.html; do
    awk '/<header class="masthead">/,/<\/header>/' "$f" | shasum | cut -d' ' -f1
  done | sort -u | wc -l        # must print 1, once per app
done
```

## Local preview

```sh
python3 -m http.server 8000
```

Use a server, not `file://` — every stylesheet and asset is referenced from the
site root and those paths do not resolve under the file protocol.
