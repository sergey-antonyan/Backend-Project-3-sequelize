const { getCategories, getCategoryById ,addCategory,deleteCategory , updateCategory}= require('../controller/category_controller');
const {authenticateTokenAdmin} = require("../middleware/jwt_authenticate")

exports.create_category_routes = (app) =>{
  app.get("/category", getCategories);
  app.get("/category/:id",  getCategoryById);
  app.post("/category", authenticateTokenAdmin  ,addCategory);
  app.delete("/category/:id", authenticateTokenAdmin ,deleteCategory);
  app.put("/category/:id", authenticateTokenAdmin ,updateCategory)
};