const express = require("express")
const router = express.Router();

const {
    list, 
    create,
    update, 
    remove
    // productById   
} = require('../controllers/itemsApi')



router.get("/products", list)
router.post("/products/create", create)
router.put("/products/:productId", update)
router.delete("/products/:productId", remove)


// router.param('productId', productById)

module.exports =router;