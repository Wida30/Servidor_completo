const express = require("express");
const upload = require("../../middlewares/file");



const router = express.Router();

const { getAllMarcas, getMarcaByID, createMarca, deleteMarca, patchMarca } = require("../controllers/marca.controller");
const { route } = require("./juguete.route");

router.get("/", getAllMarcas);
router.get("/:id", getMarcaByID);
router.post("/", upload.single("logo"), createMarca);
router.delete("/:id", deleteMarca);
router.patch("/:id", upload.single("logo"), patchMarca)

module.exports = router;