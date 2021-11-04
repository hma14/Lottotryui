import { useState, useEffect } from "react"

const useFetch = (url, page, pageSize) => {
    const [data, setData] = useState([])
    const [pagingInfo, setPagingInfo] = useState('')
    const [error, setError] = useState('')

    
    let newUrl = url + '?pageNumber=' + page + '&pageSize=' + pageSize

  useEffect(() => {
    fetch(newUrl, {mode: 'cors'})
      .then((res) => { 
          if (res.ok) { setPagingInfo(res.headers.get('x-pagination')); return res.json() }; 
          throw new Error('Something went wrong while requesting data from Lottotry web api.') })
      .then((data) => setData(data.data))
      .catch((error) => setError(error.message))
      
      
  }, [newUrl, page, pageSize, pagingInfo])
  
  //const json = pagingInfo

  const json = pagingInfo !== "" ? pagingInfo : '{"totalCount":664,"pageSize":10,"currentPageSize":10,"currentStartIndex":91,"currentEndIndex":100,"pageNumber":10,"totalPages":67,"hasPrevious":true,"hasNext":true}'

  //const json = JSON.stringify(pagingInfo)

  if ((error)) return <h1>{error}</h1>

  return [{data, json}]
};

export default useFetch