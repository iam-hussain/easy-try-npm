import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/string.ts",
    "src/id.ts",
    "src/object.ts",
    "src/array.ts",
    "src/number.ts",
    "src/date.ts",
    "src/validate.ts",
    "src/async.ts",
    "src/color.ts",
    "src/misc.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: false,
});
