import { useState,useEffect } from 'react';
import {fetchDataFromApi} from "./utils/api";

import{BrowserRouter,Routes,Route} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'

//importing pages and components

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';


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
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/:mediaType/:id" element={<Details />}/>
      <Route path="/search/:query" element={<SearchResult />}/>
      <Route path="/explore/:mediaType" element={<Explore />}/>
      <Route path="*" element={<PageNotFound />}/>
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App;
