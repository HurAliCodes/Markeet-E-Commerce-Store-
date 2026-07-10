import express from "express";
import { allCategories, allSubCategories, subCategoriesByCategory } from "../controllers/metaController.js";

const metaRouter = express.Router();

metaRouter.get("/categories", allCategories);
metaRouter.get("/sub-categories", allSubCategories);
metaRouter.get("/sub-categories/:category", subCategoriesByCategory);

export default metaRouter;