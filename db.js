import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  database: 'tienda_de_cafe',
  user: 'root',
  password: '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para probar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log( 'Conexión a MySQL exitosa');
    connection.release();
  } catch (error) {
    console.error('Error conectando a MySQL:', error.message);
  }
}


testConnection();

export default pool;