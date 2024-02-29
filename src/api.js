const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

let butacas = []

app.get('/butacas', (req, res) => {
    fs.readFile('./ddbb/butacas.json', (err, jsonString) => {

        try {
            const butacas = JSON.parse(jsonString);
            res.json(butacas);
        } catch (e) {
            console.error('Error leyendo el JSON:', e);
            res.status(500).send('Error al parsear el archivo JSON');
        }
    });
});
app.get('/butacas/:id', (req, res) => {
    fs.readFile('./ddbb/butacas.json', (err, jsonString) => {

        try {
            const butacas = JSON.parse(jsonString);
            const result = butacas.filter(butaca => butaca.id === parseInt(req.params.id))
            res.json(result);
        } catch (e) {
            console.error('Error leyendo el JSON:', e);
            res.status(500).send('Error al parsear el archivo JSON');
        }
    });
});

app.get('/obras', (req, res) => {
    fs.readFile('./ddbb/obras.json', (err, jsonString) => {

        try {
            const obras = JSON.parse(jsonString);
            res.json(obras);
        } catch (e) {
            console.error('Error leyendo el JSON:', e);
            res.status(500).send('Error al parsear el archivo JSON');
        }
    });
});
app.get('/obras/:id', (req, res) => {
    fs.readFile('./ddbb/obras.json', (err, jsonString) => {

        try {
            const obras = JSON.parse(jsonString);
            const result = obras.filter(obra => obra.id == parseInt(req.params.id))
            res.json(result);
        } catch (e) {
            console.error('Error leyendo el JSON:', e);
            res.status(500).send('Error al parsear el archivo JSON');
        }
    });
});

app.post('/butacas', (req, res) => {
    const nuevaButaca = req.body;

    const filePath = './ddbb/butacas.json';
    fs.readFile(filePath, 'utf8', (err, jsonString) => {
        if (err) {
            console.error("Error leyendo el archivo:", err);
            return res.status(500).send('Error al leer el archivo');
        }
        try {
            const butacas = JSON.parse(jsonString);
            butacas.push(nuevaButaca);

            fs.writeFile(filePath, JSON.stringify(butacas, null, 2), 'utf8', err => {
                if (err) {
                    console.error("Error escribiendo en el archivo:", err);
                    return res.status(500).send('Error al escribir en el archivo');
                }
                res.status(201).send('Butaca agregada con éxito');
            });
        } catch (err) {
            console.error('Error parseando JSON:', err);
            res.status(500).send('Error al parsear el archivo JSON');
        }
    });
});

app.put('/butacas', (req, res) => {
    const butacasActualizadas = req.body;

    const filePath = './ddbb/butacas.json';
    fs.writeFile(filePath, JSON.stringify(butacasActualizadas, null, 2), 'utf8', err => {
        if (err) {
            console.error("Error escribiendo en el archivo:", err);
            return res.status(500).send('Error al escribir en el archivo');
        }
        res.status(200).send('Butacas actualizadas con éxito');
    });
});

app.put('/butacas/:id', (req, res) => {
    const butacaId = parseInt(req.params.id);
    const butacaActualizada = req.body;

    const filePath = './ddbb/butacas.json';
    fs.readFile(filePath, 'utf8', (err, jsonString) => {
        if (err) {
            console.error("Error leyendo el archivo:", err);
            return res.status(500).send('Error al leer el archivo');
        }
        try {
            const butacas = JSON.parse(jsonString);
            const index = butacas.findIndex(butaca => butaca.id === butacaId);

            if (index === -1) {
                return res.status(404).send('Butaca no encontrada');
            }

            butacas[index] = butacaActualizada;

            fs.writeFile(filePath, JSON.stringify(butacas, null, 2), 'utf8', err => {
                if (err) {
                    console.error("Error escribiendo en el archivo:", err);
                    return res.status(500).send('Error al escribir en el archivo');
                }
                res.status(200).send('Butaca actualizada con éxito');
            });
        } catch (err) {
            console.error('Error parseando JSON:', err);
            res.status(500).send('Error al parsear el archivo JSON');
        }
    });
});

app.get('/butacas/obra/:idObra', (req, res) => {
    fs.readFile('./ddbb/butacas.json', (err, jsonString) => {

        try {
            const butacas = JSON.parse(jsonString);
            const result = butacas.filter(butaca => butaca.idObra == parseInt(req.params.idObra))
            res.json(result);
        } catch (e) {
            console.error('Error leyendo el JSON:', e);
            res.status(500).send('Error al parsear el archivo JSON');
        }
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})