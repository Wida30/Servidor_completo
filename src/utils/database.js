const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.MONGO_DB;

const connect = async () => {
  try {
    const db = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { name, host } = db.connection;
    console.log(`Conectado a la base de datos: ${name} en e host ${host}`);
  } catch (error) {
    console.error(
      `No se ha podido realizar la conexion con la base de datos`,
      error
    );
  }
};

module.exports = { connect };
