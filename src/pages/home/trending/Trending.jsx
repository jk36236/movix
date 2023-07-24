import React,{useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchtabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch';

const Trending = () => {
  //state
  const[endpoint,setEndPoint]=useState("day")//endpt initially will be day


  //api call
  //destructure data and loading from usefetch
  // endpoint-/trending/{media_type}/{time_window}
  ///trending/all(tv/movie)/endpoint(state)
  const {data,loading}=useFetch(`/trending/all/${endpoint}`);

  //in thuis method we have to call api when tab is changed
  //and initially jab page load hoga toh day ka data sho krna hai and when e click on week then week ka data show karna hai
  const onTabChange =(tab)=>{
//is methid mein jis bhi tab par hum click karenge uska tabname mil jayega
// agar tab day hai tab hume endpoint day set krna hai else week
setEndPoint(tab==="Day"? "day":"week");
  }

  return (
    <div className="carouselSection">
      <ContentWrapper>
     <span className="carouselTitle">Trending</span>
     {/* pass an array of data and onchange method */}
     <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
    </div>
  )
}

export default Trending