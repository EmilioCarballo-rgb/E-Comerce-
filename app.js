const express = require ('express');
const app = express();
const port = 3000;

app.set ("view engine", "ejs");

const user = {
    firstName: 'E-Comerce',
    secondName: 'De La Banda',
    isAdmin: true,
};

// 1. Memoria del carrito
let cart = [];

// 2. Precios limpios para poder sumar matemáticamente
const products = [
  { 
    id:1,
    title: "Mate", category: "mates",
    description: "Mate Imperial de Madera Mate artesanal trabajado en maderas seleccionadas, ideal para quienes buscan un sabor suave y un aroma rústico en cada cebada.", 
    price: 15000, 
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRP1O25vTC92joON5LaHxuUuhXnVoL1VerBaO7Cb7J1Pf25_wInn3fbBqw02Bu_1-VRnudDjOUnM4eRJipnE-aj1YU2ZXOjjTlIr9sMM3uW9fQSVBMg8YiqSU0g1Nx0eoDSC1mDBg&usqp=CAc" 
  },
  { 
    id:2,
    title: "Mate", category: "mates",
    description: "Mate de Algarrobo: Fabricado en madera de algarrobo de alta resistencia. Destaca por su durabilidad y el toque dulce y distintivo que le aporta al sabor de la yerba.", 
    price: 18000, 
    image: "https://imgs.search.brave.com/SR5W8BriiLkDw6-7aY951dovqhoddlniTPcyKJPjlwA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kMjJm/eGFmOXQ4ZDM5ay5j/bG91ZGZyb250Lm5l/dC9hY2VlZDcwM2Ey/NGU3ZDkwNWY1ZWFm/Nzc2NDliNzg3ZDk0/NDE3ZTQwNTIzZDBk/ODkxMmMzNzI0ZjM1/ZDVhMGE2NDA3NjE2/LmpwZw" 
  },
  { 
    id:3,
    title: "Mate", category: "mates",
    description: "Mate de Calabaza Camionero: El clásico infaltable. Calabaza de paredes gruesas con boca ancha y virola de acero, diseñado para cebadas constantes y un agarre firme.", 
    price: 21500, 
    image: "https://imgs.search.brave.com/uS1VhHB0TNs2c-Kq6sbMXN-CHDrBGba7RkdN4ITuCV8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kY2Ru/LXVzLm1pdGllbmRh/bnViZS5jb20vc3Rv/cmVzLzAwMy81MTAv/MDc1L3Byb2R1Y3Rz/L2ltZ183NTY2LTNk/MmM4MGJmOWRkOWI4/ZTIzODE3MDUwMTAy/MjczODIxLTI0MC0w/LndlYnA" 
  },
  { 
    id:4,
    title: "Mate", category: "mates", 
    description: "Mate de Calabaza Torpedo: Elegancia y tradición. Su forma estilizada y compacta permite mantener la temperatura del agua por más tiempo. Forrado en cuero de primera calidad.", 
    price: 25000, 
    image: "https://imgs.search.brave.com/6Eb-yGbgF0mYaHYXjt8lMlbnBA0KK9jG44jTtpXodRY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hY2Ru/LXVzLm1pdGllbmRh/bnViZS5jb20vc3Rv/cmVzLzAwMi81Njcv/MjIyL3Byb2R1Y3Rz/L2ltZ18xMDIwLWY4/ZTBiN2VjNjJhODY2/Y2E3ZjE3NjIzNDM1/NzY3MDY1LTQ4MC0w/LndlYnA" 
  },
  { 
    id:5,
    title: "Mate", category: "mates", 
    description: "Mate Imperial: La pieza premium por excelencia. Calabaza seleccionada, forrado en cuero vacuno y terminado con una virola de alpaca cincelada a mano. Una verdadera obra de arte.", 
    price: 35000, 
    image: "https://imgs.search.brave.com/sJi2V9pDBgoI3CJVf0BsJsPW8HCMRd0VAY96Oxe8Av0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hY2Ru/LXVzLm1pdGllbmRh/bnViZS5jb20vc3Rv/cmVzLzAwNS82NzYv/MDMzL3Byb2R1Y3Rz/L2ltcGVyaWFsLXBl/cXVlbm8tZjdjOTQw/ZmU4ZWU4NDAwNzNi/MTczNzIxOTYwNzI5/MjQtMjQwLTAuanBl/Zw" 
  },
  { 
    id:6,
    title: "Yerba Canarias",category: "yerbas", 
    description: "Yerba Canarias: La preferida de los amantes del mate fuerte. Composición equilibrada sin palo, con un sabor potente y un amargor que se mantiene desde la primera hasta la última cebada.", 
    price: 10500, 
    image: "https://imgs.search.brave.com/y_BV_uQKLHQk3HdwxD6ozZee55qzIXRCz_CjLp-eMYA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ncnVw/b21hdGVyb2pvLmNv/bS5hci93cC1jb250/ZW50L3VwbG9hZHMv/Q0FOQVJJQVMtMWtn/LnBuZw" 
  },
  { 
    id:7,
    title: "Yerba Playadito",category: "yerbas", 
    description: "Yerba Playadito: Sabor suave y tradicional de Corrientes. Con un estacionamiento natural, es la opción perfecta para quienes buscan un mate amable y fácil de tomar durante todo el día.", 
    price: 7000, 
    image: "https://imgs.search.brave.com/EYOfYknNMgIkrcuF8cX9jwVerj487wAD4CVtorYQxag/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg5NTYxOS1NTEE4/OTA4OTI4NDI4MV8w/NzIwMjUtVi53ZWJw" 
  },
  { 
    id:8,
    title: "Yerba Rosamonte",category: "yerbas", 
    description: "Yerba Rosamonte: Un clásico argentino con carácter. De sabor intenso y notas ahumadas gracias a su estacionamiento prolongado, ideal para paladares exigentes.", 
    price: 7500, 
    image: "https://imgs.search.brave.com/v3LUDoIoyJKc1xseyhxCaWhPRIf2pt1ZIgm012sovYY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg4ODUzOS1NTEE3/NjY4NDE3MjMzOF8w/NjIwMjQtVi53ZWJw" 
  },
  { 
    id:9,
    title: "Yerba baldo",category: "yerbas", 
    description: "Yerba Baldo: De origen brasileño pero con estándar uruguayo. De molienda fina (tipo P.U.1), ofrece un sabor intenso y duradero, ideal para mates largos..", 
    price: 11500, 
    image: "https://dcdn-us.mitiendanube.com/stores/003/785/409/products/img_9646-555cdc320e74ba0b2e17157276494120-1024-1024.webp" 
  },
  { 
    id:10,
    title: "Bombilla de Acero", category: "bombillas", 
    description: "Bombilla de Acero: Higiénica y eterna. Fabricada en acero inoxidable de grado alimenticio, no altera el sabor, es fácil de limpiar y no se oxida jamás.", 
    price: 8000, 
    image: "https://apolomates.com.ar/wp-content/uploads/2016/08/Pico-de-loro-acero-1.jpg"
  },
  { 
    id:11,
    title: "Termo", category: "termos", 
    description: "Termo Stanley (Classic): El estándar de oro a nivel mundial. Fabricado con acero inoxidable 18/8 de doble pared con aislamiento al vacío, garantiza mantener el agua caliente por más de 24 horas. Es ultra resistente a golpes, libre de BPA y cuenta con el icónico tapón cebador para una precisión total en cada mate. Un compañero para toda la vida.", 
    price: 146000, 
    image: "https://stanleypm.vtexassets.com/arquivos/ids/161627-300-300?v=639096064169430000&width=300&height=300&aspect=true"
  },
  { 
    id:12,
    title: "Termo", category: "termos",
    description: "Termo Genérico: La opción ideal para el uso diario y práctico. Construido en acero inoxidable de buena calidad con cámara de aire, mantiene la temperatura por varias horas. Es liviano, resistente y cuenta con un sistema de apertura por botón (One Touch) que facilita el servicio. Excelente relación precio-calidad.", 
    price: 68000, 
    image: "https://imgs.search.brave.com/7t8d1OY9A6DyftpdeB41-J9BYcMcuhnvfAsB88LrvQM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM0/NjAyNTIyMS9lcy9m/b3RvL3Rlcm1vLXkt/dGF6YS1jb24tYmVi/aWRhLWNhbGllbnRl/LWRlLXBpZS1zb2Jy/ZS1tZXNhLWRlLW1h/ZGVyYS1tb2phZGEt/ZGVzcHUlQzMlQTlz/LWRlLWxhLWxsdXZp/YS1hbC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9Qldoc3JB/QXFfWUpoZ0lXNUgy/RFZCREZZMEtuUkpO/UlpVUTVXMWE2cExK/OD0"
  },
  { 
    id:13,
    title: "Bombilla de Alpaca",category: "bombillas", 
    description: "Bombilla de Alpaca: Tradición y calidad superior. Su material disipa mejor el calor, evitando quemaduras, y cuenta con un acabado artesanal elegante y distintivo.", 
    price: 15000, 
    image: "https://imgs.search.brave.com/_kimNTcBIdPqNDPU-qcJDWMrHeDgqaGorQ4Zs37KRtU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9lbGJv/eWVyby5jb20vMzM5/MDktaG9tZV9kZWZh/dWx0L2JvbWJpbGxh/LWRlLWFscGFjYS1k/aXNlbm8tbWFyZ2Fy/aXRhLWVsLWJveWVy/by5qcGc"
  },
   { 
    id:14,
    title: "Matera de Cuero", category: "bolsos",
    description: "Materas de Cuero: Prácticas y resistentes. Fabricadas en cuero legítimo, diseñadas para transportar tu kit matero con seguridad y estilo a cualquier lugar.", 
    price: 12000, 
    image: "https://imgs.search.brave.com/dsM3wTva07B0C6TA26nc0QlEAEYtp7lsQe9reVyOvNA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hY2Ru/LXVzLm1pdGllbmRh/bnViZS5jb20vc3Rv/cmVzLzAwMS81MzIv/OTMzL3Byb2R1Y3Rz/L2ltZ182NDk0MS00/ZTc1NWNjZDZlYzg3/NTQ1MjYxNjE1NTAz/NzA1OTc1OS0yNDAt/MC53ZWJw"
  },
   { 
    id:15,
    title: "Matera Uruguaya", category: "bolsos",
    description: "Materas de Cuero tipo Uruguayas:Diseño minimalista y robusto con separadores internos, ideal para cargar el termo, el mate y el termo con la máxima comodidad.", 
    price: 14000, 
    image: "https://imgs.search.brave.com/jN68ZKA4LvR74a5o1CTERSvzofkXuvT_RWKH_TOJato/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzYxMTg2MS1NTEE3/OTExMzA3NTI4MF8w/OTIwMjQtRS53ZWJw"
  },
 
]

app.get("/", (req, res) => {
    res.render("pages/index", { user, products: [] });
});

app.get("/category/:categoriaId", (req,res) => {
  const categoriaElegida = req.params.categoriaId;
  const productosFiltrados = products.filter(p => p.category  === categoriaElegida);
  res.render("pages/index", { user, products: productosFiltrados });
})

app.get("/products/:id", (req, res) => {
    const idSeleccionado = parseInt(req.params.id); 
    const productoEncontrado = products.find( p => p.id === idSeleccionado );

    if (productoEncontrado) {
        res.render("pages/products", { products: productoEncontrado });
    } else {
        res.status(404).send("Producto no encontrado");
    }
});


app.get("/agregar-al-carrito/:id", (req, res) => {
    const idProducto = parseInt(req.params.id); 
    const productoElegido = products.find(p => p.id === idProducto);
    
    if (productoElegido) {
        const productoEnCarrito = cart.find(p => p.id === idProducto);
        if (productoEnCarrito) {
            productoEnCarrito.quantity += 1;
        } else {
            cart.push({ ...productoElegido, quantity: 1 });
        }
    }
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

app.get("/checkout", (req, res)=> {res.render ("pages/checkout", {products, user})})
app.get("/register", (req, res)=> {res.render ("pages/register", {products, user})})
app.get("/login", (req, res)=> {res.render ("pages/login", {products,user })})

app.post("/register", (req, res) => { res.redirect("/"); });
app.post("/login", (req, res) => { res.redirect("/"); });

app.listen(port, ()=> console.log("Servidor abierto"));