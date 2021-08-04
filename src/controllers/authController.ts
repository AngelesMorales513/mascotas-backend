import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import secretKey from '../config/jwkey';
import { dao } from '../dao/authDao';
import { utils } from '../utils/utils';

class AuthController {

    /**
    * Nombre: Login
    * Descripcion: metodo que comprueba los datos de acceso del usuario 
    */
    public async login(req: Request, res: Response){
        const { username, password, nombre, apellidos } = req.body;
        console.log(username, password);
        if(username == null || password == null){
            return res.status(400).json({message : "Datos incorrectos"});
        }

        const users = await dao.getUser(username);

        // Verificar si existe el usuario
        if(users.length <= 0){
            return res.status(400).json({message : "El usuario no existe"});
        }

        for(let user of users) {
            if(await utils.checkPassword(password, user.password)){
                const token = jwt.sign({cveUsuario : user.cveUsuario, username, mascota : user.nombre}, secretKey.jwtSecret, {expiresIn : '1h'});
                return res.json({ message : "OK", token, cveUsuario : user.cveUsuario, username, mascota: user.nombreMascota, nombre: user.nombre, apellidos: user.apellidos, raza: user.nombreRaza });
            } else {
                return res.status(400).json({message : "La contraseña es incorrecta"});
            }
        }
    }

}

export const authController = new AuthController();