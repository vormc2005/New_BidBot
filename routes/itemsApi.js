const express = require("express")
const router = express.Router();

const {
    list, 
    create,
    update, 
    remove,
    read,
    productById,
    photo   
} = require('../controllers/itemsApi')

router.get('/products/:productId', read)

router.get("/products", list)
router.post("/products/create", create)
router.put("/products/:productId", update)
router.delete("/products/:productId", remove)
router.get('/products/photo/:productId', photo)


router.param('productId', productById)

module.exports =router;