// Código basado en la respuesta de StackOverflow: https://stackoverflow.com/questions/1234567/example
const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const markdownDir = path.join(__dirname, 'markdown-files');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/files', (req, res) => {
    fs.readdir(markdownDir, (err, files) => {
        if (err) {
            res.status(500).json({ error: 'No se pudo listar los archivos' });
            return;
        }
        res.json(files.filter(file => file.endsWith('.md')));
    });
});

app.get('/file', (req, res) => {
    const fileName = req.query.name;
    const filePath = path.join(markdownDir, fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'No se pudo leer el archivo' });
            return;
        }
        const html = marked(data);
        res.json({ html });
    });
});

app.post('/create', (req, res) => {
    const { fileName, fileContent } = req.body;
    const filePath = path.join(markdownDir, `${fileName}.md`);

    fs.writeFile(filePath, fileContent, err => {
        if (err) {
            res.status(500).json({ success: false, message: 'No se pudo crear el archivo' });
            return;
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
