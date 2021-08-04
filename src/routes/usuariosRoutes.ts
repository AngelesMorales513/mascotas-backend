import { Router } from 'express';
import {usuarioController} from '../controllers/usuarioController';
// import { checkJwt } from '../middleware/jwt';

class UsuarioRoutes {
    public router: Router = Router();

    constructor() { 
        this.config();
    }

    config(): void {
        this.router.put('/', /*[checkJwt],*/ usuarioController.insert);
    }
}

const usuariosRoutes = new UsuarioRoutes();
export default usuariosRoutes.router;