import { preview } from "astro";

// Keep the server attached to Playwright; the CLI can detach in agent sessions.
const target = new URL(process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4321");
const server = await preview({
  server: { host: target.hostname, port: Number(target.port || 4321) }
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, async () => {
    await server.stop();
    process.exit(0);
  });
}
