import React from "react";
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'




function Home() {
 
  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="col-12">

            <div className="card text-center mt-5">
              <div className="card-header home1 ">
                  <img src="https://ofcc.ohio.gov/portals/0/Images/Resources/Bid%203D_Med.jpg" width="100px" height="100px" alt="Bid_Med" className="pic"/>
               <h1 className="header"><Link to="./BidPost" className="link1">Search, </Link> <Link to="./PostPage"  className="link2">Post </Link><span className="fun2">& </span><Link to="./BidPost"  className="link3">Bid</Link> </h1>
            

              
    <img src="/images/act.png" width="100px" height="100px" alt="act"  className="pic2" />
           
              </div>
             

              <div className="card-body home">
           
<div className="carousel">


{/* setting indicators to false removes default bottom dashes at the bottom of the galery*/ }
<Carousel  indicators={false}> 
  <Carousel.Item>


{/* process.env.PUBLIC_URL allows accessing  images from public folder */}
  <img src={process.env.PUBLIC_URL + '/images/pic3.jpg'} height="200px" alt="pic3" width="500px"/>
  </Carousel.Item>


  <Carousel.Item>
   
<img src={process.env.PUBLIC_URL + '/images/pic6.jpg'} height="200px" alt="pic6" width="500px"/>
   
  </Carousel.Item>

  <Carousel.Item>
   

<img src={process.env.PUBLIC_URL + '/images/pic8.jpg'} height="200px" alt="pic8" width="500px"/>
  

  </Carousel.Item>

  <Carousel.Item>
  
<img src={process.env.PUBLIC_URL + '/images/pic7.jpg'} height="200px" alt="pic7" width="500px"/>
   
  </Carousel.Item>
  <Carousel.Item>
   
<img src={process.env.PUBLIC_URL + '/images/pic5.jpg'} height="200px" alt="pic5" width="500px"/>
   

  </Carousel.Item>
</Carousel>

</div>          
<h4  className="text">BidBot is an auction site, selling items from jewelry to home appliances for unbeatable prices! Discover our best deals and start saving now!</h4>    


              </div>
             
              <div className="card-footer">
            
              </div>
            </div>
           
          </div>
        </div>
      </div>
      <br></br><br></br> <br></br><br></br>   
     
    </div>
  );
}

export default Home;
