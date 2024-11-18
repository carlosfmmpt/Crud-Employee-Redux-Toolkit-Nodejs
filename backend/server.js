

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ', err.stack);
    return;
  }
  console.log('Connected to MySQL database de Carlos');
});

// Endpoints para manejar empleados

// Obtener todos los empleados
app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Agregar un empleado
app.post('/api/employees', (req, res) => {
  const { name, position, salary, email } = req.body;
  db.query('INSERT INTO employees (name, position, salary, email) VALUES (?, ?, ?, ?)', [name, position, salary, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, name, position, salary, email });
  });
});

// Actualizar un empleado
app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, position, salary, email } = req.body;
  db.query('UPDATE employees SET name = ?, position = ?, salary = ?, email = ? WHERE id = ?', [name, position, salary, email, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, name, position, salary, email });
  });
});

// Eliminar un empleado
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Empleado eliminado con éxito' });
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
