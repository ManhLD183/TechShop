import express from "express";
import {
  getAllCountries,
  createCountry,
  addCityToCountry,
} from "../controllers/country";
const router = express.Router();

router.get("/countries", getAllCountries);
router.post("/countries", createCountry);
router.post("/countries/:countryId/cities", addCityToCountry);

export default router;