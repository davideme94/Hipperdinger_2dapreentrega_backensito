# 🏠 Rental Management API

Este es un sistema de gestión de alquileres (`Rentals`), donde los usuarios pueden administrar productos (`rentals`), carritos de compras (`carts`) y usuarios (`users`). 

El sistema está desarrollado con **Node.js, Express y Handlebars**, y utiliza archivos JSON para la persistencia de datos.

---

## 📌 Tecnologías utilizadas
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework para crear el servidor backend
- **Handlebars.js** - Motor de plantillas para las vistas
- **Bootstrap 5** - Para el diseño de la interfaz
- **Multer** - Para manejo de archivos e imágenes (si se usa)
- **Morgan** - Middleware para logs de solicitudes
- **FS-Extra** - Para manejar archivos JSON

---

ESTRUCTURA DEL PROYECTO

E-COMMERCE/
│── node_modules/             # Dependencias de Node.js
│── public/                   # Archivos estáticos (CSS, imágenes)
│   ├── css/                  # Estilos personalizados
│   ├── images/               # Imágenes para los productos
│── src/                      
│   ├── controllers/          # Controladores de productos, carritos y usuarios
│   ├── data/                 
│   │   ├── fs/               # Persistencia en JSON
│   │   │   ├── products.json # Datos de productos
│   │   │   ├── carts.json    # Datos de carritos
│   │   │   ├── users.json    # Datos de usuarios
│   ├── middlewares/          # Middlewares para manejo de errores y logs
│   ├── routers/              # Rutas de la API
│   ├── views/                # Plantillas Handlebars
│   │   ├── layouts/          # Main layout
│   │   ├── home.hbs          # Página principal
│   │   ├── products.hbs      # Vista de productos
│   │   ├── carts.hbs         # Vista de carritos
│   │   ├── users.hbs         # Vista de usuarios
│── .gitignore                # Archivos ignorados en el repo
│── package.json              # Dependencias y scripts
│── server.js                 # Configuración del servidor
│── README.md                 # Documentación del proyecto




Probar la API en Thunder Client ( ES LA QUE SE USO PARA PROBAR)

🔹 Productos (/api/products)
Método	Endpoint	Descripción	Ejemplo de uso
POST	/api/products	Crear un producto	Enviar un JSON con title, category, thumbnails, price, stock
GET	/api/products	Obtener todos los productos	Navegar a http://localhost:8080/api/products
GET	/api/products/:pid	Obtener un producto por ID	http://localhost:8080/api/products/66da9905-631a-4def-8daa-8925cd01454d
PUT	/api/products/:pid	Actualizar un producto	Enviar un JSON con los campos a modificar
DELETE	/api/products/:pid	Eliminar un producto	Enviar el ID del producto a eliminar


📌 Endpoints para users (Usuarios)
Estos endpoints permiten crear, obtener y administrar usuarios.

Método	Endpoint	Descripción	Ejemplo de uso
POST	/api/users	Crear un usuario	Enviar un JSON con name, email, role
GET	/api/users	Obtener todos los usuarios	Navegar a http://localhost:8080/api/users
GET	/api/users/:uid	Obtener un usuario por ID	http://localhost:8080/api/users/12345
PUT	/api/users/:uid	Actualizar un usuario	Enviar un JSON con los datos a modificar
DELETE	/api/users/:uid	Eliminar un usuario	Enviar el ID del usuario a eliminar


Método	Endpoint	Descripción	Ejemplo de uso
POST	/api/carts/:uid/products/:pid	Agregar un producto al carrito del usuario	Enviar un JSON con quantity
GET	/api/carts/:cid	Obtener los productos de un carrito	http://localhost:8080/api/carts/12345
DELETE	/api/carts/:cid/products/:pid	Eliminar un producto del carrito	Enviar cid (ID del carrito) y pid (ID del producto)


ver imagenes probando la API con thunderclient
(https://drive.google.com/drive/folders/1IeDtFuWMVvq1z7cBReciAFyqmAfW9DYx?usp=sharing)