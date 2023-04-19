const {getAllUsers, register, login, deleteUser , verified} = require('../controller/user_controller');
const {authenticateTokenAdmin} = require("../middleware/jwt_authenticate")

exports.create_user_routes = (app) =>{
  app.get("/", authenticateTokenAdmin ,getAllUsers);
  app.post("/register" ,register);
  app.post("/login",login);
  app.delete("/user/:id", authenticateTokenAdmin ,deleteUser)
  app.get('/verify/:token', verified)
}
