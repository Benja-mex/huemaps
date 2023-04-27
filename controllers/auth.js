const { response } = require("express");
const { pool } = require("../BD/conexion");

const crearUsuario = async (req, res = response) => {
    const { online, nombre, usuario, correo, telefono, password, rol, activo } = req.body;
    console.log(req.body)
    try {
        const countUser = await pool.query('SELECT (SELECT COUNT(*) FROM usuarios);');
        const count = countUser.rows[0].count
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).replace(/\//g, '');
        const codigo = "LMU" + fechaFormateada + count;
        const Newusuario = await pool.query(
            `INSERT INTO usuarios (codigo, online, nombre, usuario, correo, telefono, contraseña, rol, activo)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING *;`, [
            codigo,
            online,
            nombre,
            usuario,
            correo,
            telefono,
            password,
            rol,
            activo
        ]);

        res.json({
            ok: true,
            user: Newusuario.rows[0]
        }) // Imprime el usuario recién insertado

    } catch (error) {
        //console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al crear usuario",
            error: error.message
        });
    }finally{
        pool.end()
    }
}
const deleteUsuario = async (req, res = response) => {
    const { codigo } = req.body;
    try {
        const Newusuario = await pool.query('DELETE FROM usuarios WHERE codigo = $1', [codigo]);
        res.json({
            ok: true,
            msg: "Usuario borrado"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al borrar usuario",
            error: error.message
        });
    }
}

const updateUsuario = async (req, res = response) => {
    try {
        const { codigo, nombre, usuario, correo, telefono, password, rol } = req.body;
        const Newusuario = await pool.query(`UPDATE usuarios 
                                            SET nombre = $1, 
                                            SET usuario = $2, 
                                            SET correo = $3, 
                                            SET telefono = $4, 
                                            SET contraseña= $5, 
                                            SET rol = $6 
                                            WHERE codigo = $7
                                            RETURNING *`, [
            nombre,
            usuario,
            correo,
            telefono,
            password,
            rol,
            codigo
        ]);
        res.json({
            ok: true,
            user: Newusuario.rows[0]
        })

    } catch (error) {
        //console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al crear usuario",
            error: error.message
        });
    }finally{
        pool.end()
    }
}

const loginUsuario = async (req, res = response) => {
    try {
        const { usuario, password } = req.body;
        const Newusuario = await pool.query(`SELECT * FROM usuarios 
                                            WHERE usuario = $1,
                                            AND 
                                            contraseña = $2`, [
            usuario,
            password,
        ]);
        if (Newusuario.rows.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o la contraseña son incorrectos'
            });
        }

        res.json({
            ok: true,
            user: Newusuario.rows[0]
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al autentificar el usuario",
            error: error.message
        });
    }finally{
        pool.end()
    }
}

const allUsuario = async (req, res = response) => {
    try {
        const Newusuario = await pool.query("SELECT * FROM usuarios");
        if (Newusuario.rows.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay usuarios registrados'
            });
        }

        res.json({
            ok: true,
            user: Newusuario.rows[0]
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al optener a los usuarios",
            error: error.message
        });
    }finally{
        pool.end()
    }
}

module.exports = {
    crearUsuario,
    deleteUsuario,
    updateUsuario,
    loginUsuario,
    allUsuario
}