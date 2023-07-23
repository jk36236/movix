import React, {useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import useFetch from '../../../hooks/useFetch';
import {useSelector} from "react-redux";

import Img from '../../../components/lazyLoadImage/img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import './style.scss'

const HeroBanner = () => {
  //2 states
  const [background,setBackground]=useState("");
  const[query,setQuery]=useState("");
  // creating an instance of usenavigate hook
  const navigate=useNavigate();
  const {url}=useSelector((state)=>state.home);

  //api call
  const {data,loading} =useFetch('/movie/upcoming');//endpoint,we are fetching data from upcoimg movies and will show banner fom that.

  //for background image
  useEffect(()=>{
const bg=url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
//now we have random path in bg
setBackground(bg);
  },[data]);//whenever this data changes this hook will be called.when we refresh the page data will be changed and this hook will be called

// method for search input
  const searchQueryHandler =(event)=>{
  if(event.key==="Enter" && query.length>0){
    //we want that when we type something in inputbox and hit enter then e should be redirected to seacrh page with the query we entered for doing that we have useNavigate hook
  navigate(`/search/${query}`)
  // now wwhen we hit enter, the text get append in the url
  }
  }



  return (
    <div className="heroBanner">
      {/* //when loading state is false only then show banner img */}
      {!loading && <div className="backdrop-img">
        <Img src={background}  /> 
         {/* because image path is saved in background state */}
      </div>}

{/* opacity layer for merging effect of 2 sections i.e the backdrop-img and content section */}
      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Milions of movies, TV shows and people to discover. Explore now.
          </span>
            
          <div className="searchInput">
            {/* input box */}
            <input 
               type="text"
               placeholder="search for a movie or tv show ..."
               onChange={(e)=>setQuery(e.target.value)}//this will set value in state when someting changes
               onKeyUp={searchQueryHandler}
            />
            {/* search button  */}
            <button>Search</button>
          </div>
        </div>

      </ContentWrapper>
      
    </div>
  )
}

export default HeroBanner