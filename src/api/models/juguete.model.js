const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JugueteSchema = new Schema (

    {
        nombre: {type:String, required: true},
        tipo: {type: String, required: false},
        year:{type:Number, required: false},
        foto: {type:String, required: true}
    },
    {timestamps: true}
);

const Juguete = mongoose.model("juguetes", JugueteSchema);

module.exports= Juguete;