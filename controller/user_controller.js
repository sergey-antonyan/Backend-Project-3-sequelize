const jwt = require("jsonwebtoken");
const { User } = require("../models");
const CryptoJS = require("crypto-js");
require("dotenv").config();
const {generateAccessToken} = require("../middleware/jwt_generate");
const nodemailer = require("nodemailer");
const MAIL = process.env.MAIL;
const PASS = process.env.PASS;
const SECRET = process.env.SECRET;
const {regSchema, logSchema} = require("../helpers/validation_schema")


exports.register = (req,res)=>{
  const {email, userName, firstName, lastName ,password, is_verified} = req.body;
  const {error} = regSchema.validate(req.body);
            if(error){
                return res.status(400).json({error: error.details[0].message});
            }
  const emailRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ ;
  if(!emailRegex.test(email)){
    return res.status(400).json({error: 'Invalid email format'})
  }
  User.findOne({where: {email: email}}).then((user)=>{
    if(user){
      return res.status(400).json({error:"Email already exists"})
    }
    const hashed_password = CryptoJS.SHA256(password).toString()
      User.create({ userName, firstName ,lastName ,email, password:hashed_password,  is_verified})
      .then((data)=>{
          let token = generateAccessToken(email, is_verified)
          send_mail(email, token)
          res.status(201).json({message : "User created"})
      }).catch((err)=>{
          res.status(500).json({error:err.message})
      })
    })
  }


  exports.login = (req, res)=>{
    const {email, password} = req.body;
    const {error} = logSchema.validate(req.body);
    console.log(email)
    if(error){
        return res.status(400).json({error: error.details[0].message});
    }
    const hashed_password = CryptoJS.SHA256(password).toString();
    User.findOne({where: {email:email}})
    .then((data)=> {
      console.log(data.password, hashed_password)
        if(data && data.password === hashed_password && data.is_verified == 1){
            let token = generateAccessToken(email, data.role);
            res.send(JSON.stringify({status: "Logged in", jwt: token, role: data.role, is_verified: data.is_verified}))
        }else{
            res.send(JSON.stringify({status: "Not logged in"}));
        }
    }) 
}


// exports.login = (req, res)=>{
//  const {email, password} = req.body;
//  const {error} = logSchema.validate(req.body);
//             if(error){
//                 return res.status(400).json({error: error.details[0].message});
//             }
//  const hashed_password = CryptoJS.SHA256(password).toString();
//  User.findOne({email: {email, password:hashed_password}})
//  .then((data)=> {
//     let token = generateAccessToken(email , data.role);
//     if(data.email === email && data.password === hashed_password && data.is_verified == 1){
//         res.send(JSON.stringify({status: "Logged in", jwt: token, role:data.role}))
//     }else{
//       res.send(JSON.stringify({status: "Not logged in"}));
//     }
//  }) 
// }

exports.getAllUsers = (req,res)=> {
  User.findAll()
    .then(products => res.json(products))
      .catch(err => res.status(500).send({err: err.message || 'There was an error '}))
}

send_mail = (mail,token)=>{
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: MAIL,
      pass: PASS
    }
  })

  const mailOptions = {
    from: MAIL,
    to: mail,
    subject: "Sending Email using Node.js",
    text: ` sexmel http://localhost:5000/verify/${token}`
  }

  transporter.sendMail(mailOptions, function(err, info){
    if(err){
      console.log(err);
    }else{
      console.log('Email sent :'  + info.response)
    }
  })

}

exports.verified = async (req,res) => {
  try{
   const token = req.params.token
   const decoded= jwt.verify(token,SECRET)
   const {is_Verified} = req.body;
   await User.update({is_verified:1},{where:{email:decoded.email}})
   res.status(200).json({message:"Verified"}) 
  }
   catch(err){
       res.status(500).json({error: err.message}) 
   }
}

// exports.verify = (req,res)=>{
//   const {is_verified} = req.body;
//   const token = req.params.token;
//   const decoded = jwt.verify(token, SECRET);
//   User.update({is_verified : 1}, {where : { email :decoded.email}})
//    .then((user)=> {
//       res.send("Email verified")
//    })
//    .catch((err)=>{
//       res.status(500).send("Error verifying email")
//    })
// }

exports.deleteUser = async(req, res) => {
  try{
      const id = req.params;
      const data = await User.destroy({where: id})
      res.status(201).json(data)
  }
  catch(err){
      res.status(500).json({error: err.message})
  } 
};
 




