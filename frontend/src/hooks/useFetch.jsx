import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        // 🔴 IMPORTANT FIX
        // Handles both:
        // 1) { data: [...] }
        // 2) [ ... ]
        setApiData(Array.isArray(result) ? result : result.data);

      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [url]);

  return { apiData, error };
};

export default useFetch;
