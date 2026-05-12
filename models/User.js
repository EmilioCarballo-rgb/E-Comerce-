// models/User.js

const users = [];

class User {
    constructor(nombre, apellido, email, password) {
        this.id = users.length + 1;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
    }

    static validate(data) {
        const { nombre, apellido, email, password } = data;
        const errores = [];

        const nom = nombre ? nombre.trim() : "";
        const ape = apellido ? apellido.trim() : "";
        const mail = email ? email.trim() : "";
        const pass = password ? password.trim() : "";

        if (!nom || !ape || !mail || !pass) {
            errores.push("Todos los campos deben estar completos");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (mail && !emailRegex.test(mail)) {
            errores.push("Mail Invalido");
        }

        if (pass) {
            if (pass.length < 8)
                errores.push("La contraseña debe contener al menos 8 caracteres");
            if (!/[a-zA-Z]/.test(pass))
                errores.push("La contraseña debe contener al menos una letra");
            if (!/[0-9]/.test(pass))
                errores.push("La contraseña debe incluir al menos un número.");

            const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
            if (!specialCharsRegex.test(pass))
                errores.push("La contraseña debe incluir al menos un carácter especial.");

            const cadenasProhibidas = ["password", "1234", "qwerty", "mateando", nom.toLowerCase()];
            for (let palabra of cadenasProhibidas) {
                if (palabra && pass.toLowerCase().includes(palabra)) {
                    errores.push(`La contraseña es demasiado débil (contiene "${palabra}").`);
                }
            }

            if (pass === mail)
                errores.push("La contraseña no puede ser igual al email.");
        }

        return errores;
    }

    static findByEmail(email) {
        return users.find(u => u.email === email) || null;
    }

    static create(nombre, apellido, email, password) {
        const user = new User(nombre, apellido, email, password);
        users.push(user);
        return user;
    }
}

module.exports = User;
