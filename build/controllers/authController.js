"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwkey_1 = __importDefault(require("../config/jwkey"));
var authDao_1 = require("../dao/authDao");
var utils_1 = require("../utils/utils");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    /**
    * Nombre: Login
    * Descripcion: metodo que comprueba los datos de acceso del usuario
    */
    AuthController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, nombre, apellidos, users, _i, users_1, user, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password, nombre = _a.nombre, apellidos = _a.apellidos;
                        console.log(username, password);
                        if (username == null || password == null) {
                            return [2 /*return*/, res.status(400).json({ message: "Datos incorrectos" })];
                        }
                        return [4 /*yield*/, authDao_1.dao.getUser(username)];
                    case 1:
                        users = _b.sent();
                        // Verificar si existe el usuario
                        if (users.length <= 0) {
                            return [2 /*return*/, res.status(400).json({ message: "El usuario no existe" })];
                        }
                        _i = 0, users_1 = users;
                        _b.label = 2;
                    case 2:
                        if (!(_i < users_1.length)) return [3 /*break*/, 5];
                        user = users_1[_i];
                        return [4 /*yield*/, utils_1.utils.checkPassword(password, user.password)];
                    case 3:
                        if (_b.sent()) {
                            token = jsonwebtoken_1.default.sign({ cveUsuario: user.cveUsuario, username: username, mascota: user.nombre }, jwkey_1.default.jwtSecret, { expiresIn: '1h' });
                            return [2 /*return*/, res.json({ message: "OK", token: token, cveUsuario: user.cveUsuario, username: username, mascota: user.nombreMascota, nombre: user.nombre, apellidos: user.apellidos, raza: user.nombreRaza })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({ message: "La contraseña es incorrecta" })];
                        }
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.authController = new AuthController();
