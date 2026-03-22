const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = {
  id: "org.telaverde",
  version: "1.0.0",
  name: "TelaVerde",
  description: "Addon de exemplo TelaVerde",
  resources: ["stream"],
  types: ["movie"],
  idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ id }) => {
  if (id === "tt0317705") {
    return {
      streams: [
        {
          title: "Os Incríveis",
          url: "https://drive.google.com/uc?export=download&id=14XHjXZXp0rSDOIygAe1E3PbjYBhVVsMW"
        }
      ]
    };
  }

  return { streams: [] };
});

serveHTTP(builder.getInterface(), { port: process.env.PORT || 10000 });