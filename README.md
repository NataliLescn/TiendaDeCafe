# Tienda de Café - Proyecto Web

Este es un proyecto web que simula una tienda online de café. Permite a los usuarios explorar productos, iniciar sesión, agregar al carrito y realizar pedidos, todo desde una interfaz amigable y responsive.

## Resumen del Proyecto

La "Tienda de Café" fue desarrollada con el objetivo de practicar y aplicar conocimientos en desarrollo web full stack. La idea es ofrecer una experiencia completa de navegación, con conexión a base de datos y funcionalidad de login.

### Funcionalidades Principales:

- Navegación entre secciones (inicio, productos, contacto).
- Sistema de autenticación (login).
- Carrito de compras.
- Conexión con base de datos local para gestionar usuarios y productos.


## Tecnologías Utilizadas

- **Frontend**
  - HTML5
  - CSS3
  - JavaScript (vanilla)

- **Backend**
  - Node.js
  - Express.js

- **Base de datos**
  - MySQL (local)



## Instalación y Configuración

### 1. Clonar el repositorio

bash
git clone https://github.com/usuario/tienda-cafe.git


### 2. Instalar dependencias:

npm install

### 3. Configurar la base de datos

Crear una base de datos en MySQL llamada tienda_cafe.

Importar el archivo .sql incluido en el proyecto (si está disponible).

Asegurarse de que el archivo de conexión (db.js o similar) tenga los datos correctos:

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tienda_cafe'
});

### 4. Iniciar el servidor

node server.js

### 5. Para detener el servidor

Presionar Ctrl + C en la terminal donde se esté ejecutando.

### 5. Para detener el servidor

Una vez iniciado el servidor, abrir el navegador y visitar:

http://localhost:3000

### 6. Estructura del proyecto

.
├── controllers/          # Lógica de negocio y manejo de peticiones (ej. authController.js)
├── node_modules/         # Dependencias de Node.js
├── public/               # Archivos estáticos accesibles públicamente
│   ├── css/              # Hojas de estilo CSS
│   ├── images/           # Imágenes del sitio
│   ├── js/               # Scripts JavaScript del lado del cliente
│   ├── Sql/              # Scripts SQL (esquema de DB, datos de prueba, etc.)
│   ├── *.html            # Páginas HTML estáticas (compras.html, index.html, login.html, etc.)
├── routes/               # Definición de rutas de la API (ej. authRoutes.js)
├── view/                 # (Si usas un motor de plantillas, ej. EJS, Pug, Handlebars) Plantillas de vistas
├── .env                  # Variables de entorno (no subido a Git)
├── .gitignore            # Archivos y carpetas a ignorar por Git
├── authController.js     # Controlador de autenticación
├── authRoutes.js         # Rutas relacionadas con la autenticación
├── package.json          # Metadatos del proyecto y lista de dependencias
├── package-lock.json     # Registro de dependencias exactas
├── db.js                 # Configuración de conexión a la base de datos
├── README.md             # Este archivo
└── server.js             # Punto de entrada principal de la aplicación (servidor Express)

### 6. Imagen del proyecto

<img src="./public/images/imgportada.png" alt="Captura de pantalla del inicio" width="600"/>