const express = require("express");
const upload = require("../../middlewares/file");

const {isAuth} = require("../../middlewares/auth.middleware");

const router = express.Router();

const { getAllJuguetes, getJugueteByID, createJuguete, deleteJuguete, patchJuguete } = require("../controllers/juguete.controller");

router.get("/", getAllJuguetes);
router.get("/:id", getJugueteByID);
router.post("/", upload.single("foto"),createJuguete);
router.delete("/:id", [isAuth], deleteJuguete);
router.patch("/:id", upload.single("foto"), patchJuguete)

module.exports = router;

