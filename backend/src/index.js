const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

// Informa que o corpo da requisição vem em JSON e consegue transormar em um objeto.
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
