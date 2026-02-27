# Changelog

## 1.0.0

### Breaking Changes

- All fetch functions (`html`, `csv`, `json`, `text`, `download`) are now **async** and return promises instead of accepting callbacks.
- `download` takes three arguments `(url, path, log)` instead of four — no more callback.
- `untar` and `unzip` return promises instead of accepting callbacks.
- The package is now **ESM-only** (`"type": "module"`).
- `request` and `underscore` have been removed as dependencies.
- Requires Node 18+ (for native `fetch`).
