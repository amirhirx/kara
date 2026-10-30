import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  archiveProject,
  unArchiveProject,
  getProjectMembers,
  inviteMember,
  removeMember,
  leaveProject,
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
router.get("/:id/members", getProjectMembers);
router.post("/:id/members", inviteMember);
router.delete("/:id/members/:userId", removeMember);
router.post("/:id/leave", leaveProject);

export default router;
