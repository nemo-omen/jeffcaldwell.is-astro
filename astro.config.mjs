import { defineConfig } from "astro/config";
import tokyonight from "./tokyonight.json";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";

// import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  // output: "server",
  integrations: [
    mdx(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
  // experimental: {
  //   assets: true,
  // },
  markdown: {
    shikiConfig: {
      theme: tokyonight,
    },
  },
  // adapter: vercel()
});
