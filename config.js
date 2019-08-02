const port = "2000";
const host = "127.0.0.1";

const dbUrl = "mongodb://Rahul:password1@ds359077.mlab.com:59077/sample";
const dbUsr = "Rahul";
const dbPwd = "password1";
const authSource = "sample";

const scrtKey = "sample";

module.exports = {
    PORT: port,
    HOST: host,
    DBURL: dbUrl,
    DBUSR: dbUsr,
    DBPWD: dbPwd,
    authSource: authSource,
    SCRTKEY: scrtKey
};