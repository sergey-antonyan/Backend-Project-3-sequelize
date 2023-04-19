
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('mydb',null,null,{dialect:'sqlite',storage:'database.db'});
const {Category} = require('../models');


//Create Category
exports.addCategory = async(req, res)=>{
  try{
      const name = req.body.name;
      console.log(req.body);
      const data = await Category.create({name:name})
      res.status(201).json(data )
  }
  catch(err){
      res.status(500).json({error: err.message})
  }
};

exports.getCategories = async (req,res)=> {
  try{
   const data = await Category.findAll()
        res.json(data)
  }
   catch(err){
   
      res.status(500).send({err: err.message || 'There was an error '})
   }
}



//Get single Category by Id
exports.getCategoryById = (req,res) => {
  const id = req.params.id;
    Category.findByPk(id)
      .then((data) => {
        if(data){
          res.send(data);
        }else{
          res.status(404).send({message: `Cannot find Product with id=${id}.`});
        }
      })
  }
  
//Update Category

exports.updateCategory = (req,res)=>{
  const id = req.params.id;
  Category.update(req.body,{where : {id:id}})
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
 
// exports.deleteCategory = (req,res) => {
//   const id = req.params.id;
//   Category.destroy(req.body,{where : {id}})
//     .then((count) => {
//         if(count){
//             res.send({message : 'Product deleted successfully'})
//         }else{
//           res.status(404).send({message : `Cannot find Product with id=${id}.`})
//         }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Error deleting Product with id=" + id,
//       });
//     });
// }

exports.deleteCategory = async(req, res) => {
  try{
      const id = req.params;
      const data = await Category.destroy({where: id})
      res.status(201).json(data)
  }
  catch(err){
      res.status(500).json({error: err.message})
  } 
};