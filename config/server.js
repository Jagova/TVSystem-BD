const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.corsOptions = {
            origin: [process.env.FRONTEND_URL || ""],
        };

        this.authPath = "/api/auth";
        this.tvShowsPath = "/api/tvshows";

        this.middlewares();
        this.routes();
        connectDB();
    }

    routes() {
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.tvShowsPath, require("../routes/tvshows"));
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors(this.corsOptions));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }

}

module.exports = Server;