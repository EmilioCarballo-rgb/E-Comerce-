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
    title: "Mate", 
    description: "Mate Imperial de Madera", 
    price: "$15000", 
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRP1O25vTC92joON5LaHxuUuhXnVoL1VerBaO7Cb7J1Pf25_wInn3fbBqw02Bu_1-VRnudDjOUnM4eRJipnE-aj1YU2ZXOjjTlIr9sMM3uW9fQSVBMg8YiqSU0g1Nx0eoDSC1mDBg&usqp=CAc" 
  },
  { 
    title: "Yerba baldo", 
    description: "Baldo.", 
    price: "$12500", 
    image: "https://dcdn-us.mitiendanube.com/stores/003/785/409/products/img_9646-555cdc320e74ba0b2e17157276494120-1024-1024.webp" 
  },
  { 
    title: "Bombilla", 
    description: "Pico Loro.", 
    price: "$8000", 
    image: "https://apolomates.com.ar/wp-content/uploads/2016/08/Pico-de-loro-acero-1.jpg"
  }

]

let cart = [
    { 
        id: 1, 
        title: "Mate", 
        price: 15.000, 
        quantity: 1, 
        image: "https://url-imagen-1.jpg" 
    },
    { 
        id: 2, 
        title: "Yerba Balbo", 
        price: 12.500, 
        quantity: 1, 
        image: "https://url-imagen-2.jpg" 
    }, 
    { 
        id: 3, 
        title: "Bombilla", 
        price: 8.000, 
        quantity: 1, 
        image: "https://url-imagen-3.jpg" 
    }
];


app.get("/", (req, res )=> {res.render("pages/index", {user, products})});
app.get("/products", (req, res)=> {res.render ("pages/products", {products,user})})
app.get("/cart", (req, res)=> {res.render ("pages/cart", {cart, user})})
app.get("/checkout", (req, res)=> {res.render ("pages/checkout", {products, user})})
app.get("/register", (req, res)=> {res.render ("pages/register", {products, user})})
app.get("/login", (req, res)=> {res.render ("pages/login", {products,user })})

app.listen(port, ()=> console.log("Server abierto como el culo del flaco"));




