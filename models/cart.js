// models/Cart.js
class Cart {
    // Aquí es donde deberías recibir el carrito específico de un usuario (ej. desde una base de datos o sesión), no usar una variable global.
    static calculateTotal(cartItems) {
        let totalCalculado = 0;
        for (let item of cartItems) {
            let precioActual = item.price || "0"; 
            let precioLimpio = parseInt(String(precioActual).replace(/[^0-9]/g, ''));
            
            if (!isNaN(precioLimpio)) {
                totalCalculado += (precioLimpio * item.quantity);
            }
        }
        return totalCalculado;
    }
}

module.exports = Cart;