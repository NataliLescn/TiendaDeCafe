const db = require('../config/db');

exports.obtenerCarrito = (req, res) => {
  const userId = req.params.usuarioId;
  db.query(`
    SELECT p.nombre, p.precio, c.cantidad
    FROM carrito c
    JOIN productos p ON c.producto_id = p.id
    WHERE c.usuario_id = ?`, [userId], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
  });
};

exports.agregarAlCarrito = (req, res) => {
  const { usuario_id, producto_id, cantidad } = req.body;

  // Verificar si ya existe
  db.query('SELECT * FROM carrito WHERE usuario_id = ? AND producto_id = ?', 
    [usuario_id, producto_id], 
    (err, rows) => {
      if (rows.length > 0) {
        db.query('UPDATE carrito SET cantidad = cantidad + ? WHERE usuario_id = ? AND producto_id = ?', 
          [cantidad, usuario_id, producto_id],
          (err) => {
            if (err) return res.status(500).send(err);
            res.json({ msg: 'Cantidad actualizada' });
          });
      } else {
        db.query('INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)', 
          [usuario_id, producto_id, cantidad], 
          (err) => {
            if (err) return res.status(500).send(err);
            res.json({ msg: 'Producto agregado al carrito' });
          });
      }
    });
};
