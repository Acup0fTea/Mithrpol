const express = require("express");
const { createProduct, getSingleProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/Product.ctrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/',authMiddleware, isAdmin,createProduct);
router.get("/:id", getSingleProduct);
router.get("/", getAllProducts)
router.post('/:id',authMiddleware, isAdmin ,updateProduct);
router.delete('/:id',authMiddleware,isAdmin, deleteProduct);

module.exports = router;