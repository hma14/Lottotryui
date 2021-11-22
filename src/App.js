import './App.css'
// import { useState, useEffect, createContext, useContext, useRef, useCallback, useMemo   } from "react"
import { useState, useEffect } from "react"
import useFetch from "./pages/useFetch"
import styled from 'styled-components'


import AllNumbersStatistics from './lottos/AllNumbersStatistics'
import NumberDrowsInDistance from './lottos/NumberDrowsInDistance'
import LottoDraws from './lottos/LottoDraws'
import LottoTryLogo from './images/LottoTryLogo.png'


const Styles = styled.div`
  padding: 1rem;

  table {
    alignment:center;
/*     border-spacing: 2px;
    border: 1px solid black;
 */   
    align-items: center;
    border:4px outset grey; pddding:2px;

    tr {
      :last-child {
        td {
          //border-bottom: 0;
        }
      }
    }

    th,
    td {
     
      margin: 2;
      padding: 5px;  //0.3rem;
      /*
       border-bottom: 1px solid black;
      border-right: 1px solid black;
      border: 1px double;
      cellpadding:2px;
      cellspacing:2px;*/ 

      :last-child {
        border-right: 1px;
      }
      border:3px inset grey; margin:1px;
      overflow-wrap: break-word;
      text-align:center;
    }
  }
`


function App() {



  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [lottoName, setLottoName] = useState(1)
  const [sortType, setSortType] = useState('number');
  const [lottoColumns, setLottoColumns] = useState(7);



  let url = 'http://localhost:9090/api/lottonumbers?lottoname='   + lottoName

  const [{data, json}] = useFetch(url, page, pageSize)

  var pageLimit = 10

  const getPaginationGroup = ()  => {
    pageLimit = totalPages <= pageLimit ? totalPages : pageLimit
    let start = Math.floor((page - 1) / pageLimit) * pageLimit
    
    var remainingPages = totalPages - page
    
    if (remainingPages < 0 )
    {
      setPage(totalPages)
      pageLimit = totalPages
      remainingPages = 0
    }
    if (remainingPages === 0)
    {
      start = totalPages - 1
    }
    
    var arrayLength = remainingPages > 0 ? pageLimit : remainingPages + 1
    let array = new Array(arrayLength).fill().map((_, idx) => start + idx + 1)
    return array
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent)
    setPage(pageNumber)
  }

  function goToNextPage() {
    setPage((page) => page + 1)
    
  }

  function goToPreviousPage() {
    setPage((page) => page - 1)
  }

  
  useEffect(() => {
    
    var o = JSON.parse(json)
    setTotalPages(o.totalPages) 

  }, [json, url, sortType])

  const selectLotto = (value) => {
    setLottoName(value)
    switch(value) {
      case "1": setLottoColumns(7)
      break
      case "2": setLottoColumns(7)
      break
      case "3": setLottoColumns(8)
      break
    }
  }



  return (
    <Styles>     
      {
        <div className="container-fluid">
            {/* {console.log(data)} */}
            <nav className="navbar navbar-expand-xl bg-success mb-1">
              <ul className="navbar-nav">
              <li className="nav-item">
                  <a className="navbar-brand" href="/images">
                    <img src={LottoTryLogo} className="img-fluid" alt="Lottotry Logo" width="50%" />
                  </a>
                </li>
                <li className="nav-item">              
                  {/* <span className='margin-right text-light'>Select Lotto </span> */}
                  <select id="rpp" className="dropdown btn btn-success  dropdown-toggle mt-2 margin-right fw-bold"  onChange={(e) => selectLotto(e.target.value)}>                       
                        <option className="dropdown-item" value="1">BC49</option>
                        <option value="2">Lotto649</option>
                        <option value="3">LottoMax</option>
                  </select>
                </li>
                <li className="nav-item">   
                  <div className="mt-2 margin-left margin-right fw-bold">     
                    <select id="rpp" className="dropdown btn btn-success  dropdown-toggle fw-bold"  onChange={(e) => setSortType(e.target.value)}>                       
                          <option className="dropdown-item" value="number">Sort by Number</option>
                          <option value="distance">Sort by Hit Distance</option>                        
                          <option value="totalHits">Sort by Total Hits</option>                        
                          <option value="lottoDraws">Lotto Draws</option>                        
                          <option value="numberDraws">Number Draws Falling in Distances </option>                        
                    </select>
                  </div>
                </li>

              </ul>
            </nav>

            {data !== null ? (
            <>
            {
              sortType === 'lottoDraws' ? <LottoDraws lottoData={data} columns={lottoColumns} />  :
              <AllNumbersStatistics lottoData={data} sortType={sortType} />
            }

              <div className="card bg-success text-warning">
                <div className="row">
                  <div className="col-lg-3 mt-1 margin-left fw-bold">
                    <select id="rpp" className="dropdown btn btn-success dropdown-toggle ps-4 fw-bold"  onChange={(e) => setPageSize(e.target.value)}>
                      <option className="dropdown-item" value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                    </select>
                    <span className='ps-3'>draws per page</span>
                  </div>
                  <div className="col-lg-8">
                    <button 
                      type="button"
                      onClick={goToPreviousPage}
                      className={`prev btn btn-success fw-bold ${page === 1 ? 'disabled' : ''}`}
                    >Prev</button>

                    {getPaginationGroup().map((item, index) => (
                        <button 
                        type="button"
                        key={index}
                        onClick={changePage}
                        className={`paginationItem btn btn-secondary  fw-bold ${page === item ? 'active' : null}`}
                        >
                        <span>{item}</span>
                        </button>
                    ))}

                    <button 
                      type="button"
                      onClick={goToNextPage}
                      className={`next btn btn-success  fw-bold ${page === totalPages ? 'disabled' : ''}`}
                      >Next</button>
                  </div>
                </div>
              </div>
            </>              
              ) : (
                <h1>No data to display</h1>
              )}

        </div>   
      }                         
  </Styles>
  )
}

export default App
