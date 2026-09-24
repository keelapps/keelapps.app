# Brand assets

Images built *from* the brand rather than drawn by hand, so the mark, the two
materials and the tracking stay identical to what `index.html` and
`assets/css/root.css` already define. Nothing on this site loads them: they are
uploaded to places that host their own copy.

| File | Size | Where it goes |
| --- | --- | --- |
| `keelapps-youtube-2560x1440.png` | 2560×1440 | YouTube channel art — Customise channel → Branding → Banner image |

One generated image *is* loaded by the site, and lives outside this folder because
every page already points at its path: `assets/banner.png`, the default share card
(og:image) for any page without its own. `tools/make-share-card` rebuilds it. It
names no products — the hand-drawn original listed four apps and was out of date
by the fifth.

## Rebuilding

```sh
tools/make-youtube-banner
tools/make-share-card
```

Do not edit a PNG here. Change the script and re-run it. The mark's paths are
copied from the masthead, the colours are the palette, and the letter-spacing
is `--tracking-tight` and `--tracking-wide` resolved against each size — an
edited PNG drifts from all three silently, which is the drift these files exist
to prevent.

Both brand faces (Outfit, Geist Mono) are fetched at run time. This site ships
no font files, and a face used only to build an image does not belong in its
assets — so rebuilding needs a network.

## The banner's one hard constraint

YouTube crops the same file differently on every device. A phone shows only the
middle **1546×423**; a desktop shows 2560×423; a television shows all
2560×1440. So every word sits inside that safe area, and the waterline carried
out to the canvas edges is the only thing the wider crops add.

`tools/make-youtube-banner` prints the margins it achieved and exits non-zero
if the type falls outside the safe area. Changing the copy is safe as long as
it still passes — the check is the reason the layout is computed rather than
eyeballed.
