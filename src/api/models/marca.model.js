const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MarcaSchema = new Schema(
    {
        nombre : {type: String, required: true},
        creacion: {type: String, required: false},
        logo: {type: String, required: true},
        juguetes: [
            {type: Schema.Types.ObjectId, ref:"juguetes"},
        ],
    },
     {timestamps: true}
);

const Marca = mongoose.model("marcas", MarcaSchema);

module.exports = Marca;