import randomAgent from "./utils/agent.js";
import { loadPlaywright } from "./browser.js";

export default async function requester(parser, url, options = {}) {
  const { retries = 0, retryDelay = 1000 } = options;

  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const body =
        options.browser === true
          ? await browserFetchOnce(url)
          : options.browser
            ? await browserFetchReuse(url, options.browser)
            : await nativeFetch(url);
      return parser(body);
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        const delay = retryDelay * 2 ** attempt;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

async function nativeFetch(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": randomAgent() },
  });
  if (!res.ok) throw new Error(`Request failed ${url}: ${res.status}`);
  return res.text();
}

async function browserFetchOnce(url) {
  const pw = await loadPlaywright();
  const browser = await (pw.chromium || pw.default.chromium).launch();
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    return await page.content();
  } finally {
    await browser.close();
  }
}

async function browserFetchReuse(url, browser) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle" });
    return await page.content();
  } finally {
    await page.close();
  }
}
