import { TableSessionsController } from "@/controllers/table-session-controller";
import { Router } from "express";

const tablesSessionsRoutes = Router();
const tableSessionsController = new TableSessionsController();

tablesSessionsRoutes.post("/", tableSessionsController.create);
tablesSessionsRoutes.get("/", tableSessionsController.index);
tablesSessionsRoutes.patch("/:id", tableSessionsController.update);

export { tablesSessionsRoutes }