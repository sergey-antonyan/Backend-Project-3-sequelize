const {getAllUsers, register, login, deleteUser , verified} = require('../controller/user_controller');
const {authenticateTokenAdmin} = require("../middleware/jwt_authenticate")

exports.create_user_routes = (app) =>{
  app.get("/users", getAllUsers);
  app.post("/register" ,register);
  app.post("/login",login);
  app.delete("/user/:id", deleteUser)
  app.get('/verify/:token', verified)
}
