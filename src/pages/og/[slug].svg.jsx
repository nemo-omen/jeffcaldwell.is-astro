import satori from "satori";
import { html } from "satori-html";
import { getCollection, getEntryBySlug } from "astro:content";

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

  const svg = await satori(
    <div style={{ backgroundColor: "black", flexDirection: "column" }}>
      <h1
        style={{ color: "white", fontFamily: "Bespoke Serif", fontWeight: 800 }}
      >
        {{ title }}
      </h1>
      <p style={{ color: "white" }}>{{ summary }}</p>
    </div>,
    {
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
    },
  );
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
