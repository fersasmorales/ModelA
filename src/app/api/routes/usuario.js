const express = require('express');
const router = express.Router();
const db = require('../db');

// Validar usuario (login)
router.post('/validate', (req, res) => {
  const { username, Contrasenia } = req.body;

  if (!username || !Contrasenia) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const query = 'SELECT * FROM usuario WHERE username = ? AND Contrasenia = ? LIMIT 1';
  db.query(query, [username, Contrasenia], (err, resultados) => {
    if (err) return res.status(500).send(err);

    if (resultados.length > 0) {
      res.json({ success: true, user: resultados[0] });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  });
});


router.post('/recuperar', (req, res) => {
  const { username, correo, nuevaContrasena } = req.body;

  if (!username || !correo || !nuevaContrasena) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const query = 'UPDATE usuario SET Contrasenia = ? WHERE username = ? AND Correo = ?';
  db.query(query, [nuevaContrasena, username, correo], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Contraseña actualizada correctamente' });
    } else {
      res.status(404).json({ success: false, message: 'Usuario o Correo incorrectos' });
    }
  });
});

// Registrar usuario
router.post('/registro', (req, res) => {
  const { nombre, apellido, username, correo, telefono, contrasena } = req.body;

  if (!nombre || !apellido || !username || !correo || !telefono || !contrasena) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const query = 'INSERT INTO usuario (Nombre, Apellido, username, Correo, Celular, Contrasenia,Rol_U) VALUES (?, ?, ?, ?, ?, ?,"usuario")';
  db.query(query, [nombre, apellido, username, correo, telefono, contrasena], (err, result) => {
    if (err) {
      console.error('Error al registrar:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }
    res.json({ success: true, message: 'Usuario registrado correctamente' });
  });
});



module.exports = router;