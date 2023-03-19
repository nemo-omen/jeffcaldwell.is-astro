import { defineConfig } from "astro/config";
import tokyonight from "./tokyonight.json";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";

// import vercel from "@astrojs/vercel/serverless";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  // output: "server",
  site: "https://jeffcaldwell.is",
  base: "/",
  integrations: [mdx(), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), sitemap(), svelte()],
  // experimental: {
  //   assets: true,
  // },
  markdown: {
    shikiConfig: {
      theme: tokyonight
    }
  }
  // adapter: vercel()
});