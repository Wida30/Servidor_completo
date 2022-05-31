const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


//   cloudinary 1
const cloudinary = require("cloudinary").v2



const jueguetesRouter = require("./src/api/routes/juguete.route");
const marcasRouter = require("./src/api/routes/marca.route");
const userRouter = require("./src/api/routes/users.route");

const {connect} = require("./src/utils/database");

const JWT_SECRET = process.env.JWT_SECRET

dotenv.config();

const server = express();


server.use(express.json());
server.use(express.urlencoded({ extended: false }));


connect()

//   cloudinary 2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


server.use(cors({
    origin: "*",
    credentials: true
}))

server.set("secretKey",JWT_SECRET)

server.use("/juguete", jueguetesRouter);
server.use("/marcas", marcasRouter);
server.use("/users", userRouter);

const PORT = process.env.PORT || 8000;

server.listen (PORT, () => {
    console.log(`Server run in http://localhost:${PORT}`);
});