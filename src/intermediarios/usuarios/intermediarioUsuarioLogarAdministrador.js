const intermediarioUsuarioLogarAdministrador = async (req, res, next) => {
    const { username } = req.usuario;

    try {
        if (username !== 'albertstorres' && username !== 'antoniostorres') {
            return res.status(401).json({ mensagem: "Não autorizado" });
        }

        next();
    } catch (error) {
        return res.status(401).json(error.message);
    }

}

module.exports = intermediarioUsuarioLogarAdministrador;