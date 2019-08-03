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

app.post("/sample/getAllUsers", (req, res, next) => {
    let num = req.body.num;
    User
        .find({})
        .skip((num - 1) * 5)
        .limit(5)
        .exec((error, response) => {
            if (error) {
                console.log("Error while searching user data");
                console.log(error);
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

app.get("/sample/count", (req, res, next) => {
    User
        .count({})
        .exec((error, response) => {
            if (error) {
                console.log("Error while searching user count");
                res
                    .status(404)
                    .send({
                        auth: false,
                        message: "Error while searching user data",
                        error: error
                    });
            } else {
                console.log("User searching successfully", response);
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

app.post("/sample/deleteOneUser", (req, res, next) => {
    let body = req.body;
    User
        .deleteOne({ _id: body._id })
        .exec((error, response) => {
            if (error) {
                console.log("Error while deleting user data");
                res
                    .status(404)
                    .send({
                        auth: false,
                        message: "Error while deleting user data",
                        error: error
                    });
            } else {
                console.log("User deleted successfully");
                res
                    .status(200)
                    .send({
                        auth: true,
                        message: "User deleted successfully",
                        response: response
                    });
            }
        });
});

app.post("/sample/edit", (req, res, next) => {
    let body = req.body;
    console.log(body._id);
    User
        .findByIdAndUpdate(body._id, {
            $set: {
                "firstName": body.firstName,
                "lastName": body.lastName,
                "email": body.email,
                "phone": body.phone,
                "productName": body.productName,
                "address": body.address,
                "cal": body.cal,
                "expiry": body.expiry
            }
        }, (error, response) => {
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

app.post("/sample/search", (req, res, next) => {
    let body = req.body;
    console.log(body);
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
                let result = [];
                // console.log(response.length);
                response.forEach(element => {
                    let obj = {
                        fields: [],
                        detail: {}
                    };
                    console.log(element.cal.includes(body.key));

                    let index = 0;
                    if (element.firstName.includes(body.key)) {
                        obj.fields.push(element.firstName);
                        index++;
                        console.log(index);
                    }
                    if (element.lastName.includes(body.key)) {
                        obj.fields.push(element.lastName);
                        index++;
                    }
                    if (element.email.includes(body.key)) {
                        obj.fields.push(element.email);
                        index++;
                    }
                    if (element.phone.includes(body.key)) {
                        obj.fields.push(element.phone);
                        index++;
                    }
                    if (element.productName.includes(body.key)) {
                        obj.fields.push(element.productName);
                        index++;
                    }
                    if (element.address.includes(body.key)) {
                        obj.fields.push(element.address);
                        index++;
                    }
                    if (element.cal.includes(body.key)) {
                        obj.fields.push(element.cal);
                        index++;
                    }
                    if (element.expiry.includes(body.key)) {
                        obj.fields.push(element.expiry);
                        index++;
                    }
                    if (index > 0) {
                        obj.detail = element;
                        result.push(obj);
                    }
                    console.log("index is: ", index);
                });
                console.log("length is: ", result.length);
                res
                    .status(200)
                    .send({
                        auth: true,
                        message: "Query searched successfully",
                        response: result
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