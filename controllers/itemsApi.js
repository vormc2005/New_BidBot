const Product = require("../models/product")
const formidable = require('formidable');
const _ =require('lodash');
const fs = require('fs');
const { response } = require("express");


///////*********CRUD********** *////////////////

//Get all of the products
exports.list=(req, res)=> {
   let order = req.query.order ? req.query.order : 'asc'
   let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
   

   Product.find()
   
   .sort([[sortBy, order]])
      .exec((err, products)=>{
       if (err){
           return res.status(400).json({
               error: 'Products not found'
           });
       }
       res.json(products)
   })
   
}

//middleware to get photo

exports.photo = (req, res, next)=>{
   if(req.product.photo.data){
       res.set('Content-Type', req.product.photo.contentType)
       return res.send(req.product.photo.data)

   }
   next()
}




///////////////***************/////////////////////////////////
////////////////******CREAT WITH FILE UPLOAD*****/////////////////////////////
//Create product - form
      exports.create = (req, res)=>{
      //1.create var form
      let form = new formidable.IncomingForm()
      //2.Keep all of the extensions
      form.keepExtensions=form.parse
      //3.Parse form
      form.parse(req, (err, fields, files)=>{
         if(err){
            return res.status(400).json({
               error: 'Image couldnot be uploaded'
            })
         }

         //Field validation 
         const {itemname, startingbid, buyout, category, condition} = fields
         if(!itemname || 
            !startingbid || 
            !buyout || 
            !category || 
            !condition){
            return res.status(400).json({
               error: 'All fields must be filled out'
            })
         }

         let product = new Product(fields)

         if(files.photo){
      //   console.log('Files photo: ', files.photo)

      //Restrict size of the photo
            if(files.photo.size > 1000000){
               return res.status(400).json({
                  error: 'Image is over 1MB, please resize it to less than 1MB'
               })
            }
         //getting image info  and assigning it to a model field of a photo
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
         }
         product.save((err, result)=>{
            if(err){
                  return res.staus(400).json({
                     error: 'Error saving a product'
               })
            }
            res.json(result);
            })
      })

      }

////////////////////////////*****************
////////////////////////////**************************** *
/************************************************/
// //Update product
//       exports.update = (req, res)=>{
//          //1.create var form
//       let form = new formidable.IncomingForm()
//       //2.Keep all of the extensions
//       form.keepExtensions=form.parse
//       //3.Parse form
//       form.parse(req, (err, fields, files)=>{
//          if(err){
//             return res.status(400).json({
//                error: 'Image couldnot be uploaded'
//             })
//          }

//          //Field validation 
//          const {itemname, startingbid, buyout, category, condition} = fields
//          if(!itemname || 
//             !startingbid || 
//             !buyout || 
//             !category || 
//             !condition){
//             return res.status(400).json({
//                error: 'All fields must be filled out'
//             })
//          }

//          let product = req.product
//          product = _.extend(product, fields)

//          if(files.photo){
//       //   console.log('Files photo: ', files.photo)

//       //Restrict size of the photo
//             if(files.photo.size > 1000000){
//                return res.status(400).json({
//                   error: 'Image is over 1MB, please resize it to less than 1MB'
//                })
//             }
//          //getting image info  and assigning it to a model field of a photo
//             product.photo.data = fs.readFileSync(files.photo.path)
//             product.photo.contentType = files.photo.type
//          }
//          product.save((err, result)=>{
//             if(err){
//                   return res.staus(400).json({
//                      error: 'Error saving a product'
//                })
//             }
//             res.json(result);
//             })
//       })

//       }

     
//////////////////////////////******************************** */
//Remove/Delete
exports.remove = (req, res)=>{
   let product = req.product
   product.remove((err, deletedProduct)=>{
      if(err){
         return res.status(400).json({
            error: err
         })
      }
      res.json({
         deletedProduct,
         message: "Product deleted"
      })
   })
}
//Update
exports.update = (req, res)=>{
   Product.findOneAndUpdate({_id: req.product._id}, {$set: req.body}, {new: true}, (err, product)=>{
       if(err){
           return res.status(400),json({
               error: 'You are not authorized to perorm this action'
           })
       }
      
       res.json(product);
   })
}



//Get id of the product

exports.productById = (req, res, next, id)=>{
   Product.findById(id).exec((err, product)=>{
       if(err || !product){
           return res.status(400).json({
               error: "Product does not exist"
           })
       }
       req.product = product
       next()
   })
}

exports.read = (req, res)=>{
   req.product.photo = undefined;
   return res.json(req.product)
}

//**********Return products based on date ***************/



