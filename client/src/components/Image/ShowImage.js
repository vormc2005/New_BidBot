import React from 'react'
import {ApiLink} from '../config'

function ShowImage({item, url}) {


    return (
        
        <div className='product-img'>
       
          <img src={`http://localhost:5000/api/products/photo/${item._id}`} alt={item.itemname} className="mb-3" style={{maxHeight:"100%", maxWidth: "100%"}}/>  
        </div>
    )
}

export default ShowImage
