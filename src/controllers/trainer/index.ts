import { Request, Response } from "express";
import { Trainer } from "src/types/trainer/trainer";
import { getTrainerById, createNewTrainer } from "../../services/trainer";

export function getTrainerByIdController(req: Request, res: Response): void {
  const { trainer_id } = req.params;
  const trainer: Trainer = getTrainerById(trainer_id);
  res.status(200).json(trainer);
}

export function createTrainerController(req: Request, res: Response): void {
  const { age, name, birthday } = req.body as {
    age: number;
    name: string;
    birthday: string;
  };
  const trainer: Trainer = createNewTrainer({ age, name, birthday });
  res.status(200).json(trainer);
}
