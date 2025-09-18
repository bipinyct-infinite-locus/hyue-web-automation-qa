// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

// Pick env (default: dev)
const ENV = (process.env.ENV || "prod").toUpperCase();

const baseURL = process.env[`${ENV}_BASE_URL`];
const username = process.env[`${ENV}_USERNAME`];
const password = process.env[`${ENV}_PASSWORD`];

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // ⏰ Global timeout for the entire test run (e.g. 30 minutes)
  globalTimeout: 30 * 60 * 1000, // 30 mins in ms

  // ⏰ Default timeout for each test (e.g. 60s instead of 30s)
  timeout: 120 * 1000, // 60 seconds

  reporter: [["html"], ["list"]],

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    extraHTTPHeaders: {
      // Example of using credentials if your app needs them
      "x-username": username || "",
      "x-password": password || "",
    },
  },

  projects: [
    // { name: "chromium", use: { ...devices["Desktop Chrome"] } },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
