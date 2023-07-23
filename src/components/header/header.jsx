import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";//search icon
import { SlMenu } from "react-icons/sl";//hamburger icon
import { VscChromeClose } from "react-icons/vsc"; //close icon
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  //states
  //top class hai ,based on our logic top, show, hide change hoti rahegi value
    const [show, setShow] = useState("top");//for showing/hidding header menu
    const [lastScrollY, setLastScrollY] = useState(0);//used to achieve above feature
    const [mobileMenu, setMobileMenu] = useState(false);//for mobilemenu
    const [query, setQuery] = useState("");//for setting text we searched
    const [showSearch, setShowSearch] = useState("");//for showing searchbar popup
    const navigate = useNavigate();//instance of useNavigate through which we will navigate in our app
    const location = useLocation();//ye hamari current location yani ki route batata hai


    //jab bhi hum naye route pe jayenge toh hamara scrollbar niche he pada rahega therefore,whenver route is chnaged we drag the scroll back to top(0,0);
    useEffect(()=>{
      window.scrollTo(0,0);
    },[location]);

const controlNavbar=()=>{
  if(window.scrollY>200){
    if(window.scrollY>lastScrollY && !mobileMenu){
      setShow("hide");
    }else{
      setShow("show");
    }
  }else{
    setShow("top");
  }
  setLastScrollY(window.scrollY);


}

   //for translation effect of header i.e. after scrolling some distance in y it should hide
   //WE will check for lastScrollY and if it changes then this useEffect will be called
   //whenever we add event listenre also remove it,otherwise u will see memory leakge issue in console
   useEffect(()=>{
   window.addEventListener('scroll',controlNavbar);
//it's like componentwillUnmount
   return ()=>{
    window.removeEventListener('scroll',controlNavbar);
   }
   },[lastScrollY]) ;

//methods to handle mobile menu
const openSearch =()=>{
  setMobileMenu(false);
  setShowSearch(true);
}


const openMobileMenu=()=>{
  //when we open mobile menu set the state as true and showsearch as false
  setMobileMenu(true);
  setShowSearch(false);
};

// method for search input
const searchQueryHandler =(event)=>{
  if(event.key==="Enter" && query.length>0){
    //we want that when we type something in inputbox and hit enter then e should be redirected to seacrh page with the query we entered for doing that we have useNavigate hook
  navigate(`/search/${query}`)
  // now wwhen we hit enter, the text get append in the url

  //we want when we are redirected to another page the searchBar should be as it is and make it disappear after 1 sec.
  setTimeout(()=>{
setShowSearch(false);
  },1000)
  }

  }


  // navigation handler for li's i.e movies,tv shows
  const navigationHandler= (type)=>{
  if(type==="movie"){
   navigate("/explore/movie");
  }else{
    navigate("/explore/tv");
  }
  setMobileMenu(false);//after navigation set mobile menu as false
  }

    return (
      //adding conditional classes,header by default hai and if mobile menu is true the mobileView class will be added
      <header className={`header ${mobileMenu ? "mobileView":""} ${show}`}>
        <ContentWrapper>
          
          <div className="logo">
            <img src={logo} alt=""/>
          </div>

          <ul className="menuItems">
            <li className="menuItem" onClick={()=>{navigationHandler("movie")}}>Movies</li>
            <li className="menuItem" onClick={()=>{navigationHandler("tv")}}>Tv Shows</li>
            <li className="menuItem">
            <HiOutlineSearch onClick={openSearch}/>
            </li>
          </ul>

          {/* //mobile menu */}
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch}/>
            {/* //if mobilemenu state is true show close button else show hamburger menu */}
            {mobileMenu ?
             (<VscChromeClose onClick={()=>setMobileMenu(false)}/>)
            : 
            (<SlMenu onClick={openMobileMenu}/>)
            }
          
          </div>
        </ContentWrapper>

      {/* searchBar - when showsearch is true we will show it*/}
      {showSearch && <div className="searchBar">
      <ContentWrapper>
        {/* herobanner ki tareh searchinput same */}
      <div className="searchInput">
            {/* input box */}
            <input 
               type="text"
               placeholder="search for a movie or tv show ..."
               onChange={(e)=>setQuery(e.target.value)}//this will set value in state when someting changes
               onKeyUp={searchQueryHandler}
            />
            {/* close icon */}
           <VscChromeClose onClick={()=>setShowSearch(false)}/>
            
          </div>
      </ContentWrapper>
      </div>}

        
        </header>
    );
};

export default Header;