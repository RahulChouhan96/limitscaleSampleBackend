require("./db.connection");

let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");

const CONFIG = require("./config");

let app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-access-token, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

let User = mongoose.model("User");

app.post("/sample/addCustomer", (req, res, next) => {
    let body = req.body;
    let newUser = new User(body);
    newUser
        .save((error, response) => {
            if (error) {
                console.log("Error while saving user data");
                res
                    .status(404)
                    .send({
                        auth: false,
                        message: "Error while saving user data",
                        error: error
                    });
            } else {
                console.log("User added successfully");
                res
                    .status(200)
                    .send({
                        auth: true,
                        message: "User added successfully",
                        response: response
                    });
            }
        });
});

app.get("/sample/getAllUsers", (req, res, next) => {
    User
        .find({})
        .exec((error, response) => {
            if (error) {
                console.log("Error while searching user data");
                res
                    .status(404)
                    .send({
                        auth: false,
                        message: "Error while searching user data",
                        error: error
                    });
            } else {
                console.log("User searching successfully");
                res
                    .status(200)
                    .send({
                        auth: true,
                        message: "User searching successfully",
                        response: response
                    });
            }
        });
});

app.post("/sample/getOneUser", (req, res, next) => {
    let body = req.body;
    User
        .findOne({ _id: body._id })
        .exec((error, response) => {
            if (error) {
                console.log("Error while searching user data");
                res
                    .status(404)
                    .send({
                        auth: false,
                        message: "Error while searching user data",
                        error: error
                    });
            } else {
                console.log("User searching successfully");
                res
                    .status(200)
                    .send({
                        auth: true,
                        message: "User searching successfully",
                        response: response
                    });
            }
        });
});

app.post("/sample/edit", (req, res, next) => {
    let body = req.body;
    console.log(body);
    let userUpdate = {$set: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        productName: body.productName,
        address: body.address,
        cal: body.cal,
        expiry: body.expiry
    }};
    User
        .findByIdAndUpdate(body._id, { userUpdate })
        .exec((error, response) => {
            if (error) {
                console.log("Error while updating user data");
                res
                    .status(404)
                    .send({
                        auth: false,
                        message: "Error while updating user data",
                        error: error
                    });
            } else {
                console.log(response);
                console.log("User data updated successfully");
                res
                    .status(200)
                    .send({
                        auth: true,
                        message: "User data updated successfully",
                        response: response
                    });
            }
        });
});

app.listen(CONFIG.PORT, CONFIG.HOST, (error, response) => {
    if (error) {
        console.log("Error occurred while loading the server at port", CONFIG.PORT, error);
    } else {
        console.log("Server is running successfully at port", CONFIG.PORT);
    }
});