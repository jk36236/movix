import { useState,useEffect } from 'react';
import {fetchDataFromApi} from "./utils/api";

import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'

//importing pages and components

import header from './components/header/header';
import footer from './components/footer/footer';
import home from './pages/home/home';
import details from './pages/details/details';
import searchResult from './pages/searchResult/searchResult';
import explore from './pages/explore/explore';
import pageNotFound from './pages/404/pageNotFound';


function App() {
  const dispatch = useDispatch()
  const {url}=useSelector((state)=>state.home)//because we are getting not homeslice state but store state
  useEffect(()=>{
    //invokes this method which calls the api
    apiTesting();
  },[]);

  const apiTesting=()=>{
    fetchDataFromApi("/movie/popular")
    .then((res)=>{
      console.log(res);
     dispatch(getApiConfiguration(res))
    });
  };

  return (
    <div className="App">
      app
      {/* optional chaining */}
      {url?.total_pages}
    </div>
  )
}

export default App;
