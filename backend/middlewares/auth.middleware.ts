import Admin from "../models/admin";
import jwt from "jsonwebtoken";
import  { JwtPayload } from "jsonwebtoken";

const authUser = async (req, res, next) =>{
    try{
       const {token} = req.cookies;
       if(!token){
        throw new Error("Invalid tokennnn!!");
       }
       const decoded = jwt.verify(
       token,
       process.env.JWT_SECRET as string
       ) as JwtPayload;

       const {_id} = decoded;
       const user = await Admin.findById(_id);
       if(!user){
        throw new Error("User doesnt exist");
       }
       req.user = user;
       next();

    }
    catch(err:any){
        res.status(400).send("ERROR: "+err.message);
    }
};

export default authUser;