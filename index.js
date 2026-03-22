const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = {
  id: "org.telaverde",
  version: "1.0.0",
  name: "TelaVerde",
  description: "Addon de exemplo TelaVerde",
  resources: ["catalog", "stream"],
  types: ["movie"],
  idPrefixes: ["tela-"],
  catalogs: [
    {
      type: "movie",
      id: "telaverde-movies",
      name: "TelaVerde Filmes"
    }
  ]
};

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(async ({ type, id }) => {
  if (type === "movie" && id === "telaverde-movies") {
    return {
      metas: [
        {
          id: "tela-001",
          type: "movie",
          name: "Os Incríveis",
          poster: "https://via.placeholder.com/200x300?text=Os+Incriveis"
        }
      ]
    };
  }

  return { metas: [] };
});

builder.defineStreamHandler(async ({ id }) => {
  if (id === "tela-001") {
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