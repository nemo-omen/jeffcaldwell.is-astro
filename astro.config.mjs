import { defineConfig } from "astro/config";
import tokyonight from "./tokyonight.json";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [mdx()],
  experimental: {
    assets: true,
  },
  markdown: {
    shikiConfig: {
      theme: tokyonight,
    },
  },
});
