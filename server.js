const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const { createServer } = require('http');  // Para WebSockets
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');  // Generar IDs únicos

const indexRouter = require('./src/routers/index.router');
const cartsRouter = require('./src/routers/api/carts.router');
const productsRouter = require('./src/routers/api/products.router');
const usersRouter = require('./src/routers/api/users.router');

const errorHandler = require('./src/middlewares/errorHandler');
const pathHandler = require('./src/middlewares/pathHandler');
const productsManager = require('./src/data/fs/productsManager');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// 📌 Configuración de Handlebars
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'src', 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'src', 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 📌 **Registrar las rutas**
app.use('/', indexRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

// 📌 **Configurar WebSockets**
io.on('connection', async (socket) => {
    console.log(`📡 Nuevo cliente conectado: ${socket.id}`);

    // Enviar productos actuales al cliente cuando se conecte
    const products = await productsManager.getAll();
    socket.emit('products', products);

    // Escuchar cuando un nuevo producto sea agregado
    socket.on('newProduct', async (productData) => {
        const newProduct = {
            _id: uuidv4(),
            title: productData.title,
            category: productData.category,
            thumbnails: [productData.thumbnail], // Asegurar que sea un array
            price: parseFloat(productData.price),
            stock: parseInt(productData.stock)
        };

        await productsManager.create(newProduct);
        const updatedProducts = await productsManager.getAll();
        io.emit('products', updatedProducts); // Emitimos actualización a todos
    });
});

// Manejadores de errores
app.use(pathHandler);
app.use(errorHandler);

const PORT = 8080;
httpServer.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
