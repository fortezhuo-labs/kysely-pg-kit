import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  ignoreWatch: ["**/*.test.ts", "**/tests/**", "biome.json", "lefthook.yml"],
});
