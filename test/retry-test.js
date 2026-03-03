import assert from "node:assert";
import requester from "../src/requester.js";

const identity = (t) => t;

function mockFetch(failCount, { networkError = false } = {}) {
  let calls = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_url) => {
    calls++;
    if (calls <= failCount) {
      if (networkError) throw new Error("Network error");
      return {
        ok: false,
        status: 500,
        text: async () => "Internal Server Error",
      };
    }
    return { ok: true, status: 200, text: async () => "success" };
  };
  return {
    get calls() {
      return calls;
    },
    restore() {
      globalThis.fetch = originalFetch;
    },
  };
}

// Succeeds on first try without retries
{
  const mock = mockFetch(0);
  const result = await requester(identity, "http://example.com");
  assert.strictEqual(result, "success");
  assert.strictEqual(mock.calls, 1);
  mock.restore();
  console.log("PASS: succeeds on first try");
}

// Fails once, retries and succeeds
{
  const mock = mockFetch(1);
  const result = await requester(identity, "http://example.com", {
    retries: 2,
    retryDelay: 10,
  });
  assert.strictEqual(result, "success");
  assert.strictEqual(mock.calls, 2);
  mock.restore();
  console.log("PASS: retries on failure and succeeds");
}

// Exhausts all retries then throws
{
  const mock = mockFetch(5);
  await assert.rejects(
    () =>
      requester(identity, "http://example.com", { retries: 2, retryDelay: 10 }),
    /Request failed/,
  );
  assert.strictEqual(mock.calls, 3);
  mock.restore();
  console.log("PASS: exhausts retries and throws");
}

// Retries on network error
{
  const mock = mockFetch(1, { networkError: true });
  const result = await requester(identity, "http://example.com", {
    retries: 1,
    retryDelay: 10,
  });
  assert.strictEqual(result, "success");
  assert.strictEqual(mock.calls, 2);
  mock.restore();
  console.log("PASS: retries on network error");
}

// Default retries is 0 — no automatic retry
{
  const mock = mockFetch(1);
  await assert.rejects(
    () => requester(identity, "http://example.com"),
    /Request failed/,
  );
  assert.strictEqual(mock.calls, 1);
  mock.restore();
  console.log("PASS: default retries is 0");
}

// Exponential backoff increases delay between attempts
{
  const mock = mockFetch(4);
  const delays = [];
  const originalSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = (fn, ms) => {
    delays.push(ms);
    return originalSetTimeout(fn, 0);
  };
  await assert.rejects(
    () =>
      requester(identity, "http://example.com", {
        retries: 3,
        retryDelay: 100,
      }),
    /Request failed/,
  );
  globalThis.setTimeout = originalSetTimeout;
  assert.deepStrictEqual(delays, [100, 200, 400]);
  mock.restore();
  console.log("PASS: exponential backoff delays are correct");
}

console.log("\nAll retry tests passed!");
