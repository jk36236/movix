import { useState,useEffect } from 'react';
import {fetchDataFromApi} from "./utils/api";

import{BrowserRouter,Routes,Route} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration,getGenres } from './store/homeSlice'

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
    fetchApiConfig();
    genresCall();
  },[]);

  const fetchApiConfig=()=>{
    fetchDataFromApi("/configuration")
    .then((res)=>{
      console.log(res);

      //now we wil not store whole result in store, we just need 3 types of image paths:-backdrop(banner),poster(homepage),profile(when we click on any poster then profile photo will be shown)
      //we will make object to get these and will store in store
      const url={
        backdrop:res.images.secure_base_url + "original",
        poster:res.images.secure_base_url + "original",
        profile:res.images.secure_base_url + "original",
      }
     dispatch(getApiConfiguration(url))
    });
  };

//for genres
const genresCall=async()=>{
let promises=[]
let endPoints=["tv","movie"]

let allGenres={}

endPoints.forEach((url)=>{
  promises.push(fetchDataFromApi(`genre/${url}/list`))//is url me enpoint tv,movie aa jayenge
  //therefore we have pushed  api calls in promises array one in which endpoint is tv and in other movie
})

//promise.all dono api ka response ek sath return karega
const data=await Promise.all(promises);
// console.log(data);dono api's ka response ek he array me bheja hai as an object

//destructuring genres from data
data.map(({genres})=>{
return genres.map((item)=>(allGenres[item.id]=item))//allgenres abject me hum apni values ko save karenge,id-key and value ke andar item(response) aayega
})
// console.log(allGenres)

//saving in store
dispatch(getGenres(allGenres));
}

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
