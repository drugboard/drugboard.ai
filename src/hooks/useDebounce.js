"use client"
import { useEffect, useState } from 'react'

const useDebounce = (value="", delay=500) => {

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(()=>{

    const timeOutId = setTimeout(()=>{
        setDebouncedValue(value);
    }, delay);

    return () => {
        clearTimeout(timeOutId);
    }

  },[value, delay]);

  return debouncedValue;

}

export default useDebounce;