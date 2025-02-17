const socket = io();

// Manejo del formulario para agregar productos en tiempo real
document.querySelector("#productForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const category = document.querySelector("#category").value;
    const thumbnail = document.querySelector("#thumbnail").value;
    const price = document.querySelector("#price").value;
    const stock = document.querySelector("#stock").value;

    const newProduct = { title, category, thumbnail, price, stock };

    socket.emit("newProduct", newProduct);
});

// Escuchar la actualización de productos
socket.on("products", (products) => {
    const productList = document.querySelector("#productList");
    productList.innerHTML = products.map((p) =>
        `<li>
            <img src="${p.thumbnails[0]}" alt="${p.title}" width="100">
            <strong>${p.title}</strong> - $${p.price} - Stock: ${p.stock}
        </li>`).join("");
});
