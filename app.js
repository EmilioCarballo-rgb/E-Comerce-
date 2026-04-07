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
	{ title: "Mate", description: "De porongo." },
	{ title: "Yerba baldo", description: "Segun el gordo esta barata." },
	{ title: "Bombilla", description: "De cuero encurtido." },
]

app.get("/", (req, res )=> {res.render("pages/index", {user, products})});
app.get("/products", (req, res)=> {res.render ("pages/products", {products})})
app.get("/cart", (req, res)=> {res.render ("pages/cart", {products})})
app.get("/checkout", (req, res)=> {res.render ("pages/checkout", {products})})
app.get("/register", (req, res)=> {res.render ("pages/register", {products})})
app.get("/login", (req, res)=> {res.render ("pages/login", {products})})



app.listen(port, ()=> console.log("Server abierto como el culo del flaco"));
