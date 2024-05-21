const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Configurações de conexão com o banco de dados
const sequelize = new Sequelize('formdb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Definição do modelo de usuário
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sincroniza o modelo com o banco de dados
sequelize.sync()
  .then(() => console.log('Model synchronized with database'))
  .catch(err => console.error('Error syncing model:', err));

const app = express();

app.use(cors());
app.use(express.json());

// Rota para criar um novo usuário
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Inicia o servidor na porta 3000
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
