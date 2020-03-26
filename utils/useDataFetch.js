import { useState, useEffect } from 'react';

export default function useDataFetch(url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError();
      try{
        const request = await fetch(url);
        const res = await request.json();
        if (request.status === 404) throw res;
        setData(res);
        setLoading(false);  
      } catch(err) {
        console.log("fetchData -> err", err)
        setData();
        setError(err.error);
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);
  
  return {
    data,
    loading,
    error,
  };
}