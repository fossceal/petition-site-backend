const userRouter = require('express').Router();

const { loginUser, logoutUser, registerUser, getCurrentlyLoggedInUser } = require("../controllers/user_controller");
const { isAuthenticatedUser } = require('../middleware/auth');

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", logoutUser);

userRouter.get("/me", isAuthenticatedUser, getCurrentlyLoggedInUser);

module.exports = userRouter;