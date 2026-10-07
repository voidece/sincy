import { defineConfig } from "tsdown";

export default defineConfig({
  format: ["cjs", "esm"],
  shims: true,
  checks: {
    legacyCjs: false,
  },
});
