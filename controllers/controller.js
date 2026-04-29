app.get("/agregar-al-carrito/:id", (req, res) => {
    res.redirect("/"); 
});

app.get("/actualizar-cantidad/:id/:accion", (req, res) => {
    const idProducto = parseInt(req.params.id); 
    const accion = req.params.accion; 
     
    const productoEnCarrito = cart.find(p => p.id === idProducto);
    
    if (productoEnCarrito) {
        if (accion === 'sumar') {
            productoEnCarrito.quantity += 1;
        } else if (accion === 'restar' && productoEnCarrito.quantity > 1) {
            productoEnCarrito.quantity -= 1;
        }
    }
    
    res.send("OK"); 
});

app.get("/quitar-del-carrito/:id", (req, res) => {
    const idProducto = parseInt(req.params.id);
    
    cart = cart.filter(p => p.id !== idProducto);
    
    res.send("OK");
});

app.get("/cart", (req, res)=> {
    let totalAcumulado = 0;
    cart.forEach(p => {
        totalAcumulado += (p.price * p.quantity);
    });
    res.render("pages/cart", { products: cart, user, total: totalAcumulado });
});

app.get("/checkout", (req, res) => {
    let totalCalculado = 0;

    for (let producto of cart) {
        // 1. Nos aseguramos de que el precio exista. Si no existe, usamos "0"
        let precioActual = producto.price || "0"; 

        // 2. Convertimos el valor a String a la fuerza, y recién ahí le aplicamos el replace
        let precioLimpio = parseInt(String(precioActual).replace(/[^0-9]/g, ''));
        
        // 3. Sumamos al total (por las dudas validamos que sea un número válido)
        if (!isNaN(precioLimpio)) {
            totalCalculado += (precioLimpio * producto.quantity);
        }
    }

    res.render("pages/checkout", { 
        user: user, 
        cart: cart, 
        total: totalCalculado 
    });
});
app.get("/register", (req, res)=> {res.render ("pages/register", {products, user})})
app.get("/login", (req, res)=> {res.render ("pages/login", {products})})

app.post("/register", (req, res) => { res.redirect("/"); });
app.post("/login", (req, res) => { res.redirect("/"); });