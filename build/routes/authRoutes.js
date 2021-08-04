"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var AuthRoutes = /** @class */ (function () {
    function AuthRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    AuthRoutes.prototype.config = function () {
        // this.router.get('/', (req, res) => {res.send('GET AuthRoutes')});
        this.router.post('/', authController_1.authController.login);
    };
    return AuthRoutes;
}());
var authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
