// 1️⃣ Importa o Express e o Stremio SDK
const express = require('express');
const { addonBuilder } = require('stremio-addon-sdk');

const app = express();

// 2️⃣ Manifesto do addon
// ⚠️ O campo 'catalogs' precisa ser sempre um array, mesmo vazio
const manifest = {
    id: 'tela-verde',
    version: '1.0.0',
    name: 'TelaVerde',
    description: 'Addon de exemplo TelaVerde com filmes e séries',
    resources: ['catalog', 'stream'], // tipos de recurso que o addon fornece
    types: ['movie', 'series'],       // tipos de mídia suportados
    idPrefixes: ['tela-'],            // prefixos usados para IDs do addon
    catalogs: []                       // obrigatório, pode ser vazio
};

// 3️⃣ Cria o builder do addon
const builder = new addonBuilder(manifest);

// 4️⃣ Define o catálogo (lista de filmes/séries)
builder.defineCatalogHandler(async (args) => {
    return {
        metas: [
            {
                id: 'tela-001',
                type: 'movie',
                name: 'Filme Exemplo 1',
                poster: 'https://via.placeholder.com/200x300?text=Filme+1'
            },
            {
                id: 'tela-002',
                type: 'movie',
                name: 'Filme Exemplo 2',
                poster: 'https://via.placeholder.com/200x300?text=Filme+2'
            }
        ]
    };
});

// 5️⃣ Define os streams (links de vídeo)
builder.defineStreamHandler(async (args) => {
    if (args.id === 'tela-001') {
        return {
            streams: [
                {
                    title: 'Filme Exemplo 1 - 720p',
                    url: 'https://example.com/filme1.mp4', // substitua pelo vídeo real
                    subtitles: []
                }
            ]
        };
    } else if (args.id === 'tela-002') {
        return {
            streams: [
                {
                    title: 'Filme Exemplo 2 - 720p',
                    url: 'https://example.com/filme2.mp4', // substitua pelo vídeo real
                    subtitles: []
                }
            ]
        };
    } else {
        return { streams: [] };
    }
});

// 6️⃣ Rota que serve o manifesto para o Stremio
app.get('/manifest.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(builder.getInterface());
});

// 7️⃣ Rota simples para testar no navegador
app.get('/', (req, res) => res.send('Addon TelaVerde rodando!'));

// 8️⃣ Porta do servidor
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Addon TelaVerde rodando na porta ${PORT}`));