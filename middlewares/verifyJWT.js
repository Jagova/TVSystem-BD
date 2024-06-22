const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { UserRepository } = require("../repositories/user");

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header("Authorization");
    if (!token) {
        res.status(401).json({
            msg: "Token invalido",
        });
        return;
    }

    try {
        const { username } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await UserRepository.getOne({ username: username });
        if (!user) {
            res.status(401).json({
                msg: "Token invalido",
            });
            return;
        }
        else {
            req.userActive = user;
            next();
        }
    }
    catch (error) {
        res.status(401).json({
            msg: "Token invalido",
        });
        return;
    }

}

module.exports = {
    validateJWT
}