const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
require("./db/conn");
const User = require("./models/usermessage");
const Razorpay = require("razorpay");

const app = express();
const port = process.env.PORT || 3000;


const razorpay = new Razorpay({
    key_id: 'rzp_test_601C3xKZcVb8MS',
    key_secret: 'YnIGzu2AQEIgJwudZufIpr18',
})

//setting the path
const staticpath = path.join(__dirname, "../public");

//middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(express.static(staticpath))
app.set("view engine", "ejs");
app.set("views", "views");

// routing
// app.get(path,callback)
app.get("/",(req,res) => {
    res.render("index");
})

app.post("/contact", async(req,res) => {
    try{
        //res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch(error){
        res.status(500).send(error);
    }
})

// server create
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})