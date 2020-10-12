const Product = require("../models/product")
const formidable = require('formidable');
const _ =require('lodash');
const fs = require('fs')


//Get all of the products
exports.list = (req, res)=>{
   res.send('Get all products work')
}
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
     let product = new Product(fields)
     
     if(files.photo){
        product.photo.data = fs.readFileSync(files.photo.path)
        product.photo.contentType = files.photo.type
     }
     product.save((err, result)=>{
        if(err){
            return res.staus(400).json({
               error: err
         })
        }
        res.json(result);
      })
  })

}

// //Update product
exports.update = (req, res)=>{
   res.send("product updated")
}

exports.remove = (req, res)=>{
   res.send("product deleted")
}


//Get id of the product

// exports.productById = (req, res, next, id)=>{
//    Product.findById(id)
//    .populate('category')
//    .exec((err, product)=>{
//        if(err || !product){
//            return res.status(400).json({
//                error:"Product not found"
//            })
//        }
//        req.product = product
//        next()
//    })
// }