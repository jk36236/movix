import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import './style.scss'


const home = () => {
  return (
    <div className="homePage">
      <HeroBanner/>
      <Trending />
    </div>
  )
}

export default home