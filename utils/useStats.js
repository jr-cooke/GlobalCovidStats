import { useState, useEffect } from 'react';

export default function useStats(url) {
  const [stats, setStats] = useState();
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
        setStats(res);
        setLoading(false);  
      } catch(err) {
        setStats();
        setError(err.error);
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);
  return {
    stats,
    loading,
    error,
  };
}