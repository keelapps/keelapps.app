# keelapps.app

Source for the Keelapps site: the vendor page, and the product, documentation
and legal pages for each Atlassian Marketplace app.

Live at **<https://keelapps.app/>**, served by GitHub Pages from `main` — a push
to `main` publishes. Plain static HTML: no build step, no external requests, no
fonts or scripts to fetch. Every asset is same-origin, and the mark in the
masthead is inline SVG rather than an image.

| App | Product | Documentation | Privacy policy |
| --- | --- | --- | --- |
| AccessLens for Jira | [`/accesslens/`](https://keelapps.app/accesslens/) | [`/accesslens/docs/`](https://keelapps.app/accesslens/docs/) | [`/accesslens/privacy/`](https://keelapps.app/accesslens/privacy/) |
| Recur for Jira | [`/recur/`](https://keelapps.app/recur/) | [`/recur/docs/`](https://keelapps.app/recur/docs/) | [`/recur/privacy/`](https://keelapps.app/recur/privacy/) |

## Two things here have consequences off this site

**The URLs above are filed with Atlassian and must not move.** Marketplace
listings and app install flows link to them. A privacy policy URL is awkward to
change once it is submitted, and a moved documentation URL is a dead link in a
live listing. Recur's three go into its listing at submission and are frozen
from that point on — treat them as filed already, because the listing is written
against them.

**The privacy policies are in-force legal documents.** Buyers read the live copy
at the filed URL. Each one's text is fenced by `<!-- legal:begin -->` /
`<!-- legal:end -->` sentinels and guarded by `tools/check-legal-text`, which
fails on any reworded word. Restyling inside the sentinels is fine. Rewording
means changing the source in the app's own repository in the same breath — the
two are meant to stay identical.

## Working on the site

```sh
python3 -m http.server 8000     # not file:// — asset paths are site-absolute
tools/check-legal-text          # run before every push
```

Conventions — path layout, the CSS load order, the two-colour palette, and the
rest of the checks — are in [`MAINTAINING.md`](MAINTAINING.md). Read it before
changing anything structural.

## Support

Questions and bug reports for the apps themselves go to
[`keelapps/support`](https://github.com/keelapps/support/issues). Security
issues: [report privately](https://github.com/keelapps/support/security/advisories/new).
