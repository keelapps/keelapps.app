# keelapps.app

Source for the Keelapps site: the vendor page, and the product, documentation
and legal pages for each Atlassian Marketplace app.

Live at **<https://keelapps.app/>** — a push to `main` publishes. Plain static
HTML: no build step and no scripts of our own. Every asset is same-origin —
the two brand faces are served from `assets/fonts/` — and the mark in the
masthead is inline SVG rather than an image.
Two third parties are contacted: Google Analytics on every page load, and
`youtube-nocookie.com` only after a visitor clicks play on a product demo —
those players sit behind a same-origin poster until then.

| App | Product | Documentation | Privacy policy | Status |
| --- | --- | --- | --- | --- |
| AccessLens for Jira | [`/accesslens/`](https://keelapps.app/accesslens/) | [`/accesslens/docs/`](https://keelapps.app/accesslens/docs/) | [`/accesslens/privacy/`](https://keelapps.app/accesslens/privacy/) | Live — [Marketplace](https://marketplace.atlassian.com/apps/4182244448/accesslens-for-jira) |
| AccessLens for Confluence | [`/accesslens-confluence/`](https://keelapps.app/accesslens-confluence/) | [`/accesslens-confluence/docs/`](https://keelapps.app/accesslens-confluence/docs/) | [`/accesslens-confluence/privacy/`](https://keelapps.app/accesslens-confluence/privacy/) | Live — [Marketplace](https://marketplace.atlassian.com/apps/2097025605/accesslens-space-page-permission-audit) |
| Recur for Jira | [`/recur/`](https://keelapps.app/recur/) | [`/recur/docs/`](https://keelapps.app/recur/docs/) | [`/recur/privacy/`](https://keelapps.app/recur/privacy/) | Live — [Marketplace](https://marketplace.atlassian.com/apps/3262138887/recur-recurring-tasks-for-jira) |
| Digest for Jira | [`/digest/`](https://keelapps.app/digest/) | [`/digest/docs/`](https://keelapps.app/digest/docs/) | [`/digest/privacy/`](https://keelapps.app/digest/privacy/) | Live — [Marketplace](https://marketplace.atlassian.com/apps/978618646/digest-daily-weekly-summaries-for-jira) |
| Prefill for Jira | [`/prefill/`](https://keelapps.app/prefill/) | [`/prefill/docs/`](https://keelapps.app/prefill/docs/) | [`/prefill/privacy/`](https://keelapps.app/prefill/privacy/) | Live — [Marketplace](https://marketplace.atlassian.com/apps/3380543121/prefill-for-jira) |
| Satchel for Jira | [`/satchel/`](https://keelapps.app/satchel/) | [`/satchel/docs/`](https://keelapps.app/satchel/docs/) | [`/satchel/privacy/`](https://keelapps.app/satchel/privacy/) | Live — [Marketplace](https://marketplace.atlassian.com/apps/788499894/satchel-bulk-attachment-download-manager) |
| Signoff for Confluence | [`/signoff/`](https://keelapps.app/signoff/) | [`/signoff/docs/`](https://keelapps.app/signoff/docs/) | [`/signoff/privacy/`](https://keelapps.app/signoff/privacy/) | Live — [Marketplace](https://marketplace.atlassian.com/apps/2487832225/signoff-page-approvals-for-confluence) |
| Evergreen for Confluence | [`/evergreen/`](https://keelapps.app/evergreen/) | [`/evergreen/docs/`](https://keelapps.app/evergreen/docs/) | [`/evergreen/privacy/`](https://keelapps.app/evergreen/privacy/) | Live — [Marketplace](https://marketplace.atlassian.com/apps/1279909983) |
| Curator for Confluence | [`/curator/`](https://keelapps.app/curator/) | [`/curator/docs/`](https://keelapps.app/curator/docs/) | [`/curator/privacy/`](https://keelapps.app/curator/privacy/) | Live — [Marketplace](https://marketplace.atlassian.com/apps/33303578/curator-bulk-page-label-governance) |
| Satchel for Confluence | [`/satchel-confluence/`](https://keelapps.app/satchel-confluence/) | [`/satchel-confluence/docs/`](https://keelapps.app/satchel-confluence/docs/) | [`/satchel-confluence/privacy/`](https://keelapps.app/satchel-confluence/privacy/) | Live — [Marketplace](https://marketplace.atlassian.com/apps/2701230997/satchel-bulk-attachments-for-confluence) |
| Mail Templates for Jira | [`/mail-templates/`](https://keelapps.app/mail-templates/) | [`/mail-templates/docs/`](https://keelapps.app/mail-templates/docs/) | [`/mail-templates/privacy/`](https://keelapps.app/mail-templates/privacy/) | Live — [Marketplace](https://marketplace.atlassian.com/apps/948167511/mail-templates-for-jira) |

## Two things here have consequences off this site

**The URLs above are filed with Atlassian and must not move.** Marketplace
listings and app install flows link to them. A privacy policy URL is awkward to
change once it is submitted, and a moved documentation URL is a dead link in a
live listing. The five live apps' URLs are filed already; treat every row in the
table as filed, because each listing is written against them from the day it is
submitted.

**The privacy policies are in-force legal documents.** Buyers read the live copy
at the filed URL. Each one's text is fenced by `<!-- legal:begin -->` /
`<!-- legal:end -->` sentinels and guarded by `tools/check-legal-text`, which
fails on any reworded word. Restyling inside the sentinels is fine. Rewording
means changing the source in the app's own repository in the same breath — the
two are meant to stay identical.

## Working on the site

```sh
python3 -m http.server 8000     # not file:// — asset paths are site-absolute
tools/make-chrome --check       # masthead, footer and app cards up to date
tools/check-legal-text          # run before every push
```

Conventions — path layout, the CSS load order, the two-colour palette, and the
rest of the checks — are in [`MAINTAINING.md`](MAINTAINING.md). Read it before
changing anything structural.

## Support

Questions and bug reports for the apps themselves go to
the [Keelapps support portal](https://keelapps.atlassian.net/helpcenter/support/). Security
issues: email <support@keelapps.atlassian.net> — see [/security/](https://keelapps.app/security/).
