import PDFDocument = require("pdfkit");
import fs from "fs";

const generatePDF = (employee: any) => {
  return new Promise<string>((resolve, reject) => {
    const filePath = `pdfs/${employee.employeeId}-${employee.month}-${employee.year}.pdf`

    const doc = new PDFDocument();
doc.pipe(fs.createWriteStream("test.pdf"));
doc.text("Hello World");
doc.end();

})}   

export default generatePDF;