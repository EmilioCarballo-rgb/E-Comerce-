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

app.listen(port, ()=> console.log("Server abierto como el culo del flaco"));
