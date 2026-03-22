const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = {
  id: "org.telaverde",
  version: "1.0.0",
  name: "TelaVerde",
  description: "Addon de exemplo TelaVerde",
  resources: ["catalog", "stream"],
  types: ["movie", "series"],
  idPrefixes: ["tela-"],
  catalogs: [
    {
      type: "movie",
      id: "telaverde-movies",
      name: "TelaVerde Filmes"
    },
    {
      type: "series",
      id: "telaverde-series",
      name: "TelaVerde Séries"
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
          name: "Filme Exemplo 1",
          poster: "https://via.placeholder.com/200x300?text=Filme+1"
        },
        {
          id: "tela-002",
          type: "movie",
          name: "Filme Exemplo 2",
          poster: "https://via.placeholder.com/200x300?text=Filme+2"
        }
      ]
    };
  }

  if (type === "series" && id === "telaverde-series") {
    return {
      metas: [
        {
          id: "tela-101",
          type: "series",
          name: "Série Exemplo 1",
          poster: "https://via.placeholder.com/200x300?text=Serie+1"
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
          title: "Filme Exemplo 1",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
      ]
    };
  }

  if (id === "tela-002") {
    return {
      streams: [
        {
          title: "Filme Exemplo 2",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        }
      ]
    };
  }

  if (id === "tela-101") {
    return {
      streams: [
        {
          title: "Série Exemplo 1",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
        }
      ]
    };
  }

  return { streams: [] };
});

serveHTTP(builder.getInterface(), { port: process.env.PORT || 10000 });