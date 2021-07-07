import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url, sender) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    await axios.get(url).then(
      (response) => {
        setData(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [url, sender]);
  return { loading, data };
};
