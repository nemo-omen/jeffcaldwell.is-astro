import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

const parser = new MarkdownIt();

export async function get(context) {
  const blog = await getCollection("blog");

  return rss({
    title: "Jeff Caldwell's Blog",
    description: "",
    site: context.site,
    language: "en-us",
    webMaster: "jeff@jeffcaldwell.is",
    generator: "https://astro.build",
    stylesheet: "/styles/pretty-feed-v3.xsl",
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: `/blog/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
    })),
  });
}
