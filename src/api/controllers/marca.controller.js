const res = require("express/lib/response");
const Marca = require("../models/marca.model");

const getAllMarcas = async (req, res, next) => {
  try {
    const allMarcas = await Marca.find().populate("juguetes");
    return res.json({
      status: 200,
      message: "Marcas OK",
      marcas: allMarcas,
    });
  } catch (error) {
    return next(error);
  }
};

const getMarcaByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const marcaByID = await Marca.findById(id);
    return res.json({
      status: 200,
      message: "Marca OK",
      marca: marcaByID,
    });
  } catch (error) {
    return next(error);
  }
};

const createMarca = async (req, res, next) => {
  try {
    const newMarca = new Marca(req.body);
    if (req.file) {
      newMarca.logo = req.file.path;
    }
    const createdMarca = await newMarca.save();
    return res.json({
      status: 201,
      message: "Marca created",
     marca: createdMarca,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteMarca = async(req, res, next) => {
  try {
    const {id} = req.params;
    const marcaBorrada = await Marca.findByIdAndDelete(id)
    return res.status(200).json(marcaBorrada);
  } catch (error) {
    return next(error)
  }
}

const patchMarca = async(req, res, next) => {
  try {
    const {id} = req.params;
    const patchMarca = new Marca(req.body);
    patchMarca._id = id;
    const MarcaData = await Marca.findById(id)
    patchMarca.juguetes = [...MarcaData.juguetes, ...patchMarca.juguetes]
    const MarcaDB = await Marca.findByIdAndUpdate(id, patchMarca);
    return res.status(200).json ({ nuevo: patchMarca, vieja: MarcaDB})
  } catch (error) {
    return next(error)
  }
}

module.exports = { getAllMarcas, getMarcaByID, createMarca, deleteMarca, patchMarca };