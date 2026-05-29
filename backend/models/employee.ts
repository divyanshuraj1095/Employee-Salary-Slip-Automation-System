import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeId : {
        type : Number
    },
    name :{
        type : String
    },
    email : {
        type : String
    },
    designation : {
        type : String
    },
    baseSalary:{
        type: Number
    },
    hra : {
        type : Number
    },
    allowences : {
        type : Number
    },
    deduction : {
        type : Number
    },
    months : {
        type : Number
    }
}, {timestamps : true});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;