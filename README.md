# Project location

Canonical project folder: `/Users/nemethtamas/Projects/RM/VODAR-Smart-Irrigation/`.

- `dist/`: deployable website, including editable copy in `content.json`.
- `delivery/`: all previous website ZIP packages, screenshots and image-edit notes.
- `.openai/hosting.json`: unchanged identity of the existing hosted Site.
- `.git/`: preserved source history and hosting source connection.

Migrated on 16 October 2026 at the user's request. The earlier project and export paths are compatibility symlinks to this location, not separate copies. Continue editing and publishing from this folder. The user confirmed review of the legal page; the public review banner and draft suffixes were removed in all four languages. The remaining substantive text was preserved.

---

# VODAR Europe — RM & Kántor Automatika

Editable first version, 16 October 2026. This is a standalone static site intended for later integration at a permanent path on kantorautomatika.hu.

## Editing the page

All visitor-facing copy is in `dist/content.json`:

- `settings`: contact details, company links, default language and EIMA visibility.
- `en`, `hu`, `it`, `de`: complete language versions. The same sections appear in the same order in all languages.
- `partnership`: roles of VODAR, RM and Kántor, including RM's commercial and contracting role.
- `network`: partner types, support topics and individually negotiated terms. Update these once territories and support commitments are final.
- `products`: four VODAR machine configurations. Product names and descriptions can be revised in each language.
- `control`: control panels, remote access, irrigation-data integrations and the Starpower context.

To change photographs, replace the corresponding web image in `dist/assets/`, keeping the filename. `asset-sources.json` records original file locations. Source photographs and project reference material have not been modified.

## Preview and deployment

Serve the `dist` folder through any static web server. Opening `index.html` directly as a local file does not support the content fetch in all browsers.

The page works in a subfolder. Language links use `?lang=en`, `?lang=hu`, `?lang=it`, and `?lang=de`. The top-right selector preserves form entries and saves only the language preference in the visitor's browser.

For the existing website maintainer: upload the CONTENTS of `dist/` to the agreed subfolder. No Node, PHP or database is required. Ensure the directory index serves index.html and that content.json has application/json MIME type. Add a link from the main website if desired. Confirm HTTPS and the final canonical URL before printing the QR code.

## Enquiry behaviour

The form prepares an email to info@kantorautomatika.hu. It opens the visitor's email application and displays a copyable draft as a fallback. It does not send, collect, store, or forward enquiries. A server-side form can be connected later once the existing hosting and mail-delivery setup are agreed. No analytics, tracking integrations, external font calls or cookie banner are installed.

## Items to confirm before exhibition launch

1. Territory arrangements, support scope, partner responsibilities and commercial terms. Current copy says these are individually agreed.
2. Availability of each cloud/data integration, interface language and retrofit configuration. Current copy asks visitors to discuss the technical proposal rather than promising universal compatibility.
3. Final technical and native-language review of all four language versions.
4. Hall/stand number (not invented or shown), agreed destination path and QR code. EIMA dates are 10–14 November 2026 according to the official event website.
5. Optional replacement of the email-draft form with a hosted submission endpoint and corresponding data-handling notice.

The page does not claim an exclusive European territory, unconditional warranties, universal retrofit compatibility, installation counts or measured water-saving results.

## Források / Sources

- User brief and partnership clarification, 16 October 2026.
- http://kantorautomatika.hu/ — existing Montserrat typography, light-blue/white styling, capabilities and company address.
- https://rmhungary.hu/ — trading portfolio including VODAR systems and Starpower equipment; retrieved 16 October 2026.
- Existing project flyer texts — used as topic references, not proof of quantitative claims.
- https://www.eima.it/en/index.php — event dates.
- Machine photographs and logos from /Users/nemethtamas/Projects/RM/; control-panel image extracted from the user-provided Talp storora.png without changing the machinery.

## Revision 8 — footer and privacy draft

The footer links to `legal.html` sections for company details, privacy, and cookies/local storage, in all four languages. Text is editable under `legal` in each language of `dist/content.json`. The page is explicitly marked as a draft and has `noindex` metadata. It describes the checked page behaviour without claiming that hosting or email processing has been legally finalised. Confirm controller roles, legal bases, retention periods, processors, transfers, registry and final hosting details before public launch. NAIH rights guidance and the GDPR are linked from the draft.

The hero's repeated VODAR logo and the visible pump-station caption were removed at the user's request. Non-white buttons use #11C8C2 with rounded ends; the partner-network section uses #1CADE6.
