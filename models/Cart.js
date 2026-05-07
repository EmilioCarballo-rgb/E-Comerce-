// models/Cart.js
const Product = require('./Product'); 

class Cart {
    /**
     * Une los IDs de la sesión con los datos reales de los productos
     */
    static getDetailedCart(sessionCart) {
        if (!sessionCart || sessionCart.length === 0) return [];

        return sessionCart.map(item => {
            // Buscamos los datos completos del producto en el array de Productos
            const productData = Product.find(p => p.id == item.productId);

            if (!productData) return null;

            const subtotal = productData.price * item.quantity;
            
            return {
                ...productData, // Copia nombre, precio, imagen, etc.
                quantity: item.quantity,
                subtotal: subtotal
            };
        }).filter(item => item !== null); // Limpiamos si algún producto no se encontró
    }

    /**
     * Calcula el total general de la compra
     */
    static calculateTotal(sessionCart) {
        const cartDetails = this.getDetailedCart(sessionCart);
        let total = 0;
        cartDetails.forEach(item => {
            total += item.subtotal;
        });
        return total;
    }

    /**
     * Agrega un producto o aumenta su cantidad si ya existe
     */
    static addItem(sessionCart, productId) {
        let cart = sessionCart ? [...sessionCart] : [];
        const itemIndex = cart.findIndex(item => item.productId == productId);

        if (itemIndex !== -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ productId: productId, quantity: 1 });
        }
        return cart;
    }

    /**
     * Incrementa cantidad (+1)
     */
    static increaseItem(sessionCart, productId) {
        let cart = sessionCart ? [...sessionCart] : [];
        const item = cart.find(i => i.productId == productId);
        if (item) item.quantity += 1;
        return cart;
    }

    /**
     * Decrementa cantidad (-1) o elimina si llega a 0
     */
    static decreaseItem(sessionCart, productId) {
        let cart = sessionCart ? [...sessionCart] : [];
        const itemIndex = cart.findIndex(i => i.productId == productId);

        if (itemIndex !== -1) {
            cart[itemIndex].quantity -= 1;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
        }
        return cart;
    }
} // <--- UNA SOLA LLAVE para cerrar la clase al final de todo

module.exports = Cart;