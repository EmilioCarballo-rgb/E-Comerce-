const User = require('../models/User');
const userService = require('../services/userService');

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

        if (errores.length === 0 && userService.findByEmail(mail)) {
            errores.push("Ya existe una cuenta registrada con ese email.");
        }

        if (errores.length > 0) {
            return res.render("pages/register", {
                errores: errores,
                oldData: { nombre: nom, apellido: ape, email: mail },
                layout: false // También lo agregamos acá por si falla la validación
            });
        }

        const user = userService.create(nom, ape, mail, pass);
        req.session.user = { id: user.id, name: user.name, email: user.email };
        res.redirect("/");
    },

    getLogin: (req, res) => {
        // Agregamos layout: false
        res.render("pages/login", { errores: [], layout: false });
    },

    processLogin: (req, res) => {
        const mail = req.body.email ? req.body.email.trim() : "";
        const pass = req.body.password ? req.body.password.trim() : "";

        const user = userService.findByEmail(mail);

        if (!user || !userService.verifyPassword(pass, user.password_hash)) {
            return res.render("pages/login", {
                errores: ["Email o contraseña incorrectos"],
                layout: false
            });
        }

        req.session.user = { id: user.id, name: user.name, email: user.email };
        res.redirect("/");
    }
};

module.exports = userController;