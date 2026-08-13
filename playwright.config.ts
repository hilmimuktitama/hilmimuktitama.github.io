import { defineConfig, devices } from "@playwright/test";

const ci = Boolean(
  (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env?.CI
);
const environment = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process?.env;
const baseURL = environment?.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4321";

export default defineConfig({
  testDir: "./tests",
  outputDir: "test-results",
  snapshotPathTemplate: "{testDir}/site.spec.ts-snapshots/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: ci,
  retries: ci ? 2 : 0,
  workers: ci ? 1 : undefined,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure"
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4321",
    reuseExistingServer: false,
    timeout: 120_000
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], browserName: "chromium" } },
    { name: "firefox", use: { ...devices["Desktop Firefox"], browserName: "firefox" } },
    { name: "webkit", use: { ...devices["Desktop Safari"], browserName: "webkit" } }
  ]
});
