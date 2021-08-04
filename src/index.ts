import express , { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// routes
import usuarioRoutes from './routes/usuariosRoutes';
import authRoutes from './routes/authRoutes';

class Server {

    public app: Application;

    // Constructor de nuestro servidor
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    // Configuración del servidor
    config(): void {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    // Rutas para mi APIRest
    routes(): void {
        this.app.use('/usuario', usuarioRoutes);
        this.app.use('/auth', authRoutes);
    }

    // Inicialización del servidor
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'));
        });
    }
 
}

const server = new Server();
server.start();