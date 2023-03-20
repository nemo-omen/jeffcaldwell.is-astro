import { getCollection, getEntryBySlug } from "astro:content";
import satori from "satori";
import { html } from "satori-html";
import { readFileSync } from "fs";
import { join, resolve } from "path";

export async function getStaticPaths() {
  const blogEntries = await (getCollection("blog", ({ data }) => !data.draft));
  return blogEntries.map((entry) => ({
    params: { slug: entry.slug },
  }));
}

export async function get({ params }) {
  const entry = await getEntryBySlug("blog", params.slug);
  const { title, summary } = entry.data;

  const markup = html`
    <div style="background-color: #FF008A; display: flex; flex-direction: column;">
      <h1 style="color: white; font-size: 64px">${title}</h1>
      <p style="color: #f7f6f6; font-family: sans; font-size: 3rem">${summary}</p>
    </div>
  `;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          height: "100%",
          width: "100%",
          background: "#13111b",
          flexDirection: "column",
          padding: 32,
          gap: 24,
        },
        children: [
          {
            type: "img",
            props: {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
              },
              src:
                "https://raw.githubusercontent.com/nemo-omen/jeffcaldwell.is-astro/main/public/images/OGBG.svg",
            },
          }, //</img>
          {
            type: "h1",
            props: {
              style: {
                fontSize: 72,
                color: "#FF008A",
                fontFamily: "Bespoke Serif",
                fontWeight: 700,
                margin: 0,
                lineHeight: 1,
                letterSpacing: "0.075em",
              },
              children: title,
            },
          }, // </h1>
          {
            type: "p",
            props: {
              style: {
                fontSize: 56,
                color: "#f7f6f6",
                fontWeight: 400,
                fontFamily: "Work Sans",
                lineHeight: 1.8,
                textShadow: "2px 2px 2px #13111b",
              },
              children: summary,
            },
          }, // </p>
          {
            type: "h2",
            props: {
              style: {
                fontSize: 56,
                fontWeight: 700,
                color: "#FF008A",
                fontFamily: "Bespoke Serif",
                position: "absolute",
                bottom: 32,
                left: 32,
                letterSpacing: ".075em",
              },
              children: "JeffCaldwell.is",
            },
          },
        ],
      }, // </div>
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Bespoke Serif",
          data: readFileSync(
            join(
              process.cwd(),
              "src/assets/fonts",
              "BespokeSerif-Extrabold.ttf",
            ),
          ),
          weight: 700,
          style: "normal",
        },
        {
          name: "Work Sans",
          data: readFileSync(
            join(process.cwd(), "src/assets/fonts", "WorkSans-Regular.ttf"),
          ),
          weight: 400,
          style: "normal",
        },
      ],
    },
  );

  return {
    body: svg,
    encoding: "binary",
  };
}
