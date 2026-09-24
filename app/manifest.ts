import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Doula",
    short_name: "Doula",
    description:
      "Prenatal and postpartum education and gentle movement. Educational wellness support, not medical advice.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f3eee6",
    theme_color: "#f3eee6",
    lang: "en",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
