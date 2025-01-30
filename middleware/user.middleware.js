import jwt from 'jsonwebtoken';
import config from '../config.js';
function userMiddleware(req,res,next){
const authHeader=req.headers.authorization;

if(!authHeader ||   !authHeader.startsWith("Bearer")){
    return res.status(401).json({errors:"no token provided"});
}
const token=authHeader.split(" ")[1];
try{
    const decode=jwt.verify(token,config.JWT_USER_PASSWORD)
    req.userId=decode.userId
    next();
}catch(error){
    return res.status(401).json({errors:"Invalid token or expired"})
}
};
export default userMiddleware;