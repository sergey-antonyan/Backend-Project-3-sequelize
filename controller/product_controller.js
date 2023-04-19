const {Product} = require('../models');

exports.addProduct = (req,res)=>{
  //Create product
  const product = {
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
    quantity: req.body.quantity,
    categoryId: req.body.categoryId
  };
  Product.create(product)
    .then((data)=> res.status(201).send(data))
    .catch((err) => res.status(500).send({err: err.message || 'There was an error while creating the product'}))
}

//Get All Products

exports.getAllProducts = (req,res)=> {
    Product.findAll()
      .then(products => res.json(products))
        .catch(err => res.status(500).send({err: err.message || 'There was an error '}))
}

//Get single Product by Id

exports.getProductById = (req,res) => {
const id = req.params.id;
  Product.findByPk(id)
    .then((data) => {
      if(data){
        res.send(data);
      }else{
        res.status(404).send({message: `Cannot find Product with id=${id}.`});
      }
    })
}

//

//Update Product

exports.updateProduct = (req,res)=>{
  const id = req.params.id;
  Product.update(req.body,{where : {id:id}})
    .then((count)=> {
      if(count){
        res.send({message: 'Product updated successfully'})
      }else{
        res.status(404).send({message: `Cannot find Product with id=${id}.`});
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Product with id=" + id,
      });
    });
}

//Delete Product

exports.deleteProduct = async(req, res) => {
  try{
      const id = req.params.id;
      const data = await Product.destroy({where: {id:id}})
      res.status(201).json(data)
  }
  catch(err){
      res.status(500).json({error: err.message})
  } 
};