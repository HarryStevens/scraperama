import randomAgent from "./utils/agent.js";
import { loadPlaywright } from "./browser.js";

export default async function requester(parser, url, options = {}) {
  const body =
    options.browser === true
      ? await browserFetchOnce(url)
      : options.browser
        ? await browserFetchReuse(url, options.browser)
        : await nativeFetch(url);
  return parser(body);
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
