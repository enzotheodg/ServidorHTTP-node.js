import * as http from 'node:http';
import fs from 'node:fs';
import * as acervo from './acervo.js';

function gerarHTMLComResultados(termo, listaDeLivros) {
    let html = '<!doctype html><html><body>';
    html += `<h1>Resultados para: ${termo}</h1>`;
    html += '<table><tr><th>Título</th><th>Autor</th><th>Localizador</th></tr > ';
    listaDeLivros.forEach(livro => {
        html += `<tr><td>${livro.titulo}</td><td>${livro.autor} </td><td>${livro.localizador}</tr>`;
    })
    html += '</table></body></html>'
    return html;
}


const servidor =  http.createServer((req, res) => {

    let url = new URL(`http://localhost:3000${req.url}`);
    
    if (url.pathname === '/buscarNoAcervo') {
        let termo = url.searchParams.get('termo');
        let resultado = acervo.buscar(termo);
        let html = gerarHTMLComResultados(termo, resultado);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
        return
    }

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