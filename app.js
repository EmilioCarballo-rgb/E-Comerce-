const express = require ('express');
const app = express();
const port = 3000;

app.set ("view engine", "ejs");

const user = {
    firstName: 'E-Comerce',
    secondName: 'De La Banda',
    isAdmin: true,
    
};

const products = [
	
  { 
    id:1,
    title: "Mate", 
    description: "Mate Imperial de Madera", 
    price: "$15000", 
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRP1O25vTC92joON5LaHxuUuhXnVoL1VerBaO7Cb7J1Pf25_wInn3fbBqw02Bu_1-VRnudDjOUnM4eRJipnE-aj1YU2ZXOjjTlIr9sMM3uW9fQSVBMg8YiqSU0g1Nx0eoDSC1mDBg&usqp=CAc" 
  },
  { 
    id:2,
    title: "Yerba baldo", 
    description: "Baldo.", 
    price: "$12500", 
    image: "https://dcdn-us.mitiendanube.com/stores/003/785/409/products/img_9646-555cdc320e74ba0b2e17157276494120-1024-1024.webp" 
  },
  { 
    id:3,
    title: "Bombilla", 
    description: "Pico Loro.", 
    price: "$8000", 
    image: "https://apolomates.com.ar/wp-content/uploads/2016/08/Pico-de-loro-acero-1.jpg"
  },

  { 
    id:4,
    title: "Termo", 
    description: "Stanley.", 
    price: "$146.000", 
    image: "https://stanleypm.vtexassets.com/arquivos/ids/161627-300-300?v=639096064169430000&width=300&height=300&aspect=true"
  },


  { 
    id:5,
    title: "Bombilla", 
    description: "Pico Loro.", 
    price: "$8000", 
    image: "https://apolomates.com.ar/wp-content/uploads/2016/08/Pico-de-loro-acero-1.jpg"
  },


  { 
    id:6,
    title: "Bombilla", 
    description: "Pico Loro.", 
    price: "$8000", 
    image: "https://apolomates.com.ar/wp-content/uploads/2016/08/Pico-de-loro-acero-1.jpg"
  },

  { 
    id:7,
    title: "Bombilla", 
    description: "Pico Loro.", 
    price: "$8000", 
    image: "https://apolomates.com.ar/wp-content/uploads/2016/08/Pico-de-loro-acero-1.jpg"
  }



]


app.get("/", (req, res )=> {res.render("pages/index", {user, products})});

app.get("/products/:id", (req, res) => {

    const idSeleccionado = parseInt(req.params.id); 

    
    const productoEncontrado = products.find( p => p.id === idSeleccionado );

    if (productoEncontrado) {
        res.render("pages/products", { products: productoEncontrado });
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

app.get("/cart", (req, res)=> {res.render ("pages/cart", {products, user})})
app.get("/checkout", (req, res)=> {res.render ("pages/checkout", {products, user})})
app.get("/register", (req, res)=> {res.render ("pages/register", {products, user})})
app.get("/login", (req, res)=> {res.render ("pages/login", {products,user })})

app.post("/register", (req, res) => {
  res.redirect("/");
});
app.post("/login", (req, res) => { 
  res.redirect("/");
});

app.listen(port, ()=> console.log("Servidor abierto"));




