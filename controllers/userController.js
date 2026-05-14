const User = require('../models/User');

const userController = {

    getRegister: (req, res) => {
        // Agregamos layout: false
        res.render("pages/register", { errores: [], oldData: {}, layout: false });
    },

    processRegister: (req, res) => {
        const { nombre, apellido, email, password } = req.body;

        const nom = nombre ? nombre.trim() : "";
        const ape = apellido ? apellido.trim() : "";
        const mail = email ? email.trim() : "";
        const pass = password ? password.trim() : "";

        const errores = User.validate({ nombre: nom, apellido: ape, email: mail, password: pass });

        if (errores.length > 0) {
            return res.render("pages/register", {
                errores: errores,
                oldData: { nombre: nom, apellido: ape, email: mail },
                layout: false // También lo agregamos acá por si falla la validación
            });
        }

        User.create(nom, ape, mail, pass);
        res.redirect("/");
    },

    getLogin: (req, res) => {
        // Agregamos layout: false
        res.render("pages/login", { errores: [], layout: false });
    },

    processLogin: (_req, res) => {
        res.redirect("/");
    }
};

module.exports = userController;