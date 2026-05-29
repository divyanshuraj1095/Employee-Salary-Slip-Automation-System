import PDFDocument from "pdfkit";
import fs, { createWriteStream } from "fs";

const generatePDF = (employee:any)=>{
    const doc = new PDFDocument();
    const filePath = `pdfs/${employee.name}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(20).text("Salary Slip",{
        align : "center"
    });

    doc.moveDown();
    doc.fontSize(14).text(`Employee Name : ${employee.name}`);
    doc.text(`Employee ID: ${employee.employeeId}`);
    doc.text(`Designation: ${employee.designation}`);

    doc.moveDown();

    doc.text(`Base Salary: Rs${employee.baseSalary}`);
    doc.text(`HRA: Rs${employee.hra}`);
    doc.text(`Allowence: Rs${employee.allowences}`);
    doc.text(`Deduction: Rs${employee.deduction}`);

    const netSalary = employee.baseSalary +
                      employee.hra +
                      employee.allowances -
                      employee.deductions;
    
    doc.moveDown();
    
    doc.fontSize(16).text(`Net Salary: Rs${netSalary}`);

    doc.end;

    return filePath;   
};

export default generatePDF;