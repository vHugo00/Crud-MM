const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const db = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

const User = db.User;

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
});
