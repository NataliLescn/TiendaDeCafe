const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(401).json({ msg: 'Usuario no encontrado' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (!match) return res.status(401).json({ msg: 'Contraseña incorrecta' });
      const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, nombre: user.nombre } });
    });
  });
};

exports.register = (req, res) => {
  const { nombre, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
    [nombre, email, hashed],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ msg: 'Usuario creado', userId: result.insertId });
    });
};
