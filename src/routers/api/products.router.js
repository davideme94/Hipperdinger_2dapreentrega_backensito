const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/products.controller");
const productsManager = require("../../data/fs/productsManager");

// Nueva ruta para la vista en tiempo real
router.get("/real", async (req, res) => {
    const products = await productsManager.getAll();
    res.render("realTimeProducts", { title: "Real-Time Products", products });
});

// Ruta para el detalle de un producto
router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = await productsManager.getOne(pid);

    if (!product) {
        return res.status(404).send("Product not found");
    }

    res.render("productDetail", { title: "Product Detail", product });
});

// CRUD de productos
router.post("/", productsController.create);
router.get("/", productsController.getAll);
router.get("/:pid", productsController.getOne);
router.put("/:pid", productsController.update);
router.delete("/:pid", productsController.delete);

module.exports = router;
