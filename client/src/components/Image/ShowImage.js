import React from 'react'
import {ApiLink} from '../config'

function ShowImage({item, url}) {


    return (
        
        <div className='product-img'>
          <img src={`${ApiLink}/${url}/photo/${item}`} alt={item.itemname} className="mb-3" style={{maxHeight:"100%", maxWidth: "100%"}}/>  
        </div>
    )
}

export default ShowImage
