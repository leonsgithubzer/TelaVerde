const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = {
  id: "org.telaverde",
  version: "1.3.1",
  name: "TelaVerde",
  description: "TelaVerde com streams",
  catalogs: [],
  resources: ["stream"],
  types: ["movie"],
  idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

const filmes = {
  "tt3606756": {
    title: "Os Incríveis 2",
    streams: [
      {
        title: "Fonte 1",
        infoHash: "COLE_O_HASH_AUTORIZADO_AQUI",
        fileIdx: 0
      }
    ]
  }
};

builder.defineStreamHandler(async ({ id }) => {
  const filme = filmes[id];

  if (!filme) {
    return { streams: [] };
  }

  return {
    streams: filme.streams || []
  };
});

serveHTTP(builder.getInterface(), { port: process.env.PORT || 10000 });