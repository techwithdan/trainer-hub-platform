import { Router } from "express";
import {
  getTrainerByIdController,
  createTrainerController,
} from "../../controllers/trainer";
const trainer_router = Router();

trainer_router.get("/:trainer_id", getTrainerByIdController);

trainer_router.post("/", createTrainerController);

export { trainer_router };
