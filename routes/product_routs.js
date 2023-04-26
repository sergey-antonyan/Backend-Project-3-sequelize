const {getAllProducts, getProductById, addProduct, deleteProduct,updateProduct} = require("../controller/product_controller")
const {authenticateTokenAdmin , authenticateTokenUser} = require("../middleware/jwt_authenticate")



exports.create_products_routes = (app) => {
  app.get("/products",getAllProducts);
  app.get("/products/:id",  getProductById);
  app.post("/products" , addProduct);
  app.delete("/products/:id" , deleteProduct);
  app.put("/products/:id"  ,updateProduct)
};

