import axios from 'axios';
// ${query?"?category="+query:null}`);//






export default {
  getAllItems: function () {
    return axios.get("/api/products");
  },

  getCategoryItems: function (query) {
    return axios.get("/api/products?category=" + query);
  },

  updateBid: function (id, bidData) {
    return axios.put("/api/products/" + id, bidData);
  },

  // getCategory: function(query) {
  //   return axios.get("/api/items?category"+query)

  // Gets the item with the given id
  getItem: function (id) {
    return axios.get("/api/products/" + id);
  },

  // Deletes the item with the given id
  deleteItem: function (id) {
    return axios.delete("/api/products/" + id);
  },

  // Saves an item to the database
   
};

export const createProduct = (product)=> {
  return fetch("/api/products/create", {
      method: 'POST',
      headers: {
          Accept: 'application/json',
        
      },
      body: product
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
}
 