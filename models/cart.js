
class Cart {
    /**
     * Agrega un producto al carrito o incrementa su cantidad si ya existe.
     * @param {Array} userCart - El carrito actual del usuario.
     * @param {Object} product - El objeto del producto a agregar.
     * @returns {Array} - El carrito actualizado.
     */
    static addProduct(userCart, product) {
        // Clonamos el carrito para no mutar el objeto original directamente (buena práctica)
        let updatedCart = [...userCart]; 
        const existingProduct = updatedCart.find(p => p.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }

        return updatedCart;
    }

    /**
     * Actualiza la cantidad de un producto (suma o resta).
     */
    static updateQuantity(userCart, productId, action) {
        let updatedCart = [...userCart];
        const product = updatedCart.find(p => p.id === parseInt(productId));
        
        if (product) {
            if (action === 'sumar') {
                product.quantity += 1;
            } else if (action === 'restar' && product.quantity > 1) {
                product.quantity -= 1;
            }
        }
        return updatedCart;
    }

    /**
     * Elimina un producto por completo del carrito.
     */
    static removeProduct(userCart, productId) {
        return userCart.filter(p => p.id !== parseInt(productId));
    }

    /**
     * Calcula el valor total del carrito.
     */
    static calculateTotal(userCart) {
        let total = 0;
        for (let item of userCart) {
            // Asumimos que el Product Model ya nos entrega números limpios, no strings con "$"
            total += (item.price * item.quantity);
        }
        return total;
    }
}

module.exports = Cart;