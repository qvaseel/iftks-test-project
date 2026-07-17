import { defineConfig } from "steiger";
import fsd from "@feature-sliced/steiger-plugin";

export default defineConfig([
  ...fsd.configs.recommended,

  {
    files: ["./src/shared/lib/store.ts"],

    rules: {
      "fsd/forbidden-imports": "off",
    },
  },
  {
    rules: { "fsd/insignificant-slice": "off" },
  },
]);
