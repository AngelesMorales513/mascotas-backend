import pool from "../database/database";

class UsuarioDAO {

    public async verificarUsuario(usuario: string) {
        const result = await pool.then(async (connection) => {
            return await connection.query('SELECT cveUsuario FROM usuario WHERE username = ?', [usuario]);
        });

        return result;
    }

    public async insert(user: any) {
        const result = await pool.then(async (connection) => {
            return await connection.query("INSERT INTO usuario SET ?", [user]);
        });
        return result;
        
    }

}

export const dao = new UsuarioDAO();