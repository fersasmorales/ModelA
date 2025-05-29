// === BACKEND ===
const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los productos
router.get('/', (req, res) => {
  db.query('SELECT * FROM producto;', (err, datos) => {
    if (err) return res.status(500).send(err);
    res.json(datos);
  });
});


// Eliminar producto por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM producto WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  });
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
  const { nombre, descripcion, precio, imagen, creador, categoria } = req.body;

  if (!nombre || !descripcion || !precio || !imagen || !creador || !categoria) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const query = 'INSERT INTO producto (nombre, descripcion, precio, imagen, creador, categoria) VALUES (?, ?, ?, ?, ?, ?)';
db.query(query, [nombre, descripcion, precio, imagen, creador, categoria, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Producto agregado', id: result.insertId });
  });
});

// Modificar producto por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, imagen, creador, categoria } = req.body;

  const query = 'UPDATE producto SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, creador = ?, categoria = ? WHERE id = ?';
  db.query(query, [nombre, descripcion, precio, imagen, creador, categoria, id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto actualizado' });
  });
});


module.exports = router;
