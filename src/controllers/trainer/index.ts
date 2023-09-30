import { Request, Response } from "express";
import { Trainer } from "src/types/trainer/trainer";
import { getTrainerById, createNewTrainer } from "../../services/trainer";
import { GlobalError } from "src/types/global";

export function getTrainerByIdController(req: Request, res: Response): void {
  const { trainer_id } = req.params;
  const trainer: Trainer = getTrainerById(trainer_id);
  res.status(200).json(trainer);
}

export async function createTrainerController(
  req: Request,
  res: Response
): Promise<void> {
  const { age, name, birthday, email, password } = req.body as {
    age: number;
    name: string;
    birthday: string;
    email: string;
    password: string;
  };
  try {
    const trainer: Trainer = await createNewTrainer({
      age,
      name,
      birthday,
      email,
      password,
    });
    res.status(200).json(trainer);
    return;
  } catch (error: any) {
    const { code = 500, message = "" } = error as GlobalError;
    res.status(code).send(message);
    return;
  }
}
