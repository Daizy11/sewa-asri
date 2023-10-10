const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router();

userRouter
  .route("/user")
  .get(userController.getAllUser)
  .post(userController.Register);

userRouter.post("/login", userController.login);
userRouter.get("/logout", userController.logout);


userRouter
  .route("/:email")
  .get(userController.getOneUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
