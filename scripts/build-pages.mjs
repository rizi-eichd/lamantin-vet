import { cp, mkdir, mkdtemp, symlink, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const buildRoot = join(root, ".pages-build");
await mkdir(buildRoot, { recursive: true });
const checkout = await mkdtemp(join(buildRoot, "export-"));
const apiDirectory = join(root, "src", "app", "api");

for (const entry of [
  "src",
  "public",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "tsconfig.json",
  "next-env.d.ts",
  "next.config.ts",
  "postcss.config.mjs",
]) {
  await cp(join(root, entry), join(checkout, entry), {
    recursive: true,
    filter: (source) =>
      source !== apiDirectory &&
      !source.startsWith(`${apiDirectory}/`) &&
      !source.startsWith(`${apiDirectory}\\`),
  });
}
await symlink(
  join(root, "node_modules"),
  join(checkout, "node_modules"),
  process.platform === "win32" ? "junction" : "dir",
);
const result = spawnSync(
  process.execPath,
  [join(root, "node_modules", "next", "dist", "bin", "next"), "build"],
  {
    cwd: checkout,
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_PUBLIC_STATIC_HOSTING: "true",
      NEXT_PUBLIC_BASE_PATH: "/lamantin-vet",
      NEXT_PUBLIC_SITE_URL: "https://rizi-eichd.github.io/lamantin-vet",
      SITE_INDEXABLE: "false",
      PAGES_PROJECT_ROOT: root,
    },
  },
);
if (result.status !== 0) process.exit(result.status || 1);
const output = join(checkout, "out");
for (const page of [
  "index.html",
  "booking/index.html",
  "services/consultation/index.html",
  "cookies/index.html",
]) {
  if (!existsSync(join(output, page)))
    throw new Error(`Missing exported page: ${page}`);
}
await writeFile(join(output, ".nojekyll"), "");
await writeFile(
  join(buildRoot, "latest.json"),
  JSON.stringify({ output }, null, 2),
);
console.log(`GitHub Pages export ready: ${output}`);
