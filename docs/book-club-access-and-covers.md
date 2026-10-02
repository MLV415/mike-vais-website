# Finishing cover hosting and book links

The formerly blocked follow-up was completed locally on 2026-10-02, reviewed, and explicitly approved for publication by the user. See HANDOFF.md for release status. All 18 real covers are repository-hosted; 18 Goodreads pages and 17 Wikipedia pages were matched to title/author, with 13 additional verified author/book-specific resources selected for display. *Lesser Known Monsters of the 21st Century* has no matching Wikipedia article, so that resource is omitted; its Goodreads, author, and publisher links are included. Google Books was rate-limited (HTTP 429), so verified publisher and specific Open Library sources were used instead. Visitors load covers and resource icons from this website, not third-party image hosts.

## Historical cloud restriction (not a current user action)

The prior cloud chat encountered a failed environment-settings publication workflow. These notes describe that historical situation; do not send the user back through those settings for normal local updates. Network access from local tools may still require the product's scoped approval mechanism, separate from cloud environment settings. The previously suggested entry point was:

https://chatgpt.com/codex/settings/environments

1. Open that URL while signed in to the same account used for this task.
2. Select the existing environment associated with `MLV415/mike-vais-website`, then choose its edit/settings action.
3. Enable agent internet/network access. If the domain control offers `All domains`, that allows the publisher/author/library research needed here. Save the configuration.
4. Return to this chat and say `Internet access enabled`. Codex will check the actual policy and connectivity before continuing; saving a configuration does not guarantee the running environment has picked it up.

The assistant cannot inspect your account's settings UI or confirm that this particular managed environment is listed on the standard Codex web page. If the URL does not show the matching environment, do not create a new environment or change unrelated settings. Reply `Environment not listed`; no screenshot or new attachment is necessary. The next step is to identify the environment owner/configuration entry point, not to guess another settings menu.

If using a custom domain allowlist instead, the needed cover/catalog hosts include `covers.openlibrary.org`, `openlibrary.org`, `cdn.penguin.co.uk`, and `mpd-biblio-covers.imgix.net`. Link research needs `en.wikipedia.org`, `www.goodreads.com`, and the publisher/author hosts already recorded in `data/book-club.json`. Include redirect destinations when shown by a verified source. Do not bypass the environment proxy or try to change its policy file locally.

## Cover and link maintenance

1. Verify Wikipedia/Goodreads book pages, omitting links that cannot be matched. Source dependable publisher/author images where existing library URLs still fail.
2. Run `npm run cache:book-club:covers`. The importer downloads real source images to a private staging directory, rejects HTML/error responses, and does not install files or update canonical records if any source download fails. It preserves remote source URLs and rights notes, and records each local file path, SHA-256 checksum, download URL, and retrieval time.
3. Run the generator. Public cards, admin image links, and the public JSON prefer the local cover path. Builds reject missing/tampered local files instead of publishing broken paths.
4. Run build/static checks, cover-workflow tests, image verification, and actual rendered-page checks. Inspect the covers against the correct title/author; file signatures and checksums alone do not verify book identity or visual correctness.
5. Show the combined unpublished/local preview. Wait for the user's review and publication approval before pushing, merging or deploying anything. After approval, publish the reviewed set together and verify the live pages.

The user does not need to run shell commands, find book links, download covers, or supply another workbook/mockup.
