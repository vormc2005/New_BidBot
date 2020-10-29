import React, { Component, Fragment} from "react";
import API from "../utils/API";
import Footer from "../components/Footer/index";
import ShowImage from '../components/Image/ShowImage'


class Bid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      search: "",
      items: [],
      highestbid: [],
      buyOut: []

    };
  }

  componentDidMount() {
    if (this.query) {
      this.displayData()
    }
    else { this.displayAll() };
  }

  //Showing all items via API call
  displayAll = () => {
    API.getAllItems()
      .then(res => {
        // console.log(res.data)
        this.setState({
          results: res.data,
          buyOut: res.data.buyout
        });
      })
      .catch(err => console.log(err));
  }

  //Functions that displays all items by category
  displayData = query => {
    API.getCategoryItems(query)
      .then(res => {
        // console.log(res.data)
        this.setState({
          results: res.data
        });
      })
      .catch(err => console.log(err));

  };

  //Function that deletes items by ID//
  deleteItem = (id) => {
    API.deleteItem(id)
      .then(res => this.displayAll())
      .catch(err => console.log(err));
  }

  //Function that takes care of when input is entered
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value});
  };

  //Function that changes bid price amount
  handleBidPriceInput = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState(prevState => ({
      highestbid: { ...prevState.highestbid, [name]: value }
    }));
  }

  //Function that checks bid amount and displays accordingly
  handleBidSubmit = (event, item) => {
    event.preventDefault();

    let current = parseInt(item.startingbid)
    let buyout = parseInt(item.buyout)
    let userPrice = parseInt(this.state.highestbid[item._id])

    // console.log(userPrice)

    if (userPrice > buyout) {
      this.handleBuyNow(item)
    } else if (userPrice > current) {
      API.updateBid(item._id, { startingbid: userPrice })
        .then(res => {
          alert("Your bid of $" + userPrice + " was accepted!");
          window.location.reload(false);
        })
    } else {
      alert("Stop bein' so stingy! Need to fork over more than that, cheapskate!")
    }
  };

  //Function that deletes item from DB when item is "bought"
  handleBuyNow = async item => {
    await this.deleteItem(item._id)
    alert(`Congratulations, you are now the proud owner of a ${item.itemname}`)
  }

  render() {
    return (
    <Fragment>
      
      <div className ="container mt-5" >
          <div className="row">
          <div className="col-12">
        

      <div className="container mb-4" >

      <form className="form-inline cat-form" >
        <div className="form-group col-md-6" style={{textAlign:"center", justifyContent:'center'}}>
          <h3 className="cats">Shop <span className="fun">by</span> category</h3>
          <select 
                className="itemSearch custom-select " 
                style={{marginLeft:"0.0vh" }}
                name="search" 
                onChange={this.handleInputChange}>
            <option id="allItems" value="" name="search"  >
              ...
            </option>
            <option
              id="homeAndGarden"
              name="search"
              value="homeandgarden"
            >
              Home and Garden
            </option>
            <option id="electronics" name="search" value="electronics">
              Electronics
            </option>
            <option id="fashion" name="search" value="fashion">
              Fashion
            </option>
            <option
              id="sportingGoods"
              name="search"
              value="sporting"
            >
              Sporting Goods
            </option>
            <option
              id="businessIndustrial"
              name="search"
              value="officesupplies"
            >
              Business and Industrial
            </option>
          </select>
        </div>
        <div className="form-group col-md-6" style={{textAlign:"center", justifyContent:'center'}}>
        <h3 className="searchByName"><span className="fun">or </span>search <span className="fun">by </span>name</h3>       
        <div>
          <input
            className="input form-control filter"
            style={{ marginLeft:'0.01vh', width:"100%"}}
            placeholder="Search by name"
            type="text"
            onChange={this.handleInputChange.bind(this)}
            name="search"
            value={this.state.search}
          ></input>
        </div>
        </div>
      </form>
      </div>

      <div className="container" style={{marginBottom:"20vh"}}>
        <div className="row">
      
          {this.state.results.filter(item => (item.itemname).toLowerCase().trim().includes(this.state.search.toLowerCase().trim()) || (item.category).toLowerCase().includes(this.state.search.toLowerCase())).map(item => {
            return (              
              
                <div className="col-xsm-12 col-md-4 col-sm-12">
                  <div className="container card item-card mb-2">
                      <div className="row">
                      <div className="col-md-12">
                        <nav className="card-title">{item.itemname}</nav>
                        </div>
                      </div>
                      
                    <div className="row">
                        <div className="col-md-4">
                        <ShowImage item={item} url="products"/>  
                        
                      </div>                    
                      
                      <div className="col-md-8">
                      <ul className="mt-3 mb-4 ml-3">                          
                          <li className="mb-1 "><strong>Condition:</strong> {item.condition}</li>                          
                          <li className="mb-1"><strong>Current bid: $ </strong>{item.startingbid}</li>                       
                          <li className="mb-1"><strong>Buyout price: $ </strong>{item.buyout} </li>
                        </ul>
                      </div>
                      
                      <div className="row container-fluid mt-2">
                       
                        <div className="col-md-6">
                          <button 
                              className="btn btn-outline-secondary buy mb-3" 
                              onClick={() => this.handleBuyNow(item)}>Buy Now
                            </button>
                            <button 
                              className="btn btn-outline-secondary bid mb-3" 
                              type="text" 
                              onClick={(e) => this.handleBidSubmit(e, item)}>Place bid
                          </button>
                        </div>            
                          
                        
                        <form className="col-xs-12 col-md-6 mt-6 bid-input">
                          <div className="form ">
                           
                              <input 
                                  id={item._id} 
                                  type="number" 
                                  className="form-control placeBid" 
                                  name={item._id} 
                                  value={this.state.highestbid[item._id]} 
                                  placeholder="Bid Here" 
                                  onChange={this.handleBidPriceInput} />                           
                          </div>
                        </form>                       
                       
                      </div>
                    </div>
                  </div>                 
                </div>
             
            );
          })}
            </div>
          </div>
         </div>
        </div>
      </div>
      

      <Footer />
    </Fragment>
    );
  }
}

export default Bid;