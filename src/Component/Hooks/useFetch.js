import react, {useState, useEffect, useLayoutEffect,createContext, useContext} from "react";
import Axios from 'axios';

export const CurrencyContext = createContext();

export function useDetails(){
    return useContext(CurrencyContext);
}

function userReducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, currencyOptions: action.payload }
  }
}

//CustomHooks
export default function useFetch(url,fromCurrency) {
    const [info, setInfo] = useState([]);

    // we can use useEffect also here for axios api call
    useLayoutEffect(() => {
        Axios.get(url)
          .then((res) => {
            setInfo(res.data[fromCurrency]);
          })
          .catch((error) => {
            alert('Service Not Available, Please try again');
          })
      }, [fromCurrency]);

      return info;
}