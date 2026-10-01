import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  archiveProject,
  unArchiveProject,
} from "../controllers/projectController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProjectById);
router.delete("/:id", deleteProjectById);
router.put("/:id/archive", archiveProject);
router.put("/:id/unarchive", unArchiveProject);

export default router;
