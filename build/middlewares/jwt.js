"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwkey_1 = __importDefault(require("../config/jwkey"));
var checkJwt = function (req, res, next) {
    var token = String(req.headers['auth']);
    var jwtPayLoad;
    try {
        jwtPayLoad = jsonwebtoken_1.default.verify(token, jwkey_1.default.jwtSecret);
        res.locals.jwtPayLoad = jwtPayLoad;
    }
    catch (error) {
        return res.status(404).json({ message: "No autorizado" });
    }
    var cveUsuario = jwtPayLoad.cveUsuario, username = jwtPayLoad.username, mascota = jwtPayLoad.mascota;
    var newToken = jsonwebtoken_1.default.sign({ cveUsuario: cveUsuario, username: username, mascota: mascota }, jwkey_1.default.jwtSecret, { expiresIn: '1h' });
    res.setHeader('token', newToken);
    next();
};
exports.checkJwt = checkJwt;
