import PDFDocument = require("pdfkit");
import fs from "fs";
import path from "path";

interface EmployeeRecord {
  employeeId: string;
  name: string;
  email: string;
  designation: string;
  baseSalary: number;
  hra: number;
  allowances: number;
  deductions: number;
  month: string;
  year: number;
}

const generatePDF = (employee: EmployeeRecord) => {
  return new Promise<string>((resolve, reject) => {
    const pdfsDir = path.join(process.cwd(), "pdfs");
    if (!fs.existsSync(pdfsDir)) {
      fs.mkdirSync(pdfsDir, { recursive: true });
    }

    const filePath = path.join(
      pdfsDir,
      `${employee.employeeId}-${employee.month}-${employee.year}.pdf`,
    );

    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
    doc.on("error", reject);

    doc.pipe(stream);

    const netSalary =
      employee.baseSalary +
      employee.hra +
      employee.allowances -
      employee.deductions;

    doc.fontSize(20).text("Salary Slip", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Pay Period: ${employee.month} ${employee.year}`, {
      align: "center",
    });
    doc.moveDown();
    doc.fontSize(14).text(`Employee Name: ${employee.name}`);
    doc.text(`Employee ID: ${employee.employeeId}`);
    doc.text(`Email: ${employee.email}`);
    doc.text(`Designation: ${employee.designation}`);
    doc.moveDown();
    doc.text(`Base Salary: Rs ${employee.baseSalary.toLocaleString()}`);
    doc.text(`HRA: Rs ${employee.hra.toLocaleString()}`);
    doc.text(`Allowances: Rs ${employee.allowances.toLocaleString()}`);
    doc.text(`Deductions: Rs ${employee.deductions.toLocaleString()}`);
    doc.moveDown();
    doc.fontSize(16).text(`Net Salary: Rs ${netSalary.toLocaleString()}`, {
      underline: true,
    });

    doc.end();
  });
};

export default generatePDF;
