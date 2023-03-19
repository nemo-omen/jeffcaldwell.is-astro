import satori from "satori";
import { html } from "satori-html";
import { getCollection, getEntryBySlug } from "astro:content";
import fs from "fs";

const bespokeResponse = await fetch(
  "https://jeffcaldwell.is/fonts/BespokeSerif/Fonts/WEB/fonts/BespokeSerif-Extrabold.woff",
);

const bespokeArrayBuffer = await bespokeResponse.arrayBuffer();

const dims = {
  width: 1200,
  height: 630,
};

export async function get({ params }) {
  const post = await getEntryBySlug("blog", params.slug);
  const { title, summary, date } = post.data;
  const localeDate = date.toLocaleDateString("en-us", { dateStyle: "full" });
  console.log(bespokeArrayBuffer);

  const markup =
    html`<div style="display: flex; flex-direction: column; width: ${dims.width}px; height: ${dims.height}px; background-image: url('https://jeffcaldwell.is/images/OGBG.svg')">
    <h1>${title}</h1>
    <p>${summary}</p>
  </div>`;

  const svg = await satori(markup, {
    width: dims.width,
    height: dims.height,
    fonts: [
      {
        name: "Bespoke Serif",
        data: bespokeArrayBuffer,
        weight: 700,
        style: "normal",
      },
    ],
  });
}

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  return paths;
}
