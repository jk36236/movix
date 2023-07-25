import React from 'react'
import './style.scss';
import { useSelector } from 'react-redux';
//destrcturing data  we passed as prop in genre component in carousel.jsx
const Genres = ({data}) => {
  //getting genres from store
  const {genres}=useSelector((state)=>state.home);
  return (
    <div className="genres">
      {data?.map((g)=>{
        // if genres[g]?.name not availaible in store we will simply return
        if(!genres[g]?.name) return;
        return(
          <div key={g} className="genre">
            {/* genres ek list aayegi uke ander ids hogi humne g iterator ki help se vo id target kar li and uska name acces kr liya */}
            {genres[g]?.name}
            
          </div>
        )
      })}
    </div>
  )
}

export default Genres