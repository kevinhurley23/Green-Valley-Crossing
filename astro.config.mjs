import { defineConfig } from "astro/config";

import sanity from "astro-sanity";

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: "19f5gkij",
      dataset: "production",
      useCdn: true,
      apiVersion: "v2021-03-25",
    }),
  ],
});
