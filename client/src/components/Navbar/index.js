import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar({user, handleLogout}) {


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white ">

      <img src="/images/bot1.png" 
            width="100px" 
            height="100px" 
            className="d-inline-block align-top" 
            alt=""
            />

<button className="navbar-toggler ml-auto" style={{width:'7vh', border:'none', marginRight:"2vh" }}type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon "></span>
  </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">

        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          {user ? (
           <>
              <li className="nav-item active">            
                  <Link
                    to="/"  className={window.location.pathname === "/BidPost" ? "nav-link active" : "nav-link"  }                
                  >
                    Home 
                    <span> |</span>
                  </Link>
                  </li>

                  <li className="nav-item categories">
                  <Link
                    to="/BidPost"
                    className={window.location.pathname === "/BidPost" ? "nav-link active" : "nav-link"}
                  >
                    Products <span> |</span>
                  </Link>
                  </li>
                      <li className="nav-item">
                       <Link
                         to="/postPage"
                         className={window.location.pathname === "/postpage" ? "nav-link active" : "nav-link"}
                       >
                         Add item 
                         <span> |</span>
                       </Link>
                     </li>
           
                     <li className="nav-item">
                       <Link
                         to="/Cart"
                         className={window.location.pathname === "/PostPage" ? "nav-link active" : "nav-link"}
                       >
                         <ion-icon name="basket"></ion-icon>
                            Cart
                         <span> |</span>
                       </Link>
                     </li>  

                     <li className="nav-item">
                       <Link
                         to="/" onClick={handleLogout}
                         className={window.location.pathname === "/PostPage" ? "nav-link active" : "nav-link"}
                       >
                         <ion-icon name="basket"></ion-icon>
                            Signout
                         <span> |</span>
                       </Link>
                     </li>                         
                     </>
                    
          ):(
            ///////////////*******************If not Signed in *******************////////////////////
            <>
                          <li className="nav-item">            
                            <Link
                                to="/"
                                className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
                          >
                                  Home 
                            <span> |</span>
                            </Link>
                          </li>

                          
                          <li className="nav-item categories">
                            <Link
                                to="/BidPost"
                                className={window.location.pathname === "/BidPost" ? "nav-link active" : "nav-link"}
                              >
                                  Categories 
                            <span> |</span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                                to="/signin"
                                className={
                                  window.location.pathname === "/signin" ? "nav-link active" : "nav-link"}
                          >
                                  Signup/Signin 
                            <span> |</span>
                            </Link>
                          </li>
                          </>
          )}
          
          

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
