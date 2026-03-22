const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = {
  id: "org.telaverde",
  version: "1.0.6",
  name: "TelaVerde",
  description: "Addon TelaVerde (Torrent)",
  catalogs: [],
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
          title: "Os Incríveis Torrent 1080p",
          infoHash: "E029098D27C543891BD3AC29FD473E80377B954A",
          fileIdx: 0
        }
      ]
    };
  }

  return { streams: [] };
});

serveHTTP(builder.getInterface(), { port: process.env.PORT || 10000 });