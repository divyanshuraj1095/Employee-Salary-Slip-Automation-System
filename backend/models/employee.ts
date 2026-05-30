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
    allowances : {
        type : Number,
        required : true
    },
    deductions : {
        type : Number,
        required : true
    },
    month : {
        type : String,
        required : true
    },
    year : {
        type : Number,
        required : true
    }
}, {timestamps : true});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;