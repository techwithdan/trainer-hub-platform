import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/config";
import { pokemon_router } from "./routes/pokemon/index";
import { trainer_router } from "./routes/trainer";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_: Request, res: Response) => {
  res.send("API is working");
});

app.use("/api/pokemon", pokemon_router);

app.use("/api/trainer", trainer_router);

const port = process.env.PORT || "8000";

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
