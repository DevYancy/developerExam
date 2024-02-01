require("dotenv").config();

const CONFIG = {}

CONFIG.PORT = process.env.PORT;
CONFIG.DB_URI = process.env.DB_URI;
CONFIG.COLLECTION = process.env.COLLECTION;

module.exports = CONFIG;