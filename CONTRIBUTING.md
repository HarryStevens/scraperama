# Contributing to scraperama

Thanks for your interest in contributing! This document covers everything you need to get started.

## Getting started

1. Fork the repo and clone your fork.
2. Install dependencies:

```bash
npm install
```

3. If you plan to work on the headless browser feature, also install Playwright:

```bash
npm install playwright
```

## Development workflow

1. Create a branch off `main` for your change.
2. Make your changes.
3. Run formatting, linting, and tests before committing:

```bash
npm run format
npm run lint
npm test
```

4. Commit using a [conventional commit message](#commit-messages).
5. Open a pull request against `main`.

## Commit messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/) and [semantic-release](https://github.com/semantic-release/semantic-release) to automate versioning and changelog generation. Your commit messages directly determine the next version number, so getting them right matters.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

| Type                                 | Purpose                                                 | Version bump  |
| ------------------------------------ | ------------------------------------------------------- | ------------- |
| `fix`                                | Bug fix                                                 | Patch (1.0.x) |
| `feat`                               | New feature                                             | Minor (1.x.0) |
| `feat!` or `BREAKING CHANGE:` footer | Breaking change                                         | Major (x.0.0) |
| `docs`                               | Documentation only                                      | No release    |
| `chore`                              | Maintenance, CI, tooling                                | No release    |
| `refactor`                           | Code change that neither fixes a bug nor adds a feature | No release    |
| `test`                               | Adding or updating tests                                | No release    |

### Examples

```
fix: handle redirects in download function
```

```
feat: add xml parser
```

```
feat!: remove callback API

BREAKING CHANGE: All functions now return promises instead of accepting callbacks.
```

```
docs: add throttle usage examples to README
```

Only `fix` and `feat` types trigger a release. Use `feat!` or a `BREAKING CHANGE:` footer for major version bumps.

**Note:** If you use zsh, the `!` in `feat!:` will cause an "illegal modifier" error inside double quotes. Use single quotes for commit messages containing `!`:

```bash
git commit -m 'feat!: remove callback API'
```

## Pull requests

- Keep PRs focused on a single change. If you're fixing a bug and adding a feature, make them separate PRs.
- Include a clear description of what your change does and why.
- Make sure CI passes (formatting, linting) before requesting review.
- If you're adding a new export or changing the public API, update the README.
- If you're adding a new module, add a corresponding test script in `test/`.

## Project structure

```
scraperama/
├── index.js          # Re-exports all public modules
├── src/
│   ├── browser.js    # Playwright helpers (createBrowser, loadPlaywright)
│   ├── requester.js  # Core HTTP fetcher (fetch + browser paths)
│   ├── csv.js        # Fetch and parse CSV
│   ├── html.js       # Fetch and parse HTML (Cheerio)
│   ├── json.js       # Fetch and parse JSON
│   ├── text.js       # Fetch raw text
│   ├── download.js   # Stream a URL to a file
│   ├── datestamp.js   # YYYY-MM-DD helper
│   ├── filesize.js   # Human-readable object size
│   ├── throttle.js   # Rate-limited function wrapper
│   ├── untar.js      # Extract tar archives
│   ├── unzip.js      # Extract zip archives
│   └── utils/
│       └── agent.js  # Random User-Agent strings
└── test/             # Integration test scripts (one per module)
```

## Code style

- Code is formatted with [Prettier](https://prettier.io/) and linted with [ESLint](https://eslint.org/).
- Run `npm run format` to auto-format. Run `npm run lint` to check for errors.
- The project uses ESM (`import`/`export`). No CommonJS.
- Internal imports use explicit `.js` extensions.

## Testing

Tests are standalone scripts in `test/` that you run directly with Node. Most hit the network. The browser tests require Playwright to be installed.

```bash
node test/html-test.js       # single test
npm test                     # all tests
```

If you add a new module, add a `test/<module>-test.js` file following the same pattern.

## Rotating the npm token

The CI release workflow requires an `NPM_TOKEN` secret to publish to npm. This token expires every 90 days and needs to be regenerated.

1. Log in to [npmjs.com](https://www.npmjs.com) and go to **Avatar > Access Tokens** (or visit `https://www.npmjs.com/settings/<your-username>/tokens`).
2. Click **Generate New Token > Granular Access Token**.
3. Fill it out:
   - **Token name:** `scraperama`
   - **Description:** `NPM token for scraperama CI`
   - **Allowed IP ranges:** Leave empty (GitHub Actions uses dynamic IPs)
   - **Packages and scopes:** **Read and write**, scoped to **Only select packages and scopes**, then select `scraperama`
   - **Organizations:** No access
   - **Expiration:** 90 days (or longer if you prefer)
4. Click **Generate token** and copy the value.
5. Go to `https://github.com/HarryStevens/scraperama/settings/secrets/actions`.
6. Update the `NPM_TOKEN` secret with the new value.

## Code of conduct

Be kind, be respectful, be constructive. We're all here to build useful software. Harassment, discrimination, or hostile behavior of any kind will not be tolerated.

## Questions?

Open an issue on [GitHub](https://github.com/HarryStevens/scraperama/issues) if anything is unclear.
