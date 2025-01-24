const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');

const indexRouter = require('./src/routers/index.router');
const errorHandler = require('./src/middlewares/errorHandler');
const pathHandler = require('./src/middlewares/pathHandler');

const app = express();

// 📌 Configuración correcta de Handlebars
app.engine('hbs', engine({ 
    extname: '.hbs', 
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'src', 'views', 'layouts') 
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views')); // ✅ Solo esta línea debe definir `views`

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//statics images
app.use(express.static(path.join(__dirname, 'public'))); // ✅ Esto permite servir archivos desde `public/`


// Rutas principales
app.use('/', indexRouter);

// Manejadores de errores
app.use(pathHandler);
app.use(errorHandler);

const PORT = 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
