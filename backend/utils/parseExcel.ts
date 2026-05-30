import xlsx from "xlsx";

const parseExcel = (filepath : string)=>{
    const workbook = xlsx.readFile(filepath);
    const sheetname = workbook.SheetNames[0];
    const sheetdata = workbook.Sheets[sheetname];
    const data = xlsx.utils.sheet_to_json(sheetdata);

    return data;
}

export default parseExcel;


