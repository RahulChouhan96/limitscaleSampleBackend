const mongoose = require("mongoose");

let CONFIG = require("./config");

require("./user.model");

let options = {
    user: CONFIG.DBURL,
    pass: CONFIG.DBPWD,
    authSource: CONFIG.authSource,
    useNewUrlParser: true
};

let _conn = mongoose.connection;

_conn.on("error", (error)=>{
    console.log("Connection with MongoDB Failed");
    console.log(error);
});

_conn.once("open", () => {
    console.log("Connection with MongoDB Successful");
});

mongoose.connect(CONFIG.DBURL, options);