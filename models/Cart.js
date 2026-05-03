// models/Cart.js
const Product = require('./Product');

class Cart {
    /**
     * @param {Array} sessionCart - El carrito crudo de la sesión [{productId, quantity}]
     * @returns {Array} - Carrito con datos completos del producto y subtotales
     */
    static getDetailedCart(sessionCart) {
        if (!sessionCart || sessionCart.length === 0) return [];

        return sessionCart.map(item => {
            const productData = Product.findById(item.productId);
            
            // Prevención de fallos: si el producto fue borrado del catálogo
            if (!productData) return null; 

            const subtotal = productData.price * item.quantity;
            return {
                ...productData, // Spread operator para copiar nombre, precio, etc.
                quantity: item.quantity,
                subtotal: subtotal
            };
        }).filter(item => item !== null); // Filtramos los productos nulos
    }

    /**
     * @param {Array} sessionCart - El carrito crudo
     * @returns {Number} - El total de la compra
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
     * @param {Array} sessionCart - El carrito crudo
     * @param {String|Number} productId - El ID del producto a agregar
     * @returns {Array} - El nuevo estado del carrito
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
     * @param {Array} sessionCart - El carrito crudo
     * @param {String|Number} productId - El ID del producto a incrementar
     * @returns {Array} - El nuevo estado del carrito
     */
    static increaseItem(sessionCart, productId) {
        let cart = sessionCart ? [...sessionCart] : [];
        const item = cart.find(i => i.productId == productId);
        if (item) item.quantity += 1;
        return cart;
    }

    /**
     * @param {Array} sessionCart - El carrito crudo
     * @param {String|Number} productId - El ID del producto a decrementar
     * @returns {Array} - El nuevo estado del carrito
     */
    static decreaseItem(sessionCart, productId) {
        let cart = sessionCart ? [...sessionCart] : [];
        const itemIndex = cart.findIndex(i => i.productId == productId);

        if (itemIndex !== -1) {
            cart[itemIndex].quantity -= 1;
            // Si la cantidad llega a 0, eliminamos el producto
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
        }
        return cart;
    }
}

module.exports = Cart;