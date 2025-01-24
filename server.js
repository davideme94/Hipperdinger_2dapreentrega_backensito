const express = require('express');
const morgan = require('morgan');
const indexRouter = require('./src/routers/index.router');
const errorHandler = require('./src/middlewares/errorHandler');
const pathHandler = require('./src/middlewares/pathHandler');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use('/api', indexRouter);

// Manejadores de errores
app.use(pathHandler);
app.use(errorHandler);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
