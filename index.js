const express = require("express");
const dotenv = require('dotenv').config({ path: require('find-config')('.env') });
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 8080;


// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
app.use(cors());

// express
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static('./view/dist'));

// root router
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});
