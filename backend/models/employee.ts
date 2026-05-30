import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeId : {
        type : String,
        required : true,
        unique : true
    },
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    designation : {
        type : String,
        required : true
    },
    baseSalary:{
        type: Number,
        required : true
    },
    hra : {
        type : Number,
        required : true
    },
    allowences : {
        type : Number,
        required : true
    },
    deduction : {
        type : Number,
        required : true
    },
    months : {
        type : Number,
        required : true
    }
}, {timestamps : true});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;