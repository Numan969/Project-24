import express from "express";
import multer from "multer";
import { verifyToken } from "../utitls/verifyToken.js";
import { verifyUserRole } from "../controllers/verifyuserController.js";
import {
  addAttandance,
  allAttandance,
  singleAttandance,
  exportAttandance,
  updateAttandance,
  selectAttendanceUsers,
} from "../controllers/attendanceController.js";
// Multer Middleware
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, "../uploads"); 
  // },
  destination: (req, file, cb) => {
    // cb(null, "../uploads"); 
    cb(null, path.join(__dirname, '../uploads')); // Save to the correct uploads directory

  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.post("/", upload.single("file_upload"), addAttandance);
router.get("/export", verifyToken, verifyUserRole(["attendance-manager", "director", "admin"]), exportAttandance);
router.get("/:id", verifyToken, verifyUserRole(["attendance-manager", "director", "admin"]), singleAttandance);
router.get("/", verifyToken, verifyUserRole(["attendance-manager", "director", "admin"]), allAttandance);
router.put("/:id",verifyToken, verifyUserRole(["attendance-manager", "director", "admin"]),  updateAttandance);
router.get("/selectAttendanceUsers", verifyToken, verifyUserRole(["attendance-manager", "director", "admin"]), selectAttendanceUsers);

export default router;
