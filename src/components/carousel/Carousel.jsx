import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";//left arrow &right arrow icon which we see in desktop version
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";//dayjs ki help se hum date ko 28 june,2022 is format me convert karenge from 28-06-2022

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";


import "./style.scss";

const Carousel = ({data,loading,endpoint,title}) => {
  const carouselContainer=useRef();//ab hum carouselContainer variable jis bh div main pass karenge us div ka reference hume mil jayega,we have passed it in carouselitems

  //we will take url from store
  const {url}=useSelector((state)=>state.home);

  const navigate=useNavigate();//instance of usenavigate,use in carousel item

  //we will get direction -left,right and iske based pe hum apne containe ko left ya right scroll karvaenge
  const navigation=(dir)=>{
//carousel container ki main div ko pakdenge
const container=carouselContainer.current;//iske ander carouselitem wali div aa chuki hai

const scrollAmount=dir ==="left" ? 
container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
//20 is space between carousel items, if dir==left toh hume vapis jana hai ,therefore minus else plus

container.scrollTo(
  {
    left:scrollAmount,
    behavior:"smooth",
  });

  };

// method for skeleton item
const skItem=()=>{
  return(
    //skeleton class in index.scss
    <div className="skeletonItem">
      <div className="posterBlock skeleton"></div>
      <div className="textBlock">
        <div className="title skeleton"></div>
        <div className="date skeleton"></div>
      </div>
    </div>
  )
  
}


  return (
    <div className="carousel">
      <ContentWrapper>
        {/* if title exist then show title, this is added for details page section */}
      {title && <div className="carouselTitle">{title}</div>}
        {/* arrows */}
        <BsFillArrowLeftCircleFill
        className="carouselLeftNav arrow"
        onClick={()=>navigation("left")}
        />
    <BsFillArrowRightCircleFill
    className="carouselRightNav arrow"
    onClick={()=>navigation("right")}
    />
     



      {/* /rendering carousel item based on loading state */}
      {!loading ? (
        // if not loading state we have to show carousel items
        <div className="carouselItems" ref={carouselContainer}>
{/* {data.map(()=>{*

*})}
//we have taken curly bracket becayse variable bhi banana hai */}
          {data?.map((item)=>{
            // if poster path exist we will return url.poster(from store)  + item.poster_path
            // else we will return fallback image
            const posterUrl=item.poster_path ? url.poster + item.poster_path :PosterFallback;
            return(
<div key={item.id} className="carouselItem" onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)}>

{/* poster block */}
<div className="posterBlock">
<Img src={posterUrl}/>
{/* voteaverage 1 decimal no hai therefore we want only 1 digita after decimal */}
<CircleRating rating={item.vote_average.toFixed(1)}/>
{/* iske andar ids bhejni hai, and bohot sare genres show honge par hume sirf 2 he cahiye for a particular movie/tv show */}
<Genres data={item.genre_ids.slice(0,2)}/>
</div>
{/* text */}
<div className="textBlock">
<span className="title">
  {/*//because movie ka name title me milta hai but tvseries ka name me */}
  {item.title || item.name} 
</span>
<span className="date">
  {dayjs(item.release_Date).format("MMM D,YYYY")}
</span>
</div>
</div>
            )
          })}
        </div>
      ):(
        /* loading skeleton */
       <div className="loadingSkeleton">
         {skItem()}
         {skItem()}
         {skItem()}
         {skItem()}
         {skItem()}
       </div>
      )}
       </ContentWrapper>
    </div>
  )
}

export default Carousel