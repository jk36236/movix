import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

// it's same component we create in react diff is that we are not returnng jsx
const useFetch = (url) => {
  //3 states:-data,loading,error with null as initial value
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    //when we call useFetch,then the useEffect methid will be called ,then traditional fetchDataFromApi method will be called,
    useEffect(() => {
      // when api is called losding state will be set to loding 
        setLoading("loading...");
        setData(null);
        setError(null);

        fetchDataFromApi(url)
        // when we get response from api loading state will be set to false
            .then((res) => {
                setLoading(false);
                setData(res);//data will be saved to the data state
            })
            .catch((err) => {
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]);//in dependency array we have given url, so that when url changes then this method will be called

    return { data, loading, error };
};

export default useFetch;