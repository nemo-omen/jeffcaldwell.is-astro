import { getCollection } from "astro:content";

import satori from "satori";
import { html } from "satori-html";

function getHtml(title, description) {
  return html`<div
  style="background-color: #13131b; 
         color: #ffffff;
         width: 100%;
         height: 100%;
         display: flex;
         align-items: center;
         justify-content: center;">
  <h1 style="font-size: 64px; font-weight: bole;">${title}</h1>
  <p style="font-size: 21px; font-weight: bold;">${description}</p>
</div>`;
}

export async function generateOgImage(title, description) {
  return await satori(getHtml(title, description), {
    width: 1200,
    height: 630,
    fonts: [],
  });
}
