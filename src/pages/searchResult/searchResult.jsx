import React,{ useState, useEffect} from "react"

import { useParams } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import "./style.scss"

import { fetchDataFromApi } from "../../utils/api"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import MovieCard from "../../components/movieCard/MovieCard"
import Spinner from "../../components/spinner/Spinner"
// import noResults from "../../assets/no-results.png"



const searchResult = () => {

  // states
  const[data,setData]=useState(null);
  const[pageNum,setPageNum]=useState(1);//pagination call- 1 page pe 20 results milte hai aur agar aur chaiye toh  next pagination call karenge on page 2
  const [loading,setLoading]=useState(false);
  const {query} =useParams();


  //api call
  const fetchInitialData=()=>{
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      //jo response milega use setdata me pass kar denge
      setData(res);
      //will use previous state and add 1 to it
      //therefore jab bhi api call hogi har baar pagenu mein 1 add ho jayega
      setPageNum((prev)=> prev +1)
      setLoading(false);
    })
  }


  const fetchNextPageData =()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      //we have to merge nextpage data with initial state data
      if(data?.results){
        // ...data-initial wala, ...res.results -abhi wala
        //in results we have merged purane wale data ka result and abhi wale data ka reuslt
  setData({
    ...data,results:[...data?.results,...res.results]
  })
      }else{
        //agar data exist nahi kr raha toh jo data aaya vo as it is paas kr diya
        setData(res);
      }
      setPageNum((prev)=> prev +1)
    })
  }

  //query jaise he change hogi api call hogi
  // loading state-true set hogi
  //fir fetch method call hoga aur jaise he result milega then humneuse setdata ke andar set karva diya,pagenum ko +1 kr diya & setloading false
  useEffect(()=>{
    setPageNum(1);//jab bhi uery change hogi set page num to 1
 fetchInitialData();
  },[query])




  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}

{/* //loading false then we have to show data */}
      {!loading && (
<ContentWrapper>

{/* if length of data>0 show data else show no result found */}
   {data?.results?.length>0 ? (
//data
<>
<div className="pageTitle">
  {`Search ${data?.total_results>1 ? "results":"result"} of '${query}'`}
</div>

{/* infinite scroll */}
<InfiniteScroll
    className="content"
    dataLength={data?.results?.length || []}//initially data empty hota hai toh mty array bhej denge
    next={fetchNextPageData}//ise-2 hum niche jate rahenge ye apne aap call hota rahega
    hasMore={pageNum<= data?.total_pages}//infinite scroll tabhi tak chale jab tak page num is less than or equal to total pages
    loader={<Spinner />}
>
  {data?.results?.map((item,index)=>{
    if(item.media_type === "person") return;
    return (
      <MovieCard key={index} data={item} fromSearch={true}/>
    )
  })}
</InfiniteScroll>
</>

):(
    // no results found
    <span className="resultNotFound">
       Sorry, Results not found!!
      
    </span>
)}
</ContentWrapper>
)}
    </div>
  )
}

export default searchResult