import React,{useState} from 'react'
import Carousel from '../../../components/carousel/Carousel';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchtabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch';


const TopRated = () => {
  //state
  const[endpoint,setEndPoint]=useState("movie")//endpt initially will be movie


  //api call
  //destructure data and loading from usefetch
  // endpoint-/movie/popular and /tv/popular
  const {data,loading}=useFetch(`/${endpoint}/top_rated`);

  const onTabChange =(tab)=>{
setEndPoint(tab==="Movies"? "movie":"tv");
  }

  return (

    <div className="carouselSection">
      {/* carousel header */}
      <ContentWrapper>
     <span className="carouselTitle">Top Rated</span>
     {/* pass an array of data and onchange method */}
     <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>

{/* main carousel component */}
      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default TopRated