const express = require('express');
const router = express.Router();
const producto = require('../controllers/productoController');

router.get('/', producto.obtenerProductos);

module.exports = router;
const express = require('express');
const router = express.Router();
const carrito = require('../controllers/carritoController');

router.get('/:usuarioId', carrito.obtenerCarrito);
router.post('/', carrito.agregarAlCarrito);

module.exports = router;
