import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'clave-secreta-cafe',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 86400000 }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Registro
app.post('/api/registro', async (req, res) => {
  const { nombre, email, usuario, clave } = req.body;

  if (!nombre || !email || !usuario || !clave) {
    return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
  }

  try {
    const [existe] = await db.execute(
      'SELECT 1 FROM usuarios WHERE nombre_usuario = ? OR email = ?',
      [usuario, email]
    );
    if (existe.length) {
      return res.status(400).json({ success: false, message: 'Usuario o email ya existe' });
    }

    // 👇 AQUÍ insertamos el nuevo usuario
    await db.execute(
      'INSERT INTO usuarios (nombre, email, nombre_usuario, contraseña, rol) VALUES (?, ?, ?, ?, ?)',
      [nombre, email, usuario, clave, 'cliente']
    );

    res.json({ success: true, message: 'Usuario registrado correctamente' });
  } catch (e) {
    console.error('Error en registro:', e);
    res.status(500).json({ success: false, message: 'Error al registrar' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { usuario, clave } = req.body;

  if (!usuario || !clave) {
    return res.status(400).json({ success: false, message: 'Usuario y contraseña requeridos' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE nombre_usuario = ? LIMIT 1',
      [usuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    const user = rows[0];

    if (clave !== user.contraseña) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    req.session.usuario = {
      id: user.id_usuario,
      nombre: user.nombre,
      usuario: user.nombre_usuario,
      email: user.email,
      rol: user.rol
    };

    res.json({ success: true, usuario: req.session.usuario });

  } catch (e) {
    console.error('Error en login:', e);
    res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
  }
});

// Ver sesión activa
app.get('/api/usuario-logueado', (req, res) => {
  if (req.session.usuario) {
    res.json({ success: true, usuario: req.session.usuario });
  } else {
    res.json({ success: false });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`**Servidor corriendo en http://localhost:${PORT}`);
});
