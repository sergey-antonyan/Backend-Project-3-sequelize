const express = require('express');
const app = express();
const cors = require('cors')
const {create_products_routes} = require('./routes/product_routs');
const {create_category_routes} = require('./routes/category_routs');
const {create_user_routes} = require('./routes/user_routs');
app.use(express.json());
app.use(cors({
  origin: "*"
}));

create_products_routes(app);
create_category_routes(app);
create_user_routes(app);

app.get('/',(req, res) => {
  res.send('Hello World!');
});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
