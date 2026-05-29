import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "uploads/");
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now()+ "-"+file.originalname);
    }
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {

  const allowedExtensions = [".csv", ".xlsx", ".xls"];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV and Excel files are allowed"));
  }
};

const upload = multer({storage, fileFilter});
export default upload