import { useState, useEffect } from 'react';

// Define a reusable function for fetching data
const useFetchData = (api) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(api);
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [api]);
    return { data, error };
};

export default useFetchData;
