import express from 'express';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const usuarios = [];

async function initUsuarios() {
  usuarios.push({
    id: 1,
    usuario: 'admin',
    nombre: 'Administrador',
    email: 'admin@tiendacafe.com',
    clave: await bcrypt.hash('1234', 10)
  });
  usuarios.push({
    id: 2,
    usuario: 'juan',
    nombre: 'Juan Pérez',
    email: 'juan@email.com',
    clave: await bcrypt.hash('123456', 10)
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'tienda-cafe-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Login
app.post('/api/login', async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    const user = usuarios.find(u => u.usuario === usuario);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    const claveValida = await bcrypt.compare(clave, user.clave);

    if (!claveValida) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    req.session.usuario = {
      id: user.id,
      usuario: user.usuario,
      nombre: user.nombre,
      email: user.email
    };

    res.json({
      success: true,
      message: 'Login exitoso',
      usuario: { nombre: user.nombre, usuario: user.usuario }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Registro
app.post('/api/registro', async (req, res) => {
  const { nombre, email, usuario, clave } = req.body;

  try {
    const existe = usuarios.find(u => u.usuario === usuario || u.email === email);

    if (existe) {
      return res.status(400).json({ success: false, message: 'El usuario o email ya existe' });
    }

    const nuevo = {
      id: usuarios.length + 1,
      usuario,
      nombre,
      email,
      clave: await bcrypt.hash(clave, 10)
    };

    usuarios.push(nuevo);

    res.json({ success: true, message: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Resto de rutas...
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

initUsuarios().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });
});

