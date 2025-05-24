const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Validar usuario (login)
router.post('/validate', (req, res) => {
  const { username, Contrasenia } = req.body;

  if (!username || !Contrasenia) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const query = 'SELECT * FROM usuario WHERE username = ? LIMIT 1';
  db.query(query, [username], async (err, resultados) => {
    if (err) return res.status(500).send(err);

    if (resultados.length > 0) {
      const usuario = resultados[0];
      const match = await bcrypt.compare(Contrasenia, usuario.Contrasenia);
      if (match) {
        res.json({
          success: true,
          message: 'Login exitoso',
          username: usuario.username,
          rol: usuario.Rol_U
        });
      } else {
        res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
  });
});

// Recuperar contraseña
router.post('/recuperar', async (req, res) => {
  const { username, correo, nuevaContrasena } = req.body;

  if (!username || !correo || !nuevaContrasena) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(nuevaContrasena, saltRounds);
    const query = 'UPDATE usuario SET Contrasenia = ? WHERE username = ? AND Correo = ?';
    db.query(query, [hashedPassword, username, correo], (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.affectedRows > 0) {
        res.json({ success: true, message: 'Contraseña actualizada correctamente' });
      } else {
        res.status(404).json({ success: false, message: 'Usuario o Correo incorrectos' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al encriptar la nueva contraseña' });
  }
});

// Registrar usuario
router.post('/registro', async (req, res) => {
  const { nombre, apellido, username, correo, telefono, contrasena } = req.body;

  if (!nombre || !apellido || !username || !correo || !telefono || !contrasena) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
    const query = 'INSERT INTO usuario (Nombre, Apellido, username, Correo, Celular, Contrasenia, Rol_U) VALUES (?, ?, ?, ?, ?, ?, "usuario")';

    db.query(query, [nombre, apellido, username, correo, telefono, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error al registrar:', err);
        return res.status(500).json({ message: 'Error del servidor' });
      }
      res.json({ success: true, message: 'Usuario registrado correctamente' });
    });
  } catch (err) {
    console.error('Error al encriptar:', err);
    res.status(500).json({ message: 'Error al encriptar la contraseña' });
  }
});

module.exports = router;
