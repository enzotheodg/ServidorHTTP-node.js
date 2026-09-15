import * as http from 'node:http';
import fs from 'node:fs';


const servidor = http.createServer((req, res) => {
    console.log(req.url);
    fs.readFile('.' + req.url, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(`<html><body>
                <h1>Erro 404! Recurso não existe!</h1>
                </body></html>`);
            return;
        }
        if (req.url.includes('.html')) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(data);
        } else {
            res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
            res.end(data);
        }

    })


}
);

console.log('Acesse este servidor em http://localhost:3000/');
console.log('Para pará-lo, aperte Ctrl-C');
servidor.listen(3000);