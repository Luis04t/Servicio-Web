// run `node index.js` in the terminal
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

const API_URL = 'http://www.raydelto.org/agenda.php';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
// 1. Listar contactos
app.get('/contactos', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener los contactos:', error);
        res.status(500).json({ message: 'Error al obtener los contactos' });
    }
});

// 2. Almacenar un contacto
app.post('/contactos', async (req, res) => {
    const { nombre, apellido, telefono } = req.body;

    if (!nombre || !apellido || !telefono) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const nuevoContacto = { nombre, apellido, telefono };

    try {
        await axios.post(API_URL, nuevoContacto, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        res.status(201).json({ message: 'Contacto almacenado con éxito' });
    } catch (error) {
        console.error('Error al almacenar el contacto:', error);
        res.status(500).json({ message: 'Error al almacenar el contacto' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en https://localhost:${PORT}`);
});
