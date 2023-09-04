// Express
import { Router } from "express";
// Controllers
import {
  deleteTimezone,
  getTimezoneDetail,
  getTimezoneList,
  setTimezone,
} from "../../controllers";

const router = Router();

router.get("/api/timezones", getTimezoneList);
router.get("/api/timezones/:name(*)", getTimezoneDetail);
router.put("/api/timezones/:name(*)", setTimezone);
router.delete("/api/timezones/:name(*)", deleteTimezone);

export default router;
