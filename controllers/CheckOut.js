const Cart = require('../models/Cart'); // Suponiendo que tienes un modelo Cart

const checkoutController = {
    // 1. Mostrar la página
    renderCheckout: async (req, res) => {
        try {
            // Lógica ficticia: Obtener el total del carrito del usuario actual
            // const total = await Cart.getTotal(req.session.userId);
            const total = 5400; // Hardcodeado por ahora
            
            res.render('pages/checkout', { total: total });
        } catch (error) {
            console.error("Error al cargar checkout:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    // 2. Procesar el formulario
    procesarPago: (req, res) => {
        // Gracias a los atributos 'name' en tu EJS, ahora esto sí tiene datos
        const { nombreCompleto, email, direccion, numeroTarjeta, vencimiento, cvc } = req.body;

        console.log(`Procesando pedido para: ${nombreCompleto}, Dirección: ${direccion}`);
        
        // ADVERTENCIA DE INGENIERÍA: En un e-commerce real, los datos de tarjeta 
        // JAMÁS se guardan en tu base de datos ni pasan por tu backend de esta forma 
        // (a menos que cumplas normas PCI). Se usan pasarelas como MercadoPago o Stripe.
        // Pero para el alcance actual del proyecto, esta recepción de datos es válida.

        // Aquí iría la lógica para vaciar el carrito y guardar la 'Orden' en la base de datos...

        // Finalmente, redirigimos a una página de éxito
        res.send(`¡Pago exitoso! Factura enviada a ${email}`);
    }
};

module.exports = checkoutController;