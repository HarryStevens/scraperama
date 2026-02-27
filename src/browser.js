export async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    // When scraperama is symlinked (pnpm link:, npm link, etc.), Node
    // resolves from the real path, missing the consumer's node_modules.
    // Fall back to resolving from the working directory.
    const { createRequire } = await import("node:module");
    const require = createRequire(process.cwd() + "/package.json");
    try {
      return require("playwright");
    } catch {
      throw new Error(
        "Playwright is required for { browser: true }. Install it with: npm i playwright",
      );
    }
  }
}

export async function createBrowser() {
  const pw = await loadPlaywright();
  return (pw.chromium || pw.default.chromium).launch();
}
