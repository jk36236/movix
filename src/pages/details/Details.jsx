import React from 'react'
import { useParams } from 'react-router-dom'//to get any parameter from url
import './style.scss'
import useFetch from "../../hooks/useFetch"
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'


const details = () => {

  const {mediaType,id}= useParams();

  //api call for videos
  const {data,loading} =useFetch(`/${mediaType}/${id}/videos`);

  //api cal for cast and crew
  const {data:credits,loading:creditsLoading} =useFetch(`/${mediaType}/${id}/credits`);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default details