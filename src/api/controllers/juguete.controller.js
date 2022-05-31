const Juguete = require("../models/juguete.model");
const { deletefile } = require("../../middlewares/deletefile");

const getAllJuguetes = async (req, res, next) => {
  try {
    const allJuguetes = await Juguete.find();
    return res.json({
      status: 200,
      message: "Juguetes OK",
      juguete: allJuguetes,
    });
  } catch (error) {
    return next(error);
  }
};

const getJugueteByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const juguetesByID = await Juguete.findById(id);
    return res.json({
      status: 200,
      message: "juguete OK",
      juguete: juguetesByID,
    });
  } catch (error) {
    return next(error);
  }
};

const createJuguete = async (req, res, next) => {
  try {
    const newJuguete = new Juguete(req.body);
    if (req.file) {
      newJuguete.foto = req.file.path;
    }
    const createdJuguete = await newJuguete.save();
    return res.json({
      status: 201,
      message: "Juguete created",
      juguete: createdJuguete,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteJuguete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const jugueteBorrado = await Juguete.findByIdAndDelete(id);

    return res.status(200).json(jugueteBorrado);
  } catch (error) {
    return next(error);
  }
};

const patchJuguete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const patchJuguete = new Juguete(req.body);

    patchJuguete._id = id;

    const JugueteDB = await Juguete.findByIdAndUpdate(id, patchJuguete);
    if (JugueteDB.foto) {
        deletefile(JugueteDB.foto);
    }
    if (req.file){
        patchJuguete.foto = req.file.path;
    }

    return res.status(200).json({ nuevo: patchJuguete, vieja: JugueteDB });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllJuguetes,
  getJugueteByID,
  createJuguete,
  deleteJuguete,
  patchJuguete,
};
