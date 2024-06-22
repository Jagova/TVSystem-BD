const mongoose = require("mongoose");


const connectDB = () => {
    const connection_string = process.env.CONNECTION_STRING;

    mongoose.connect(connection_string, {
        dbName: process.env.DB_NAME,
    }).then(
        () => {
            console.log("Conexión exitosa con la db");
        }
    ).catch(
        (error) => {
            console.log("Error al conectar con la db");
            console.log(error);
        }
    )
}

module.exports = connectDB;