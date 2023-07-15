import axios from "axios";

const BASE_URL="https://api.themoviedb.org/3";

//import in vite is different from react
// if env is not working then directly paste token value in quotes here.
const TMDB_TOKEN=import.meta.env.VITE_APP_TMDB_TOKEN;

//passing the token in headers
//bearer_ :_space is important
const headers={
  Authorization:"bearer "+
  TMDB_TOKEN,
};

//api call
export const fetchDataFromApi=async(url,params)=>{
   try{
   const{data}=await axios.get(BASE_URL +url,{
    headers,
    params
   })
   return data;
   }catch(err){
    console.log(err);
    return err;
   }

}