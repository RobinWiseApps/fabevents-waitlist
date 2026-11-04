# FaB Events waitlist

A one-page site where players leave their name and email to be invited to
the FaB Events test build. Static HTML on GitHub Pages, entries in Firestore
(shared project `robinwiseapps-c4e9e`, collection `fabEventsWaitlist`).
Nothing to build, nothing runs on a server.

- **Sign-up page:** https://robinwiseapps.github.io/fabevents-waitlist/
- **Entries (Robin only):** https://robinwiseapps.github.io/fabevents-waitlist/admin.html
  — sign in with robinwiseapps@gmail.com, see the count and the list, download
  a CSV, remove an entry on request.

Made 2026-11-04, the day before a trip, to collect interest while the
distribution questions with LSS are still open (fab_event_manager
`docs/distribution.md`, Terms of use). It does not hand out builds.

## Files

| File | What |
|---|---|
| `index.html` | The form. Name, email, Android/iPhone/Both, a hidden honeypot field for bots, a QR code of the page, the privacy sentence. |
| `admin.html` | Google sign-in, the list, CSV download, remove. Readable only by the account the rules name. |
| `firebase-config.js` | Web app settings (the "FaB Events Windows" web registration, reused), collection name, contact address. |
| `firestore.rules` | The block to paste into the project's rules. Create-only for everyone, read/delete for Robin. |
| `style.css` | Dark theme, one column. |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are. |

## Design notes

- **One entry per email.** The document id is the SHA-256 of the lower-cased
  email. The rules allow `create` only, so a repeat sign-up is refused and
  the page says "already on the list". Nobody can overwrite or read entries.
- **Rules check the form of every field** (lengths, email pattern, platform
  from a fixed list, `createdAt == request.time`, `source == 'web'`), same
  approach as the report kit's `bugReports` block.
- **Spam:** honeypot field plus the rules. If junk still arrives, turn on
  App Check (reCAPTCHA v3) in the console and add the two lines to the page;
  not done up front because it adds a reCAPTCHA badge and a console round
  trip.
- **Privacy sentence** under the form states the single purpose and the
  address for removal. The sign-ups are EU players, so this is the minimum.
- **No public counter.** The admin page shows the count; the sign-up page
  does not, until the number is worth showing.
- **English only.** A convention crowd reads English; the app itself is
  localised, the page is not.

## Robin's part (once)

1. **GitHub:** create the public repo `RobinWiseApps/fabevents-waitlist`
   (empty, no README). Then push this folder (`git push -u origin main`).
2. **GitHub Pages:** repo → Settings → Pages → Build and deployment →
   Source "Deploy from a branch", branch `main`, folder `/ (root)`, Save.
   The URL above goes live within a minute or two.
3. **Firestore rules:** Firebase console → Firestore Database → Rules →
   paste the `match /fabEventsWaitlist/...` block from `firestore.rules`
   inside the `documents` block, next to the other apps' blocks → Publish.
4. **Google sign-in from the Pages domain:** Firebase console →
   Authentication → Settings → Authorized domains → Add domain
   `robinwiseapps.github.io`. Without it `admin.html` cannot sign in
   (`auth/unauthorized-domain`). The sign-up page does not need this.
5. Open the sign-up page, enter yourself, then open `admin.html`, sign in,
   and check the entry is there. Remove it or keep it as the first name.

## Later

- Exporting into a mailing tool: the CSV from `admin.html`.
- A public "N players waiting" line on the page: read the count through a
  Cloud Function or a counter document, since the rules keep entries
  unreadable. Not before the number is worth showing.
