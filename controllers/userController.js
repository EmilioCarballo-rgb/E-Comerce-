const userController = {
    // --- VISTAS GET ---
    
    // Renderiza la pantalla de registro
    getRegister: (req, res) => {
        res.render("pages/register", {errores: [], oldData: {}});
    },

    // Renderiza la pantalla de login
    getLogin: (req, res) => {
        res.render("pages/login", {});
    },

    // --- ACCIONES POST ---
    
    // Procesa el formulario de registro
    processRegister: (req, res) => {

        console.log("=== DATOS DEL FORMULARIO ===");
        console.log(req.body); 
        console.log("============================");

        const {nombre, apellido, email, password} = req.body;
        let errores = [];

        const nom = nombre ? nombre.trim(): "";
        const ape = apellido ? apellido.trim() : "";
        const mail = email ? email.trim(): "";
        const pass = password ? password.trim(): "";
        
        //Validaciones 
        //Campos vacios
        if(!nom || !ape || !mail || !pass){
            errores.push("Todos los campos deben estar completos");
        }

        //Email Invalido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (mail && !emailRegex.test(mail)) {
            errores.push("Mail Invalido")
        }

        //Reglas de contraseña
        if (pass){
            if (pass.length<8) errores.push("La contraseña debe contener al menos 8 caracteres");
            if (!/[a-zA-Z]/.test(pass)) errores.push ("La contraseña debe contener al menos una letra")
            if (!/[0-9]/.test(pass)) errores.push("La contraseña debe incluir al menos un número.");

            const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
            if (!specialCharsRegex.test(pass)) errores.push("La contraseña debe incluir al menos un carácter especial.");

            const lowerPass = pass.toLowerCase();
    
            const cadenasProhibidas = ["password", "1234", "qwerty","mateando", nom.toLowerCase()];

            for (let palabra of cadenasProhibidas) {
                if (palabra && lowerPass.includes(palabra)) {
                    errores.push(`La contraseña es demasiado débil (contiene "${palabra}").`);
                }
            }

            if (pass === mail) errores.push("La contraseña no puede ser igual al email.");
        }

        console.log("=== EVALUACIÓN DE REGLAS ===");
        console.log("Errores detectados:", errores);
        console.log("============================");
        if (errores.length > 0) {
            // Rechazado: Volvemos a renderizar la vista con los errores y los datos precargados
            return res.render("pages/register", { 
                errores: errores, 
                oldData: { nombre: nom, apellido: ape, email: mail } // No devolvemos el password por seguridad
            });
        }
        
        console.log(`Validación exitosa. Registrando a: ${mail}`);
        res.redirect("/");
    },

    getLogin: (req, res) => {
        res.render("pages/login", { errores: [] });
    },

    processLogin: (req, res) => {
        res.redirect("/");
    }
};

module.exports = userController;