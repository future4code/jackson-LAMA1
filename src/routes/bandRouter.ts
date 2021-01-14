import express from "express";
import { bandController } from "../controller/BandController";

export const bandRouter = express.Router();

bandRouter.put("/create", bandController.createBand);