const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

// router.get('/', getProducts)

router.route("/").get(getProducts);

router.route("/:id").get(getProductById);
// router.get("/:id", getProductById);

module.exports = router;
