## [1.2.0](https://github.com/HarryStevens/scraperama/compare/v1.1.0...v1.2.0) (2026-03-03)

### Features

* add retry support with exponential backoff ([6931efd](https://github.com/HarryStevens/scraperama/commit/6931efd94d31cbe902ec8ed188c785b1f515e82c))

### Bug Fixes

* ignore auto-generated CHANGELOG in Prettier checks ([14e91bf](https://github.com/HarryStevens/scraperama/commit/14e91bfe510e9b7890513b55ef70a6bbf7421f6c))

## [1.1.0](https://github.com/HarryStevens/scraperama/compare/v1.0.0...v1.1.0) (2026-03-03)

### Features

- add xml parser ([4ebf4f7](https://github.com/HarryStevens/scraperama/commit/4ebf4f7ef82590954bec34d439d5cd50cf9960b2))

## [1.0.0](https://github.com/HarryStevens/scraperama/compare/v0.0.13...v1.0.0) (2026-02-27)

### ⚠ BREAKING CHANGES

- All functions now return promises instead of callbacks. The package is now ESM-only. request and underscore have been removed as dependencies.

Made-with: Cursor

### Features

- v1.0.0 — ESM, async/await, native fetch, browser support ([36d8332](https://github.com/HarryStevens/scraperama/commit/36d8332fa129f4145336ecd892ca811b85e95836))

# Changelog

## 1.0.0

### Breaking Changes

- All fetch functions (`html`, `csv`, `json`, `text`, `download`) are now **async** and return promises instead of accepting callbacks.
- `download` takes three arguments `(url, path, log)` instead of four — no more callback.
- `untar` and `unzip` return promises instead of accepting callbacks.
- The package is now **ESM-only** (`"type": "module"`).
- `request` and `underscore` have been removed as dependencies.
- Requires Node 18+ (for native `fetch`).
