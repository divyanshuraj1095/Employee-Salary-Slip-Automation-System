import mongoose from "mongoose";
// import jwt from "jsonwebtoken"

const adminSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    } 
}, {timestamps : true});

// adminSchema.methods.getJWT = async function() {
//     const user = this;

//     const token = await jwt.sign({_id : user._id}, "DEV@Tinder123", {expiresIn : "7d"});

//     return token;
// }

// adminSchema.methods.bcryptCompare = async function(passwordByUser){
//     const user = this;

//     const hashPass = user.password;

//     const valid = await bcrypt.compare(passwordByUser, hashPass);
//     return valid;
// }

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;