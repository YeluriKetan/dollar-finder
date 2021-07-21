import { useState, useEffect } from "react";
import axios from "axios";

export const useGet = (url, sender) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const getData = async () => {
    await axios.get(url).then(
      (response) => {
        setData(response.data);
      },
      (error) => {
        setError(error);
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [url, sender]);
  return { loading, data, error };
};

export const useGetHeader = (url, sender) => {
  const loginToken = JSON.parse(
    localStorage.getItem("dollarfinderlogin")
  ).logintoken;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const getData = async () => {
    await axios
      .get(url, {
        headers: {
          logintoken: loginToken,
        },
      })
      .then(
        (response) => {
          setData(response.data);
        },
        (error) => {
          setError(error);
        }
      );
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [url, sender]);
  return { loading, data, error };
};
