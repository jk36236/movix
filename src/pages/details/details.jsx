import React from 'react'
import { useParams } from 'react-router-dom'//to get any parameter from url
import './style.scss'
import useFetch from "../../hooks/useFetch"
import DetailsBanner from './detailsBanner/DetailsBanner'


const details = () => {

  const {mediaType,id}= useParams();

  //api call for videos
  const {data,loading} =useFetch(`/${mediaType}/${id}/videos`);

  //api cal for cast and crew
  const {data:credits,loading:creditsLoading} =useFetch(`/${mediaType}/${id}/credits`);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
    </div>
  )
}

export default details