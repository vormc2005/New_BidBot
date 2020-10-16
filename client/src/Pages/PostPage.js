
import React, { useState, useEffect } from "react"; //, useReducer taken out since not using
import {createProduct} from '../utils/API'



function PostPage() {
  const [values, setValues] = useState({
    itemname: '',
    startingbid: '',
    buyout: '',
    category: [],
    condition: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
});


const {
    itemname,
    startingbid,
    buyout,
    loading,
    error,
    createdProduct,
    formData
} = values;

// load categories and set form data
const init = () => { 
        
        setValues({
          ...values,
           formData: new FormData()
        });
        
    
};

useEffect(() => {
    init();
}, []);

const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(formData).then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error });
        } else {
            setValues({
                ...values,
                itemname: '',
                startingbid: '',
                buyout: '',
                photo: '',
                condition: '',
                category: '',
                loading: false,
                createdProduct: data.name
            });
        }
    });
};

const newPostForm = () => (

    

    <form className="mb-3"  style={{border:"1px black solid",  padding:"3vh",paddingRight:"4vh", borderRadius:"10px"}} onSubmit={clickSubmit}>
      

        <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handleChange('itemname')} type="text" className="form-control" value={itemname} />
        </div>
        <div className="form-group">
            <label className="text-muted">Starting bid</label>
            <input onChange={handleChange('startingbid')} type="number" className="form-control" value={startingbid} />
        </div>

        <div className="form-group">
            <label className="text-muted">Buy now price</label>
            <input onChange={handleChange('buyout')} type="number" className="form-control" value={buyout} />
        </div>

              
         <div className="form-group ml-2" style={{width:"100%"}}>
            <label className="text-muted">Condition</label>
            <select onChange={handleChange('condition')} className="form-control">
                <option>Please select</option>
                <option value="New">New</option>
                <option value="Verygood">Very good</option>
                <option value="good">Good</option>
                <option value="poor">Poor</option>
                <option value="verypoor">Very Poor</option>
            </select>
        </div>

        <div className="form-group ml-2" style={{width:"100%"}}>
            <label className="text-muted">Category</label>
            <select onChange={handleChange('category')} className="form-control">
                <option>Please select</option>
                <option value="sporting">Sporting</option>
                <option value="officesupplies">Office Supplies</option>
                <option value="homeandgarden">Home and Garden</option>
                <option value="fashion">Fashion items</option>
                <option value="electronics">Electronics</option>
            </select>
        </div>

        <h4 className="ml-2">Post Photo</h4>
        <div className="form-group ml-2">
            <label className="btn btn-secondary">
                <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
            </label>
        </div>

        

        <button className="btn btn-outline-primary ml-2" style={{width:"100%"}}>Create Product</button>
    </form>
   
);

const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>
);

const showSuccess = () => (
    <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
        <h2>{`${createdProduct}`} is created!</h2>
    </div>
);

const showLoading = () =>
    loading && (
        <div className="alert alert-success">
            <h2>Loading...</h2>
        </div>
    );

return (
  
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showLoading()}
                {showSuccess()}
                {showError()}
                <div className="container" >
                  <div className="row">
                  <div className="col-md-6 offset-sm-3">
                      <h3>Fill <span className="fun">out</span> a <span className="fun">form</span> to <span className="fun">upload</span> your <span className="fun">product</span>!</h3>
                      <hr />
                   </div>
                  </div>
                  <div className="form-row">
                  <div className="form-group col-md-12 ">
                    {newPostForm()}

                  </div>
                  </div>  
                </div>
            </div>
        </div>
   
);
 
}

export default PostPage;
