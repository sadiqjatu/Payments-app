const { JWT_KEY } = require("./config.js");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(411).json({
            message: "Token does not exist"
        });
    }

    const token = authHeader.split("Bearer ")[1];

    try{
        const decoded = jwt.verify(token, JWT_KEY);
        if(decoded){
            req.userId = decoded.userId;
            next();
        }else{
            return res.status(403).json({
                message: "User not verified"
            });
        }
        
    }catch(err){
        return res.status(403).json({});
    }
};

module.exports = {authMiddleware};