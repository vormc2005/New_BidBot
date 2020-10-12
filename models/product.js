const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
    {
        itemname: {
            type:String,
            required: true
        },

        startingbid:{
            type: Number,
            required: true
        },
        buyout: {
            type:Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        condition: {
            type:String,
            required:true
        }, 
        photo:{
            data: Buffer,
           contentType: String
        }
    },
    {timestamps:true}
);

const Items = mongoose.model('Product', productSchema);
module.exports = Items;
