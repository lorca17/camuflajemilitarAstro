// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import { SITE_URL } from "./src/consts";

import data401 from "./401.txt";

const urls = data401.split("\n");

const obj401 = Object.fromEntries(
  urls.map((page) => [page, { status: 301, destination: "/404/" }])
);

let list = JSON.stringify(obj401);

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap()],
  redirects: { list },
});
