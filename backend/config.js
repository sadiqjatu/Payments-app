require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;
module.exports = {JWT_KEY};