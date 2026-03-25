const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = {
  id: "org.telaverde",
  version: "1.3.2",
  name: "TelaVerde",
  description: "TelaVerde com torrents",
  catalogs: [],
  resources: ["stream"],
  types: ["movie"],
  idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

// ================= FILMES =================
const filmes = {
  "tt3606756": {
    title: "Os Incríveis 2",
    streams: [
      {
        title: "1080p Torrent",
        infoHash: "bae584224315b92237b31af3dcab8e8487a66e88",
        fileIdx: 0
      }
    ]
  }
};

// ================= STREAM =================
builder.defineStreamHandler(async ({ id }) => {
  const filme = filmes[id];

  if (!filme) {
    return { streams: [] };
  }

  return {
    streams: filme.streams
  };
});

// ================= SERVIDOR =================
serveHTTP(builder.getInterface(), { port: process.env.PORT || 10000 });