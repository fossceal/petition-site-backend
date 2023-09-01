const adminRouter = require('express').Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const { createAdmin, createFaculties, deleteUser, listUsers, updateUser } = require("../controllers/admin_controller");

// adminRouter.post("/create-admin", isAuthenticatedUser, authorizeRoles('admin'), createAdmin);

adminRouter.post("/create-admin", createAdmin);

adminRouter.post("/create-faculties", isAuthenticatedUser, authorizeRoles("admin"), createFaculties);

adminRouter.get("/list-users", isAuthenticatedUser, authorizeRoles("admin"), listUsers);

adminRouter.put("/update-user/:id", isAuthenticatedUser, authorizeRoles("admin"), updateUser);

adminRouter.delete("/delete-user/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = adminRouter;